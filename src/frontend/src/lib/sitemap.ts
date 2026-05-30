import { BLOGS } from "../data/blogs";
import {
  DESTINATIONS,
  DESTINATION_DISTRICTS_PATH_SLUG,
  DESTINATION_STATE_SLUGS,
} from "../data/destinations";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";
import {
  HIGH_CONVERSION_SEO_KEYWORDS,
  TREK_SEO_BY_SLUG,
  YATRA_SEO_BY_SLUG,
} from "./product-seo-taxonomy";

export interface SitemapEntry {
  url: string;
  priority: number;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

const STATE_HUB_SLUGS = ["uttarakhand", "himachal"] as const;
const DESTINATION_STATE_PAGES = Object.values(DESTINATION_STATE_SLUGS);

const TREK_SEO_SUFFIXES = [
  "packing-list",
  "best-time",
  "difficulty-guide",
  "altitude-profile",
] as const;

export function generateSitemapData(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
    { url: "/", priority: 1.0, changefreq: "daily" },
    { url: "/treks", priority: 0.9, changefreq: "weekly" },
    { url: "/yatras", priority: 0.9, changefreq: "weekly" },
    { url: "/destinations", priority: 0.8, changefreq: "monthly" },
    { url: "/blog", priority: 0.8, changefreq: "weekly" },
    { url: "/gallery", priority: 0.7, changefreq: "weekly" },
    { url: "/about", priority: 0.6, changefreq: "monthly" },
    { url: "/contact", priority: 0.6, changefreq: "monthly" },
    { url: "/corporate", priority: 0.6, changefreq: "monthly" },
    { url: "/packages", priority: 0.7, changefreq: "weekly" },
    { url: "/upcoming-batches", priority: 0.8, changefreq: "daily" },
    { url: "/press", priority: 0.5, changefreq: "monthly" },
    { url: "/compare", priority: 0.6, changefreq: "weekly" },
    { url: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
    { url: "/terms-and-conditions", priority: 0.3, changefreq: "yearly" },
  ];

  const stateHubPages: SitemapEntry[] = STATE_HUB_SLUGS.map((state) => ({
    url: `/treks/state/${state}`,
    priority: 0.75,
    changefreq: "weekly",
  }));

  const destinationStatePages: SitemapEntry[] = DESTINATION_STATE_PAGES.map(
    (stateSlug) => ({
      url: `/destinations/${stateSlug}`,
      priority: 0.7,
      changefreq: "weekly",
    }),
  );

  /**
   * Legacy destination district pages still exist and redirect to treks/yatras.
   * Keeping them in the sitemap helps capture long-tail links safely.
   */
  const destinationLegacyDistrictPages: SitemapEntry[] = DESTINATIONS.map(
    (d) => ({
      url: `/destinations/${DESTINATION_DISTRICTS_PATH_SLUG}/${d.slug}`,
      priority: 0.35,
      changefreq: "monthly",
    }),
  );

  const activeTreks = TREKS.filter((t) => t.isActive);

  const trekPages: SitemapEntry[] = activeTreks.flatMap((t) => [
    { url: `/treks/${t.slug}`, priority: 0.9, changefreq: "weekly" },
    ...TREK_SEO_SUFFIXES.map((suffix) => ({
      url: `/treks/${t.slug}/${suffix}`,
      priority: 0.7,
      changefreq: "monthly" as const,
    })),
  ]);

  const yatraPages: SitemapEntry[] = YATRAS.filter((y) => y.isActive).map(
    (y) => ({
      url: `/yatras/${y.slug}`,
      priority: 0.9,
      changefreq: "weekly",
    }),
  );

  const blogPages: SitemapEntry[] = BLOGS.filter((b) => b.isPublished).map(
    (b) => ({
      url: `/blog/${b.slug}`,
      priority: 0.75,
      changefreq: "weekly",
    }),
  );

  return [
    ...staticPages,
    ...stateHubPages,
    ...destinationStatePages,
    ...destinationLegacyDistrictPages,
    ...trekPages,
    ...yatraPages,
    ...blogPages,
    ...generateSeoTagDiscoveryEntries(),
  ];
}

/**
 * High-value tag filter URLs for crawlers (listing pages with `?tag=`).
 * Keeps count bounded; pairs with matchesSeoTag on /treks and /yatras.
 */
export function generateSeoTagDiscoveryEntries(): SitemapEntry[] {
  const trekTags = Object.values(TREK_SEO_BY_SLUG).flatMap((p) =>
    p.tags.slice(0, 3),
  );
  const yatraTags = Object.values(YATRA_SEO_BY_SLUG).flatMap((p) =>
    p.tags.slice(0, 2),
  );
  const conversion = HIGH_CONVERSION_SEO_KEYWORDS.slice(0, 5);

  const encode = (tag: string) => encodeURIComponent(tag.trim().toLowerCase());

  const trekEntries: SitemapEntry[] = [...new Set(trekTags)].map((tag) => ({
    url: `/treks?tag=${encode(tag)}`,
    priority: 0.55,
    changefreq: "weekly" as const,
  }));

  const yatraEntries: SitemapEntry[] = [...new Set(yatraTags)].map((tag) => ({
    url: `/yatras?tag=${encode(tag)}`,
    priority: 0.55,
    changefreq: "weekly" as const,
  }));

  const brandEntries: SitemapEntry[] = conversion.map((tag) => ({
    url: `/treks?tag=${encode(tag)}`,
    priority: 0.5,
    changefreq: "monthly" as const,
  }));

  return [...trekEntries, ...yatraEntries, ...brandEntries];
}
