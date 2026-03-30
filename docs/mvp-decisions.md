# MVP decisions

This document captures the main implementation decisions taken from the PRD.

## Scope boundaries

- The product is an internal operational panel, not a public SaaS app.
- The MVP focuses on lead capture, commercial analysis, draft review, send logging and opt-out management.
- Real email sending, OpenAI generation, worker automation and authentication are intentionally left outside this first version.

## Data and workflow decisions

- Lead workflow status is derived from related records instead of stored directly on `leads`.
- `recommended_service` defaults to `evaluation` when there is no clear signal.
- New drafts start with `draft` status.
- Opt-out is enforced by email; an opted-out email blocks draft generation and send registration.
- A lead can exist without analysis, and can have multiple drafts and multiple sends.

## Supabase integration

- The app compiles even when Supabase env vars are missing.
- In setup mode, the UI renders empty states and an explicit configuration banner instead of crashing.
- SQL migrations and seed files are kept in the repo under `supabase/`.
