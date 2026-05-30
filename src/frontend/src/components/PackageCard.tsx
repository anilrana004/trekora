import {
  type CuratedPackage,
  packageBookParams,
  packageItemLabel,
  packageItemPath,
} from "@/data/curated-packages";
import { bookSearch } from "@/lib/book-search";
import { Link } from "@tanstack/react-router";
import { Check, ChevronRight, Clock, MapPin } from "lucide-react";
import OptimizedImage from "./media/OptimizedImage";

const TIER_LABEL: Record<CuratedPackage["tier"], string> = {
  explorer: "Explorer",
  adventurer: "Adventurer",
  summit: "Summit",
};

type PackageCardProps = {
  pkg: CuratedPackage;
  index?: number;
  featured?: boolean;
};

function stateLabel(s: "uttarakhand" | "himachal"): string {
  return s === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
}

export default function PackageCard({
  pkg,
  index,
  featured = false,
}: PackageCardProps) {
  const mi = index !== undefined ? `.${index + 1}` : "";
  const book = packageBookParams(pkg);
  const visibleItems = featured ? pkg.items : pkg.items.slice(0, 2);
  const extraCount = pkg.items.length - visibleItems.length;

  return (
    <div
      className={`flex flex-col h-full min-h-0 ${featured ? "package-card--featured" : ""}`}
      data-ocid={`package.curated${mi}`}
    >
      <div
        className={`package-card__media relative h-52 w-full overflow-hidden shrink-0 ${featured ? "md:h-full md:min-h-[280px]" : ""}`}
      >
        <OptimizedImage
          src={pkg.image}
          alt={pkg.name}
          fill
          variant="trek-card"
          priority={featured || (index !== undefined && index < 3)}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white max-w-[55%] truncate z-[2]"
          style={{ backgroundColor: "var(--ew-red)" }}
        >
          {pkg.badge ?? "Combo package"}
        </span>
        <span
          className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full max-w-[42%] truncate z-[2]"
          style={{
            backgroundColor: "var(--ew-red-lt)",
            color: "var(--ew-red)",
          }}
        >
          {pkg.savingsPercent > 0
            ? `Save ${pkg.savingsPercent}%`
            : pkg.states.map(stateLabel).join(" · ")}
        </span>
        <span
          className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white z-[2]"
          style={{ background: "rgba(0, 0, 0, 0.55)" }}
        >
          {TIER_LABEL[pkg.tier]} tier
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 min-w-0 bg-white">
        <h3
          className={`font-bold mb-1 ${featured ? "text-xl md:text-2xl" : "text-lg"}`}
          style={{ color: "var(--ew-text)" }}
        >
          {pkg.name}
        </h3>
        <p className="package-card__tagline mb-2">{pkg.tagline}</p>
        <p
          className={`text-sm mb-3 ${featured ? "line-clamp-3" : "line-clamp-2"}`}
          style={{ color: "var(--ew-text-lt)" }}
        >
          {pkg.description}
        </p>

        <div
          className="flex flex-wrap gap-1.5 mb-3"
          aria-label="Included treks and yatras"
        >
          {visibleItems.map((item) => (
            <Link
              key={`${item.kind}-${item.slug}`}
              to={packageItemPath(item)}
              className="package-card__chip truncate max-w-full"
            >
              <span className="uppercase tracking-wide text-[10px] opacity-70 mr-1">
                {item.kind === "yatra" ? "Yatra" : "Trek"}
              </span>
              {packageItemLabel(item)}
            </Link>
          ))}
          {extraCount > 0 ? (
            <span className="package-card__chip" style={{ cursor: "default" }}>
              +{extraCount} more
            </span>
          ) : null}
        </div>

        {featured ? (
          <ul className="space-y-1.5 mb-3 hidden sm:block">
            {pkg.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="text-xs leading-snug flex items-start gap-1.5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <Check
                  size={12}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--ew-green)" }}
                  aria-hidden
                />
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div
          className="flex items-center gap-4 text-xs mb-3"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <span className="flex items-center gap-1 shrink-0">
            <Clock size={12} aria-hidden />
            {pkg.durationDays} Days
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPin size={12} className="shrink-0" aria-hidden />
            <span className="truncate">
              {pkg.states.map(stateLabel).join(" · ")}
            </span>
          </span>
        </div>

        <p
          className="text-[11px] mb-3 truncate"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          {pkg.rating} ★ · {pkg.reviewCount.toLocaleString("en-IN")} reviews ·
          Best {pkg.bestSeason}
        </p>

        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pt-3 border-t mt-auto"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          <div className="min-w-0">
            <span
              className="text-xs block"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Bundle from
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span
                className="font-bold text-lg"
                style={{ color: "var(--ew-orange)" }}
              >
                ₹{pkg.priceFrom.toLocaleString("en-IN")}
              </span>
              <span
                className="text-sm line-through"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                ₹{pkg.priceWas.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
          <Link
            to="/book"
            search={bookSearch(book)}
            className={`btn-secondary text-sm shrink-0 inline-flex items-center gap-1 justify-center ${featured ? "" : "w-full sm:w-auto"}`}
            data-ocid={`package.book_curated${mi}`}
          >
            Book Package <ChevronRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
