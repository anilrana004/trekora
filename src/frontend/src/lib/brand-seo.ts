import { buildHomePageSEO } from "@/lib/product-seo";
import { SITE_LOGO_URL } from "@/lib/site-brand";
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from "@/lib/site-config";
import { SITE_EMAIL, SITE_GEO, SITE_PHONE_TEL } from "@/lib/site-contact";

/** Absolute brand asset URLs for favicons, schema.org, and social crawlers. */
export const BRAND_LOGO_URL = SITE_LOGO_URL;
export const BRAND_LOGO_IMAGE_OBJECT = {
  "@type": "ImageObject" as const,
  url: BRAND_LOGO_URL,
  width: 512,
  height: 512,
};

export const SITE_SAME_AS = [
  "https://www.instagram.com/trekora/",
  "https://www.facebook.com/trekora",
  "https://www.youtube.com/c/trekora",
] as const;

/** Primary indexable sections — supports Google sitelinks via internal linking + schema. */
export const PRIMARY_SITE_NAV = [
  { name: "Himalayan Treks", path: "/treks" },
  { name: "Sacred Yatras", path: "/yatras" },
  { name: "Trek & Yatra Packages", path: "/packages" },
  { name: "Travel Blog", path: "/blog" },
  { name: "Destinations", path: "/destinations" },
  { name: "Upcoming Trek Batches", path: "/upcoming-batches" },
  { name: "Contact Us", path: "/contact" },
  { name: "About Trekora", path: "/about" },
] as const;

/** Static homepage meta (mirrors `buildHomePageSEO` for index.html + SPA). */
export const HOME_PAGE_META = buildHomePageSEO();

export function generateHomePageSchema(): Record<string, unknown>[] {
  const siteSearchTarget = `${SITE_ORIGIN}/treks?filter={search_term_string}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Trekora",
      url: SITE_ORIGIN,
      logo: BRAND_LOGO_IMAGE_OBJECT,
      image: BRAND_LOGO_URL,
      description:
        "Expert-led Himalayan treks and sacred yatras in Uttarakhand, Himachal Pradesh, Kashmir, Ladakh, and across India.",
      telephone: SITE_PHONE_TEL,
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "15 Rajpur Road",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        postalCode: "248001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_GEO.lat,
        longitude: SITE_GEO.lng,
      },
      areaServed: [
        { "@type": "State", name: "Uttarakhand" },
        { "@type": "State", name: "Himachal Pradesh" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: [...SITE_SAME_AS],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: "Trekora",
      legalName: "Trekora",
      url: SITE_ORIGIN,
      logo: BRAND_LOGO_IMAGE_OBJECT,
      description:
        "Trekora is a Himalayan adventure travel company offering guided treks, yatras, expeditions, and curated packages.",
      telephone: SITE_PHONE_TEL,
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
      sameAs: [...SITE_SAME_AS],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_PHONE_TEL,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      name: "Trekora",
      url: SITE_ORIGIN,
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: siteSearchTarget,
        },
        "query-input": "required name=search_term_string",
      },
      hasPart: PRIMARY_SITE_NAV.map((link, index) => ({
        "@type": "WebPage",
        position: index + 1,
        name: link.name,
        url: `${SITE_ORIGIN}${link.path}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Explore Trekora",
      itemListElement: PRIMARY_SITE_NAV.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: link.name,
        url: `${SITE_ORIGIN}${link.path}`,
      })),
    },
  ];
}
