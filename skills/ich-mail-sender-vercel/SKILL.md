---
name: ich-mail-sender-vercel
description: Operate Vercel for the ICH Mail Sender repository. Use when Codex needs to inspect or deploy this repo on Vercel, verify the linked project, debug build or runtime failures, review deployment state, or work with protected previews for this specific codebase.
---

# ICH Mail Sender Vercel

Operate Vercel for this repository with a repo-first workflow.

## Follow this order

1. Read `references/project-context.md`.
2. Confirm `.vercel/project.json` still matches the expected project and team ids.
3. Prefer the repo commands in `package.json` before inventing ad hoc commands.
4. Use Vercel MCP for deployment inspection, logs, and preview access when available.

## Use these repo commands first

- `npm run vercel:whoami`
- `npm run vercel:pull`
- `npm run vercel:deploy`
- `npm run vercel:deploy:prod`

## Operating rules

- Treat the stable project domain as the canonical app URL.
- Distinguish between production, branch preview, and hash deployment URLs when reporting status.
- Inspect logs before proposing fixes when a deployment fails.
- If the change affects production, state that explicitly before executing it.
- Do not guess missing Vercel configuration when local metadata or MCP can verify it quickly.

## Verify after Vercel changes

1. Confirm the deployment state.
2. Report the exact URL that should be tested.
3. If the app changed, run `npm run build`.
4. If a preview is protected, use the protected-preview tools instead of assuming the URL is broken.

## Read references when needed

- Read `references/project-context.md` for project ids, domains, and repo conventions.
