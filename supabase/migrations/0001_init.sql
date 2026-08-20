-- =====================================================================
-- Hattersley Studio CRM — initial schema
-- Single-user internal CRM for Hattersley Web Studio & Hattersley CAD Services.
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- =====================================================================

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'business_unit') then
    create type business_unit as enum ('web_studio', 'cad_services');
  end if;
end$$;

-- ---------------------------------------------------------------------
-- Shared trigger: keep updated_at fresh
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------
-- LEADS
-- ---------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  business_unit business_unit not null,
  business_name text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  stage text not null default 'new',            -- new, contacted, proposal_sent, contract_signed, won, lost
  source text,                                  -- referral, cold_outreach, gbp, facebook, direct, etc.
  estimated_value numeric,
  notes text,
  next_action text,
  next_action_date date,
  last_contact_date date,
  lost_reason text,                             -- only relevant when stage = lost
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists trg_leads_updated_at on leads;
create trigger trg_leads_updated_at
  before update on leads
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- PROJECTS
-- ---------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id),
  business_unit business_unit not null,
  client_name text not null,
  contact_name text,
  contact_email text,
  project_type text,
  status text not null default 'active',        -- proposal, active, awaiting_content, on_hold, complete
  pricing_model text not null default 'fixed',  -- fixed, hourly, retainer
  fixed_fee numeric,
  hourly_rate numeric,
  is_recurring boolean default false,
  billing_frequency text,                       -- monthly, quarterly, annual (only if is_recurring)
  next_renewal_date date,
  start_date date,
  target_launch_date date,
  next_milestone text,
  tech_stack text,
  drive_folder_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- PROJECT PHASES (checklist on the project detail page)
-- ---------------------------------------------------------------------
create table if not exists project_phases (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'todo',          -- todo, active, done, blocked
  sort_order int not null default 0,
  completed_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_project_phases_project on project_phases(project_id);

-- ---------------------------------------------------------------------
-- TIME ENTRIES
-- ---------------------------------------------------------------------
create table if not exists time_entries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  entry_date date not null,
  task_description text not null,
  hours numeric not null,
  billable boolean not null default true,
  category text not null default 'dev',         -- design, dev, seo, admin, client_comms
  created_at timestamptz default now()
);

create index if not exists idx_time_entries_project on time_entries(project_id);
create index if not exists idx_time_entries_date on time_entries(entry_date);

-- ---------------------------------------------------------------------
-- INVOICES
-- ---------------------------------------------------------------------
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  invoice_number text not null unique,          -- INV-0001, auto-assigned on insert if null
  description text,
  amount numeric not null,
  status text not null default 'draft',         -- draft, sent, paid, overdue
  issue_date date,
  due_date date,
  paid_date date,
  created_at timestamptz default now()
);

create index if not exists idx_invoices_project on invoices(project_id);

-- Sequential invoice numbering (INV-0001, INV-0002, ...) starting at 1.
create sequence if not exists invoice_number_seq start with 1;

create or replace function assign_invoice_number()
returns trigger as $$
begin
  if new.invoice_number is null or new.invoice_number = '' then
    new.invoice_number := 'INV-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_invoices_number on invoices;
create trigger trg_invoices_number
  before insert on invoices
  for each row execute function assign_invoice_number();

-- ---------------------------------------------------------------------
-- RENEWALS (domain / hosting / ssl infrastructure)
-- ---------------------------------------------------------------------
create table if not exists renewals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  renewal_type text not null,                   -- domain, hosting, ssl, other
  provider text,
  expiry_date date not null,
  cost numeric,
  auto_renews boolean default false,
  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_renewals_project on renewals(project_id);

-- ---------------------------------------------------------------------
-- Overdue invoice flagging.
-- Flips 'sent' invoices whose due_date has passed to 'overdue'.
-- Call from a pg_cron job, or from the /api/invoices/refresh route handler.
-- (The UI also derives an overdue display state at read time, so this is a
--  convenience for keeping the stored status accurate.)
-- ---------------------------------------------------------------------
create or replace function mark_overdue_invoices()
returns int as $$
declare
  affected int;
begin
  update invoices
     set status = 'overdue'
   where status = 'sent'
     and due_date is not null
     and due_date < current_date;
  get diagnostics affected = row_count;
  return affected;
end;
$$ language plpgsql;

-- Optional: schedule daily flagging if the pg_cron extension is enabled.
-- select cron.schedule('mark-overdue-invoices', '0 6 * * *', $$select mark_overdue_invoices()$$);

-- =====================================================================
-- Row Level Security — single authenticated user only.
-- Any unauthenticated (anon) request is denied on every table.
-- =====================================================================
alter table leads          enable row level security;
alter table projects       enable row level security;
alter table project_phases enable row level security;
alter table time_entries   enable row level security;
alter table invoices       enable row level security;
alter table renewals       enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['leads','projects','project_phases','time_entries','invoices','renewals']
  loop
    execute format('drop policy if exists %I_authenticated_all on %I', t, t);
    execute format(
      'create policy %I_authenticated_all on %I
         for all
         to authenticated
         using (true)
         with check (true)', t, t);
  end loop;
end$$;
