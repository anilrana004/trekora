import OptimizedImage from "@/components/media/OptimizedImage";
import { packageItemPath } from "@/data/curated-packages";
import type { BookableProduct } from "@/lib/booking-product";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { formatINR } from "./booking-form-shared";

function PackageBookingSummary({
  product,
  compact = false,
}: {
  product: BookableProduct;
  compact?: boolean;
}) {
  const highlightLimit = compact ? 4 : 6;
  const inclusionLimit = compact ? 4 : 6;

  return (
    <div
      className="rounded-xl p-4 space-y-3"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="booking.package.summary"
    >
      <div className="flex items-start gap-4">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          variant="thumbnail"
          width={compact ? 64 : 80}
          height={compact ? 64 : 80}
          className={`${compact ? "w-16 h-16" : "w-20 h-20"} rounded-lg flex-shrink-0`}
        />
        <div className="min-w-0 flex-1">
          {product.badge ? (
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1"
              style={{ background: "#C0001C", color: "#fff" }}
            >
              {product.badge}
            </span>
          ) : null}
          <p
            className={`font-bold ${compact ? "text-base" : "text-lg"}`}
            style={{ color: "var(--ew-text)" }}
          >
            {product.name}
          </p>
          {product.tagline ? (
            <p className="text-sm mt-0.5" style={{ color: "var(--ew-orange)" }}>
              {product.tagline}
            </p>
          ) : null}
          <p className="text-xs mt-1" style={{ color: "var(--ew-gray-dark)" }}>
            {product.duration} days
            {product.categoryLabel ? ` · ${product.categoryLabel}` : ""}
            {product.bestSeason ? ` · Best ${product.bestSeason}` : ""}
            {product.rating != null ? ` · ${product.rating} ★` : ""}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1">
            <span
              className="text-sm font-semibold"
              style={{ color: "#C0001C" }}
            >
              Rs.{formatINR(product.price)}/person
            </span>
            {product.priceWas != null && product.priceWas > product.price ? (
              <span
                className="text-xs line-through"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Rs.{formatINR(product.priceWas)}
              </span>
            ) : null}
            {product.savingsPercent != null && product.savingsPercent > 0 ? (
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                style={{ background: "#E8F5E9", color: "#2E7D32" }}
              >
                Save {product.savingsPercent}%
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {!compact && product.description ? (
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {product.description}
        </p>
      ) : null}

      {product.packageItems && product.packageItems.length > 0 ? (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1.5"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Included in this bundle
          </p>
          <div className="flex flex-wrap gap-1.5">
            {product.packageItems.map((item) => (
              <Link
                key={`${item.kind}-${item.slug}`}
                to={packageItemPath(item)}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  background: "#fff",
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                }}
              >
                <span className="uppercase tracking-wide opacity-60 mr-1">
                  {item.kind === "yatra" ? "Yatra" : "Trek"}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {product.highlights && product.highlights.length > 0 ? (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1.5"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Highlights
          </p>
          <ul className="space-y-1">
            {product.highlights.slice(0, highlightLimit).map((h) => (
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
        </div>
      ) : null}

      {product.inclusions && product.inclusions.length > 0 ? (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1.5"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Package inclusions
          </p>
          <ul className="space-y-1">
            {product.inclusions.slice(0, inclusionLimit).map((inc) => (
              <li
                key={inc}
                className="text-xs leading-snug flex items-start gap-1.5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <Check
                  size={12}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--ew-green)" }}
                  aria-hidden
                />
                {inc}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default PackageBookingSummary;
