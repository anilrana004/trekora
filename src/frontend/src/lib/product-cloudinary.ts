import type { ProductKind } from "@/lib/reviews-api";

function safeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Official trek/yatra gallery folder: trekora/treks/{slug} or trekora/yatras/{slug} */
export function productPhotoFolder(
  productType: ProductKind,
  trekSlug: string,
): string {
  const segment = productType === "yatra" ? "yatras" : "treks";
  return `trekora/${segment}/${safeSlug(trekSlug) || "general"}`;
}

export function productCloudinaryTags(
  productType: ProductKind,
  trekSlug: string,
): string[] {
  return [
    "trekora-product",
    productType,
    `slug-${safeSlug(trekSlug)}`,
    "product-gallery",
  ];
}

export function productCloudinaryContext(
  trekName: string,
  trekSlug: string,
  productType: ProductKind,
): Record<string, string> {
  return {
    alt: trekName,
    trek_name: trekName.slice(0, 120),
    trek_slug: safeSlug(trekSlug),
    product_type: productType,
  };
}
