import { allSeoTagsForProduct } from "@/lib/product-seo";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface SeoTagCloudProps {
  name: string;
  slug: string;
  state: string;
  difficulty?: string;
  duration?: number;
  type?: "trek" | "yatra";
  relatedSlugs?: string[];
  relatedNames?: string[];
}

function makeSearchUrl(tag: string, type: "trek" | "yatra" = "trek"): string {
  const base = type === "trek" ? "/treks" : "/yatras";
  return `${base}?tag=${encodeURIComponent(tag)}`;
}

export default function SeoTagCloud({
  name,
  slug,
  state,
  difficulty,
  duration,
  type = "trek",
  relatedSlugs = [],
  relatedNames = [],
}: SeoTagCloudProps) {
  const year = new Date().getFullYear();
  const stateLabel =
    state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const basePath = type === "trek" ? "/treks" : "/yatras";

  // Build tag list dynamically
  const tags: Array<{ label: string; href: string }> = [];

  for (const curated of allSeoTagsForProduct(slug, type).slice(0, 12)) {
    tags.push({
      label: curated,
      href: makeSearchUrl(curated, type),
    });
  }

  const addSearch = (label: string) =>
    tags.push({ label, href: makeSearchUrl(label, type) });
  const addPage = (label: string, href: string) => tags.push({ label, href });

  if (type === "trek") {
    addSearch(name);
    addSearch(`${name} ${year}`);
    addSearch(`${name} ${year + 1}`);
    addSearch(`${name} from Delhi`);
    addSearch(`${name} Package`);
    addSearch(`Best Treks in ${stateLabel}`);
    addSearch(`${stateLabel} Adventure Treks`);
    if (difficulty) addSearch(`${difficulty} Treks India`);
    addSearch("Summer Treks India 2026");
    addSearch("5000m Altitude Treks");
    if (duration) addSearch(`${duration} Days Trek`);
    addSearch("Himalayan Treks India");
    addSearch("Trek Packages from Delhi");
    addSearch("Trekora Reviews");
    addSearch("Certified Mountain Guide Treks");
    addSearch("Safe Himalayan Treks");
    addSearch("Small Group Treks India");
    addSearch("Uttarakhand Treks");
    addSearch("Himachal Pradesh Treks");
    addSearch("Snow Treks India");
    addSearch("Weekend Treks from Delhi");
    addSearch("Adventure Tourism India");
    addSearch("Trek Packages 2026");
    // Difficulty-specific
    addSearch("Beginner Treks Himalaya");
    addSearch("Family Treks India");
    // Popular treks cross-links
    addPage("Roopkund Trek", "/treks/roopkund-trek");
    addPage("Kedarkantha Trek", "/treks/kedarkantha-trek");
    addPage("Valley of Flowers Trek", "/treks/valley-of-flowers");
    addPage("Hampta Pass Trek", "/treks/hampta-pass");
    addPage("Chopta Tungnath Trek", "/treks/chopta-tungnath");
    addPage("Deoriatal Chandrashila Trek", "/treks/deoriatal-chandrashila");
    addPage("Hemkund Sahib Trek", "/yatras/hemkund-sahib-yatra");
    addPage("Triund Trek", "/treks/triund-trek");
    addPage("Har Ki Dun Trek", "/treks/har-ki-dun");
    // Related treks
    relatedNames.forEach((rName, i) => {
      if (relatedSlugs[i]) {
        addPage(rName, `${basePath}/${relatedSlugs[i]}`);
      }
    });
  } else {
    // Yatra tags
    addSearch(name);
    addSearch(`${name} ${year}`);
    addSearch(`${name} ${year + 1}`);
    addSearch(`${name} Package`);
    addSearch(`Best Yatras in ${stateLabel}`);
    addSearch(`${stateLabel} Pilgrimage`);
    addSearch("Himalayan Yatra 2026");
    addSearch("Spiritual Trek India");
    addSearch("Sacred Pilgrimage India");
    addSearch("Char Dham Yatra");
    addSearch("Uttarakhand Pilgrimage");
    addSearch("Himachal Pilgrimage");
    addSearch("Hindu Pilgrimage India");
    addSearch("Sikh Pilgrimage India");
    addSearch("Pilgrimage Packages 2026");
    addSearch("Trekora Yatra Reviews");
    addSearch("VIP Darshan Yatra");
    addSearch("Group Pilgrimage India");
    addSearch("Senior Friendly Yatra");
    addSearch("Helicopter Yatra Packages");
    addPage("Hemkund Sahib Yatra", "/yatras/hemkund-sahib-yatra");
    addPage("Valley of Flowers Trek", "/treks/valley-of-flowers");
    // Popular yatras cross-links
    addPage("Char Dham Yatra", "/yatras/char-dham-yatra");
    addPage("Kedarnath Yatra", "/yatras/kedarnath-yatra");
    addPage("Badrinath Yatra", "/yatras/badrinath-yatra");
    addPage("Hemkund Sahib Yatra", "/yatras/hemkund-sahib-yatra");
    addPage("Panch Kedar Yatra", "/yatras/panch-kedar-yatra");
    addPage("Mani Mahesh Yatra", "/yatras/mani-mahesh-yatra");
    // Related yatras
    relatedNames.forEach((rName, i) => {
      if (relatedSlugs[i]) {
        addPage(rName, `${basePath}/${relatedSlugs[i]}`);
      }
    });
  }

  // Deduplicate by href
  const seen = new Set<string>();
  const uniqueTags = tags.filter(({ href }) => {
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });

  const [expanded, setExpanded] = useState(false);
  const MOBILE_MAX = 15;

  const displayTags =
    !expanded && uniqueTags.length > MOBILE_MAX
      ? uniqueTags.slice(0, MOBILE_MAX)
      : uniqueTags;
  const hasMore = uniqueTags.length > MOBILE_MAX;

  return (
    <section
      style={{
        backgroundColor: "#F5F5F5",
        borderTop: "1px solid #EBEBEB",
      }}
      aria-label={`Explore more ${type === "trek" ? "treks" : "yatras"}`}
    >
      <div className="container mx-auto px-8 py-8">
        <p
          className="text-[13px] uppercase tracking-wider mb-4"
          style={{ color: "#888888" }}
        >
          Explore More —{" "}
          <span>
            {stateLabel} {type === "trek" ? "Treks" : "Yatras"} &amp; Packages
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          {displayTags.map(({ label, href }) => (
            <Link
              key={`${label}-${href}`}
              to={href as "/"}
              className="inline-block text-[11px] px-[10px] py-[4px] rounded-full no-underline transition-colors duration-150"
              style={{
                border: "1px solid #C0001C",
                color: "#C0001C",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.backgroundColor = "#C0001C";
                t.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget as HTMLAnchorElement;
                t.style.backgroundColor = "transparent";
                t.style.color = "#C0001C";
              }}
              data-ocid={`seo_tag_cloud.tag.${slug}`}
            >
              {label}
            </Link>
          ))}
          {hasMore && !expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-block text-[11px] px-[10px] py-[4px] rounded-full transition-colors duration-150 cursor-pointer"
              style={{ border: "1px solid #888", color: "#888" }}
              data-ocid="seo_tag_cloud.expand_button"
            >
              +{uniqueTags.length - MOBILE_MAX} more
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
