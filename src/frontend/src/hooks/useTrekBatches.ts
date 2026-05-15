import { type TrekBatchPublic, createActor } from "@/backend";
import { useQuery } from "@tanstack/react-query";
import { useActor } from "@trekora/icp";

/** Shared cache key: trek detail, booking, and future UI should use this for one source of truth. */
export const trekBatchesQueryKey = (trekId: number | undefined) =>
  ["trekBatches", trekId ?? null] as const;

export function useTrekBatches(trekId: number | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<TrekBatchPublic[]>({
    queryKey: trekBatchesQueryKey(trekId),
    queryFn: async () => {
      if (!actor || trekId == null) return [];
      try {
        return await actor.getTrekBatches(BigInt(trekId));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching && trekId != null,
    staleTime: 30_000,
  });
}
