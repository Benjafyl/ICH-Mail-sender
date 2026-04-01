---
name: ich-mail-sender-supabase
description: Operate Supabase for the ICH Mail Sender repository. Use when Codex needs to inspect the database schema, apply or verify SQL migrations, run seed data, validate Supabase environment setup, inspect rows or constraints, or troubleshoot this repo's PostgreSQL integration.
---

# ICH Mail Sender Supabase

Operate Supabase for this repository through repo-owned migrations and verified connection settings.

## Follow this order

1. Read `references/project-context.md`.
2. Check `.env.local` or `.env.example` for `NEXT_PUBLIC_SUPABASE_URL` and `DATABASE_URL` when relevant.
3. Treat `supabase/migrations/` and `supabase/seed.sql` as the source of truth for database changes.
4. Prefer the repo scripts before composing raw SQL commands.

## Use these repo commands first

- `npm run db:migrate`
- `npm run db:seed`
- `npm run supabase:db:push`

## Operating rules

- Add schema changes in `supabase/migrations/` before applying them.
- Prefer additive migrations over one-off live edits.
- Verify seed effects with counts or representative records after execution.
- Use direct SQL only when the repo scripts or migration files do not already cover the task.
- Do not drop tables or delete large data sets without explicit confirmation.

## Verify after Supabase changes

1. Confirm the target project or `DATABASE_URL`.
2. Apply the migration or seed through the repo workflow.
3. Verify the schema or row counts.
4. If app behavior depends on the change, run `npm run typecheck` and `npm run build`.

## Read references when needed

- Read `references/project-context.md` for project ids, DB files, and known operational conventions.
