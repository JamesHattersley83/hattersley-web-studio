# Hattersley Studio CRM

A lightweight, **single-user** internal CRM and project tracker for the
Hattersley freelance business — replacing scattered notes, a paid all-in-one
CRM, and manual invoice tracking.

It covers both trading names under one sole-trader record:

- **Hattersley Web Studio** — web design, local SEO, AI automation
- **Hattersley CAD Services** — piping / mechanical design engineering

Every lead, project, hour and invoice is tagged to a `business_unit` so the two
sides can be reported on separately while sharing one system.

> This is a personal internal tool, not a multi-tenant SaaS. It is deployed
> behind Supabase Auth with a single seeded account, so it is never open to the
> public internet.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** with the studio design tokens baked into the theme
- **Supabase** (Postgres + Auth) — data, row-level security, single auth user
- **Recharts** for the hours-by-category donut
- Deploys to **Vercel**; runs locally first

No emoji anywhere in the UI — all icons are inline 2px-stroke SVGs
(`src/components/icons.tsx`).

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up the database

In your Supabase project's **SQL editor**, run these two files in order:

1. `supabase/migrations/0001_init.sql` — tables, enums, RLS policies,
   invoice auto-numbering, `updated_at` triggers, and the overdue-flagging
   function.
2. `supabase/seed.sql` — example data. Real client **names** are used so the UI
   looks familiar, but every stage, value, date, hour and invoice figure is
   invented placeholder data. Replace it once you're live. (Invoice numbering
   starts at `INV-0001`; the seed leaves the sequence at 6 so your next
   in-app invoice is `INV-0007`.)

### 3. Create your single Auth user

Supabase dashboard → **Authentication → Users → Add user**. Use your email and
a password. This is the only account that will ever exist. (Email confirmations
can be disabled under Authentication → Providers → Email.)

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in from Supabase **Project settings → API**:

| Variable | Where |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` public key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key — server-only, used by the overdue-refresh route |

If these aren't set, the app runs and shows a setup screen instead of crashing.

### 5. Run

```bash
npm run dev
```

Open http://localhost:3000 and sign in with your seeded account.

---

## Pages

| Route | What it does |
| --- | --- |
| `/` | Dashboard — stat cards, lead pipeline rail, active project cards with progress, recent time entries, invoices panel |
| `/leads` | Filterable/searchable leads table, pipeline stat cards, Add Lead form, and lead → project conversion |
| `/projects` | All projects grouped by status, with progress bars |
| `/projects/[id]` | Phase checklist, hours-by-category donut, activity feed, client card, details panel, inline Log Time / New Invoice |
| `/time` | Weekly Mon–Sun grid with colour-coded entries, week navigation, stat cards, hours-by-project bars, all-entries list, Log Time modal |
| `/invoices` | Filterable invoices table, stat cards, New Invoice form, inline status changes |

### Overdue invoices

Invoices display as **overdue** automatically at read time when a `sent`
invoice is past its `due_date` (`isEffectivelyOverdue` in `src/lib/format.ts`),
so no scheduler is strictly required. To also persist the status in the
database, call the `mark_overdue_invoices()` SQL function on a schedule — either:

- **pg_cron** (uncomment the `cron.schedule(...)` line at the bottom of the
  migration), or
- **Vercel Cron** pointed at `POST /api/invoices/refresh` (needs the
  service-role key).

---

## Database schema

Six tables (see `supabase/migrations/0001_init.sql`): `leads`, `projects`,
`project_phases`, `time_entries`, `invoices`, `renewals`. UUID primary keys,
`created_at` / `updated_at` timestamps, and a `business_unit` enum
(`web_studio` | `cad_services`).

**Row Level Security** is enabled on every table with a single policy granting
full access to the `authenticated` role only — every unauthenticated (`anon`)
request is denied.

---

## Deployment (Vercel)

1. Push this repo to GitHub and import it into Vercel.
2. Add the three environment variables from `.env.local` to the Vercel project.
3. Deploy. Add your Vercel domain to Supabase **Authentication → URL
   configuration** so auth redirects resolve.
4. (Optional) Add a Vercel Cron hitting `/api/invoices/refresh` daily.

---

## Roadmap (post-v1)

Natural next additions, already scaffolded in the data model:

- **Stalled-project view** sorted by days since last contact
- **Renewals-due-soon** alerts from the `renewals` table (domains, hosting, SSL)

## Security note

This app targets a single authenticated user behind Supabase Auth and RLS.
It is pinned to the latest patched **Next.js 14.2.x**. Some remaining
`npm audit` advisories concern multi-user / public-facing DoS and cache
scenarios that don't apply to a single-user internal tool, and a dev-only
`glob` CLI issue in the lint plugin; clearing them fully means a major Next.js
upgrade, deferred to keep the build stable.

---

Built by James Hattersley.
