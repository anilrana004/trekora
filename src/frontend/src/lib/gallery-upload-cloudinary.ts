import type { ProductKind } from "@/lib/reviews-api";

/** Cloudinary folder for navbar Gallery page uploads only (not trek detail Photos tab). */
export function galleryPagePhotoFolder(
  productType: ProductKind,
  trekSlug: string,
): string {
  const slug = trekSlug.trim().toLowerCase();
  const kind = productType === "yatra" ? "yatras" : "treks";
  return `trekora/gallery/community/${kind}/${slug}`;
}

export function galleryPageCloudinaryTags(
  productType: ProductKind,
  trekSlug: string,
): string[] {
  return [
    "gallery-upload",
    "community-photo",
    productType,
    `slug-${trekSlug.trim().toLowerCase()}`,
  ];
}

export function galleryPageCloudinaryContext(
  trekName: string,
  trekSlug: string,
  productType: ProductKind,
): Record<string, string> {
  return {
    trek_name: trekName,
    trek_slug: trekSlug.trim().toLowerCase(),
    product_type: productType,
    upload_source: "gallery-page",
  };
}
