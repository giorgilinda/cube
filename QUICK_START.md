# Quick Start – Cubes

## Run the app

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll see a grid of cells; click them in sequence and they turn green, then clear after a delay.

## Customize

### App name and branding

- **`src/utils/constants.ts`** – Change `APP_NAME`, `APP_DESCRIPTION`, `APP_EMOJI` for metadata and header/footer.

### Theme

- **`src/styles/theme.css`** – Edit CSS variables for colors and spacing.

### Grid and behavior

- **`src/components/Main.tsx`** – `BOX_DATA` defines which cells are clickable (1) or empty (0). Click order and clear timing are handled here.
- **`src/components/Box.tsx`** – Single cell; `showBorder` enables clicking, `isGreen` controls highlight.

### New pages

Add under `src/app/`:

- `src/app/about/page.tsx` → `/about`
- `src/app/contact/page.tsx` → `/contact`

### API routes

Add under `src/app/api/`:

- `src/app/api/example/route.ts` → `/api/example`

### New components

Add under `src/components/` with a matching `.module.css` (e.g. `MyComponent.tsx`, `MyComponent.module.css`).

## Commands

| Command         | Description      |
| --------------- | ---------------- |
| `npm run dev`   | Dev server       |
| `npm run build` | Production build |
| `npm start`     | Run production   |
| `npm test`      | Run tests        |
| `npm run lint`  | Run ESLint       |
| `npm run check` | Lint + test      |

## Need more?

- **README.md** – Project overview and structure.
- **CONVENTIONS.md** – Code and file conventions.
