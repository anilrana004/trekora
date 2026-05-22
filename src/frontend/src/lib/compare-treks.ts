import { TREKS, type Trek } from "../data/treks";

/** Normalize legacy numeric ids and slugs to a trek slug for compare storage. */
export function normalizeCompareKey(key: string): string {
  const byId = TREKS.find((t) => String(t.id) === key);
  if (byId) return byId.slug;
  const bySlug = TREKS.find((t) => t.slug === key);
  if (bySlug) return bySlug.slug;
  return key;
}

export function resolveCompareTrek(key: string): Trek | undefined {
  const slug = normalizeCompareKey(key);
  return TREKS.find((t) => t.slug === slug);
}

export function resolveCompareTreks(keys: string[]): Trek[] {
  const seen = new Set<string>();
  const out: Trek[] = [];
  for (const key of keys) {
    const trek = resolveCompareTrek(key);
    if (!trek || seen.has(trek.slug)) continue;
    seen.add(trek.slug);
    out.push(trek);
  }
  return out;
}

export function compareKeysEqual(a: string, b: string): boolean {
  return normalizeCompareKey(a) === normalizeCompareKey(b);
}
