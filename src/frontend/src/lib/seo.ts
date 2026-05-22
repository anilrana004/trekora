import type { Blog } from "../data/blogs";
import { resolveBlogCardImage } from "./blog-product-images";
import type { Trek } from "../data/treks";
import type { Yatra } from "../data/yatras";
import {
  buildTrekPageSEO,
  buildYatraPageSEO,
  enrichTrekJSONLD,
  enrichYatraJSONLD,
} from "./product-seo";
import { SITE_PHONE_TEL } from "./site-contact";
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from "./site-config";

/* ── DOM helpers ── */
function setMetaTag(name: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOGTag(property: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string): void {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/* ── Core setPageMeta ── */
export interface PageMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: string;
}

export function setPageMeta(config: PageMetaConfig): void {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType = "website",
    twitterCard = "summary_large_image",
  } = config;

  document.title = title;

  setMetaTag("description", description);
  if (keywords) setMetaTag("keywords", keywords);
  setMetaTag(
    "robots",
    "index, follow, max-image-preview:large, max-snippet:-1",
  );

  const canonicalUrl = canonical ?? window.location.href;
  setLinkTag("canonical", canonicalUrl);

  // OpenGraph
  setOGTag("og:title", title);
  setOGTag("og:description", description);
  setOGTag("og:image", ogImage ?? DEFAULT_OG_IMAGE);
  setOGTag("og:url", canonicalUrl);
  setOGTag("og:type", ogType);
  setOGTag("og:locale", "en_IN");
  setOGTag("og:site_name", "Trekora");

  // Twitter Card
  setMetaTag("twitter:card", twitterCard);
  setMetaTag("twitter:title", title);
  setMetaTag("twitter:description", description);
  setMetaTag(
    "twitter:image",
    ogImage ?? DEFAULT_OG_IMAGE,
  );
}

/* ── injectJSONLD: uses unique IDs to prevent duplicates ── */
export function injectJSONLD(
  schema: Record<string, unknown>,
  id = "jsonld-schema",
): () => void {
  let scriptEl = document.getElementById(id) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = id;
    scriptEl.setAttribute("type", "application/ld+json");
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schema, null, 2);

  // Return cleanup fn
  return () => {
    const el = document.getElementById(id);
    if (el) el.remove();
  };
}

/* ── Trek helpers ── */
export function generateTrekMeta(trek: Trek): PageMetaConfig {
  return buildTrekPageSEO(trek);
}

export function generateYatraMeta(yatra: Yatra): PageMetaConfig {
  return buildYatraPageSEO(yatra);
}

/* ── JSON-LD schema generators ── */
export function generateTrekJSONLD(trek: Trek): Record<string, unknown> {
  const year = new Date().getFullYear();
  return enrichTrekJSONLD(trek, {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trek.name,
    description: trek.description,
    provider: {
      "@type": "TravelAgency",
      name: "Trekora",
      url: SITE_ORIGIN,
      telephone: SITE_PHONE_TEL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
    },
    touristType: "Adventure Tourist",
    offers: {
      "@type": "Offer",
      price: trek.price.toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: `${year}-01-01`,
    },
    ...(trek.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: trek.rating.toString(),
            reviewCount: (trek.reviewCount ?? 100).toString(),
            bestRating: "5",
          },
        }
      : {}),
  });
}

export function generateYatraJSONLD(yatra: Yatra): Record<string, unknown> {
  const year = new Date().getFullYear();
  return enrichYatraJSONLD(yatra, {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "Event"],
    name: yatra.name,
    description: yatra.description || yatra.significance,
    startDate: `${year}-05-01`,
    endDate: `${year}-10-31`,
    location: {
      "@type": "Place",
      name: `${yatra.district ?? yatra.state} Himalayas, ${yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}`,
      addressCountry: "IN",
    },
    organizer: {
      "@type": "Organization",
      name: "Trekora",
      url: SITE_ORIGIN,
    },
    offers: {
      "@type": "Offer",
      price: yatra.price.toString(),
      priceCurrency: "INR",
    },
  });
}

export function generateBlogJSONLD(blog: Blog): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt ?? blog.title,
    author: {
      "@type": "Person",
      name: blog.author ?? "Trekora Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Trekora",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/logo.png`,
      },
    },
    datePublished: blog.publishedAt ?? new Date().toISOString().split("T")[0],
    image: resolveBlogCardImage(blog) ?? blog.images?.[0],
  };
}

export function generateBreadcrumbJSONLD(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${SITE_ORIGIN}${item.url}`,
        name: item.name,
      },
    })),
  };
}

export function generateFAQJSONLD(
  faqs: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
