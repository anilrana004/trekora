import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { TREKS } from "../data/treks";
import {
  compareKeysEqual,
  normalizeCompareKey,
} from "../lib/compare-treks";

/* ─────────────── Context ─────────────── */

const COMPARE_KEY = "ew_compare_list";

interface CompareContextValue {
  compareTreks: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextValue>({
  compareTreks: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  clearCompare: () => {},
  isInCompare: () => false,
});

export function useCompare() {
  return useContext(CompareContext);
}

function readList(): string[] {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareTreks, setCompareTreks] = useState<string[]>(() =>
    [...new Set(readList().map(normalizeCompareKey))].filter((slug) =>
      TREKS.some((t) => t.slug === slug),
    ),
  );

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareTreks));
  }, [compareTreks]);

  const addToCompare = useCallback((idOrSlug: string) => {
    const slug = normalizeCompareKey(idOrSlug);
    setCompareTreks((prev) => {
      if (prev.some((k) => compareKeysEqual(k, slug))) return prev;
      if (prev.length >= 3) {
        toast.warning("Maximum 3 treks to compare", { duration: 2000 });
        return prev;
      }
      return [...prev, slug];
    });
  }, []);

  const removeFromCompare = useCallback((idOrSlug: string) => {
    const slug = normalizeCompareKey(idOrSlug);
    setCompareTreks((prev) => prev.filter((k) => !compareKeysEqual(k, slug)));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareTreks([]);
  }, []);

  const isInCompare = useCallback(
    (idOrSlug: string) =>
      compareTreks.some((k) => compareKeysEqual(k, idOrSlug)),
    [compareTreks],
  );

  return (
    <CompareContext.Provider
      value={{
        compareTreks,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

/* ─────────────── Compare Button (used in TrekCard) ─────────────── */

export function CompareButton({ trekId }: { trekId: string }) {
  const { addToCompare, removeFromCompare, isInCompare, compareTreks } =
    useCompare();
  const inList = isInCompare(trekId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inList) {
      removeFromCompare(trekId);
    } else {
      if (compareTreks.length >= 3) {
        toast.warning("Maximum 3 treks to compare", { duration: 2000 });
        return;
      }
      addToCompare(trekId);
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      title={inList ? "Remove from compare" : "Add to Compare"}
      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full transition-all"
      style={{
        backgroundColor: inList ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
        color: inList ? "var(--ew-orange)" : "var(--ew-gray-dark)",
        border: `1px solid ${inList ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={inList ? "Remove from compare" : "Add to compare"}
      data-ocid="trek.compare_button"
    >
      <Scale size={11} />
      {inList ? "Added" : "Compare"}
    </motion.button>
  );
}

/* ─────────────── Compare Bar (floating, shown when >= 1 trek) ─────────────── */

export function CompareBar() {
  const { compareTreks, clearCompare } = useCompare();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isVisible = compareTreks.length >= 1 && pathname !== "/compare";

  useEffect(() => {
    document.body.classList.toggle("compare-bar-visible", isVisible);
    return () => document.body.classList.remove("compare-bar-visible");
  }, [isVisible]);

  const bar = (
    <AnimatePresence>
      {isVisible && (
        /* Anchor is fixed + centered; motion only animates inner shell (avoids transform clash). */
        <div className="compare-bar-anchor" role="presentation">
          <motion.div
            role="region"
            aria-label="Trek comparison"
            className="compare-bar"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
          >
            <div className="compare-bar__panel">
              <div className="compare-bar__summary">
                <Scale
                  size={16}
                  className="shrink-0"
                  style={{ color: "var(--ew-orange)" }}
                  aria-hidden
                />
                <span className="text-sm font-medium">
                  Comparing{" "}
                  <span style={{ color: "var(--ew-orange)" }}>
                    {compareTreks.length}
                  </span>{" "}
                  {compareTreks.length === 1 ? "trek" : "treks"}
                </span>
              </div>
              <div className="compare-bar__actions">
                <button
                  type="button"
                  className="btn-primary compare-bar__cta"
                  data-ocid="compare_bar.view_comparison"
                  onClick={() => navigate({ to: "/compare" })}
                >
                  <span className="compare-bar__cta-label compare-bar__cta-label--long">
                    View comparison
                  </span>
                  <span className="compare-bar__cta-label compare-bar__cta-label--short">
                    Compare
                  </span>
                </button>
                <button
                  type="button"
                  onClick={clearCompare}
                  className="compare-bar__clear"
                  data-ocid="compare_bar.clear_button"
                  aria-label="Clear comparison list"
                >
                  <X size={14} aria-hidden />
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return bar;
  return createPortal(bar, document.body);
}
