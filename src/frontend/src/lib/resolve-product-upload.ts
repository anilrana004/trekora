import { TREKS } from "@/data/treks";
import { YATRAS } from "@/data/yatras";
import type { ProductKind } from "@/lib/reviews-api";

export type ResolvedUploadProduct = {
  slug: string;
  name: string;
  type: ProductKind;
};

function normalize(input: string): string {
  return input.trim().toLowerCase();
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Match trek/yatra name or slug from free-text (gallery upload). */
export function resolveProductForUpload(input: string): ResolvedUploadProduct | null {
  const q = normalize(input);
  if (!q) return null;

  const trekBySlug = TREKS.find((t) => t.slug === q);
  if (trekBySlug) {
    return { slug: trekBySlug.slug, name: trekBySlug.name, type: "trek" };
  }

  const yatraBySlug = YATRAS.find((y) => y.slug === q);
  if (yatraBySlug) {
    return { slug: yatraBySlug.slug, name: yatraBySlug.name, type: "yatra" };
  }

  const qSlug = slugify(input);
  const trekBySlugGuess = TREKS.find((t) => t.slug === qSlug);
  if (trekBySlugGuess) {
    return { slug: trekBySlugGuess.slug, name: trekBySlugGuess.name, type: "trek" };
  }

  const yatraBySlugGuess = YATRAS.find((y) => y.slug === qSlug);
  if (yatraBySlugGuess) {
    return {
      slug: yatraBySlugGuess.slug,
      name: yatraBySlugGuess.name,
      type: "yatra",
    };
  }

  const trekByName = TREKS.find(
    (t) =>
      normalize(t.name) === q ||
      normalize(t.name).includes(q) ||
      q.includes(normalize(t.name)) ||
      t.slug.replace(/-/g, " ").includes(q),
  );
  if (trekByName) {
    return { slug: trekByName.slug, name: trekByName.name, type: "trek" };
  }

  const yatraByName = YATRAS.find(
    (y) =>
      normalize(y.name) === q ||
      normalize(y.name).includes(q) ||
      q.includes(normalize(y.name)),
  );
  if (yatraByName) {
    return { slug: yatraByName.slug, name: yatraByName.name, type: "yatra" };
  }

  if (qSlug.length >= 3) {
    return {
      slug: qSlug,
      name: input.trim(),
      type: "trek",
    };
  }

  return null;
}
