import { TREKS } from "@/data/treks";
import { YATRAS } from "@/data/yatras";
import type { ProductKind } from "@/lib/reviews-api";

export type ProductNameOption = {
  slug: string;
  name: string;
  type: ProductKind;
  /** Lowercase blob for fast search (name, slug, state, tags, …). */
  searchText: string;
};

function buildSearchText(parts: (string | undefined)[]): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Every trek and yatra — sorted A–Z. */
export const PRODUCT_NAME_OPTIONS: ProductNameOption[] = [
  ...TREKS.map((t) => ({
    slug: t.slug,
    name: t.name,
    type: "trek" as const,
    searchText: buildSearchText([
      t.name,
      t.slug,
      t.slug.replace(/-/g, " "),
      t.state,
      t.category,
      t.region,
      t.startPoint,
      t.endPoint,
      t.difficulty,
      t.bestSeason,
      ...(t.tags ?? []),
      "trek",
    ]),
  })),
  ...YATRAS.map((y) => ({
    slug: y.slug,
    name: y.name,
    type: "yatra" as const,
    searchText: buildSearchText([
      y.name,
      y.slug,
      y.slug.replace(/-/g, " "),
      y.state,
      y.district,
      y.startPoint,
      ...(y.tags ?? []),
      ...(y.deities ?? []),
      "yatra",
    ]),
  })),
].sort((a, b) => a.name.localeCompare(b.name, "en"));

export const PRODUCT_NAME_TOTAL = PRODUCT_NAME_OPTIONS.length;
export const PRODUCT_TREK_COUNT = PRODUCT_NAME_OPTIONS.filter(
  (o) => o.type === "trek",
).length;
export const PRODUCT_YATRA_COUNT = PRODUCT_NAME_OPTIONS.filter(
  (o) => o.type === "yatra",
).length;

/** Shortcuts when the field is empty (featured treks + popular yatras). */
export const PRODUCT_NAME_QUICK_PICKS: ProductNameOption[] = (() => {
  const featuredSlugs = new Set(
    TREKS.filter((t) => t.isFeatured).map((t) => t.slug),
  );
  const picks: ProductNameOption[] = [];
  for (const opt of PRODUCT_NAME_OPTIONS) {
    if (opt.type === "trek" && featuredSlugs.has(opt.slug)) picks.push(opt);
  }
  let yatraPicks = 0;
  for (const opt of PRODUCT_NAME_OPTIONS) {
    if (opt.type === "yatra" && yatraPicks < 3) {
      picks.push(opt);
      yatraPicks += 1;
    }
    if (picks.length >= 8) break;
  }
  if (picks.length < 8) {
    for (const opt of PRODUCT_NAME_OPTIONS) {
      if (!picks.some((p) => p.slug === opt.slug && p.type === opt.type)) {
        picks.push(opt);
      }
      if (picks.length >= 8) break;
    }
  }
  return picks.slice(0, 8);
})();

function normalizeQuery(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Score how well an option matches the query (higher = better). */
function scoreOption(opt: ProductNameOption, q: string): number {
  if (!q) return 0;

  const name = opt.name.toLowerCase();
  const slug = opt.slug.toLowerCase();
  const slugSpaced = slug.replace(/-/g, " ");
  const words = name.split(/\s+/).filter(Boolean);
  const acronym = words.map((w) => w[0]).join("");

  if (name === q) return 1000;
  if (slug === q || slugSpaced === q) return 980;
  if (name.startsWith(q)) return 920;
  if (words.some((w) => w.startsWith(q))) return 880;
  if (acronym.startsWith(q)) return 860;
  if (slug.startsWith(q.replace(/\s+/g, "-"))) return 840;

  const tokens = q.split(" ").filter(Boolean);
  if (
    tokens.length > 1 &&
    tokens.every((t) => name.includes(t) || opt.searchText.includes(t))
  ) {
    return 780;
  }

  if (name.includes(q)) return 720;
  if (slug.includes(q.replace(/\s+/g, "-"))) return 680;
  if (slugSpaced.includes(q)) return 660;
  if (opt.searchText.includes(q)) return 620;

  if (tokens.length > 1) {
    const allTokens = tokens.every(
      (t) =>
        name.includes(t) ||
        slug.includes(t) ||
        opt.searchText.includes(t),
    );
    if (allTokens) return 580;
  }

  return 0;
}

export type ProductNameSearchResult = {
  /** Empty query → quick picks; typed query → all matches (every trek/yatra eligible). */
  items: ProductNameOption[];
  query: string;
  isEmptyQuery: boolean;
  totalCatalog: number;
};

/**
 * Phone-style search: type to narrow the full catalog (all treks + yatras).
 * Empty query returns quick picks only — not the entire scrollable list.
 */
export function searchProductNameOptions(query: string): ProductNameSearchResult {
  const q = normalizeQuery(query);
  const totalCatalog = PRODUCT_NAME_TOTAL;

  if (!q) {
    return {
      items: PRODUCT_NAME_QUICK_PICKS,
      query: q,
      isEmptyQuery: true,
      totalCatalog,
    };
  }

  const items = PRODUCT_NAME_OPTIONS.map((opt) => ({
    opt,
    score: scoreOption(opt, q),
  }))
    .filter((x) => x.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.opt.name.localeCompare(b.opt.name, "en"),
    )
    .map((x) => x.opt);

  return {
    items,
    query: q,
    isEmptyQuery: false,
    totalCatalog,
  };
}

/** @deprecated Use searchProductNameOptions */
export function filterProductNameOptions(
  query: string,
  _limit?: number,
): ProductNameOption[] {
  return searchProductNameOptions(query).items;
}

/** Highlight matched substring in a product name. */
export function highlightProductName(
  name: string,
  query: string,
): { before: string; match: string; after: string } | null {
  const q = normalizeQuery(query);
  if (!q) return null;

  const lower = name.toLowerCase();
  let idx = lower.indexOf(q);
  if (idx < 0) {
    const word = q.split(" ")[0];
    if (word) {
      const wordIdx = lower.split(/\s+/).findIndex((w) => w.startsWith(word));
      if (wordIdx >= 0) {
        const parts = name.split(/\s+/);
        let offset = 0;
        for (let i = 0; i < wordIdx; i++) offset += parts[i].length + 1;
        const target = parts[wordIdx];
        const rel = target.toLowerCase().indexOf(word);
        idx = offset + rel;
        const len = word.length;
        return {
          before: name.slice(0, idx),
          match: name.slice(idx, idx + len),
          after: name.slice(idx + len),
        };
      }
    }
    return null;
  }

  return {
    before: name.slice(0, idx),
    match: name.slice(idx, idx + q.length),
    after: name.slice(idx + q.length),
  };
}
