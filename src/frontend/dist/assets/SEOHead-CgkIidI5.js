import { r as reactExports } from "./router-Bky4FFc7.js";
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setOGMeta(property, content) {
  let el = document.querySelector(
    `meta[property="${property}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  schema,
  noindex
}) {
  reactExports.useEffect(() => {
    document.title = title;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta(
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );
    const canonicalUrl = canonical || window.location.href;
    setLink("canonical", canonicalUrl);
    setOGMeta("og:title", title);
    setOGMeta("og:description", description);
    setOGMeta(
      "og:image",
      ogImage || "https://www.eternawings.com/og-default.jpg"
    );
    setOGMeta("og:url", canonicalUrl);
    setOGMeta("og:type", ogType);
    setOGMeta("og:locale", "en_IN");
    setOGMeta("og:site_name", "EternaWings");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta(
      "twitter:image",
      ogImage || "https://www.eternawings.com/og-default.jpg"
    );
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
        schemas.length === 1 ? schemas[0] : schemas
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
    noindex
  ]);
  return null;
}
export {
  SEOHead as S
};
