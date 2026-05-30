import type { ProductKind } from "@/lib/reviews-api";

/** Cloudinary folder: trekora/reviews/treks/{slug} or trekora/reviews/yatras/{slug} */
export function reviewCloudinaryFolder(
  productType: ProductKind,
  trekSlug: string,
): string {
  const safe = trekSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const segment = productType === "yatra" ? "yatras" : "treks";
  return `trekora/reviews/${segment}/${safe || "general"}`;
}

export function reviewCloudinaryTags(
  productType: ProductKind,
  trekSlug: string,
): string[] {
  const safe = trekSlug.trim().toLowerCase();
  return ["trekora-review", productType, `slug-${safe}`, "community-gallery"];
}

export function reviewCloudinaryContext(
  trekName: string,
  trekSlug: string,
  productType: ProductKind,
): Record<string, string> {
  return {
    alt: trekName,
    trek_name: trekName.slice(0, 120),
    trek_slug: trekSlug.trim().toLowerCase(),
    product_type: productType,
  };
}
