import { CTA_NAV_PRIMARY } from "@/lib/cta-buttons";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useId, useState } from "react";

const POPULAR_TAGS = [
  "Kedarnath",
  "Roopkund",
  "Triund",
  "Hampta Pass",
  "Char Dham",
  "Valley of Flowers",
  "Spiti",
] as const;

const fieldClass =
  "home-search-field w-full rounded-xl border bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/25 focus:border-[var(--ew-red)]";

/**
 * Mobile-only trek finder — collapsed by default; same fields as desktop, zero copy changes.
 */
export default function HomeMobileSearchPanel() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      className="home-search lg:hidden"
      data-ocid="search.section"
      aria-label="Find your trek"
    >
      <div className="home-search__shell">
        <button
          type="button"
          className="home-search__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          data-ocid="home.search_toggle"
        >
          <Search size={15} className="home-search__toggle-icon shrink-0 text-[var(--ew-orange)]" aria-hidden />
          <span className="home-search__toggle-label min-w-0 flex-1 truncate text-left font-semibold">
            {open ? "Hide trek finder" : "Find your perfect trek"}
          </span>
          <SlidersHorizontal
            size={14}
            className="home-search__toggle-filter shrink-0 opacity-60"
            aria-hidden
          />
        </button>

        <div
          id={panelId}
          className={`home-search__panel${open ? " home-search__panel--open" : ""}`}
        >
          <div className="home-search__panel-inner">
            <div className="home-search__grid grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="home-s-dest" className="home-search__label">
                  Trek Destination
                </label>
                <select
                  id="home-s-dest"
                  className={fieldClass}
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="search.destination.select"
                >
                  <option value="">All Destinations</option>
                  <option>Uttarakhand</option>
                  <option>Himachal Pradesh</option>
                </select>
              </div>
              <div>
                <label htmlFor="home-s-type" className="home-search__label">
                  Trek Type
                </label>
                <select
                  id="home-s-type"
                  className={fieldClass}
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="search.type.select"
                >
                  <option value="">Trek Type</option>
                  <option>Snow Trek</option>
                  <option>Alpine Trek</option>
                  <option>Yatra</option>
                  <option>Weekend Trek</option>
                </select>
              </div>
              <div>
                <label htmlFor="home-s-diff" className="home-search__label">
                  Difficulty
                </label>
                <select
                  id="home-s-diff"
                  className={fieldClass}
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="search.difficulty.select"
                >
                  <option value="">Difficulty</option>
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Difficult</option>
                  <option>Extreme</option>
                </select>
              </div>
              <div>
                <label htmlFor="home-s-month" className="home-search__label">
                  Month of Travel
                </label>
                <select
                  id="home-s-month"
                  className={fieldClass}
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="search.month.select"
                >
                  <option value="">Month</option>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="home-search__people">
                <label htmlFor="home-s-people" className="home-search__label">
                  No. of People
                </label>
                <select
                  id="home-s-people"
                  className={fieldClass}
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="search.people.select"
                >
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3–5</option>
                  <option>6–10</option>
                  <option>10+</option>
                </select>
              </div>
            </div>

            <Link
              to="/treks"
              className={`${CTA_NAV_PRIMARY} home-search__submit inline-flex w-full items-center justify-center gap-2`}
              data-ocid="search.submit_button"
            >
              <Search size={18} aria-hidden />
              Search Treks
              <ChevronRight size={16} className="opacity-80" aria-hidden />
            </Link>

            <div className="home-search__tags flex flex-col gap-1.5">
              <span className="home-search__tags-label text-xs font-semibold text-[var(--ew-gray-dark)]">
                Popular:
              </span>
              <div className="home-search__tags-scroll flex flex-nowrap gap-1.5 overflow-x-auto pb-0.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {POPULAR_TAGS.map((tag) => (
                  <Link
                    key={tag}
                    to="/treks"
                    className="home-search__tag shrink-0 rounded-full border border-[var(--ew-gray-mid)] bg-[var(--ew-gray-lt)] px-3 py-1.5 text-xs font-medium text-[var(--ew-text-lt)] no-underline transition-colors hover:border-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white"
                    data-ocid={`search.tag.${tag.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
