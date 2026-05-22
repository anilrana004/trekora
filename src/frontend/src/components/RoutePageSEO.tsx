import { SEOHead } from "@/components/SEOHead";
import { getRouteSEO } from "@/lib/route-seo";
import { useRouterState } from "@tanstack/react-router";

/** Fills SEO meta on layout routes that do not render their own `<SEOHead />`. */
export default function RoutePageSEO() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const seo = getRouteSEO(pathname);
  if (!seo) return null;

  return (
    <SEOHead
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonical={seo.canonical}
      ogImage={seo.ogImage}
      ogType={seo.ogType}
      schema={seo.schema}
      noindex={seo.noindex}
    />
  );
}
