# Agent notes — Shishir Personal Archive

## Product constraints (non-negotiable)

- Static site only: React + TypeScript + Vite → `dist/` → GitHub Pages.
- No backend, API routes, serverless functions, databases, CORS proxies or scheduled jobs.
- No secrets or private tokens in the repository or frontend bundle.
- Curated content lives in `src/data/*.json`, typed through `src/types`.
- Never invent personal, academic, research, company or trophy data. Use explicit
  `verification: "pending"` / placeholder states instead.
- Live API consistency: client → transformers → hook → UI. No `fetch()` in components.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc --noEmit && vite build
npm run lint
npm run test:ci
npm run verify     # all of the above
```

## Conventions

- Strict TypeScript, no `any`, no non-null assertions without a proven invariant.
- Design tokens live in `src/styles/tokens.css`; accent modes are token overrides.
- Use `Section` for page sections, `ExternalLink` for external anchors and `DataState`
  components for loading/error/empty states.
- Respect `prefers-reduced-motion` and keyboard access.
- API payloads are untrusted: validate shapes in `githubTransformers.ts` (or equivalent).
- Update the README when an integration limitation or deployment detail changes.
