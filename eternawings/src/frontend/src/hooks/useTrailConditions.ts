import { createActor } from "@/backend";
import type { TrailCondition } from "@/backend.d.ts";
import { useActor } from "@trekora/icp";
import { useQuery } from "@tanstack/react-query";

const CACHE_KEY = "ew_trail_conditions";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function readCache(): TrailCondition[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as {
      data: TrailCondition[];
      ts: number;
    };
    if (Date.now() - ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(data: TrailCondition[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore
  }
}

export function useTrailConditions() {
  const { actor, isFetching } = useActor(createActor);

  const query = useQuery<TrailCondition[]>({
    queryKey: ["trailConditions"],
    queryFn: async () => {
      const cached = readCache();
      if (cached) return cached;
      if (!actor) return [];
      const result = await actor.getAllTrailConditions();
      writeCache(result);
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: CACHE_TTL_MS,
  });

  function getCondition(slug: string): TrailCondition | null {
    return query.data?.find((c) => c.trekSlug === slug) ?? null;
  }

  return { getCondition, isLoading: query.isLoading };
}
