import type { TrailCondition } from "@/backend.d.ts";
import { useTrailConditions } from "@/hooks/useTrailConditions";
import { icpTimestampNsToMs } from "@/lib/icpTimestamp";
import { AnimatePresence, motion } from "@/lib/motion";
import { useState } from "react";

// Local enum mirror — avoids importing runtime values from a .d.ts file
const Variant_closed_good_moderate_difficult = {
  good: "good",
  moderate: "moderate",
  difficult: "difficult",
  closed: "closed",
} as const;

type ConditionVariant =
  (typeof Variant_closed_good_moderate_difficult)[keyof typeof Variant_closed_good_moderate_difficult];

const CONDITION_CONFIG: Record<
  ConditionVariant,
  { label: string; color: string; dotBg: string }
> = {
  [Variant_closed_good_moderate_difficult.good]: {
    label: "Good",
    color: "var(--ew-green)",
    dotBg: "#2E7D32",
  },
  [Variant_closed_good_moderate_difficult.moderate]: {
    label: "Moderate",
    color: "#F59E0B",
    dotBg: "#F59E0B",
  },
  [Variant_closed_good_moderate_difficult.difficult]: {
    label: "Difficult",
    color: "var(--ew-red)",
    dotBg: "#C0001C",
  },
  [Variant_closed_good_moderate_difficult.closed]: {
    label: "Closed",
    color: "var(--ew-gray-dark)",
    dotBg: "#888888",
  },
};

function isStale(updatedAt: bigint): boolean {
  const updatedAtMs = icpTimestampNsToMs(updatedAt);
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1000;
  return Date.now() - updatedAtMs > fourteenDaysMs;
}

function daysSince(updatedAt: bigint): number {
  const updatedAtMs = icpTimestampNsToMs(updatedAt);
  return Math.floor((Date.now() - updatedAtMs) / (24 * 60 * 60 * 1000));
}

function formatDate(ts: bigint): string {
  return new Date(icpTimestampNsToMs(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  trekSlug: string;
  variant: "dot" | "card";
}

function TrailDot({ condition }: { condition: TrailCondition | null }) {
  const stale = condition ? isStale(condition.updatedAt) : true;
  const cfg =
    condition && !stale ? CONDITION_CONFIG[condition.condition] : null;
  const dotColor = cfg?.dotBg ?? "#888888";
  const label = cfg?.label ?? "No recent update";

  return (
    <div className="group relative" aria-label={`Trail: ${label}`}>
      <div
        className="w-3 h-3 rounded-full border-2 border-white shadow"
        style={{ background: dotColor }}
      />
      {/* Tooltip */}
      <div
        className="pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap rounded px-2 py-1 text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{ background: "rgba(0,0,0,0.75)" }}
      >
        Trail: {label}
      </div>
    </div>
  );
}

function TrailCard({ condition }: { condition: TrailCondition | null }) {
  const [open, setOpen] = useState(false);
  const stale = condition ? isStale(condition.updatedAt) : true;
  const cfg =
    condition && !stale ? CONDITION_CONFIG[condition.condition] : null;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--ew-gray-mid)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
        style={{
          backgroundColor: open ? "var(--ew-gray-lt)" : "#fff",
        }}
        data-ocid="trek_detail.trail_condition.toggle"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">🥾</span>
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--ew-text)" }}
          >
            Current Trail Conditions
          </span>
          {condition && !stale && cfg && (
            <span
              className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${cfg.dotBg}1a`,
                color: cfg.color,
                border: `1px solid ${cfg.dotBg}55`,
              }}
            >
              {cfg.label}
            </span>
          )}
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          style={{
            color: "var(--ew-gray-dark)",
            transform: open ? "rotate(90deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path
            d="M6 12l4-4-4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-3 border-t space-y-2"
              style={{ borderColor: "var(--ew-gray-mid)" }}
            >
              {!condition || stale ? (
                <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                  {condition && stale
                    ? `No recent update — last updated ${daysSince(condition.updatedAt)} days ago.`
                    : "No recent trail update available."}
                </p>
              ) : (
                <>
                  {condition.notes && (
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {condition.notes}
                    </p>
                  )}
                  <div
                    className="flex flex-wrap gap-4 text-xs"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    <span>
                      Updated:{" "}
                      <strong style={{ color: "var(--ew-text)" }}>
                        {formatDate(condition.updatedAt)}
                      </strong>
                    </span>
                    <span>
                      Valid until:{" "}
                      <strong style={{ color: "var(--ew-text)" }}>
                        {formatDate(condition.validUntil)}
                      </strong>
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TrailConditionBadge({ trekSlug, variant }: Props) {
  const { getCondition } = useTrailConditions();
  const condition = getCondition(trekSlug);

  if (variant === "dot") return <TrailDot condition={condition} />;
  return <TrailCard condition={condition} />;
}
