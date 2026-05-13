import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://eternawings.com",
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `https://eternawings.com${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center flex-wrap gap-1 py-2.5 px-0 text-xs"
        style={{ color: "var(--ew-gray-dark)" }}
        data-ocid="breadcrumb.nav"
      >
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-[color:var(--ew-red)] transition-colors"
          style={{ textDecoration: "none", color: "var(--ew-text-lt)" }}
          data-ocid="breadcrumb.home_link"
        >
          <Home size={11} aria-hidden="true" />
          Home
        </Link>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={item.label} className="flex items-center gap-1">
              <ChevronRight size={11} aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className="font-medium"
                  style={{
                    color: isLast ? "var(--ew-red)" : "var(--ew-text-lt)",
                  }}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-[color:var(--ew-red)] transition-colors"
                  style={{ textDecoration: "none", color: "var(--ew-text-lt)" }}
                >
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
