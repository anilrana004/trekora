import { useEffect } from "react";

/**
 * Lightweight hook for programmatic SEO — sets title + description
 * without the full SEOHead component overhead.
 * Use SEOHead for structured data / OpenGraph on full pages.
 */
export function useSEO(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let el = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [title, description]);
}
