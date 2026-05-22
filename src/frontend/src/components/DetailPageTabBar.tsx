export type DetailTabItem = {
  id: string;
  label: string;
  /** Shorter label on narrow screens */
  shortLabel?: string;
};

export interface DetailPageTabBarProps {
  tabs: DetailTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** e.g. trek_detail or yatra_detail */
  ocidPrefix: string;
}

export default function DetailPageTabBar({
  tabs,
  activeId,
  onChange,
  ocidPrefix,
}: DetailPageTabBarProps) {
  return (
    <nav
      className="detail-tab-bar listing-sticky-toolbar"
      aria-label="Page sections"
      data-ocid={`${ocidPrefix}.tab_bar`}
    >
      <div className="detail-tab-bar__inner container mx-auto px-4">
        <div className="detail-tab-bar__scroll scrollbar-hide" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            const short = tab.shortLabel ?? tab.label;
            const hasDistinctShort =
              tab.shortLabel != null && tab.shortLabel !== tab.label;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(tab.id)}
                className={`detail-tab ${isActive ? "detail-tab--active" : ""}`}
                data-ocid={`${ocidPrefix}.tab.${tab.id.replace(/[^a-z0-9]+/g, "_")}`}
              >
                {hasDistinctShort ? (
                  <>
                    <span className="detail-tab__label detail-tab__label--short">
                      {short}
                    </span>
                    <span className="detail-tab__label detail-tab__label--full">
                      {tab.label}
                    </span>
                  </>
                ) : (
                  <span className="detail-tab__label">{tab.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
