# Shishir Govinda — Personal Archive

An interactive, static personal archive: engineer, founder of Tvara, and researcher.

Production target: **GitHub Pages**. No backend, database, serverless function, proxy or
scheduled collector exists anywhere in this project.

## Stack

- React 19 + TypeScript (strict)
- Vite
- Structured global CSS with design tokens
- Framer Motion (reduced-motion aware)
- Lucide icons
- IBM Plex Sans / IBM Plex Mono / Space Grotesk, self-hosted via Fontsource
- Vitest + React Testing Library

## Development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build the static site into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript only |
| `npm run test` | Vitest in watch mode |
| `npm run test:ci` | Vitest single run |
| `npm run verify` | Lint, tests and production build |

## Architecture

```text
src/
├── app/             App shell and section registry
├── components/      Layout, navigation, terminal, charts, diagrams, status, UI
├── data/            Typed, hand-maintained content (JSON)
├── hooks/           Viewport, active-section, clock, accent and resource state
├── integrations/
│   └── github/      API client → transformers → hook
├── lib/
│   ├── api/         In-memory cache, typed errors, stale fallback
│   ├── formatting/  Dates, numbers, percentages
│   └── validation/  Runtime response guards
├── sections/        One folder per archive section
├── styles/          Design tokens and global system
├── test/            Vitest setup
└── types/           Domain and content types
```

Rules enforced by the structure:

- `fetch()` never appears in presentation components.
- Raw API payloads stop at the transformer layer.
- Curated content lives in `src/data`, never inside JSX.
- Static content remains readable when every live API fails.

## Live data

### GitHub

The GitHub section fetches public, unauthenticated data directly from
`https://api.github.com` when the visitor approaches the section:

- personal profile and public repositories;
- language bytes for up to five selected repositories;
- Tvara organisation and repositories;
- recent commits for at most two repositories.

Responses are cached in memory with ETag support where exposed. A stale cached response is
preferred over an error within the same session. Rate limits are surfaced explicitly.

### Spotify

The Spotify section is **intentionally gated** in this build. Personal Spotify data is only
visible to an authorised account, so anonymous visitors are never shown a false "now playing"
identity. The section documents the planned Authorization Code + PKCE flow and minimum scopes.
No client secret or token exists in the repository.

### LeetCode, LinkedIn, PlayStation, travel

These are locally maintained snapshots or empty records. No scraping, undocumented endpoints,
Sony credentials, CORS proxies or synthetic activity generation are used.

## Content verification

Records that have not been checked against source documents are marked `pending` and render a
verification badge. Research titles, authors, DOIs, benchmarks, academic details, company
metrics and personal statistics are never invented to fill a layout. To publish a record, edit
the relevant JSON file and change `verification` to `verified` only after checking the source.

## Deployment

`.github/workflows/deploy.yml` runs lint, tests and the production build on every push to
`main`, then deploys `dist/` with the official GitHub Pages actions.

1. Push the repository to GitHub.
2. Open **Settings → Pages → Source** and choose **GitHub Actions**.
3. Push to `main`, or run the workflow manually.

The workflow passes the Pages `base_path` to Vite. A user site
(`shishir574.github.io`) builds with `/`; a project site builds with `/<repo>/`.

## Design notes

The visual language combines dark brutalist structure, terminal typography, archive labels,
signal red, and original SVG schematics. It is not a copy of any existing game or product
interface. The footer exposes a signal-spectrum control to demonstrate token-level theming.

`prefers-reduced-motion` disables radar sweeps, skeletons, reveals and smooth scrolling.

## Known limitations

- GitHub's unauthenticated rate limit is per visitor IP; heavy browsing can exhaust it.
- Spotify cannot display the owner's personal data to anonymous visitors.
- LeetCode and PlayStation have no supported public browser APIs for this use case.
- Publication metadata must be supplied by the owner before it can be displayed.
- The travel map waits for verified coordinates and photographs before Leaflet is introduced.
