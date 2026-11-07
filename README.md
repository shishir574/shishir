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

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start the dev server     |
| `npm run build` | Build for production     |
| `npm run start` | Run the production build |
| `npm run lint`  | Lint the project         |

## Structure

- `src/app/layout.tsx` — root layout and metadata
- `src/app/page.tsx` — home page
- `src/app/globals.css` — global styles and dark theme tokens

The theme is dark by default: the root layout sets `className="dark"`,
`color-scheme: dark` is set globally, and the background/foreground tokens live
in `globals.css`.
