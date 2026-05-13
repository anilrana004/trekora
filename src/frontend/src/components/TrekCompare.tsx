import { Link } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

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
  const [compareTreks, setCompareTreks] = useState<string[]>(readList);

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareTreks));
  }, [compareTreks]);

  const addToCompare = useCallback((id: string) => {
    setCompareTreks((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        toast.warning("Maximum 3 treks to compare", { duration: 2000 });
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareTreks((prev) => prev.filter((t) => t !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareTreks([]);
  }, []);

  const isInCompare = useCallback(
    (id: string) => compareTreks.includes(id),
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

  return (
    <AnimatePresence>
      {compareTreks.length >= 1 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          className="fixed bottom-16 md:bottom-4 left-1/2 z-50"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-3 shadow-elevated"
            style={{
              backgroundColor: "var(--ew-footer)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Scale size={16} style={{ color: "var(--ew-orange)" }} />
            <span className="text-sm font-medium">
              Comparing{" "}
              <span style={{ color: "var(--ew-orange)" }}>
                {compareTreks.length}
              </span>{" "}
              {compareTreks.length === 1 ? "trek" : "treks"}
            </span>
            <Link
              to="/compare"
              className="text-sm font-bold px-3 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
              data-ocid="compare_bar.view_comparison"
            >
              View Comparison
            </Link>
            <button
              type="button"
              onClick={clearCompare}
              className="flex items-center gap-1 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity"
              data-ocid="compare_bar.clear_button"
              aria-label="Clear comparison list"
            >
              <X size={14} />
              Clear
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
