# Project context

- Repo path: `C:\Users\benja\Desktop\ICH Mail sender\ICH-Mail-sender`
- Supabase project ref: `dhfbtechpfnyhiyhrbej`
- Main migration path: `supabase/migrations/`
- Seed file: `supabase/seed.sql`
- Local environment files: `.env.local`, `.env.example`

## Preferred flow

1. Inspect environment variables before acting.
2. Keep schema intent in `supabase/migrations/`.
3. Use `npm run db:migrate` to apply the repo migration.
4. Use `npm run db:seed` for sample operational data.
5. Use `npm run supabase:db:push` when the Supabase CLI path is appropriate for this repo.

## Notes

- `DATABASE_URL` is the practical fallback when MCP is unavailable.
- The app is expected to compile even if Supabase variables are missing, but data-backed flows require the variables.
- Verify table counts after seed or schema work when the change affects UI flows.
