# Shishir Govinda — Personal Archive

An interactive, static personal archive: engineer, co-founder of Tvara, and researcher.

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
public/
├── robots.txt       Search + AI crawlers (allow all, sitemap)
├── llms.txt         LLM summary (llmstxt.org)
├── sitemap.xml      Homepage URL (lastmod 2026-11-08)
├── og-image.svg     Social share image (1200×630)
└── favicon.svg      Site icon
src/
├── app/             App shell and section registry
├── components/      Layout, navigation, terminal, charts, diagrams, UI
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

- personal profile and public repositories, sorted by last push (newest first);
- language bytes for up to five selected repositories;
- Tvara GitHub account and repositories — via `GET /users/TryTvara` and
  `GET /users/TryTvara/repos` (TryTvara is a normal user account, not an
  organisation; `/orgs/TryTvara` returns 404);
- Tvara contribution history: up to 100 commits per repository for the four most
  recently pushed TryTvara repositories, aggregated by UTC day into a 52-week
  GitHub-style green calendar (public commits only). TryTvara currently has no
  public repositories, so the calendar shows 0 public commits and links to the
  GitHub profile and the `tvara-ai` organisation (https://github.com/tvara-ai)
  for the full graph. Private-repo contributions (e.g. the 2,264 in the last
  year shown on GitHub) cannot be fetched via the unauthenticated REST API;
  pull requests and issues are not counted because REST does not expose the
  full contribution graph.

Responses are cached in memory with ETag support where exposed. A stale cached response is
preferred over an error within the same session. Rate limits are surfaced explicitly.

### Spotify

Personal Spotify data is only visible to an authorised account, so anonymous visitors see a
gated state until an explicit authorisation session is connected. No client secret or token
exists in the repository.

### LeetCode, LinkedIn, PlayStation, travel

Curated records are maintained in `src/data` and displayed newest-first. No scraping,
undocumented endpoints, Sony credentials, CORS proxies or synthetic activity generation are
used.

## Tvara

Company record is aligned with https://tvara.global — AI Sales Brain with Matching Engine,
Intelligent Campaigns, learning loop and existing-stack integrations. The Context Layer paper
(20 June 2026) is linked from the Research section.

## SEO & discovery

- `index.html` carries the full meta set (title, description, keywords, canonical, Open
  Graph, Twitter card) plus JSON-LD `Person` + `WebSite` + `Tvara` `Organization` so
  searches for "Shishir Govinda LinkedIn" associate this site with
  `linkedin.com/in/shishir-govinda-m`, `github.com/shishir574` and `tvara.global`.
- `public/robots.txt` allows all crawlers (including AI assistants) and points to the
  sitemap. `public/sitemap.xml` lists the homepage. `public/llms.txt` is the
  machine-readable summary (https://llmstxt.org). `public/og-image.svg` is the share image.
- The `<noscript>` fallback lists the name, role, profile links and education/research
  lines so crawlers without JavaScript still see the key facts.
- To re-index after deploy, submit `https://shishir574.github.io/sitemap.xml` in Google
  Search Console / Bing Webmaster Tools. Rankings are not guaranteed.

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
- The travel map waits for coordinates and photographs before Leaflet is introduced.
