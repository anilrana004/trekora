import { QueryClient } from "@tanstack/react-query";

/** Shared React Query defaults — fewer duplicate fetches, smoother navigation. */
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 90_000,
        gcTime: 15 * 60_000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1,
        structuralSharing: true,
        networkMode: "online",
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
