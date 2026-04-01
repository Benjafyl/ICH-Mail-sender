---
name: ui-ux-pro-max
description: Use when designing, refining, or reviewing frontend UI/UX in this repository. Search styles, palettes, typography, UX rules, landing patterns, charts, and stack guidance for Next.js, React, Tailwind, and other UI stacks. Use when Codex needs stronger visual direction, better interface quality, cleaner hierarchy, or faster design decisions.
---

# UI UX Pro Max

Use this skill to improve interface quality with a searchable local design dataset and stack-specific guidance.

## Follow this workflow

1. Read `references/usage.md`.
2. Infer the product type, tone, and stack from the request and the current repo.
3. Search the relevant design domains with `scripts/search.py`.
4. Synthesize the results into a concrete visual direction before editing UI code.
5. Apply the design choices consistently across layout, spacing, type, color, and states.

## Use these commands

Run from the skill directory or use absolute paths:

```bash
python scripts/search.py "dashboard corporate blue" --domain style
python scripts/search.py "industrial professional" --domain typography
python scripts/search.py "hvac service b2b" --domain color
python scripts/search.py "tables forms accessibility" --stack nextjs
```

## Search domains

- `product`
- `style`
- `typography`
- `color`
- `landing`
- `chart`
- `ux`
- `prompt`

## Search stacks

- `html-tailwind`
- `react`
- `nextjs`
- `vue`
- `svelte`
- `swiftui`
- `react-native`
- `flutter`

## Repo-specific rules

- Default to `nextjs` for this repository.
- Prefer sober, corporate, operational interfaces over flashy marketing styles.
- Keep visible product copy in Spanish.
- Use the search results to support decisions, not to force a style that conflicts with product rules.

## Read references when needed

- Read `references/usage.md` for the recommended search order and integration rules.
- Read `references/attribution.md` for the source and license context of this adapted skill.
