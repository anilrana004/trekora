import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "@trekora/icp";
import { createActor } from "../backend";
import type { TrekInput } from "../backend.d.ts";

export type { TrekInput };

export function useAdminTreks() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const invalidateTreks = () =>
    queryClient.invalidateQueries({ queryKey: ["treks"] });

  const createTrek = useMutation({
    mutationFn: async (input: TrekInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createTrek(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks,
  });

  const updateTrek = useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: TrekInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateTrek(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks,
  });

  const deleteTrek = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteTrek(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks,
  });

  const duplicateTrek = useMutation({
    mutationFn: async (input: TrekInput) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createTrek(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks,
  });

  return { createTrek, updateTrek, deleteTrek, duplicateTrek };
}
