# ICH Mail Sender Ops

Operational conventions for this repository.

## Project identity

- Repo: `ICH-Mail-sender`
- Vercel project: `ich-mail-sender`
- Vercel team id: `team_bbWPk6vIFMtC58pzeXgWAXXK`
- Vercel project id: `prj_r1CXaAiHPxsnkLNfwYT2oiHlV73Q`
- Stable Vercel domain: `https://ich-mail-sender-benjafyl-1504s-projects.vercel.app`
- Supabase project ref: `dhfbtechpfnyhiyhrbej`

## Required local files

- `.env.local`
- `.vercel/project.json`
- `supabase/migrations/`
- `supabase/seed.sql`

## Preferred operating flow

### Vercel

1. Verify login:
   - `npm run vercel:whoami`
2. Refresh local Vercel metadata if needed:
   - `npm run vercel:pull`
3. Preview deploy:
   - `npm run vercel:deploy`
4. Production deploy:
   - `npm run vercel:deploy:prod`

Important:

- Preview URLs may be protected by Vercel Authentication.
- `NEXT_PUBLIC_APP_URL` should use the stable project domain, not a hash deployment URL.

### Supabase

1. Apply repo migration directly:
   - `npm run db:migrate`
2. Apply seed:
   - `npm run db:seed`
3. Push pending Supabase migration history with CLI:
   - `npm run supabase:db:push`

Important:

- `DATABASE_URL` is the fallback path when Supabase MCP is unavailable.
- Prefer repository migrations over one-off SQL changes.
- Verify row counts after seed or schema work.

## Safety boundaries

- Do not delete data or drop tables without explicit user confirmation.
- Keep schema changes reflected in `supabase/migrations/`.
- Keep any operational helper scripts in `scripts/`.
