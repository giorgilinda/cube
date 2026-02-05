# Cubes

A small Next.js exercise app: a grid of clickable cells. Click them in sequence; they turn green in order, then clear after a delay.

## Features

- **Next.js 16** with App Router
- **React 19** with TypeScript
- **CSS Modules** for the grid and box styling
- **BaseTemplate** – responsive header and footer with app branding
- **Centralized constants** – `APP_NAME`, `APP_DESCRIPTION`, `APP_EMOJI` in `src/utils/constants.ts`
- **TanStack Query** and **Zustand** available (provider and store in place; main UI uses local state)
- **Jest** and **ESLint** for tests and linting

## Project structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata, TanStack provider, BaseTemplate
│   ├── page.tsx         # Home page (renders Main)
│   ├── not-found.tsx    # 404
│   ├── globals.css
│   └── templates/
│       ├── BaseTemplate.tsx
│       └── BaseTemplate.module.css
├── components/
│   ├── Main.tsx         # Grid of boxes; manages click order and green state
│   ├── Main.module.css
│   ├── Box.tsx          # Single cell (clickable when showBorder); green when selected in order
│   └── Box.module.css
├── hooks/
│   └── useIsMounted.ts  # Hydration-safe mount check
├── providers/
│   └── TanStackProvider.tsx
├── services/
│   └── CRUDService.ts   # Generic CRUD factory (for future API use)
├── store/
│   └── useAppStore.ts   # Zustand store with persistence
├── utils/
│   ├── constants.ts     # APP_NAME, APP_DESCRIPTION, APP_EMOJI
│   └── index.ts
└── styles/
    └── theme.css        # CSS variables
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                    |
|------------------|--------------------------------|
| `npm run dev`    | Start dev server               |
| `npm run build`  | Production build               |
| `npm start`      | Run production server           |
| `npm run lint`   | Run ESLint                     |
| `npm test`       | Run Jest                       |
| `npm run check`  | Lint + test                    |

## Constants

App branding is in `src/utils/constants.ts`:

- **APP_NAME** – "Cubes" (layout, metadata)
- **APP_DESCRIPTION** – Short description for metadata/SEO
- **APP_EMOJI** – Used for favicon and header

## Theming

Global theme variables are in `src/styles/theme.css`. `src/app/globals.css` imports them. Dark mode can be added via `prefers-color-scheme` in theme or globals.

## State and services

- **Main/Box UI** – Local React state (click order, interval to clear).
- **TanStack Query** – Wrapped in `TanStackProvider`; use `CRUDService.ts` for API-backed CRUD when needed.
- **Zustand** – `useAppStore` in `src/store/` with optional localStorage persistence; use `useIsMounted` before reading persisted state in Next.js.

## Testing

Tests live in `tests/` (e.g. utils, services, and any component tests). Run with `npm test`. CI runs on push/PR (see `.github/workflows/` if present).

## License

MIT.
