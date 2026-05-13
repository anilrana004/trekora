import { Link } from "@tanstack/react-router";
import { BookOpen, Loader2, MapPin, Mountain, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import type { SearchFilter } from "../hooks/useSearch";
import { useSearch } from "../hooks/useSearch";

const FILTERS: { key: SearchFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "uttarakhand", label: "Uttarakhand" },
  { key: "himachal", label: "Himachal" },
  { key: "easy", label: "Easy" },
  { key: "moderate", label: "Moderate" },
  { key: "difficult", label: "Difficult" },
  { key: "budget", label: "Budget <₹8K" },
  { key: "mid", label: "₹8K–15K" },
  { key: "premium", label: "Premium ₹15K+" },
];

const DIFF_CLASSES: Record<string, string> = {
  Easy: "trek-difficulty-easy",
  "Easy-Moderate": "trek-difficulty-easy",
  Moderate: "trek-difficulty-moderate",
  "Moderate-Difficult": "trek-difficulty-moderate",
  Difficult: "trek-difficulty-difficult",
  "Difficult-Extreme": "trek-difficulty-difficult",
  Extreme: "trek-difficulty-extreme",
};

interface SearchDropdownProps {
  initialQuery?: string;
  onClose: () => void;
}

export default function SearchDropdown({
  initialQuery = "",
  onClose,
}: SearchDropdownProps) {
  const {
    query,
    setQuery,
    activeFilter,
    setActiveFilter,
    trekResults,
    blogResults,
    isSearching,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on mount, set initial query
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (initialQuery) setQuery(initialQuery);
    }
  }, [initialQuery, setQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasResults = trekResults.length > 0 || blogResults.length > 0;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto px-4"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="presentation"
    >
      {/* Input */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ color: "var(--ew-gray-dark)" }}
          aria-hidden="true"
        />
        {isSearching ? (
          <Loader2
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin"
            style={{ color: "var(--ew-orange)" }}
            aria-hidden="true"
          />
        ) : null}
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search treks, yatras, destinations..."
          className="w-full pl-12 pr-12 py-4 text-base bg-white rounded-xl outline-none"
          style={{ color: "var(--ew-text)" }}
          data-ocid="nav.search_input"
          aria-label="Search treks and yatras"
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
      </div>

      {/* Filter chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFilter(f.key)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
            style={{
              background:
                activeFilter === f.key
                  ? "var(--ew-red)"
                  : "rgba(255,255,255,0.14)",
              color: activeFilter === f.key ? "#fff" : "rgba(255,255,255,0.85)",
              border: "1px solid",
              borderColor:
                activeFilter === f.key
                  ? "var(--ew-red)"
                  : "rgba(255,255,255,0.2)",
            }}
            data-ocid={`search.filter.${f.key}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Results panel */}
      {query.trim().length >= 1 && (
        <div
          className="mt-4 rounded-xl overflow-hidden"
          style={{ background: "#fff" }}
          aria-label="Search results"
          data-ocid="search.results_panel"
        >
          {!hasResults && !isSearching && (
            <div className="py-10 text-center" data-ocid="search.empty_state">
              <Mountain
                size={32}
                className="mx-auto mb-3"
                style={{ color: "var(--ew-gray-mid)" }}
              />
              <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
                No results for &ldquo;{query}&rdquo;
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Try searching for Kedarkantha, Triund, or Char Dham
              </p>
            </div>
          )}

          {/* Trek results */}
          {trekResults.length > 0 && (
            <div className="p-3">
              <p
                className="text-[11px] font-bold uppercase tracking-widest px-2 mb-2"
                style={{ color: "var(--ew-red)" }}
              >
                <Mountain
                  size={11}
                  className="inline mr-1"
                  aria-hidden="true"
                />
                Treks ({trekResults.length})
              </p>
              <ul>
                {trekResults.map((trek, i) => (
                  <li key={trek.slug}>
                    <Link
                      to="/treks/$slug"
                      params={{ slug: trek.slug }}
                      onClick={onClose}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--ew-gray-lt)] transition-colors"
                      style={{ textDecoration: "none" }}
                      data-ocid={`search.trek_result.${i + 1}`}
                    >
                      <img
                        src={trek.image}
                        alt={trek.name}
                        className="w-12 h-10 rounded object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-sm leading-tight truncate"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {trek.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="flex items-center gap-0.5 text-[11px]"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            <MapPin size={10} aria-hidden="true" />
                            {trek.state === "uttarakhand"
                              ? "Uttarakhand"
                              : "Himachal Pradesh"}
                          </span>
                          <span
                            className={
                              DIFF_CLASSES[trek.difficulty] ??
                              "trek-difficulty-moderate"
                            }
                          >
                            {trek.difficulty}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-sm font-bold shrink-0"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        ₹{trek.price.toLocaleString("en-IN")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Divider */}
          {trekResults.length > 0 && blogResults.length > 0 && (
            <hr style={{ borderColor: "var(--ew-gray-mid)" }} />
          )}

          {/* Blog results */}
          {blogResults.length > 0 && (
            <div className="p-3">
              <p
                className="text-[11px] font-bold uppercase tracking-widest px-2 mb-2"
                style={{ color: "var(--ew-red)" }}
              >
                <BookOpen
                  size={11}
                  className="inline mr-1"
                  aria-hidden="true"
                />
                Articles
              </p>
              <ul>
                {blogResults.map((blog, i) => (
                  <li key={blog.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: blog.slug }}
                      onClick={onClose}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--ew-gray-lt)] transition-colors"
                      style={{ textDecoration: "none" }}
                      data-ocid={`search.blog_result.${i + 1}`}
                    >
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-sm shrink-0 mt-0.5"
                        style={{
                          background: "var(--ew-red-lt)",
                          color: "var(--ew-red)",
                        }}
                      >
                        {blog.category}
                      </span>
                      <div className="min-w-0">
                        <p
                          className="font-semibold text-sm line-clamp-1"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {blog.title}
                        </p>
                        <p
                          className="text-xs line-clamp-1 mt-0.5"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          {blog.excerpt.slice(0, 80)}…
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
