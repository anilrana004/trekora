import type { ReactNode } from "react";

export default function ProductDetailBookingSidebarHeader({
  price,
  priceLabel = "Starting from",
  perPersonLabel = "/ person",
  children,
}: {
  price: number;
  priceLabel?: string;
  perPersonLabel?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="px-5 py-4"
      style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
    >
      <p
        className="text-xs font-medium"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        {priceLabel}
      </p>
      <div className="flex items-end gap-2">
        <span
          className="text-3xl font-bold"
          style={{ color: "var(--ew-orange)" }}
        >
          ₹{price.toLocaleString("en-IN")}
        </span>
        <span
          className="mb-0.5 text-sm"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {perPersonLabel}
        </span>
      </div>
      {children}
    </div>
  );
}
