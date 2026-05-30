import { BLOGS } from "@/data/blogs";
import { resolveBlogCardImage } from "@/lib/blog-product-images";
import { TREKS } from "@/data/treks";
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from "@/lib/site-config";
import {
  generateBlogJSONLD,
  generateBreadcrumbJSONLD,
  generateDestinationDistrictPlaceJSONLD,
  generateDestinationStatePlaceJSONLD,
  generateDestinationsIndexPlaceJSONLD,
  generateTrekJSONLD,
} from "@/lib/seo";
import type { Blog } from "@/data/blogs";

const CURRENT_YEAR = new Date().getFullYear();

export { SITE_ORIGIN, DEFAULT_OG_IMAGE };

export interface RouteSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

const STATE_LABELS: Record<string, string> = {
  uttarakhand: "Uttarakhand",
  himachal: "Himachal Pradesh",
  "himachal-pradesh": "Himachal Pradesh",
};

function stateLabel(slug: string): string {
  return STATE_LABELS[slug] ?? slug.replace(/-/g, " ");
}

/** Routes that already render `<SEOHead />` on the page component. */
export function routeHasOwnSEOHead(pathname: string): boolean {
  if (
    pathname === "/" ||
    pathname === "/treks" ||
    pathname === "/yatras" ||
    pathname === "/gallery" ||
    pathname === "/about" ||
    pathname === "/blog" ||
    pathname === "/contact" ||
    pathname === "/corporate" ||
    pathname === "/packages" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/book"
  ) {
    return true;
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "treks" && parts.length === 2 && parts[1] !== "state") {
    return true;
  }
  if (parts[0] === "yatras" && parts.length === 2) {
    return true;
  }
  if (parts[0] === "blog" && parts.length === 2) {
    return true;
  }

  return false;
}

export function getRouteSEO(pathname: string): RouteSEOConfig | null {
  if (routeHasOwnSEOHead(pathname)) return null;

  const canonical = `${SITE_ORIGIN}${pathname === "/" ? "" : pathname}`;

  const staticRoutes: Record<string, RouteSEOConfig> = {
    "/about": {
      title: "About Trekora | Himalayan Trekking & Yatra Experts",
      description:
        "Meet Trekora — certified mountain guides, safety-first operations, and community-focused trekking across Uttarakhand and Himachal Pradesh since day one.",
      keywords:
        "about Trekora, Himalayan trekking company, trek guides India, Uttarakhand trek operator",
      canonical: `${SITE_ORIGIN}/about`,
    },
    "/blog": {
      title: "Trekora Blog | Trek Guides, Yatra Tips & Himalayan Travel",
      description:
        "Expert trekking guides, yatra insights, gear lists, and destination stories from Trekora's Himalayan team.",
      keywords:
        "trek blog, Himalayan travel tips, trekking guides India, yatra blog",
      canonical: `${SITE_ORIGIN}/blog`,
    },
    "/contact": {
      title: "Contact Trekora | Book Treks & Yatras",
      description:
        "Call, WhatsApp, or email Trekora to plan your Himalayan trek or sacred yatra. Expert advisors available 7 days a week.",
      keywords: "contact Trekora, book Himalayan trek, trek enquiry India",
      canonical: `${SITE_ORIGIN}/contact`,
    },
    "/corporate": {
      title: "Corporate Trekking | Team Outings with Trekora",
      description:
        "Custom corporate trekking and team-building retreats in the Himalayas. Safety-certified guides and end-to-end logistics.",
      keywords: "corporate trekking India, team outing Himalayas, corporate retreat trek",
      canonical: `${SITE_ORIGIN}/corporate`,
    },
    "/packages": {
      title: "Curated Trek & Yatra Combo Packages | Trekora",
      description:
        "Book exclusive Himalayan combo packages — Char Dham + Valley of Flowers, Panch Kedar + trek, Hampta + Chandratal, and more. Real treks & yatras, bundle savings.",
      keywords:
        "Himalayan combo package, Char Dham trek package, trek yatra bundle India, Trekora curated packages",
      canonical: `${SITE_ORIGIN}/packages`,
    },
    "/upcoming-batches": {
      title: "Upcoming Trek Batches | Trekora",
      description:
        "See upcoming fixed-departure trek batches across Uttarakhand and Himachal Pradesh. Limited seats — book early.",
      keywords: "upcoming trek batches, fixed departure treks, Himalayan trek dates",
      canonical: `${SITE_ORIGIN}/upcoming-batches`,
    },
    "/press": {
      title: "Press & Media | Trekora",
      description:
        "Trekora in the news — press coverage, media kit, and featured stories about Himalayan trekking and yatras.",
      keywords: "Trekora press, trekking media coverage, Himalayan trek news",
      canonical: `${SITE_ORIGIN}/press`,
    },
    "/compare": {
      title: "Compare Treks | Trekora",
      description:
        "Compare Himalayan treks side by side — duration, difficulty, altitude, price, and best season.",
      keywords: "compare treks, trek comparison India, Himalayan trek planner",
      canonical: `${SITE_ORIGIN}/compare`,
    },
    "/destinations": {
      title: "Trek Destinations in India | Trekora",
      description:
        "Explore trek destinations across Uttarakhand and Himachal Pradesh — districts, trails, and curated experiences.",
      keywords: "trek destinations India, Uttarakhand treks, Himachal trekking",
      canonical: `${SITE_ORIGIN}/destinations`,
      schema: [
        generateDestinationsIndexPlaceJSONLD(),
        generateBreadcrumbJSONLD([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" },
        ]),
      ],
    },
    "/book": {
      title: "Book Your Trek | Trekora",
      description: "Complete your Trekora trek or yatra booking securely online.",
      canonical: `${SITE_ORIGIN}/book`,
      noindex: true,
    },
    "/dashboard": {
      title: "My Dashboard | Trekora",
      description:
        "View your Trekora bookings, referrals, and trek history in your personal dashboard.",
      canonical: `${SITE_ORIGIN}/dashboard`,
      noindex: true,
    },
  };

  if (staticRoutes[pathname]) {
    return { ogImage: DEFAULT_OG_IMAGE, ...staticRoutes[pathname] };
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const blog = BLOGS.find((b) => b.slug === blogMatch[1]);
    if (!blog) return null;
    return getBlogDetailSEO(blog);
  }

  const trekkerMatch = pathname.match(/^\/trekkers\/([^/]+)$/);
  if (trekkerMatch) {
    const code = trekkerMatch[1];
    return {
      title: `Trekker Profile @${code} | Trekora`,
      description: `Community trekker profile on Trekora — referrals, badges, and Himalayan trek history.`,
      keywords: "Trekora trekker profile, referral trek, community trekking",
      canonical: `${SITE_ORIGIN}/trekkers/${code}`,
      ogImage: DEFAULT_OG_IMAGE,
      noindex: true,
    };
  }

  const stateHubMatch = pathname.match(/^\/treks\/state\/([^/]+)$/);
  if (stateHubMatch) {
    const label = stateLabel(stateHubMatch[1]);
    return {
      title: `${label} Treks ${CURRENT_YEAR} | Trekora`,
      description: `Discover guided treks in ${label} with Trekora — certified guides, fixed batches, and all-inclusive packages.`,
      keywords: `${label} treks, Himalayan trekking ${label}, book trek ${label}`,
      canonical: `${SITE_ORIGIN}${pathname}`,
      ogImage: DEFAULT_OG_IMAGE,
    };
  }

  const trekSubMatch = pathname.match(
    /^\/treks\/([^/]+)\/(best-time|packing-list|difficulty-guide|altitude-profile)$/,
  );
  if (trekSubMatch) {
    const trek = TREKS.find((t) => t.slug === trekSubMatch[1]);
    if (!trek) return null;
    const sub = trekSubMatch[2];
    const configs: Record<string, Omit<RouteSEOConfig, "canonical">> = {
      "best-time": {
        title: `Best Time to Trek ${trek.name} | Trekora`,
        description: `Month-by-month guide to the best season for ${trek.name} — weather, trail status, crowds, and expert tips.`,
        keywords: `${trek.name} best time, when to trek ${trek.name}, ${trek.name} season`,
      },
      "packing-list": {
        title: `Packing List for ${trek.name} | Trekora`,
        description: `Complete packing checklist for ${trek.name} — clothing, gear, documents, and essentials by season.`,
        keywords: `${trek.name} packing list, trek gear list, what to pack ${trek.name}`,
      },
      "difficulty-guide": {
        title: `Difficulty Guide — ${trek.name} | Trekora`,
        description: `Fitness level, trail grade, and preparation guide for ${trek.name} (${trek.difficulty} difficulty).`,
        keywords: `${trek.name} difficulty, ${trek.difficulty} trek fitness, ${trek.name} preparation`,
      },
      "altitude-profile": {
        title: `Altitude Profile — ${trek.name} | Trekora`,
        description: `Day-by-day altitude profile for ${trek.name} — max altitude ${trek.altitude.toLocaleString()}m and acclimatization tips.`,
        keywords: `${trek.name} altitude, ${trek.name} elevation profile, high altitude trek`,
      },
    };
    const cfg = configs[sub];
    return {
      ...cfg,
      canonical: `${SITE_ORIGIN}${pathname}`,
      ogImage: trek.image || DEFAULT_OG_IMAGE,
      schema: generateTrekJSONLD(trek),
    };
  }

  const destStateMatch = pathname.match(/^\/destinations\/([^/]+)$/);
  if (destStateMatch) {
    const label = stateLabel(destStateMatch[1]);
    return {
      title: `Treks in ${label} | Trekora Destinations`,
      description: `Explore trekking districts and trails in ${label} with Trekora.`,
      keywords: `${label} trekking, trek destinations ${label}`,
      canonical: `${SITE_ORIGIN}${pathname}`,
      ogImage: DEFAULT_OG_IMAGE,
      schema: [
        generateDestinationStatePlaceJSONLD(label),
        generateBreadcrumbJSONLD([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" },
          { name: label, url: pathname },
        ]),
      ],
    };
  }

  const destDistrictMatch = pathname.match(/^\/destinations\/([^/]+)\/([^/]+)$/);
  if (destDistrictMatch) {
    const district = destDistrictMatch[2].replace(/-/g, " ");
    const state = stateLabel(destDistrictMatch[1]);
    const districtTitle =
      district.charAt(0).toUpperCase() + district.slice(1);
    return {
      title: `${districtTitle} Treks, ${state} | Trekora`,
      description: `Trekking experiences in ${districtTitle}, ${state} — curated routes, guides, and packages from Trekora.`,
      keywords: `${districtTitle} trek, trekking ${districtTitle} ${state}`,
      canonical: `${SITE_ORIGIN}${pathname}`,
      ogImage: DEFAULT_OG_IMAGE,
      schema: [
        generateDestinationDistrictPlaceJSONLD(districtTitle, state),
        generateBreadcrumbJSONLD([
          { name: "Home", url: "/" },
          { name: "Destinations", url: "/destinations" },
          {
            name: state,
            url: `/destinations/${destDistrictMatch[1]}`,
          },
          { name: districtTitle, url: pathname },
        ]),
      ],
    };
  }

  return null;
}

/** Shared blog article SEO for RoutePageSEO and BlogDetailPage. */
export function getBlogDetailSEO(blog: Blog): RouteSEOConfig {
  return {
    title: `${blog.title} | Trekora Blog`,
    description: blog.excerpt,
    keywords: blog.tags.join(", "),
    canonical: `${SITE_ORIGIN}/blog/${blog.slug}`,
    ogImage: resolveBlogCardImage(blog) || DEFAULT_OG_IMAGE,
    ogType: "article",
    schema: [
      generateBlogJSONLD(blog),
      generateBreadcrumbJSONLD([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: blog.title, url: `/blog/${blog.slug}` },
      ]),
    ],
  };
}

export const NOT_FOUND_SEO: RouteSEOConfig = {
  title: "Page Not Found | Trekora",
  description: "The page you are looking for does not exist. Browse treks, yatras, and destinations on Trekora.",
  canonical: SITE_ORIGIN,
  noindex: true,
};

export const ERROR_PAGE_SEO: RouteSEOConfig = {
  title: "Something Went Wrong | Trekora",
  description: "An unexpected error occurred. Return to Trekora to browse Himalayan treks and yatras.",
  canonical: SITE_ORIGIN,
  noindex: true,
};
