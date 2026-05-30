import { Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useId, useState } from "react";
import type { TrekDifficulty } from "../data/treks";

const DIFFICULTIES: TrekDifficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme",
];

const DURATION_OPTIONS = [
  { label: "Any Duration", value: "all" },
  { label: "1–3 Days", value: "1-3" },
  { label: "4–6 Days", value: "4-6" },
  { label: "7–10 Days", value: "7-10" },
  { label: "10+ Days", value: "10+" },
] as const;

const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "duration", label: "Duration" },
] as const;

export type TreksSortValue = (typeof SORT_OPTIONS)[number]["value"];

const inputRing = {
  border: "1px solid var(--ew-gray-mid)",
  color: "var(--ew-text)",
  "--tw-ring-color": "var(--ew-red)",
} as React.CSSProperties;

export interface TreksListingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  difficultyFilter: TrekDifficulty | "all";
  onDifficultyChange: (value: TrekDifficulty | "all") => void;
  durationFilter: string;
  onDurationChange: (value: string) => void;
  sort: TreksSortValue;
  onSortChange: (value: TreksSortValue) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  destinationHub?: { name: string };
}

export default function TreksListingFilters({
  search,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
  durationFilter,
  onDurationChange,
  sort,
  onSortChange,
  hasActiveFilters,
  onClearFilters,
  destinationHub,
}: TreksListingFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelId = useId();

  const refineCount = [
    difficultyFilter !== "all",
    durationFilter !== "all",
    search.trim() !== "",
  ].filter(Boolean).length;

  return (
    <div className="listing-sticky-toolbar__filters">
      {/* Mobile: compact bar — filters hidden until requested */}
      <div className="listing-filters-mobile-bar lg:hidden">
        <div className="listing-filters-mobile-bar__inner">
          <button
            type="button"
            className="listing-filters-toggle flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden"
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => setMobileOpen((o) => !o)}
            data-ocid="treks.filters_toggle"
          >
            <SlidersHorizontal size={14} className="shrink-0" aria-hidden />
            <span className="truncate font-semibold">
              {mobileOpen ? "Hide filters" : "Search & filters"}
            </span>
            {refineCount > 0 ? (
              <span
                className="listing-filters-toggle__badge shrink-0"
                aria-hidden
              >
                {refineCount}
              </span>
            ) : null}
          </button>
          <label className="listing-filters-sort-compact shrink-0 flex flex-col gap-0 lg:gap-0.5">
            <span
              className="text-[9px] font-semibold leading-none lg:sr-only lg:text-[10px]"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as TreksSortValue)}
              className="listing-filters-sort-select w-full rounded-md border bg-white focus:outline-none focus:ring-2"
              style={inputRing}
              aria-label="Sort treks"
              data-ocid="treks.sort.select"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Filter fields — collapsed on mobile, always visible lg+ */}
      <div
        id={panelId}
        className={`listing-filters-panel${mobileOpen ? " listing-filters-panel--open" : ""}`}
      >
        <div className="listing-filters-panel__inner">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 lg:gap-1.5 lg:py-1 sm:justify-between">
            <div className="flex w-full flex-1 flex-wrap items-center justify-center gap-2 min-[480px]:w-auto">
              <div className="relative min-w-0 w-full max-w-xs flex-1 min-[480px]:min-w-[180px]">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--ew-gray-dark)" }}
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Search treks or destinations…"
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full rounded-lg bg-white py-2.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 min-h-11 lg:min-h-8 lg:py-1.5 lg:pl-7 lg:text-[0.8125rem]"
                  style={inputRing}
                  data-ocid="treks.search_input"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) =>
                  onDifficultyChange(e.target.value as TrekDifficulty | "all")
                }
                className="min-h-11 w-full min-[480px]:w-auto rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 lg:min-h-8 lg:py-1.5 lg:px-2.5 lg:text-[0.8125rem]"
                style={inputRing}
                aria-label="Filter by difficulty"
                data-ocid="treks.difficulty.select"
              >
                <option value="all">All Difficulties</option>
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={durationFilter}
                onChange={(e) => onDurationChange(e.target.value)}
                className="min-h-11 w-full min-[480px]:w-auto rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 lg:min-h-8 lg:py-1.5 lg:px-2.5 lg:text-[0.8125rem]"
                style={inputRing}
                aria-label="Filter by duration"
                data-ocid="treks.duration.select"
              >
                {DURATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {hasActiveFilters &&
                (destinationHub ? (
                  <Link
                    to="/treks"
                    className="flex min-h-11 w-full min-[480px]:w-auto items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: "var(--ew-red)",
                      borderColor: "var(--ew-red)",
                      backgroundColor: "#fff",
                    }}
                    data-ocid="treks.clear_destination_link"
                    onClick={() => setMobileOpen(false)}
                  >
                    <X size={13} aria-hidden />
                    All treks
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClearFilters();
                      setMobileOpen(false);
                    }}
                    className="flex min-h-11 w-full min-[480px]:w-auto items-center justify-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
                    style={{
                      color: "var(--ew-red)",
                      borderColor: "var(--ew-red)",
                      backgroundColor: "#fff",
                    }}
                    data-ocid="treks.clear_filters_button"
                  >
                    <X size={13} aria-hidden />
                    Clear
                  </button>
                ))}
            </div>

            <div className="listing-filters-sort-desktop hidden shrink-0 items-center gap-2 py-1 lg:flex lg:gap-1.5">
              <SlidersHorizontal
                size={15}
                style={{ color: "var(--ew-gray-dark)" }}
                aria-hidden
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Sort:
              </span>
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value as TreksSortValue)}
                className="rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 lg:min-h-8 lg:py-1.5 lg:px-2.5 lg:text-[0.8125rem]"
                style={inputRing}
                aria-label="Sort treks"
                data-ocid="treks.sort.select_desktop"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
