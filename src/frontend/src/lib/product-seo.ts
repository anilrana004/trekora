import type { Trek } from "@/data/treks";
import { TREKS } from "@/data/treks";
import type { Yatra } from "@/data/yatras";
import { YATRAS } from "@/data/yatras";
import {
  GALLERY_SEO_TAGS,
  HIGH_CONVERSION_SEO_KEYWORDS,
  LONG_TAIL_SEO_KEYWORDS,
  type ProductSEOProfile,
  TREKORA_BRAND_KEYWORDS,
  TREK_SEO_BY_SLUG,
  YATRA_SEO_BY_SLUG,
} from "@/lib/product-seo-taxonomy";
import type { PageMetaConfig } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site-config";

export type { ProductSEOProfile } from "@/lib/product-seo-taxonomy";
export {
  ACTIVITY_SEO_TAGS,
  GALLERY_SEO_TAGS,
  GEO_SEO_TAGS,
  HIGH_CONVERSION_SEO_KEYWORDS,
  LONG_TAIL_SEO_KEYWORDS,
  PACKAGE_SEO_PROFILES,
  SEASONAL_SEO_TAGS,
  TREKORA_BRAND_KEYWORDS,
  TREK_SEO_BY_SLUG,
  YATRA_SEO_BY_SLUG,
} from "@/lib/product-seo-taxonomy";

const CURRENT_YEAR = new Date().getFullYear();

/** Google sitelink candidate treks — cross-linked across SEO surfaces. */
export const SITELINK_CANDIDATE_TREK_SLUGS = [
  "valley-of-flowers",
  "kedarkantha-trek",
  "chopta-tungnath",
  "deoriatal-chandrashila",
  "hampta-pass",
] as const;

const SITELINK_CANDIDATE_SLUG_SET = new Set<string>(
  SITELINK_CANDIDATE_TREK_SLUGS,
);

/** Priority Google sitelink destinations — Valley of Flowers + Hemkund Sahib. */
export const PRIORITY_SITELINK_DESTINATIONS = [
  {
    label: "Valley of Flowers Trek",
    path: "/treks/valley-of-flowers",
    kind: "trek" as const,
    slug: "valley-of-flowers",
  },
  {
    label: "Hemkund Sahib Trek",
    path: "/yatras/hemkund-sahib-yatra",
    kind: "yatra" as const,
    slug: "hemkund-sahib-yatra",
  },
] as const;

const PRIORITY_SITELINK_TREK_SLUG = "valley-of-flowers";
const PRIORITY_SITELINK_YATRA_SLUG = "hemkund-sahib-yatra";

function normalizeTag(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Join keywords for meta tag (comma-separated, capped length). */
export function formatMetaKeywords(parts: string[], maxLen = 320): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of parts) {
    const k = raw.trim();
    if (!k) continue;
    const key = k.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(k);
    if (out.join(", ").length > maxLen) break;
  }
  return out.join(", ").slice(0, maxLen);
}

export function getTrekSEOProfile(slug: string): ProductSEOProfile | undefined {
  return TREK_SEO_BY_SLUG[slug];
}

export function getYatraSEOProfile(
  slug: string,
): ProductSEOProfile | undefined {
  return YATRA_SEO_BY_SLUG[slug];
}

function inferSeasonFromBestSeason(bestSeason: string): string[] {
  const s = bestSeason.toLowerCase();
  const seasons: string[] = [];
  if (/dec|jan|feb|mar|apr|winter|snow/.test(s)) seasons.push("winter");
  if (/may|jun|jul|aug|sum/.test(s)) seasons.push("summer");
  if (/jul|aug|sep|monsoon|rain/.test(s)) seasons.push("monsoon");
  if (/sep|oct|nov|autumn/.test(s)) seasons.push("autumn");
  return seasons.length ? seasons : ["summer"];
}

function inferAltitudeCategory(altitude: number): string {
  if (altitude >= 5000) return "5000m+";
  if (altitude >= 4000) return "4000m+";
  if (altitude >= 3000) return "3000m+";
  return "high altitude";
}

/** Merge curated SEO profile with trek static fields. */
export function resolveTrekSEO(trek: Trek): ProductSEOProfile {
  const curated = getTrekSEOProfile(trek.slug);
  const stateLabel =
    trek.state === "uttarakhand" ? "uttarakhand" : "himachal pradesh";
  const baseTags = [
    trek.slug.replace(/-/g, " "),
    `${trek.name.toLowerCase()} trek`,
    `${stateLabel} trek`,
    "himalayan trek",
    trek.category.toLowerCase(),
    ...inferSeasonFromBestSeason(trek.bestSeason).map((s) => `${s} trek`),
  ];
  const baseKeywords = [
    `${trek.slug.replace(/-/g, " ")} package`,
    `${trek.name.toLowerCase()} trek booking`,
    `${trek.name.toLowerCase()} trek ${CURRENT_YEAR}`,
    "trekora trekking",
    "trekora booking",
  ];

  return {
    slug: trek.slug,
    tags: [...new Set([...(curated?.tags ?? []), ...baseTags])],
    seoKeywords: [
      ...new Set([...(curated?.seoKeywords ?? []), ...baseKeywords]),
    ],
    difficulty: curated?.difficulty ?? trek.difficulty,
    season: curated?.season ?? inferSeasonFromBestSeason(trek.bestSeason),
    activities: curated?.activities ?? ["trekking", "camping"],
    terrain: curated?.terrain ?? [trek.trekType.toLowerCase()],
    states: curated?.states ?? [stateLabel],
    altitudeCategory:
      curated?.altitudeCategory ?? inferAltitudeCategory(trek.altitude),
    experienceType: curated?.experienceType ?? [trek.difficulty.toLowerCase()],
    travelStyle: curated?.travelStyle ?? ["guided trekking"],
  };
}

export function resolveYatraSEO(yatra: Yatra): ProductSEOProfile {
  const curated = getYatraSEOProfile(yatra.slug);
  const stateLabel =
    yatra.state === "uttarakhand" ? "uttarakhand" : "himachal pradesh";
  const baseTags = [
    yatra.slug.replace(/-/g, " "),
    `${yatra.name.toLowerCase()} yatra`,
    `${stateLabel} pilgrimage`,
    "himalayan pilgrimage",
    "spiritual travel",
  ];
  const baseKeywords = [
    `${yatra.slug.replace(/-/g, " ")} package`,
    `${yatra.name.toLowerCase()} booking`,
    `${yatra.name.toLowerCase()} ${CURRENT_YEAR}`,
    "trekora yatra packages",
  ];

  return {
    slug: yatra.slug,
    tags: [...new Set([...(curated?.tags ?? []), ...baseTags])],
    seoKeywords: [
      ...new Set([...(curated?.seoKeywords ?? []), ...baseKeywords]),
    ],
    season: curated?.season ?? ["summer", "autumn"],
    activities: curated?.activities ?? ["spiritual tourism"],
    states: curated?.states ?? [stateLabel],
    experienceType: curated?.experienceType ?? ["pilgrimage"],
    travelStyle: curated?.travelStyle ?? ["pilgrimage tour"],
  };
}

export function buildTrekPageSEO(trek: Trek): PageMetaConfig {
  const profile = resolveTrekSEO(trek);
  const stateLabel =
    trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  if (trek.slug === PRIORITY_SITELINK_TREK_SLUG) {
    return {
      title: `Valley of Flowers Trek ${CURRENT_YEAR} | Batch Dates & Itinerary | Trekora`,
      description: `Book Valley of Flowers Trek ${CURRENT_YEAR} with Trekora. UNESCO alpine flowers, ${trek.duration}-day itinerary, Jul–Sep batches, Hemkund Sahib add-on, certified guides. From ₹${trek.price.toLocaleString("en-IN")}/person.`,
      keywords: formatMetaKeywords([
        "valley of flowers trek",
        "valley of flowers trek booking",
        `valley of flowers trek ${CURRENT_YEAR}`,
        "hemkund sahib trek",
        "unesco valley of flowers uttarakhand",
        ...profile.tags.slice(0, 8),
        ...profile.seoKeywords,
        ...TREKORA_BRAND_KEYWORDS.slice(0, 4),
      ]),
      canonical: `${SITE_ORIGIN}/treks/${trek.slug}`,
      ogImage: trek.images?.[0] ?? trek.image,
      ogType: "article",
    };
  }
  return {
    title: `${trek.name} Trek Package | Trekora`,
    description: `Book ${trek.name} with Trekora. Premium ${stateLabel} trekking — ${trek.duration} days, ${trek.altitude.toLocaleString("en-IN")}m, ${trek.difficulty} difficulty. Camping, certified guides, snowfall views & Himalayan adventures. From ₹${trek.price.toLocaleString("en-IN")}/person.`,
    keywords: formatMetaKeywords([
      ...profile.tags.slice(0, 12),
      ...profile.seoKeywords,
      ...TREKORA_BRAND_KEYWORDS.slice(0, 4),
    ]),
    canonical: `${SITE_ORIGIN}/treks/${trek.slug}`,
    ogImage: trek.images?.[0] ?? trek.image,
    ogType: "article",
  };
}

export function buildYatraPageSEO(yatra: Yatra): PageMetaConfig {
  const profile = resolveYatraSEO(yatra);
  if (yatra.slug === PRIORITY_SITELINK_YATRA_SLUG) {
    return {
      title: `Hemkund Sahib Trek ${CURRENT_YEAR} | Yatra Dates & Itinerary | Trekora`,
      description: `Book Hemkund Sahib Trek ${CURRENT_YEAR} with Trekora. World's highest gurudwara at 4,633m, ${yatra.duration}-day yatra from Govindghat, Jul–Sep batches, langar & guide support. From ₹${yatra.price.toLocaleString("en-IN")}/person.`,
      keywords: formatMetaKeywords([
        "hemkund sahib trek",
        "hemkund sahib yatra",
        `hemkund sahib trek ${CURRENT_YEAR}`,
        "valley of flowers trek",
        "hemkund sahib booking uttarakhand",
        ...profile.tags.slice(0, 8),
        ...profile.seoKeywords,
        ...TREKORA_BRAND_KEYWORDS.slice(0, 4),
      ]),
      canonical: `${SITE_ORIGIN}/yatras/${yatra.slug}`,
      ogImage: yatra.images?.[0] ?? yatra.image,
      ogType: "article",
    };
  }
  return {
    title: `${yatra.name} Package | Trekora`,
    description: `Book ${yatra.name} with Trekora. ${yatra.duration}-day sacred pilgrimage — accommodation, meals, darshan support & certified spiritual guide. From ₹${yatra.price.toLocaleString("en-IN")}/person.`,
    keywords: formatMetaKeywords([
      ...profile.tags.slice(0, 12),
      ...profile.seoKeywords,
      ...TREKORA_BRAND_KEYWORDS.slice(0, 4),
    ]),
    canonical: `${SITE_ORIGIN}/yatras/${yatra.slug}`,
    ogImage: yatra.images?.[0] ?? yatra.image,
    ogType: "article",
  };
}

export function buildListingSEO(type: "trek" | "yatra"): PageMetaConfig {
  if (type === "yatra") {
    return {
      title: `Himalayan Yatra Packages ${CURRENT_YEAR} | Char Dham & Pilgrimage | Trekora`,
      description:
        "Book sacred Himalayan yatras with Trekora — Kedarnath, Badrinath, Char Dham and more. VIP darshan, meals, guides & trusted pilgrimage packages.",
      keywords: formatMetaKeywords([
        ...(YATRA_SEO_BY_SLUG["kedarnath-yatra"]?.seoKeywords ?? []),
        ...HIGH_CONVERSION_SEO_KEYWORDS.slice(0, 8),
        ...TREKORA_BRAND_KEYWORDS,
      ]),
      canonical: `${SITE_ORIGIN}/yatras`,
    };
  }
  return {
    title: `Himalayan Trek Packages ${CURRENT_YEAR} | Uttarakhand & Himachal | Trekora`,
    description:
      "Browse 40+ guided Himalayan treks — Kedarkantha, Valley of Flowers, Roopkund, Hampta Pass & more. Book premium trekking packages with Trekora.",
    keywords: formatMetaKeywords([
      ...LONG_TAIL_SEO_KEYWORDS.slice(0, 10),
      ...HIGH_CONVERSION_SEO_KEYWORDS.slice(0, 8),
      ...TREKORA_BRAND_KEYWORDS,
    ]),
    canonical: `${SITE_ORIGIN}/treks`,
  };
}

export function buildGalleryPageSEO(): PageMetaConfig {
  return {
    title: "Trekora Gallery | Himalayan Trek & Yatra Photos",
    description:
      "Browse trekker-shared photos from Himalayan treks and yatras — every image tagged with the trek or yatra name and the traveller who uploaded it.",
    keywords: formatMetaKeywords([
      ...GALLERY_SEO_TAGS,
      ...TREKORA_BRAND_KEYWORDS,
    ]),
    canonical: `${SITE_ORIGIN}/gallery`,
  };
}

export function buildHomePageSEO(): PageMetaConfig {
  return {
    title: "Trekora | Himalayan Trek & Yatra Packages — Book Online",
    description:
      "Trekora is a live Himalayan travel agency for guided treks, sacred yatras, and curated packages in Uttarakhand, Himachal Pradesh, and India. Certified guides, fixed departures, book online.",
    keywords: formatMetaKeywords([
      ...TREKORA_BRAND_KEYWORDS,
      ...HIGH_CONVERSION_SEO_KEYWORDS,
      ...LONG_TAIL_SEO_KEYWORDS.slice(0, 8),
    ]),
    canonical: SITE_ORIGIN,
  };
}

export function buildReviewsPageSEO(): PageMetaConfig {
  return {
    title: "Trekora Reviews | Himalayan Trek & Yatra Ratings",
    description:
      "Read verified Trekora reviews from 2,400+ Himalayan trekkers and yatra pilgrims. Google ratings, trekker stories, and real feedback on guided treks across India.",
    keywords: formatMetaKeywords([
      "Trekora reviews",
      "Himalayan trek reviews",
      "trekora google reviews",
      "trek operator reviews India",
      ...TREKORA_BRAND_KEYWORDS.slice(0, 4),
    ]),
    canonical: `${SITE_ORIGIN}/reviews`,
  };
}

/** Score overlap between two SEO profiles (for recommendations). */
function seoOverlapScore(a: ProductSEOProfile, b: ProductSEOProfile): number {
  const tagA = new Set(a.tags.map(normalizeTag));
  let score = 0;
  for (const t of b.tags) {
    if (tagA.has(normalizeTag(t))) score += 3;
  }
  if (a.states?.[0] && b.states?.[0] && a.states[0] === b.states[0]) score += 2;
  if (a.difficulty && b.difficulty && a.difficulty === b.difficulty) score += 1;
  const seasonA = new Set(a.season ?? []);
  for (const s of b.season ?? []) {
    if (seasonA.has(s)) score += 2;
  }
  return score;
}

export function getRelatedTreks(trek: Trek, limit = 4): Trek[] {
  const profile = resolveTrekSEO(trek);
  const boostSitelinkPeers = SITELINK_CANDIDATE_SLUG_SET.has(trek.slug);
  const boostValleyPeer =
    trek.state === "uttarakhand" || trek.slug === PRIORITY_SITELINK_TREK_SLUG;
  return TREKS.filter((t) => t.slug !== trek.slug && t.isActive)
    .map((t) => {
      let score = seoOverlapScore(profile, resolveTrekSEO(t));
      if (boostSitelinkPeers && SITELINK_CANDIDATE_SLUG_SET.has(t.slug)) {
        score += 12;
      }
      if (boostValleyPeer && t.slug === PRIORITY_SITELINK_TREK_SLUG) {
        score += 15;
      }
      return { trek: t, score };
    })
    .sort((a, b) => b.score - a.score || b.trek.rating - a.trek.rating)
    .slice(0, limit)
    .map(({ trek: t }) => t);
}

export function getRelatedYatras(yatra: Yatra, limit = 3): Yatra[] {
  const profile = resolveYatraSEO(yatra);
  const boostHemkundPeer =
    yatra.state === "uttarakhand" ||
    yatra.slug === PRIORITY_SITELINK_YATRA_SLUG;
  return YATRAS.filter((y) => y.slug !== yatra.slug && y.isActive)
    .map((y) => {
      let score = seoOverlapScore(profile, resolveYatraSEO(y));
      if (boostHemkundPeer && y.slug === PRIORITY_SITELINK_YATRA_SLUG) {
        score += 15;
      }
      return { yatra: y, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || (b.yatra.rating ?? 0) - (a.yatra.rating ?? 0),
    )
    .slice(0, limit)
    .map(({ yatra: y }) => y);
}

/** Match trek/yatra against a search or tag filter (list pages, tag cloud links). */
export function matchesSeoTag(
  product: {
    name: string;
    slug: string;
    state: string;
    category?: string;
    bestSeason?: string;
    bestTime?: string;
    tags?: string[];
  },
  rawQuery: string,
  type: "trek" | "yatra",
): boolean {
  const q = normalizeTag(rawQuery);
  if (!q) return true;

  const profile =
    type === "trek"
      ? resolveTrekSEO(product as Trek)
      : resolveYatraSEO(product as Yatra);

  const haystack = [
    product.name,
    product.slug.replace(/-/g, " "),
    product.state,
    product.category ?? "",
    product.bestSeason ?? product.bestTime ?? "",
    ...(product.tags ?? []),
    ...profile.tags,
    ...profile.seoKeywords,
    ...(profile.activities ?? []),
    ...(profile.season ?? []),
  ]
    .map(normalizeTag)
    .join(" ");

  return (
    haystack.includes(q) ||
    q.split(" ").every((word) => haystack.includes(word))
  );
}

export function allSeoTagsForProduct(
  slug: string,
  type: "trek" | "yatra",
): string[] {
  if (type === "trek") {
    const trek = TREKS.find((t) => t.slug === slug);
    if (!trek) return [];
    const p = resolveTrekSEO(trek);
    return [...new Set([...p.tags, ...p.seoKeywords])];
  }
  const yatra = YATRAS.find((y) => y.slug === slug);
  if (!yatra) return [];
  const p = resolveYatraSEO(yatra);
  return [...new Set([...p.tags, ...p.seoKeywords])];
}

/** Tags for Mongo gallery/review enrichment (backend mirror). */
export function galleryTagsForSlug(
  slug: string,
  type: "trek" | "yatra",
): string[] {
  const productTags = allSeoTagsForProduct(slug, type).slice(0, 8);
  return [...new Set([...GALLERY_SEO_TAGS.slice(0, 4), ...productTags])];
}

export function enrichTrekJSONLD(
  trek: Trek,
  base: Record<string, unknown>,
): Record<string, unknown> {
  const profile = resolveTrekSEO(trek);
  return {
    ...base,
    keywords: formatMetaKeywords([...profile.tags, ...profile.seoKeywords]),
    itinerary: {
      "@type": "ItemList",
      name: `${trek.name} itinerary`,
      numberOfItems: trek.duration,
    },
  };
}

export function enrichYatraJSONLD(
  yatra: Yatra,
  base: Record<string, unknown>,
): Record<string, unknown> {
  const profile = resolveYatraSEO(yatra);
  return {
    ...base,
    keywords: formatMetaKeywords([...profile.tags, ...profile.seoKeywords]),
  };
}
