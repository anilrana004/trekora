import { Minus, Plus } from "lucide-react";

export type GroupSizeStepperProps = {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  /** Defaults to booking copy on `booking` variant, else "Group Size". */
  title?: string;
  hint?: string;
  maxLabel?: string;
  ocidPrefix: string;
  /** Booking step 1 — large +/- controls; compact — trek/yatra sidebar. */
  variant?: "booking" | "compact";
};

export default function ProductDetailGroupSizeStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  title,
  hint,
  maxLabel,
  ocidPrefix,
  variant = "compact",
}: GroupSizeStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  if (variant === "booking") {
    const heading = title ?? "How many people are joining?";
    return (
      <div data-ocid={`${ocidPrefix}.group_size`}>
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          {heading}
        </p>
        {hint ? (
          <p className="text-xs mb-3" style={{ color: "var(--ew-text-lt)" }}>
            {hint}
          </p>
        ) : null}
        <div className="flex items-center gap-4 touch-manipulation">
          <button
            type="button"
            onClick={decrement}
            disabled={atMin}
            className="booking-counter-btn touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Decrease group size"
            data-ocid={`${ocidPrefix}.group_size.decrement`}
          >
            −
          </button>
          <span
            id={`${ocidPrefix}-group-size`}
            className="text-2xl font-bold min-w-[2.5rem] text-center tabular-nums"
            style={{ color: "var(--ew-text)" }}
            aria-live="polite"
            aria-atomic="true"
          >
            {value}
          </span>
          <button
            type="button"
            onClick={increment}
            disabled={atMax}
            className="booking-counter-btn touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
            aria-label="Increase group size"
            data-ocid={`${ocidPrefix}.group_size.increment`}
          >
            +
          </button>
          <span className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {value === 1 ? "person" : "persons"}
            {max < 20 ? ` · max ${max}` : null}
          </span>
        </div>
      </div>
    );
  }

  const compactTitle = title ?? "Group Size";
  return (
    <div data-ocid={`${ocidPrefix}.group_size`}>
      <label
        htmlFor={`${ocidPrefix}-group-size`}
        className="mb-1 block text-xs font-semibold"
        style={{ color: "var(--ew-text)" }}
      >
        {compactTitle}
      </label>
      {hint ? (
        <p className="text-[11px] mb-2" style={{ color: "var(--ew-text-lt)" }}>
          {hint}
        </p>
      ) : null}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={atMin}
          className="flex h-9 w-9 items-center justify-center rounded-full font-bold transition-colors disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
          aria-label="Decrease group size"
          data-ocid={`${ocidPrefix}.group_size.decrement`}
        >
          <Minus size={16} aria-hidden />
        </button>
        <span
          id={`${ocidPrefix}-group-size`}
          className="w-8 text-center text-xl font-bold tabular-nums"
          style={{ color: "var(--ew-text)" }}
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={atMax}
          className="flex h-9 w-9 items-center justify-center rounded-full font-bold transition-colors disabled:opacity-40 disabled:pointer-events-none"
          style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
          aria-label="Increase group size"
          data-ocid={`${ocidPrefix}.group_size.increment`}
        >
          <Plus size={16} aria-hidden />
        </button>
        <span className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
          {maxLabel ?? `persons (max ${max})`}
        </span>
      </div>
    </div>
  );
}
