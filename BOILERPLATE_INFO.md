# Boilerplate Information

## 📦 What This Is

This is a clean, production-ready Next.js boilerplate extracted from a larger project, stripped of all project-specific content, and optimized for quick project starts.

## 🎯 Best Use Cases

- Small personal projects
- Code challenges and interviews
- Prototyping new ideas
- Learning Next.js and TypeScript
- Quick MVPs

## ✅ What's Included

### Core Configuration

- ✅ Next.js 16 with App Router
- ✅ React 19
- ✅ TypeScript with strict null checks
- ✅ Babel for Jest compatibility
- ✅ ESLint with Next.js config
- ✅ Path aliases (@/_ → src/_)

### State Management

- ✅ TanStack Query for server state (data fetching, caching)
- ✅ React Query Devtools for debugging
- ✅ Zustand for client state management
- ✅ Example service and store patterns

### Testing Setup

- ✅ Jest with React Testing Library
- ✅ Coverage reporting
- ✅ Example tests for components and utils
- ✅ Jest setup with testing-library/jest-dom

### Styling

- ✅ CSS Modules for component styles
- ✅ Comprehensive theme system with CSS variables
- ✅ Dark mode support (via prefers-color-scheme)
- ✅ Mobile-first responsive design
- ✅ Utility classes

### Developer Experience

- ✅ Hot reload in development
- ✅ TypeScript IntelliSense
- ✅ ESLint warnings in IDE
- ✅ Organized folder structure

### Production Ready

- ✅ Security headers (CSP, XSS protection)
- ✅ Optimized builds
- ✅ 404 page

## 📁 File Structure

```
nextjs-boilerplate/
├── src/
│   ├── app/           # Next.js pages (App Router)
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks (empty, ready to use)
│   ├── contexts/      # React contexts (empty, ready to use)
│   ├── providers/     # React providers (TanStackProvider)
│   ├── services/      # API services using TanStack Query
│   ├── store/         # Zustand state stores
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── tests/             # Test files
├── public/            # Static assets
└── [config files]     # Package.json, tsconfig, etc.
```

## 🚀 Getting Started

1. Copy this folder to a new location
2. Run `npm install`
3. Run `npm run dev`
4. Start coding!

See README.md and QUICK_START.md for more details.

## 💡 Key Differences from Standard Next.js

1. **State management** - TanStack Query + Zustand pre-configured
2. **Testing setup** - Jest configured and ready
3. **Theme system** - CSS variables for easy customization
4. **Component examples** - Shows best practices
5. **Test examples** - Demonstrates testing patterns
6. **Security headers** - Production-ready config
7. **Organized structure** - Clear separation of concerns

## 📝 Next Steps After Cloning

1. Update package.json with your project name
2. Customize theme.css with your colors
3. Update `src/utils/constants.ts` with your app name, description, and emoji
4. Delete example components/tests if not needed
5. Add your first feature!

## 🎨 Customization Points

- **Colors**: `src/styles/theme.css`
- **Metadata**: `src/utils/constants.ts`
- **Fonts**: Add to theme.css
- **API routes**: `src/app/api/[endpoint]/route.ts`
- **Pages**: `src/app/[page-name]/page.tsx`
- **API services**: `src/services/`
- **Client state**: `src/store/`

Happy coding! 🎉
