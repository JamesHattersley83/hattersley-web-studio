# Silsden Osteopathy

Homepage for Silsden Osteopathy — Next.js (App Router), TypeScript, Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before launch — replace these placeholders

No real photography, contact details, prices or Cliniko link were available
in the project when this was built, so a few things are intentionally left
as clearly-labelled placeholders rather than invented:

- **`lib/config.ts`** — `BOOKING_URL` (Cliniko link), and `BUSINESS` (phone,
  email, address, postcode, opening hours).
- **`lib/content.ts`** — `prices` (currently `£XX`), and `demoReviews`
  (placeholder Google review data — replace with live reviews).
- **Photography** — every image slot uses `components/ui/PhotoPanel.tsx`,
  an abstract on-brand placeholder standing in for real photography of Amy,
  the treatment room and the Pilates studio. Replace each usage with
  `next/image` once real photos are supplied.
- **`app/layout.tsx`** — `siteUrl` is a placeholder production domain used
  for canonical/OG metadata.
- **`lib/schema.ts`** — a ready-to-use `MedicalBusiness` JSON-LD template,
  deliberately not wired into `layout.tsx` yet since it would otherwise
  publish unverified business information to search engines.

## Structure

```
app/            routes, layout, metadata, robots/sitemap
components/
  layout/       Header, Footer, Logo, Container
  home/         one component per homepage section
  ui/           Button, SectionHeading, Reveal, PhotoPanel
lib/
  config.ts     BOOKING_URL + BUSINESS (site-wide config)
  content.ts    navigation, conditions, prices, reviews, etc.
  schema.ts     structured data template (see above)
```
