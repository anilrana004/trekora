import { useCallback, useMemo, useRef, useState } from "react";
import { getPublishedBlogs, type Blog } from "../data/blogs";
import { TREKS, type Trek } from "../data/treks";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function normalize(s: string) {
  return s.toLowerCase();
}

function fuzzyMatch(haystack: string, needle: string): boolean {
  if (!needle) return true;
  const h = normalize(haystack);
  const n = normalize(needle);
  return h.includes(n);
}

function scoreTrek(trek: Trek, query: string): number {
  const q = normalize(query);
  if (!q) return 1;
  const fields = [
    trek.name,
    trek.slug,
    trek.state,
    trek.difficulty,
    trek.description,
    trek.shortDesc,
    trek.category,
    trek.bestSeason,
    trek.region ?? "",
  ];
  return fields.some((f) => normalize(f).includes(q)) ? 1 : 0;
}

function scoreBlog(blog: Blog, query: string): number {
  const q = normalize(query);
  if (!q) return 1;
  const fields = [blog.title, blog.excerpt, blog.category, ...blog.tags];
  return fields.some((f) => normalize(f).includes(q)) ? 1 : 0;
}

export type SearchFilter =
  | "all"
  | "uttarakhand"
  | "himachal"
  | "easy"
  | "moderate"
  | "difficult"
  | "budget"
  | "mid"
  | "premium";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<SearchFilter>("all");
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushDataLayer = useCallback((term: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "search", search_term: term });
  }, []);

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      setIsSearching(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setIsSearching(false);
        if (val.trim().length >= 2) pushDataLayer(val.trim());
      }, 300);
    },
    [pushDataLayer],
  );

  const trekResults = useMemo((): Trek[] => {
    let results = TREKS.filter((t) => scoreTrek(t, query) > 0);

    if (activeFilter === "uttarakhand") {
      results = results.filter((t) => t.state === "uttarakhand");
    } else if (activeFilter === "himachal") {
      results = results.filter((t) => t.state === "himachal");
    } else if (activeFilter === "easy") {
      results = results.filter((t) =>
        ["Easy", "Easy-Moderate"].includes(t.difficulty),
      );
    } else if (activeFilter === "moderate") {
      results = results.filter((t) =>
        ["Moderate", "Easy-Moderate"].includes(t.difficulty),
      );
    } else if (activeFilter === "difficult") {
      results = results.filter((t) =>
        [
          "Difficult",
          "Moderate-Difficult",
          "Difficult-Extreme",
          "Extreme",
        ].includes(t.difficulty),
      );
    } else if (activeFilter === "budget") {
      results = results.filter((t) => t.price < 8000);
    } else if (activeFilter === "mid") {
      results = results.filter((t) => t.price >= 8000 && t.price <= 15000);
    } else if (activeFilter === "premium") {
      results = results.filter((t) => t.price > 15000);
    }

    return results.slice(0, 8);
  }, [query, activeFilter]);

  const blogResults = useMemo((): Blog[] => {
    const published = getPublishedBlogs();
    if (!query.trim()) return published.slice(0, 3);
    return published.filter((b) => scoreBlog(b, query) > 0).slice(0, 4);
  }, [query]);

  // Expose fuzzyMatch for external use
  const matchesFuzzy = useCallback(
    (text: string) => fuzzyMatch(text, query),
    [query],
  );

  return {
    query,
    setQuery: handleQueryChange,
    activeFilter,
    setActiveFilter,
    trekResults,
    blogResults,
    isSearching,
    matchesFuzzy,
  };
}
