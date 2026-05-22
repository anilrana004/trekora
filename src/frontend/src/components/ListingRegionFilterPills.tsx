export type ListingRegionTab = "all" | "uttarakhand" | "himachal";

type ListingKind = "treks" | "yatras" | "destinations";

const LABELS: Record<
  ListingKind,
  Record<ListingRegionTab, string>
> = {
  treks: {
    all: "All Treks",
    uttarakhand: "Uttarakhand",
    himachal: "Himachal Pradesh",
  },
  yatras: {
    all: "All Yatras",
    uttarakhand: "Uttarakhand",
    himachal: "Himachal Pradesh",
  },
  destinations: {
    all: "All Destinations",
    uttarakhand: "Uttarakhand",
    himachal: "Himachal Pradesh",
  },
};

export interface ListingRegionFilterPillsProps {
  kind: ListingKind;
  active: ListingRegionTab;
  onChange: (tab: ListingRegionTab) => void;
  /** Highlight a state tab without changing handler (e.g. state hub page) */
  highlightTab?: ListingRegionTab;
}

export default function ListingRegionFilterPills({
  kind,
  active,
  onChange,
  highlightTab,
}: ListingRegionFilterPillsProps) {
  const tabs: ListingRegionTab[] = ["all", "uttarakhand", "himachal"];

  return (
    <div
      className="listing-region-pills"
      role="tablist"
      aria-label={`Filter ${kind} by region`}
    >
      {tabs.map((tab) => {
        const isActive = highlightTab ? tab === highlightTab : tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`listing-region-pill ${isActive ? "listing-region-pill--active" : ""}`}
            data-ocid={`${kind}.filter.${tab}`}
          >
            {LABELS[kind][tab]}
          </button>
        );
      })}
    </div>
  );
}
