# Implementation decisions

- Lead workflow status is derived from related records instead of being stored on `leads`.
- `recommended_service` defaults to `evaluation` when there is no clear signal.
- New drafts start with `draft` status.
- Opt-out is enforced by email and blocks draft generation and send registration.
- A lead can exist without analysis and can have multiple drafts and sends.
- Real email sending, advanced automation, and authentication are outside the first production scope.
