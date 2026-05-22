import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Scale, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import OptimizedImage from "../components/media/OptimizedImage";
import { EnquiryButton } from "../components/ui/EnquiryButton";
import { useCompare } from "../components/TrekCompare";
import { TREKS } from "../data/treks";

function DifficultyStars({ level }: { level: string }) {
  const score: Record<string, number> = {
    Easy: 1,
    "Easy-Moderate": 2,
    Moderate: 2,
    "Moderate-Difficult": 3,
    Difficult: 4,
    "Difficult-Extreme": 4,
    Extreme: 5,
  };
  const filled = score[level] ?? 3;
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="text-xs"
          style={{
            color: i <= filled ? "var(--ew-orange)" : "var(--ew-gray-mid)",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

const ROWS: {
  label: string;
  key: keyof (typeof TREKS)[0] | "difficulty_stars";
}[] = [
  { label: "Price / person", key: "price" },
  { label: "Duration", key: "duration" },
  { label: "Max Altitude", key: "altitude" },
  { label: "Difficulty", key: "difficulty_stars" },
  { label: "Distance", key: "distance" },
  { label: "Best Season", key: "bestSeason" },
  { label: "State", key: "state" },
  { label: "Start Point", key: "startPoint" },
  { label: "Trek Type", key: "trekType" },
];

function formatValue(trek: (typeof TREKS)[0], key: string): React.ReactNode {
  if (key === "price")
    return `₹${(trek.price as number).toLocaleString("en-IN")}`;
  if (key === "duration") return `${trek.duration} Days`;
  if (key === "altitude")
    return `${(trek.altitude as number).toLocaleString()}m`;
  if (key === "difficulty_stars")
    return <DifficultyStars level={trek.difficulty} />;
  if (key === "distance") return `${trek.distance} km`;
  if (key === "state")
    return trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const val = trek[key as keyof typeof trek];
  return String(val ?? "—");
}

export default function ComparePage() {
  const { compareTreks, removeFromCompare, clearCompare } = useCompare();
  const selectedTreks = compareTreks
    .map((id) => TREKS.find((t) => String(t.id) === id))
    .filter(Boolean) as (typeof TREKS)[0][];

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <Link
            to="/treks"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--ew-red)" }}
          >
            <ArrowLeft size={16} />
            Back to Treks
          </Link>
          <div className="flex items-center gap-2">
            <Scale size={22} style={{ color: "var(--ew-red)" }} />
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              Compare Treks
            </h1>
          </div>
          {selectedTreks.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="ml-auto flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: "var(--ew-gray-dark)" }}
              data-ocid="compare.clear_button"
            >
              <Trash2 size={14} /> Clear all
            </button>
          )}
        </div>

        {selectedTreks.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-16 text-center shadow-card"
            data-ocid="compare.empty_state"
          >
            <Scale
              size={64}
              className="mx-auto mb-4"
              style={{ color: "var(--ew-orange)" }}
            />
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "var(--ew-text)" }}
            >
              No Treks Selected
            </h2>
            <p
              className="text-sm mb-6 max-w-sm mx-auto"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Add treks using the <Scale size={13} className="inline" />{" "}
              <strong>Compare</strong> button on trek cards to see them
              side-by-side here.
            </p>
            <Link to="/treks" className="btn-primary">
              Browse All Treks
            </Link>
          </motion.div>
        ) : (
          <>
            {/* ── Desktop comparison table ── */}
            <div className="hidden md:block overflow-x-auto">
              <div
                className="bg-white rounded-2xl shadow-card overflow-hidden"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "var(--ew-gray-lt)",
                        borderBottom: "2px solid var(--ew-gray-mid)",
                      }}
                    >
                      <th
                        className="text-left px-5 py-4 text-sm font-bold w-40"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Feature
                      </th>
                      {selectedTreks.map((t) => (
                        <th
                          key={t.id}
                          className="px-4 py-4 text-center"
                          style={{ minWidth: 220 }}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <OptimizedImage
                              src={t.image}
                              alt={t.name}
                              width={96}
                              height={64}
                              variant="thumbnail"
                              className="w-24 h-16 object-cover rounded-lg"
                            />
                            <span
                              className="text-sm font-bold leading-snug"
                              style={{ color: "var(--ew-text)" }}
                            >
                              {t.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCompare(String(t.id))}
                              className="text-[11px] font-medium transition-colors"
                              style={{ color: "var(--ew-gray-dark)" }}
                              aria-label={`Remove ${t.name}`}
                            >
                              ✕ Remove
                            </button>
                          </div>
                        </th>
                      ))}
                      {/* Empty placeholder column(s) to fill up to 3 */}
                      {Array.from({ length: 3 - selectedTreks.length }).map(
                        (_, i) => (
                          <th
                            key={`empty-slot-${3 - selectedTreks.length - i}`}
                            className="px-4 py-4 text-center"
                            style={{ minWidth: 220 }}
                          >
                            <div className="flex flex-col items-center justify-center h-24">
                              <Link
                                to="/treks"
                                className="text-sm font-medium transition-colors"
                                style={{ color: "var(--ew-red)" }}
                              >
                                + Add Trek
                              </Link>
                            </div>
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, ri) => (
                      <tr
                        key={row.label}
                        style={{
                          borderBottom: "1px solid var(--ew-gray-mid)",
                          backgroundColor:
                            ri % 2 === 0 ? "#fff" : "var(--ew-gray-lt)",
                        }}
                      >
                        <td
                          className="px-5 py-3.5 text-sm font-semibold"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          {row.label}
                        </td>
                        {selectedTreks.map((t) => (
                          <td
                            key={t.id}
                            className="px-4 py-3.5 text-center text-sm font-medium"
                            style={{ color: "var(--ew-text)" }}
                          >
                            {formatValue(t, row.key)}
                          </td>
                        ))}
                        {Array.from({
                          length: 3 - selectedTreks.length,
                        }).map((_, i) => (
                          <td
                            key={`empty-cell-${row.label}-${i}`}
                            className="px-4 py-3.5"
                          />
                        ))}
                      </tr>
                    ))}
                    {/* Book Now row */}
                    <tr style={{ backgroundColor: "var(--ew-gray-lt)" }}>
                      <td
                        className="px-5 py-4 text-sm font-bold"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Book
                      </td>
                      {selectedTreks.map((t) => (
                        <td key={t.id} className="px-4 py-4 text-center">
                          <EnquiryButton
                            type="button"
                            trekName={t.name}
                            className="btn-primary text-xs"
                            data-ocid="compare.book_button"
                          >
                            Book Now
                          </EnquiryButton>
                        </td>
                      ))}
                      {Array.from(
                        { length: 3 - selectedTreks.length },
                        (_, i) => `empty-book-${3 - selectedTreks.length - i}`,
                      ).map((key) => (
                        <td key={key} />
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Mobile: swipeable cards ── */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              <AnimatePresence>
                {selectedTreks.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex-shrink-0 snap-start bg-white rounded-2xl shadow-card overflow-hidden"
                    style={{
                      width: "80vw",
                      maxWidth: 320,
                      border: "1px solid var(--ew-gray-mid)",
                    }}
                  >
                    <div className="relative h-40 w-full">
                      <OptimizedImage
                        src={t.image}
                        alt={t.name}
                        fill
                        variant="blog-card"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-bold text-base mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {t.name}
                      </h3>
                      <ul className="space-y-2 mb-4">
                        {ROWS.map((row) => (
                          <li
                            key={row.label}
                            className="flex justify-between text-sm"
                          >
                            <span style={{ color: "var(--ew-gray-dark)" }}>
                              {row.label}
                            </span>
                            <span
                              className="font-semibold"
                              style={{ color: "var(--ew-text)" }}
                            >
                              {formatValue(t, row.key)}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-2">
                        <EnquiryButton
                          type="button"
                          trekName={t.name}
                          className="btn-primary flex-1 text-center text-xs"
                          data-ocid="compare.mobile.book_button"
                        >
                          Book Now
                        </EnquiryButton>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(String(t.id))}
                          className="flex items-center justify-center w-10 h-10 rounded-lg"
                          style={{
                            border: "1px solid var(--ew-gray-mid)",
                            color: "var(--ew-gray-dark)",
                          }}
                          aria-label={`Remove ${t.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Highlights row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-white rounded-2xl p-5 shadow-card"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
            >
              <h2
                className="font-bold text-base mb-4"
                style={{ color: "var(--ew-text)" }}
              >
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedTreks.map((t) => (
                  <div key={t.id}>
                    <p
                      className="font-semibold text-sm mb-2"
                      style={{ color: "var(--ew-red)" }}
                    >
                      {t.name}
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "NCISM-Certified Guides",
                        "Small groups (max 12)",
                        "Full meals included",
                        "Emergency oxygen carried",
                      ].map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "var(--ew-text-lt)" }}
                        >
                          <CheckCircle2
                            size={13}
                            style={{ color: "var(--ew-green)" }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
