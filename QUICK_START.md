# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Copy this boilerplate to your new project

```bash
# Copy the entire boilerplate folder
cp -r /home/linda/personal/nextjs-boilerplate /path/to/your/new-project

# Or clone from GitHub (after you push it)
git clone <your-github-repo-url> my-new-project
cd my-new-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start developing

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 What to Customize

### Project Name

1. Update `package.json`:
   - Change `name` to your project name
   - Update `description`

2. Update `src/app/layout.tsx`:
   - Change `title` and `description` in metadata
   - Update favicon emoji

### Colors & Theme

Edit `src/styles/theme.css` to customize colors:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... */
}
```

### Add New Pages

Create new files in `src/app/`:

- `about/page.tsx` → `/about`
- `contact/page.tsx` → `/contact`

### Add API Routes

Create Route Handlers in `src/app/api/`:

- `src/app/api/users/route.ts` → `/api/users`

```typescript
// src/app/api/users/route.ts
export async function GET() {
  return Response.json({ users: [] });
}
```

### Add Components

Create components in `src/components/`:

- `src/components/Header.tsx`
- `src/components/Header.module.css`

### Add API Services (TanStack Query)

Create services in `src/services/`:

```typescript
// src/services/userService.ts
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      return response.json();
    },
  });
};
```

### Add Client State (Zustand)

Create stores in `src/store/`:

```typescript
// src/store/useUserStore.ts
import { create } from "zustand";

interface UserState {
  name: string;
  setName: (name: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));
```

## 🧪 Run Tests

```bash
npm test
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📚 Next Steps

- [ ] Update README.md with your project details
- [ ] Customize theme colors
- [ ] Add your first feature
- [ ] Write tests for your code
- [ ] Deploy to Vercel

## 💡 Tips

- Use CSS Modules for component-specific styles
- Leverage the theme variables for consistent styling
- Write tests alongside your code
- Use TypeScript for type safety
- Follow the existing component patterns
- Use TanStack Query for all server state (API data)
- Use Zustand for client-only state (UI state, preferences)

## 🆘 Need Help?

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)

Happy coding! 🎉
