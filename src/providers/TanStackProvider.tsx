"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * TanStack Query provider that wraps the application.
 *
 * Configures:
 * - Query caching with 1-minute stale time
 * - React Query Devtools (visible in development only)
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <TanStackProvider>
 *   <App />
 * </TanStackProvider>
 * ```
 */
export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // We use useState so the client is only created once per session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data stays fresh for 1 minute
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
