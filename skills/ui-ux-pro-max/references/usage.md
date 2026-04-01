# Usage

## Purpose

Use this skill to give Codex a stronger design vocabulary before editing frontend code.

## Recommended search order

1. `product`
2. `style`
3. `typography`
4. `color`
5. `landing` when page structure matters
6. `chart` when dashboards or analytics matter
7. `ux`
8. `stack`

## Suggested flow for this repo

This project is a Next.js internal panel for Interchile Clima, so start from:

```bash
python scripts/search.py "internal panel b2b operational corporate" --domain product
python scripts/search.py "corporate serious clean" --domain style
python scripts/search.py "professional industrial modern" --domain typography
python scripts/search.py "blue gray service b2b" --domain color
python scripts/search.py "forms tables accessibility" --stack nextjs
```

## Integration rules

- Prefer one coherent visual direction over mixing many style systems.
- Use search results to improve hierarchy, spacing, palettes, and components.
- Keep contrast, accessibility, and responsive behavior intact.
- When a search result conflicts with the product tone, keep the product tone.
