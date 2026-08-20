-- =====================================================================
-- Hattersley Studio CRM — seed data
-- EXAMPLE DATA ONLY. Real client *names* are used so the UI looks familiar,
-- but every stage, value, date, hour and invoice figure below is invented
-- placeholder data. Replace with real numbers once you're live.
--
-- Safe to re-run: uses fixed UUIDs with ON CONFLICT DO NOTHING.
-- Run AFTER 0001_init.sql.
-- =====================================================================

-- ---------------------------------------------------------------------
-- LEADS
-- ---------------------------------------------------------------------
insert into leads (id, business_unit, business_name, contact_name, contact_email, contact_phone, stage, source, estimated_value, notes, next_action, next_action_date, last_contact_date, lost_reason)
values
  -- Converted lead that became the SJF project
  ('a0000000-0000-0000-0000-000000000001', 'web_studio', 'SJF UK Group', 'Steve Fielding', 'steve@sjfukgroup.example', '01535 000111', 'won', 'referral', 4200, 'Six-page rebuild, existing WordPress. Converted to project.', 'Kick-off call booked', '2026-07-02', '2026-07-01', null),
  -- Active pipeline
  ('a0000000-0000-0000-0000-000000000002', 'web_studio', 'Aire Valley Dental', 'Priya Shah', 'priya@airevalleydental.example', '01274 000222', 'proposal_sent', 'gbp', 3500, 'Wants a modern site + local SEO. Proposal sent, chasing.', 'Follow up on proposal', '2026-08-22', '2026-08-15', null),
  ('a0000000-0000-0000-0000-000000000003', 'web_studio', 'Keighley Joinery', 'Mark Ellison', 'mark@keighleyjoinery.example', '07700 900333', 'contacted', 'cold_outreach', 1800, 'Small brochure site, budget-conscious.', 'Send example portfolio links', '2026-08-21', '2026-08-14', null),
  ('a0000000-0000-0000-0000-000000000004', 'web_studio', 'Bronte Cafe', 'Laura Denby', 'hello@brontecafe.example', null, 'new', 'facebook', 950, 'Enquiry via Facebook DM about a one-page site + menu.', 'Qualify budget & timeline', '2026-08-23', '2026-08-19', null),
  ('a0000000-0000-0000-0000-000000000005', 'web_studio', 'Skipton Fitness', 'Dan Roberts', 'dan@skiptonfitness.example', '01756 000444', 'contract_signed', 'referral', 2600, 'Signed! Awaiting deposit before scheduling.', 'Send deposit invoice', '2026-08-20', '2026-08-18', null),
  -- CAD services lead — the other trading name
  ('a0000000-0000-0000-0000-000000000006', 'cad_services', 'Aire Valley Papermill', 'Ian Whitaker', 'i.whitaker@avpapermill.example', '01756 000555', 'proposal_sent', 'direct', 8500, 'Steam & condensate system redesign for PM2. Piping GA drawings + isometrics.', 'Chase proposal, arrange site visit', '2026-08-25', '2026-08-12', null),
  ('a0000000-0000-0000-0000-000000000007', 'cad_services', 'Northern Process Ltd', 'Gary Hemsworth', 'gary@northernprocess.example', '0113 000666', 'contacted', 'referral', 5200, 'Condensate recovery layout. Waiting on P&IDs from client.', 'Request P&IDs', '2026-08-24', '2026-08-13', null),
  -- Lost
  ('a0000000-0000-0000-0000-000000000008', 'web_studio', 'Wharfedale Vets', 'Sam Cooke', 'sam@wharfedalevets.example', null, 'lost', 'gbp', 3000, 'Went with a national franchise template provider.', null, null, '2026-06-20', 'Chose cheaper template provider')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- PROJECTS
-- ---------------------------------------------------------------------
insert into projects (id, lead_id, business_unit, client_name, contact_name, contact_email, project_type, status, pricing_model, fixed_fee, hourly_rate, is_recurring, billing_frequency, next_renewal_date, start_date, target_launch_date, next_milestone, tech_stack, drive_folder_url)
values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'web_studio', 'SJF UK Group', 'Steve Fielding', 'steve@sjfukgroup.example', '6-page rebuild', 'active', 'fixed', 4200, null, false, null, null, '2026-07-05', '2026-09-05', 'Homepage design sign-off', 'WordPress, Elementor Pro, SiteGround hosting, WP Rocket', 'https://drive.google.com/drive/folders/example-sjf'),
  ('b0000000-0000-0000-0000-000000000002', null, 'web_studio', 'Silsden Osteopathy', 'Rachel Moor', 'rachel@silsdenosteo.example', 'SEO retainer + site refresh', 'active', 'retainer', null, 55, true, 'monthly', '2026-09-01', '2026-03-01', null, 'Local SEO monthly, next milestone: Q3 GBP report', 'WordPress, Astra, Yoast SEO, Cloudways hosting', 'https://drive.google.com/drive/folders/example-silsden'),
  ('b0000000-0000-0000-0000-000000000003', null, 'web_studio', 'Happy Hounds', 'Nicola Frankland', 'nicola@happyhounds.example', 'New brochure site', 'awaiting_content', 'fixed', 1650, null, false, null, null, '2026-08-01', '2026-09-15', 'Awaiting gallery photos from client', 'WordPress, Kadence, IONOS hosting', 'https://drive.google.com/drive/folders/example-happyhounds'),
  ('b0000000-0000-0000-0000-000000000004', null, 'web_studio', 'Dog Days', 'Emma Sutcliffe', 'emma@dogdays.example', 'Booking site + local SEO', 'complete', 'fixed', 2100, null, false, null, null, '2026-04-10', '2026-05-30', 'Launched — monitoring rankings', 'WordPress, Amelia bookings, SiteGround', 'https://drive.google.com/drive/folders/example-dogdays'),
  ('b0000000-0000-0000-0000-000000000005', null, 'web_studio', 'Beauty in Bloom', 'Charlotte Ives', 'charlotte@beautyinbloom.example', 'New site + booking integration', 'active', 'fixed', 1950, null, false, null, null, '2026-08-04', '2026-09-12', 'Booking system integration', 'WordPress, Kadence, Fresha embed, Cloudways', 'https://drive.google.com/drive/folders/example-bloom'),
  -- A CAD project so the CAD business unit is represented in projects too
  ('b0000000-0000-0000-0000-000000000006', null, 'cad_services', 'Pennine Steam Services', 'David Holt', 'd.holt@penninesteam.example', 'Steam main isometrics', 'active', 'hourly', null, 62, false, null, null, '2026-07-20', '2026-09-30', 'Issue isometrics for fabrication', 'AutoCAD Plant 3D, PCF export', 'https://drive.google.com/drive/folders/example-pennine')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- PROJECT PHASES
-- ---------------------------------------------------------------------
insert into project_phases (id, project_id, name, description, status, sort_order, completed_at)
values
  -- SJF UK Group (active, ~40% done)
  ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Discovery & content audit', 'Review existing site, gather requirements', 'done', 0, '2026-07-10'),
  ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Wireframes', 'Low-fi layout for all 6 pages', 'done', 1, '2026-07-18'),
  ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Homepage design', 'Hero, services, CTA', 'active', 2, null),
  ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Inner pages build', 'Build remaining 5 pages', 'todo', 3, null),
  ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'SEO & launch', 'Meta, redirects, go live', 'todo', 4, null),
  -- Happy Hounds (awaiting content, blocked)
  ('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000003', 'Design mockup', 'Single-page design', 'done', 0, '2026-08-08'),
  ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000003', 'Content collection', 'Photos + copy from client', 'blocked', 1, null),
  ('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000003', 'Build & launch', null, 'todo', 2, null),
  -- Beauty in Bloom (active)
  ('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000005', 'Design', 'Brand-led single template', 'done', 0, '2026-08-11'),
  ('c0000000-0000-0000-0000-00000000000a', 'b0000000-0000-0000-0000-000000000005', 'Build pages', null, 'active', 1, null),
  ('c0000000-0000-0000-0000-00000000000b', 'b0000000-0000-0000-0000-000000000005', 'Booking integration', 'Embed Fresha', 'todo', 2, null),
  ('c0000000-0000-0000-0000-00000000000c', 'b0000000-0000-0000-0000-000000000005', 'Launch', null, 'todo', 3, null),
  -- Dog Days (complete)
  ('c0000000-0000-0000-0000-00000000000d', 'b0000000-0000-0000-0000-000000000004', 'Design', null, 'done', 0, '2026-04-20'),
  ('c0000000-0000-0000-0000-00000000000e', 'b0000000-0000-0000-0000-000000000004', 'Build', null, 'done', 1, '2026-05-10'),
  ('c0000000-0000-0000-0000-00000000000f', 'b0000000-0000-0000-0000-000000000004', 'Launch & SEO', null, 'done', 2, '2026-05-30'),
  -- Pennine (CAD)
  ('c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000006', 'Site survey & markup', null, 'done', 0, '2026-07-25'),
  ('c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000006', 'Model steam main', null, 'active', 1, null),
  ('c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000006', 'Issue isometrics', null, 'todo', 2, null)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- TIME ENTRIES (current week is Mon 2026-08-17 .. Sun 2026-08-23)
-- ---------------------------------------------------------------------
insert into time_entries (id, project_id, entry_date, task_description, hours, billable, category)
values
  ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '2026-08-17', 'Homepage hero design iterations', 3.5, true, 'design'),
  ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', '2026-08-18', 'Services section build in Elementor', 2.5, true, 'dev'),
  ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', '2026-08-18', 'Monthly SEO — keyword tracking & GBP posts', 1.5, true, 'seo'),
  ('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000005', '2026-08-19', 'Beauty in Bloom page build', 4.0, true, 'dev'),
  ('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000006', '2026-08-19', 'Steam main modelling in Plant 3D', 5.0, true, 'dev'),
  ('d0000000-0000-0000-0000-000000000006', null, '2026-08-19', 'Admin — invoicing & bookkeeping', 1.0, false, 'admin'),
  ('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', '2026-08-20', 'Client call — homepage feedback', 0.5, true, 'client_comms'),
  ('d0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000005', '2026-08-20', 'Fresha booking embed testing', 2.0, true, 'dev'),
  ('d0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000006', '2026-08-20', 'Isometric prep', 3.0, true, 'dev'),
  -- last week (this month, not this week)
  ('d0000000-0000-0000-0000-00000000000a', 'b0000000-0000-0000-0000-000000000001', '2026-08-12', 'Wireframe revisions', 2.0, true, 'design'),
  ('d0000000-0000-0000-0000-00000000000b', 'b0000000-0000-0000-0000-000000000002', '2026-08-11', 'SEO audit follow-up', 2.5, true, 'seo')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- INVOICES
-- Note: invoice_number is provided explicitly here to keep the seed
-- deterministic. Reset the sequence afterwards (see bottom) so the next
-- app-created invoice continues cleanly.
-- ---------------------------------------------------------------------
insert into invoices (id, project_id, invoice_number, description, amount, status, issue_date, due_date, paid_date)
values
  ('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'INV-0001', 'SJF UK Group — 50% deposit, 6-page rebuild', 2100, 'paid', '2026-07-05', '2026-07-19', '2026-07-15'),
  ('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004', 'INV-0002', 'Dog Days — final balance', 1050, 'paid', '2026-05-30', '2026-06-13', '2026-08-05'),
  ('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'INV-0003', 'Silsden Osteopathy — August SEO retainer', 350, 'sent', '2026-08-01', '2026-08-15', null),
  ('e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000005', 'INV-0004', 'Beauty in Bloom — 50% deposit', 975, 'sent', '2026-08-06', '2026-08-27', null),
  ('e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000006', 'INV-0005', 'Pennine Steam Services — July hours', 1240, 'overdue', '2026-07-20', '2026-08-03', null),
  ('e0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000003', 'INV-0006', 'Happy Hounds — deposit', 825, 'draft', null, null, null)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- RENEWALS
-- ---------------------------------------------------------------------
insert into renewals (id, project_id, renewal_type, provider, expiry_date, cost, auto_renews, notes)
values
  ('f0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000004', 'domain', 'IONOS', '2026-09-10', 12, true, 'dogdays.co.uk — auto-renews on client card'),
  ('f0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000004', 'hosting', 'SiteGround', '2026-09-15', 180, false, 'Annual GrowBig plan — invoice client before renewal'),
  ('f0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'hosting', 'Cloudways', '2026-08-28', 22, true, 'Monthly — billed to studio card, recharged in retainer'),
  ('f0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'domain', 'SiteGround', '2026-10-01', 15, false, 'sjfukgroup.co.uk')
on conflict (id) do nothing;

-- Keep the auto-number sequence ahead of the seeded invoices so the next
-- invoice created in-app is INV-0007.
select setval('invoice_number_seq', 6, true);
