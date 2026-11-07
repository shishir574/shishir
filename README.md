# shishir

A blank, dark-themed Next.js web app.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- ESLint

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the dev server            |
| `npm run build` | Build the static site into `out` |
| `npm run lint`  | Lint the project                |

`npm run build` writes a static export to `out/`. To preview it locally, use
any static file server, for example:

```bash
npx serve out
```

## Deploying to GitHub Pages

`.github/workflows/nextjs.yml` builds the app and deploys `out/` to GitHub
Pages on every push to `main`. To enable it:

1. Push this repository to GitHub.
2. Go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).

The workflow passes `PAGES_BASE_PATH` to the build, which `next.config.ts`
uses as the `basePath` for project sites (`/<repo-name>`). Because the app is
statically exported, server-only features such as API routes, dynamic SSR,
and Server Actions are not available.

## Structure

- `src/app/layout.tsx` — root layout and metadata
- `src/app/page.tsx` — home page
- `src/app/globals.css` — global styles and dark theme tokens

The theme is dark by default: the root layout sets `className="dark"`,
`color-scheme: dark` is set globally, and the background/foreground tokens live
in `globals.css`.
