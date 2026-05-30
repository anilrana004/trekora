import type { GalleryItem } from "@/data/gallery";
import { parsePhotoCredit } from "@/lib/photo-credit";
import type { GalleryApiItem, ProductKind } from "@/lib/reviews-api";

/** Gallery shows only trekker-uploaded photos (not official trek/yatra catalog images). */
export const COMMUNITY_GALLERY_SOURCES = new Set<GalleryApiItem["source"]>([
  "product",
  "review",
]);

export const COMMUNITY_GALLERY_FILTERS = ["All", "Treks", "Yatras"] as const;
export type CommunityGalleryFilter = (typeof COMMUNITY_GALLERY_FILTERS)[number];

export function isCommunityGalleryItem(item: GalleryApiItem): boolean {
  if (!item.src?.includes("cloudinary.com")) return false;
  if (!item.trekSlug?.trim() || !item.trekName?.trim()) return false;
  if (item.source && !COMMUNITY_GALLERY_SOURCES.has(item.source)) return false;
  const { name } = parsePhotoCredit(item.credit ?? "");
  if (!name || name.toLowerCase().includes("cloudinary")) return false;
  return true;
}

export function filterCommunityGalleryItems(
  items: GalleryApiItem[],
): GalleryApiItem[] {
  return items.filter(isCommunityGalleryItem);
}

function stableNumericId(apiId: string): number {
  let h = 0;
  for (let i = 0; i < apiId.length; i += 1) {
    h = (Math.imul(31, h) + apiId.charCodeAt(i)) | 0;
  }
  return Math.abs(h) || 1;
}

export function mapCommunityItemToGallery(
  item: GalleryApiItem,
): GalleryItem | null {
  if (!isCommunityGalleryItem(item)) return null;

  const productLabel =
    item.subtitle ?? (item.type === "yatra" ? "Yatra" : "Trek");
  const category =
    item.type === "yatra" ? ("Yatras" as const) : ("Treks" as const);

  return {
    id: stableNumericId(item.id),
    apiId: item.id,
    src: item.src,
    title: item.trekName,
    category,
    credit: item.credit,
    trekName: item.trekName,
    trekSlug: item.trekSlug,
    productType: item.type,
    productLabel,
    isCommunityPhoto: true,
    createdAt: item.createdAt,
  };
}

export function communityItemsToGallery(
  items: GalleryApiItem[],
): GalleryItem[] {
  const out: GalleryItem[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const mapped = mapCommunityItemToGallery(item);
    if (!mapped?.src || seen.has(mapped.src)) continue;
    seen.add(mapped.src);
    out.push(mapped);
  }
  return out;
}

export function filterGalleryByTab(
  items: GalleryItem[],
  tab: CommunityGalleryFilter,
): GalleryItem[] {
  if (tab === "All") return items;
  if (tab === "Treks") {
    return items.filter(
      (i) => i.productType === "trek" || i.category === "Treks",
    );
  }
  return items.filter(
    (i) => i.productType === "yatra" || i.category === "Yatras",
  );
}

export function galleryUploaderLabel(credit: string): {
  name: string;
  when: string;
} {
  return parsePhotoCredit(credit);
}

export function buildOptimisticGalleryItems(params: {
  assets: { secureUrl: string; publicId: string }[];
  trekSlug: string;
  trekName: string;
  productType: ProductKind;
  credit: string;
}): GalleryApiItem[] {
  const label = params.productType === "yatra" ? "Yatra" : "Trek";
  const ts = Date.now();
  return params.assets.map((asset, i) => ({
    id: `optimistic-gallery-${ts}-${i}`,
    src: asset.secureUrl,
    title: params.trekName,
    subtitle: label,
    category: params.productType === "yatra" ? "Yatras" : "Treks",
    credit: `Photo by ${params.credit}`,
    trekSlug: params.trekSlug,
    trekName: params.trekName,
    type: params.productType,
    source: "product",
    reviewId: "",
    createdAt: new Date().toISOString(),
    publicId: asset.publicId,
  }));
}
