import { TREKS } from "./treks";
import { YATRAS } from "./yatras";

/** Trek / yatra reels for detail pages and homepage cross-reference. */
export type TrekReel = {
  id: number;
  title: string;
  /** Still image preview — only for image-only reels (no videoSrc). */
  thumb?: string;
  duration?: string;
  /** Cloudflare or Cloudinary MP4 — plays inline in the reel card. */
  videoSrc?: string;
  /** Detail page slug for book / view CTA. */
  productSlug?: string;
  productType?: "trek" | "yatra";
};

export const TREK_REELS_BY_SLUG: Record<string, TrekReel[]> = {
  "roopkund-trek": [
    {
      id: 1,
      title: "Roopkund Trek",
      productSlug: "roopkund-trek",
      productType: "trek",
      thumb:
        "https://res.cloudinary.com/ddbcauxef/image/upload/v1778728594/qs0zitesubzqzagtwzee.jpg",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/roopkund.mp4",
    },
  ],
  "kedarnath-trek": [
    {
      id: 1,
      title: "Kedarnath Trek",
      productSlug: "kedarnath-trek",
      productType: "trek",
    },
  ],
  "valley-of-flowers": [
    {
      id: 1,
      title: "Valley of Flowers",
      productSlug: "valley-of-flowers",
      productType: "trek",
      videoSrc:
        "https://media.trekora.in/videos/Uttarakhand/valley%20of%20flower.mp4",
    },
  ],
  "hampta-pass": [
    {
      id: 1,
      title: "Hampta Pass",
      productSlug: "hampta-pass",
      productType: "trek",
      videoSrc:
        "https://media.trekora.in/videos/Uttarakhand/hampta%20pass.webm",
    },
  ],
  "chandratal-lake": [
    {
      id: 1,
      title: "Chandratal Lake",
      productSlug: "chandratal-lake",
      productType: "trek",
      videoSrc:
        "https://media.trekora.in/videos/Himachal%20Pardesh/chartal.mp4",
    },
  ],
  "triund-trek": [
    {
      id: 1,
      title: "Triund Trek",
      productSlug: "triund-trek",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Himachal%20Pardesh/truind.mp4",
    },
  ],
  "brahmatal-trek": [
    {
      id: 1,
      title: "Brahmatal Winter Trek",
      productSlug: "brahmatal-trek",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/bharamtal.mp4",
    },
  ],
  "chopta-tungnath": [
    {
      id: 1,
      title: "Chopta Tungnath Chandrashila Trek",
      productSlug: "chopta-tungnath",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/tungnath.mp4",
    },
  ],
  "har-ki-dun": [
    {
      id: 1,
      title: "Har Ki Dun Trek",
      productSlug: "har-ki-dun",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/harkidun.mp4",
    },
  ],
  "kedarkantha-trek": [
    {
      id: 1,
      title: "Kedarkantha Trek",
      productSlug: "kedarkantha-trek",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/kedarkantha.mp4",
    },
  ],
  "dayara-bugyal": [
    {
      id: 1,
      title: "Dayara Bugyal Trek",
      productSlug: "dayara-bugyal",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/kedarnath.webm",
    },
  ],
  "rupin-pass": [
    {
      id: 1,
      title: "Rupin Pass Trek",
      productSlug: "rupin-pass",
      productType: "trek",
      videoSrc: "https://media.trekora.in/videos/Uttarakhand/rupin%20pass.mp4",
    },
  ],
};

/** Stable key for list/lightbox (slug is unique across homepage reels). */
export function reelInstanceKey(reel: TrekReel): string {
  if (reel.productSlug)
    return `${reel.productType ?? "trek"}:${reel.productSlug}`;
  return `reel:${reel.id}`;
}

function catalogThumbForReel(reel: TrekReel): string | undefined {
  if (reel.thumb) return reel.thumb;
  if (!reel.productSlug) return undefined;
  if (reel.productType === "yatra") {
    return YATRAS.find((y) => y.slug === reel.productSlug)?.image;
  }
  return TREKS.find((t) => t.slug === reel.productSlug)?.image;
}

function enrichReel(reel: TrekReel, id: number): TrekReel {
  return {
    ...reel,
    id,
    thumb: catalogThumbForReel(reel),
  };
}

/** Adds stable ids and catalog hero thumbs for reel card previews. */
export function enrichReelsForDisplay(
  reels: TrekReel[],
  idOffset = 0,
): TrekReel[] {
  return reels.map((reel, i) => enrichReel(reel, idOffset + i + 1));
}

/** Homepage Reels & Shorts row — one reel per featured trek video (unique ids). */
export const HOMEPAGE_REELS: TrekReel[] = Object.values(
  TREK_REELS_BY_SLUG,
).flatMap((entries, slugIndex) =>
  enrichReelsForDisplay(entries, slugIndex * 10),
);

/** Reel MP4 for homepage hero, dest grid, feature strips, and cards (phone). */
export function homeTrekReelVideo(trekSlug: string): string | undefined {
  return TREK_REELS_BY_SLUG[trekSlug]?.[0]?.videoSrc;
}
