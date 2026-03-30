# Interchile Clima Prospecting Panel

Internal commercial prospecting panel for Interchile Clima.

This MVP is based on the PRD `PRD_Interchile_Clima_Prospeccion.pdf` and focuses on a practical internal workflow:

- Store leads
- Add commercial analysis
- Generate and edit email drafts
- Approve or reject drafts
- Register sends
- Manage opt-outs

The app is built for deployment on Vercel and uses Supabase/PostgreSQL as the backend.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Vercel

## MVP Scope

Included:

- Dashboard with real metrics from the database
- Leads list, search, filters, detail, create and edit
- Commercial analysis per lead
- Email draft generation and review
- Send registration
- Opt-out management

Explicitly not included in this version:

- Full CRM features
- Real outbound email delivery
- Advanced automation
- Authentication flows
- Scraping pipelines

## Project Structure

```text
app/
  (panel)/
  actions/
components/
  dashboard/
  forms/
  layout/
  shared/
  ui/
docs/
lib/
  supabase/
repositories/
services/
supabase/
  migrations/
  seed.sql
types/
```

## Environment Variables

Create a local `.env.local` file from `.env.example`.

Required:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

If Supabase env vars are not configured, the app still compiles and shows setup alerts plus empty states.

## Local Development

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database Migrations

The database schema lives in:

- `supabase/migrations/20260330190000_init.sql`

You can run it with the Supabase CLI if your project is linked:

```bash
supabase db push
```

Or apply the SQL manually in the Supabase SQL editor.

## Seed Data

Sample data lives in:

- `supabase/seed.sql`

It includes example leads in Santiago and Viña del Mar, along with analysis, drafts, one send record and one opt-out.

If using the Supabase CLI:

```bash
supabase db reset
```

Or run `supabase/seed.sql` manually after the migration.

## Business Rules Implemented

- If there is no clear certainty, `recommended_service` defaults to `evaluation`
- New drafts start with `draft` status
- Opt-out blocks new contact attempts at the email level
- A lead can exist without analysis
- A lead can have multiple drafts and multiple sends
- Dashboard metrics are derived from real relational data

## Deployment on Vercel

1. Push this repository to GitHub
2. Import the project into Vercel
3. Set the environment variables from `.env.example`
4. Deploy

Recommended:

- Add the same Supabase env vars in Vercel Production and Preview
- Run the migration before first production use
- Load the seed only in development or staging

## Developer Notes

- Data access is isolated in `repositories/`
- Workflow and domain rules live in `services/`
- UI is server-first and uses Server Actions for mutations
- No Prisma is used in this version
- Lead workflow status is derived from related records instead of stored directly on `leads`

## Useful Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
