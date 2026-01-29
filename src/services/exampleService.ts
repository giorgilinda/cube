import { useQuery } from "@tanstack/react-query";

// This is a "hookified" service.
// Just copy this file when you need a new API endpoint.
export const useGetStatus = () => {
  return useQuery({
    queryKey: ["api-status"],
    queryFn: async () => {
      // Replace with your actual API endpoint
      return { status: "ok", timestamp: new Date().toISOString() };
    },
    enabled: false, // Set to false so it doesn't run automatically
  });
};
