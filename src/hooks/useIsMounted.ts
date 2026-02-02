import { useState, useEffect } from "react";

/**
 * Hook to safely check if a component has mounted on the client.
 *
 * Use this to prevent hydration mismatches when accessing browser-only APIs
 * or Zustand persisted state in Next.js.
 *
 * @returns `true` after the component has mounted, `false` during SSR
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const isMounted = useIsMounted();
 *   const theme = useAppStore((s) => s.theme);
 *
 *   if (!isMounted) return null; // or a loading skeleton
 *   return <div className={theme}>Content</div>;
 * };
 * ```
 */
export const useIsMounted = (): boolean => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};
