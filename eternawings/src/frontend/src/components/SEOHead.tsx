import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOGMeta(property: string, content: string) {
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

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  schema,
  noindex,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta(
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    );

    const canonicalUrl = canonical || window.location.href;
    setLink("canonical", canonicalUrl);

    // OpenGraph
    setOGMeta("og:title", title);
    setOGMeta("og:description", description);
    setOGMeta("og:image", ogImage || "https://www.trekora.com/og-default.jpg");
    setOGMeta("og:url", canonicalUrl);
    setOGMeta("og:type", ogType);
    setOGMeta("og:locale", "en_IN");
    setOGMeta("og:site_name", "Trekora");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta(
      "twitter:image",
      ogImage || "https://www.trekora.com/og-default.jpg",
    );

    // JSON-LD
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      let scriptEl = document.getElementById("jsonld-schema");
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.id = "jsonld-schema";
        scriptEl.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(
        schemas.length === 1 ? schemas[0] : schemas,
      );
    }

    return () => {
      const scriptEl = document.getElementById("jsonld-schema");
      if (scriptEl) scriptEl.remove();
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    schema,
    noindex,
  ]);

  return null;
}
