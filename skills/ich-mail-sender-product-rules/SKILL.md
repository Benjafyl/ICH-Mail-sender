---
name: ich-mail-sender-product-rules
description: Apply the internal product rules for the ICH Mail Sender repository. Use when Codex needs to make product or implementation decisions for this app, stay inside the MVP scope, preserve the internal-panel tone, or verify that changes respect the business rules and operating model of this specific product.
---

# ICH Mail Sender Product Rules

Use this skill when a request affects product behavior, copy, UI tone, workflow scope, or business logic in this repository.

## Follow this order

1. Read `references/product-rules.md`.
2. Read `references/mvp-decisions.md` when a technical decision could affect scope.
3. Prefer the smallest implementation that satisfies the product rule without adding unrelated features.

## Product rules

- Treat this app as an internal operational panel, not a marketing site.
- Keep visible interface copy in Spanish.
- Keep technical code identifiers in English.
- Keep the UI sober, corporate, and utility-first.
- Avoid flashy SaaS patterns, tutorial copy, or explanatory MVP language in the interface.
- Do not add features outside the current commercial prospecting flow unless the user asks for them.

## MVP workflow boundaries

- Support leads, commercial analysis, draft review, send logging, and opt-out management.
- Keep real outbound email sending outside scope unless explicitly requested.
- Keep complex authentication outside scope unless it becomes necessary.
- Default uncertain commercial recommendations to `evaluation`.
- Block new contact actions for opted-out emails.

## Decision rules

- If the PRD and a minor technical preference conflict, preserve the MVP scope from the PRD.
- If a rule is ambiguous, choose the simplest operational behavior and document it in the repo when needed.
- Favor maintainability, strong typing, and clear structure over clever abstractions.

## Read references when needed

- Read `references/product-rules.md` for the operational product guardrails.
- Read `references/mvp-decisions.md` for implementation decisions already taken in this repo.
