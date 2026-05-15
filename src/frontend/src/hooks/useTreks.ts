import { useQuery } from "@tanstack/react-query";
import { useActor } from "@trekora/icp";
import { createActor } from "../backend";
import type { Trek as BackendTrek } from "../backend.d.ts";
import { TREKS } from "../data/treks";

export type { BackendTrek };

export function useTreks() {
  const { actor, isFetching } = useActor(createActor);
  const CACHE_KEY = "ew_treks_cache";
  const CACHE_TIME_KEY = "ew_treks_cache_time";
  const TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

  return useQuery<BackendTrek[]>({
    queryKey: ["treks"],
    queryFn: async () => {
      // Try cache first
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        const ts = sessionStorage.getItem(CACHE_TIME_KEY);
        if (raw && ts && Date.now() - Number(ts) < TTL_MS) {
          return JSON.parse(raw) as BackendTrek[];
        }
      } catch {
        // ignore
      }

      // Fetch from backend
      if (!actor) return [];
      try {
        const result = await actor.getTreks();
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(result));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
          // quota exceeded
        }
        return result;
      } catch {
        // Fallback: map static data to backend shape
        const fallback = TREKS.map((t) => ({
          id: BigInt(t.id),
          name: t.name,
          slug: t.slug,
          state: t.state,
          duration: BigInt(t.duration),
          altitude: BigInt(t.altitude),
          difficulty: t.difficulty,
          price: BigInt(t.price),
          rating: t.rating,
          reviewCount: BigInt(t.reviewCount),
          description: t.description,
          shortDesc: t.shortDesc ?? "",
          image: t.image,
          images: t.images,
          category: t.category,
          bestSeason: t.bestSeason,
          distance: BigInt(t.distance),
          startPoint: t.startPoint,
          endPoint: t.endPoint,
          trekType: t.trekType,
          isActive: t.isActive,
          isFeatured: t.isFeatured,
        })) as BackendTrek[];
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(fallback));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
          // quota exceeded
        }
        return fallback;
      }
    },
    enabled: !isFetching,
  });
}

export function useBlogCache() {
  const CACHE_KEY = "ew_blogs_cache";
  const CACHE_TIME_KEY = "ew_blogs_cache_time";
  const TTL_MS = 6 * 60 * 60 * 1000;

  return useQuery<typeof import("../data/blogs").BLOGS>({
    queryKey: ["blogs"],
    queryFn: async () => {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        const ts = sessionStorage.getItem(CACHE_TIME_KEY);
        if (raw && ts && Date.now() - Number(ts) < TTL_MS) {
          return JSON.parse(raw);
        }
      } catch {
        // ignore
      }
      const { BLOGS } = await import("../data/blogs");
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(BLOGS));
        sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
      } catch {
        // quota exceeded
      }
      return BLOGS;
    },
  });
}
