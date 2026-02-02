# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with TypeScript, Jest, ESLint, and comprehensive developer tools. Perfect for quickly starting new projects, code challenges, and personal applications.

## 🚀 Features

- **Next.js 16** - Latest version with App Router
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **TanStack Query** - Server state with CRUD examples and optimistic updates
- **Zustand** - Client state with localStorage persistence
- **Jest** - Unit and integration testing with coverage
- **ESLint** - Code quality and consistency
- **CSS Modules** - Scoped styling
- **Theme System** - Customizable CSS variables
- **Dark Mode Support** - Automatic dark mode via prefers-color-scheme
- **Mobile-First** - Responsive design out of the box
- **Production Ready** - Security headers, optimized builds
- **BaseTemplate Layout** - Pre-built responsive header and footer
- **Centralized Constants** - App-wide configuration via `constants.ts`
- **Dynamic Favicon** - Emoji-based favicon support
- **PWA Ready** - Enhanced metadata for mobile web apps
- **Cursor AI Workflow** - Pre-configured rules and commands for AI-assisted development

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with metadata
│   ├── page.tsx      # Home page
│   ├── globals.css   # Global styles
│   └── templates/    # Page templates
│       ├── BaseTemplate.tsx        # Main layout with header/footer
│       └── BaseTemplate.module.css # Template styles
├── components/       # Reusable React components
├── hooks/            # Custom React hooks
├── contexts/         # React contexts
├── providers/        # React context providers
│   └── TanStackProvider.tsx  # TanStack Query provider with devtools
├── services/         # API services using TanStack Query
│   └── exampleService.ts     # Full CRUD example with optimistic updates
├── store/            # Zustand state stores
│   └── useAppStore.ts        # Global app state with persistence
├── utils/            # Utility functions
│   └── constants.ts  # App-wide constants (name, description, emoji)
└── styles/           # Global styles and theme
.cursor/              # Cursor AI workflow configuration
├── commands/         # Slash command templates (/request, /refresh, /retro)
└── rules/            # Auto-applied behavior rules for the AI agent
tests/                # Test files
public/               # Static assets
```

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Theming

The boilerplate includes a comprehensive theme system using CSS variables. Customize colors, spacing, typography, and more in `src/styles/theme.css`:

```css
:root {
  --color-primary: #0070f3;
  --color-secondary: #7c3aed;
  /* ... more variables */
}
```

Dark mode is automatically enabled based on system preferences. Customize dark mode styles in the `@media (prefers-color-scheme: dark)` section.

## 🏗️ Templates

The boilerplate includes a `BaseTemplate` layout component that wraps all pages with:

- **Responsive Header** - App name with emoji and navigation links
- **Main Content Area** - Flexible container for page content
- **Footer** - Quick links and contact information with social icons

### Customizing the Template

Edit `src/app/templates/BaseTemplate.tsx` to customize the header navigation, footer links, and overall layout structure. The template uses CSS Modules for scoped styling.

## ⚙️ Constants

Centralized application constants are stored in `src/utils/constants.ts`:

```typescript
export const APP_NAME = "MyApp";
export const APP_DESCRIPTION = "This is a boilerplate for my apps";
export const APP_EMOJI = "🆕";
```

These constants are used throughout the app for:

- Page metadata (title, description)
- Dynamic emoji favicon
- Header and footer branding

## 🗃️ State Management

The boilerplate includes two complementary state management solutions:

### TanStack Query (Server State)

TanStack Query handles all server state - data fetching, caching, and synchronization. The app is wrapped with `TanStackProvider` which includes:

- Query caching with 1-minute stale time
- React Query Devtools (in development)

The example service (`src/services/exampleService.ts`) demonstrates a complete CRUD pattern:

```typescript
// Query key factory for cache management
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  detail: (id: number) => [...postKeys.all, "detail", id] as const,
};

// Fetch all posts
export const useGetPosts = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: async () => {
      const res = await fetch("/api/posts");
      return res.json();
    },
  });
};

// Create with optimistic update
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newPost) => { /* ... */ },
    onMutate: async (newPost) => {
      // Optimistically update cache before server responds
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });
      const previous = queryClient.getQueryData(postKeys.lists());
      queryClient.setQueryData(postKeys.lists(), (old) => [newPost, ...old]);
      return { previous };
    },
    onError: (err, newPost, context) => {
      // Rollback on error
      queryClient.setQueryData(postKeys.lists(), context?.previous);
    },
  });
};
```

### Zustand (Client State with Persistence)

Zustand handles client-only state like UI state, user preferences, etc. The example store (`src/store/useAppStore.ts`) includes **localStorage persistence**:

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  isMenuOpen: boolean;
  fontSize: number;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
  setFontSize: (size: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      fontSize: 16,
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "app-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

**Note:** For Next.js hydration, check if the component is mounted before using persisted values:

```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

## 📝 Example Components

The boilerplate includes a few example components to get you started:

- **Button** - Accessible button component with variants
- **Card** - Card container component

These serve as examples of best practices for component structure and CSS Modules usage.

## 🧪 Testing

Tests are located in the `tests/` directory. Example tests are included for:

- Utility functions (`tests/utils.test.ts`)
- Components (`tests/components/Button.test.tsx`)

### Writing Tests

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

## 🔧 Configuration

### TypeScript

TypeScript configuration is in `tsconfig.json`. Key settings include:

- Path aliases: `@/*` pointing to `src/*`
- `strictNullChecks` enabled for null safety
- ES2017 target for broad compatibility
- Node module resolution

### ESLint

ESLint configuration extends Next.js recommended rules. Customize in `eslint.config.mjs`.

### Jest

Jest is configured to work with TypeScript and React Testing Library. Configuration is in `jest.config.js`.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted (Node.js)

## 📦 What's Included

- ✅ Next.js 16 with App Router
- ✅ React 19
- ✅ TypeScript configuration
- ✅ TanStack Query with CRUD patterns and optimistic updates
- ✅ Zustand with localStorage persistence
- ✅ Jest with React Testing Library
- ✅ ESLint configuration
- ✅ CSS Modules with theme system
- ✅ Dark mode support
- ✅ Security headers
- ✅ Example components and tests
- ✅ Full CRUD service example with query key factory
- ✅ Mobile-first responsive design
- ✅ Production optimizations
- ✅ BaseTemplate layout with header/footer
- ✅ Centralized app constants
- ✅ Dynamic emoji favicon
- ✅ PWA-ready metadata (viewport, theme color, Apple Web App)

## 🤖 Cursor AI Workflow

This boilerplate includes a pre-configured Cursor AI workflow for efficient AI-assisted development. See `CURSOR.md` for full details.

### Quick Start

1. **Start a task:** Use `/request` followed by your feature or fix description
2. **Debug persistent issues:** Use `/refresh` to trigger deep root-cause analysis
3. **Improve over time:** Use `/retro` to reflect on the session and update project rules

### Structure

- `.cursor/rules/` - Behavioral rules automatically applied to the AI agent
- `.cursor/commands/` - Slash command templates for structured workflows

The AI agent follows a research-first protocol, prioritizes code over documentation as source of truth, and performs self-audits before reporting completion.

## 🔮 Next Steps

- Set up internationalization (i18n)
- Add Storybook for component development
- Configure CI/CD pipeline
- Add end-to-end testing (Playwright, Cypress)
- Set up authentication
- Add a UI library (Tailwind CSS, Material-UI, etc.)

## 📄 License

MIT

## 🤝 Contributing

This is a boilerplate template. Feel free to fork and customize for your needs!

---

Made with ❤️ using Next.js
