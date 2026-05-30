import { TREKS } from "./treks";
import { YATRAS } from "./yatras";

/** Trek / yatra reels for detail pages and homepage cross-reference. */
export type TrekReel = {
  id: number;
  title: string;
  /** Still image preview — only for image-only reels (no videoSrc). */
  thumb?: string;
  duration?: string;
  /** Cloudinary or remote MP4 — plays inline in the reel card. */
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
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779185838/wdablwezwc8bwagf8bkw.mp4",
    },
  ],
  "kedarnath-trek": [
    {
      id: 1,
      title: "Kedarnath Trek",
      productSlug: "kedarnath-trek",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779186008/ulp8j1ohcab8qjck7uo5.mp4",
    },
  ],
  "valley-of-flowers": [
    {
      id: 1,
      title: "Valley of Flowers",
      productSlug: "valley-of-flowers",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779185206/dkp7hd4xivfyjbix1nyn.mp4",
    },
  ],
  "hampta-pass": [
    {
      id: 1,
      title: "Hampta Pass",
      productSlug: "hampta-pass",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779185656/yzu9e7smczz1sxw38djo.mp4",
    },
  ],
  "chandratal-lake": [
    {
      id: 1,
      title: "Chandratal Lake",
      productSlug: "chandratal-lake",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779185402/esk3h3zvxvsuizbaxhpy.mp4",
    },
  ],
  "triund-trek": [
    {
      id: 1,
      title: "Triund Trek",
      productSlug: "triund-trek",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779183604/vaoartvqoifelbzsvxkq.mp4",
    },
  ],
  "brahmatal-trek": [
    {
      id: 1,
      title: "Brahmatal Winter Trek",
      productSlug: "brahmatal-trek",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779302126/xcfjofztgf2xzuxzhizp.mp4",
    },
  ],
  "chopta-tungnath": [
    {
      id: 1,
      title: "Chopta Tungnath Chandrashila Trek",
      productSlug: "chopta-tungnath",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779337312/ghb8cqlmfnsrrebbxmwq.mp4",
    },
  ],
  "har-ki-dun": [
    {
      id: 1,
      title: "Har Ki Dun Trek",
      productSlug: "har-ki-dun",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779338356/mii8qpwwpswn9yforlqd.mp4",
    },
  ],
  "kedarkantha-trek": [
    {
      id: 1,
      title: "Kedarkantha Trek",
      productSlug: "kedarkantha-trek",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779338751/fjhlqcpouo9g9o2jo0nt.mp4",
    },
  ],
  "dayara-bugyal": [
    {
      id: 1,
      title: "Dayara Bugyal Trek",
      productSlug: "dayara-bugyal",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779339015/hdnkkbhtjasrkg9fk9vk.mp4",
    },
  ],
  "rupin-pass": [
    {
      id: 1,
      title: "Rupin Pass Trek",
      productSlug: "rupin-pass",
      productType: "trek",
      videoSrc:
        "https://res.cloudinary.com/ddbcauxef/video/upload/v1779339748/xqygw0fzutgxjnykzyde.mp4",
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
