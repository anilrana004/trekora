import { buildWhatsAppUrl } from "@/lib/site-contact";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import BookingDrawer from "../components/BookingDrawer";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
import ListingToolbarRegions from "../components/ListingToolbarRegions";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import { TREKS } from "../data/treks";

type TabKey = "this-month" | "next-3-months" | "summer-2025" | "all";

const BATCHES = [
  {
    id: 1,
    trek: "Roopkund Trek",
    dates: "May 15–22, 2025",
    duration: "8D/7N",
    slots: 4,
    price: 12000,
    difficulty: "Moderate-Difficult",
    state: "Uttarakhand",
    month: 5,
  },
  {
    id: 2,
    trek: "Valley of Flowers",
    dates: "Jul 5–10, 2025",
    duration: "6D/5N",
    slots: 8,
    price: 8500,
    difficulty: "Easy-Moderate",
    state: "Uttarakhand",
    month: 7,
  },
  {
    id: 3,
    trek: "Kedarkantha Trek",
    dates: "Dec 20–25, 2025",
    duration: "6D/5N",
    slots: 0,
    price: 8500,
    difficulty: "Easy-Moderate",
    state: "Uttarakhand",
    month: 12,
  },
  {
    id: 4,
    trek: "Hampta Pass",
    dates: "Jun 12–16, 2025",
    duration: "5D/4N",
    slots: 6,
    price: 9500,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 6,
  },
  {
    id: 5,
    trek: "Triund Trek",
    dates: "Apr 20–21, 2025",
    duration: "2D/1N",
    slots: 12,
    price: 3500,
    difficulty: "Easy",
    state: "Himachal Pradesh",
    month: 4,
  },
  {
    id: 6,
    trek: "Chandratal Lake",
    dates: "Sep 5–8, 2025",
    duration: "4D/3N",
    slots: 2,
    price: 8000,
    difficulty: "Easy-Moderate",
    state: "Himachal Pradesh",
    month: 9,
  },
  {
    id: 7,
    trek: "Brahmatal Trek",
    dates: "Jan 10–15, 2026",
    duration: "6D/5N",
    slots: 10,
    price: 9500,
    difficulty: "Moderate",
    state: "Uttarakhand",
    month: 1,
  },
  {
    id: 8,
    trek: "Rupin Pass",
    dates: "Jun 1–8, 2025",
    duration: "8D/7N",
    slots: 5,
    price: 14000,
    difficulty: "Difficult",
    state: "Uttarakhand",
    month: 6,
  },
  {
    id: 9,
    trek: "Sar Pass",
    dates: "May 20–24, 2025",
    duration: "5D/4N",
    slots: 0,
    price: 8500,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 5,
  },
  {
    id: 10,
    trek: "Har Ki Dun",
    dates: "Oct 5–11, 2025",
    duration: "7D/6N",
    slots: 7,
    price: 10500,
    difficulty: "Moderate",
    state: "Uttarakhand",
    month: 10,
  },
  {
    id: 11,
    trek: "Kedarnath Trek",
    dates: "May 1–4, 2025",
    duration: "4D/3N",
    slots: 15,
    price: 6500,
    difficulty: "Easy",
    state: "Uttarakhand",
    month: 5,
  },
  {
    id: 12,
    trek: "Spiti Valley Circuit",
    dates: "Aug 1–12, 2025",
    duration: "12D/11N",
    slots: 3,
    price: 20000,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 8,
  },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: "this-month", label: "This Month" },
  { key: "next-3-months", label: "Next 3 Months" },
  { key: "summer-2025", label: "Summer 2025" },
  { key: "all", label: "All" },
];

const DIFFICULTY_STYLES: Record<string, { bg: string; color: string }> = {
  Easy: { bg: "#e8f5e9", color: "var(--ew-green)" },
  "Easy-Moderate": { bg: "#f1f8e9", color: "#558b2f" },
  Moderate: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  "Moderate-Difficult": { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Difficult: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Extreme: { bg: "#f3e5f5", color: "#7b1fa2" },
};

const NOW_MONTH = new Date().getMonth() + 1;

function filterBatches(tab: TabKey) {
  if (tab === "all") return BATCHES;
  if (tab === "this-month") return BATCHES.filter((b) => b.month === NOW_MONTH);
  if (tab === "next-3-months")
    return BATCHES.filter(
      (b) => b.month >= NOW_MONTH && b.month <= NOW_MONTH + 3,
    );
  if (tab === "summer-2025")
    return BATCHES.filter((b) => b.month >= 4 && b.month <= 6);
  return BATCHES;
}

export default function UpcomingBatchesPage() {
  const [tab, setTab] = useState<TabKey>("all");
  const [batchDrawer, setBatchDrawer] = useState<{
    open: boolean;
    trek: (typeof TREKS)[number];
    maxSlots: number;
  } | null>(null);
  const batches = filterBatches(tab);

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div
        className="py-16 text-center bg-white"
        style={{ borderBottom: "3px solid var(--ew-red)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--ew-red)" }}
          >
            Plan Ahead
          </span>
          <h1 className="section-title mt-2 mx-auto block">
            Upcoming Trek Batches
          </h1>
          <p className="mt-4 text-sm" style={{ color: "var(--ew-text-lt)" }}>
            Secure your spot — batches fill up fast!
          </p>
        </motion.div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />

      <TravelSideActionRail variant="listing-treks" />

      {/* Tab filters */}
      <ListingStickyToolbar className="bg-white shadow-sm border-b border-[var(--ew-gray-mid)]">
        <ListingToolbarRegions className="py-3">
          <div
            className="listing-region-pills"
            role="tablist"
            aria-label="Filter batches by time"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`listing-region-pill ${tab === t.key ? "listing-region-pill--active" : ""}`}
                data-ocid={`batches.filter.${t.key}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </ListingToolbarRegions>
      </ListingStickyToolbar>

      <div className="container mx-auto px-4 py-10">
        {batches.length === 0 ? (
          <div
            className="text-center py-20 bg-white rounded-2xl shadow-card"
            data-ocid="batches.empty_state"
          >
            <p className="text-4xl mb-3">🗓️</p>
            <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
              No batches in this period
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Try "All" to see all upcoming treks
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-card">
            <table className="w-full bg-white text-sm">
              <thead>
                <tr
                  style={{ background: "var(--ew-red)" }}
                  className="text-white"
                >
                  <th className="px-6 py-4 text-left font-semibold">Trek</th>
                  <th className="px-4 py-4 text-left font-semibold">Dates</th>
                  <th className="px-4 py-4 text-left font-semibold hidden md:table-cell">
                    Duration
                  </th>
                  <th className="px-4 py-4 text-left font-semibold hidden md:table-cell">
                    Difficulty
                  </th>
                  <th className="px-4 py-4 text-right font-semibold">Price</th>
                  <th className="px-4 py-4 text-center font-semibold">Slots</th>
                  <th className="px-4 py-4 text-center font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch, i) => (
                  <motion.tr
                    key={batch.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className={`border-b transition-colors hover:bg-[var(--ew-gray-lt)] ${batch.slots === 0 ? "opacity-60" : ""}`}
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                    data-ocid={`batch.row.${i + 1}`}
                  >
                    <td
                      className="px-6 py-4 font-bold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {batch.trek}
                    </td>
                    <td
                      className="px-4 py-4"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {batch.dates}
                    </td>
                    <td
                      className="px-4 py-4 hidden md:table-cell"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {batch.duration}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      {(() => {
                        const s = DIFFICULTY_STYLES[batch.difficulty] ?? {
                          bg: "var(--ew-gray-lt)",
                          color: "var(--ew-gray-dark)",
                        };
                        return (
                          <span
                            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{ background: s.bg, color: s.color }}
                          >
                            {batch.difficulty}
                          </span>
                        );
                      })()}
                    </td>
                    <td
                      className="px-4 py-4 text-right font-bold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      ₹{batch.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {batch.slots === 0 ? (
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full line-through"
                          style={{
                            background: "var(--ew-gray-lt)",
                            color: "var(--ew-gray-dark)",
                          }}
                        >
                          FULL
                        </span>
                      ) : batch.slots <= 3 ? (
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            background: "var(--ew-red-lt)",
                            color: "var(--ew-red)",
                          }}
                        >
                          Only {batch.slots} spots!
                        </span>
                      ) : (
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            background: "#e8f5e9",
                            color: "var(--ew-green)",
                          }}
                        >
                          {batch.slots} available
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {batch.slots > 0 ? (
                        <button
                          type="button"
                          className="btn-primary text-xs py-2 px-4"
                          data-ocid={`batch.book_button.${i + 1}`}
                          onClick={() => {
                            const trek = TREKS.find(
                              (t) => t.name === batch.trek,
                            );
                            if (trek) {
                              setBatchDrawer({
                                open: true,
                                trek,
                                maxSlots: batch.slots,
                              });
                            }
                          }}
                        >
                          Book Now
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-xs font-medium px-4 py-2 rounded-full cursor-not-allowed"
                          style={{
                            border: "1px solid var(--ew-gray-mid)",
                            color: "var(--ew-gray-dark)",
                          }}
                          disabled
                        >
                          Full
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-8 text-center">
          <a
            href={buildWhatsAppUrl("Hi Trekora, I'd like to book a trek batch")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ background: "#25D366" }}
            data-ocid="batches.whatsapp_button"
          >
            💬 Can't find your dates? WhatsApp us for a custom batch
          </a>
        </div>
      </div>

      {batchDrawer?.trek && (
        <BookingDrawer
          isOpen={batchDrawer.open}
          onClose={() => setBatchDrawer((s) => (s ? { ...s, open: false } : s))}
          trekName={batchDrawer.trek.name}
          trekSlug={batchDrawer.trek.slug}
          price={batchDrawer.trek.price}
          duration={`${batchDrawer.trek.duration} Days`}
          difficulty={batchDrawer.trek.difficulty}
          image={batchDrawer.trek.image}
          maxSlots={batchDrawer.maxSlots}
        />
      )}
    </div>
  );
}
