import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

const CATEGORY_CHIPS = [
  "Snow Trek",
  "Mountain Pass",
  "Forest Trail",
  "Winter",
  "Beginner",
  "Weekend",
];

const TRENDING = [
  "Kedarkantha — Uttarakhand",
  "Triund — Himachal Pradesh",
  "Roopkund — Uttarakhand",
  "Hampta Pass — Himachal Pradesh",
  "Valley of Flowers — Uttarakhand",
  "Chandratal Lake — Himachal Pradesh",
];

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({
  isOpen,
  onClose,
}: MobileSearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setActiveChip(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSearch() {
    if (!query.trim() && !activeChip) return;
    navigate({ to: "/treks", search: { q: query || activeChip || "" } });
    onClose();
  }

  function handleTrending(item: string) {
    const name = item.split(" — ")[0];
    navigate({ to: "/treks", search: { q: name } });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[110] flex flex-col"
          style={{
            background: "#fff",
            height: "100dvh",
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            paddingLeft: "env(safe-area-inset-left, 0px)",
            paddingRight: "env(safe-area-inset-right, 0px)",
          }}
          data-ocid="mobile_search_modal"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{
              borderColor: "var(--ew-gray-mid)",
              height: 56,
              flexShrink: 0,
            }}
          >
            <h2
              className="text-sm font-semibold"
              style={{ color: "var(--ew-text)" }}
            >
              Search Treks &amp; Destinations
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="p-1.5 rounded-full"
              style={{ color: "var(--ew-text)" }}
              data-ocid="mobile_search_modal.close_button"
            >
              <X size={22} />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-4 pt-4 pb-3" style={{ flexShrink: 0 }}>
            <div
              className="flex items-center gap-3 rounded-xl px-4"
              style={{
                height: 48,
                border: "2px solid var(--ew-red)",
                background: "var(--ew-gray-lt)",
              }}
            >
              <Search
                size={20}
                style={{ color: "var(--ew-gray-dark)", flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search treks, yatras, destinations..."
                className="flex-1 bg-transparent outline-none text-base"
                style={{
                  fontSize: 16,
                  color: "var(--ew-text)",
                  fontFamily: "var(--font-body)",
                }}
                data-ocid="mobile_search_modal.search_input"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Chips */}
          <div className="px-4 pb-3 overflow-x-auto" style={{ flexShrink: 0 }}>
            <div className="flex gap-2 min-w-max">
              {CATEGORY_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() =>
                    setActiveChip((prev) => (prev === chip ? null : chip))
                  }
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    background:
                      activeChip === chip
                        ? "var(--ew-orange)"
                        : "var(--ew-gray-lt)",
                    color: activeChip === chip ? "#fff" : "var(--ew-text-lt)",
                    border:
                      activeChip === chip
                        ? "1.5px solid var(--ew-orange)"
                        : "1.5px solid var(--ew-gray-mid)",
                    whiteSpace: "nowrap",
                    touchAction: "manipulation",
                  }}
                  data-ocid={`mobile_search_modal.chip.${chip.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Now */}
          <div className="flex-1 overflow-y-auto px-4">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              🔥 Trending Now
            </p>
            <ul className="space-y-0">
              {TRENDING.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => handleTrending(item)}
                    className="w-full flex items-center gap-3 py-3.5 border-b text-left transition-colors"
                    style={{
                      borderColor: "var(--ew-gray-mid)",
                      touchAction: "manipulation",
                    }}
                    data-ocid="mobile_search_modal.trending_item"
                  >
                    <Search
                      size={14}
                      style={{ color: "var(--ew-gray-dark)", flexShrink: 0 }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {item.split(" — ")[0]}
                    </span>
                    <span
                      className="text-xs ml-auto"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {item.split(" — ")[1]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom CTA */}
          <div className="px-4 pb-6 pt-3" style={{ flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-white text-base"
              style={{
                height: 52,
                background: "var(--ew-red)",
                touchAction: "manipulation",
              }}
              data-ocid="mobile_search_modal.search_treks_button"
            >
              <Search size={18} />
              Search Treks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
