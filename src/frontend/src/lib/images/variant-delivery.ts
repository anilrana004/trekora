import type { ImageDeliveryOptions } from "./cloudinary-url";

/** Variants that ship with tuned Cloudinary delivery (see `VARIANT_IMAGE_DELIVERY`). */
export type DeliverableImageVariant =
  | "trek-card"
  | "yatra-card"
  | "destination"
  | "hero"
  | "gallery-thumb"
  | "gallery-full"
  | "banner-strip"
  | "brand-logo";

/** Smart crop + high quality for listing cards (treks & yatras). */
const LISTING_CARD_16X9: ImageDeliveryOptions = {
  crop: "c_fill,ar_16:9,g_auto",
  quality: "q_90",
};

/** Gallery thumbs and grid cells (4:3). */
const GALLERY_4X3: ImageDeliveryOptions = {
  crop: "c_fill,ar_4:3,g_auto",
  quality: "q_90",
};

/** Large feature strips on home / detail heroes. */
const FEATURE_16X9: ImageDeliveryOptions = {
  crop: "c_fill,ar_16:9,g_auto",
  quality: "q_92",
};

const VARIANT_IMAGE_DELIVERY: Partial<
  Record<DeliverableImageVariant, ImageDeliveryOptions>
> = {
  "trek-card": LISTING_CARD_16X9,
  "yatra-card": LISTING_CARD_16X9,
  destination: { crop: "c_fill,ar_4:3,g_auto", quality: "q_88" },
  hero: FEATURE_16X9,
  "gallery-thumb": GALLERY_4X3,
  "gallery-full": { crop: "c_limit", quality: "q_90" },
  "banner-strip": { crop: "c_fill,ar_3:1,g_auto", quality: "q_88" },
  "brand-logo": { crop: "c_limit", format: "f_png", quality: "q_95" },
};

export function getVariantImageDelivery(
  variant: string,
  overrides?: ImageDeliveryOptions,
): ImageDeliveryOptions {
  const base =
    VARIANT_IMAGE_DELIVERY[variant as DeliverableImageVariant];
  if (!base && !overrides) return {};
  return { ...base, ...overrides };
}

/** Parse `ar_16:9` / `ar_4:3` from a Cloudinary crop chain for remote fallbacks. */
export function aspectRatioFromCrop(
  crop?: string,
): { w: number; h: number } | null {
  if (!crop) return null;
  const m = crop.match(/ar_(\d+):(\d+)/);
  if (!m) return null;
  return { w: Number(m[1]), h: Number(m[2]) };
}
