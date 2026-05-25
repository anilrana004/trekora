import { motion } from "motion/react";
import { useState } from "react";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";
import BookingDrawer from "./BookingDrawer";

interface Batch {
  trek: string;
  slug: string;
  date: string;
  duration: string;
  difficulty: string;
  slots: number;
  price: number;
  full: boolean;
  tab: string[];
}

function batchRowMeta(b: Batch) {
  const trek = TREKS.find((t) => t.slug === b.slug);
  if (trek) return { kind: "trek" as const, trek };
  const yatra = YATRAS.find((y) => y.slug === b.slug);
  if (yatra) return { kind: "yatra" as const, yatra };
  return null;
}

function displayDateToIso(displayDate: string): string | undefined {
  const d = new Date(displayDate);
  if (Number.isNaN(d.getTime())) return undefined;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const BATCH_DATA: Batch[] = [
  {
    trek: "Roopkund Trek",
    slug: "roopkund-trek",
    date: "Jun 14, 2026",
    duration: "8 Days",
    difficulty: "Moderate-Difficult",
    slots: 3,
    price: 12000,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Valley of Flowers",
    slug: "valley-of-flowers",
    date: "Jun 28, 2026",
    duration: "6 Days",
    difficulty: "Easy-Moderate",
    slots: 5,
    price: 8500,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Triund Trek",
    slug: "triund-trek",
    date: "Jun 21, 2026",
    duration: "2 Days",
    difficulty: "Easy",
    slots: 12,
    price: 3500,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Rupin Pass",
    slug: "rupin-pass",
    date: "Jun 7, 2026",
    duration: "6 Days",
    difficulty: "Difficult",
    slots: 4,
    price: 11500,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Pangarchulla Peak",
    slug: "pangarchulla-peak",
    date: "May 24, 2026",
    duration: "5 Days",
    difficulty: "Difficult",
    slots: 5,
    price: 10500,
    full: false,
    tab: ["This Month"],
  },
  {
    trek: "Har Ki Dun",
    slug: "har-ki-dun",
    date: "May 30, 2026",
    duration: "6 Days",
    difficulty: "Easy-Moderate",
    slots: 2,
    price: 9500,
    full: false,
    tab: ["This Month"],
  },
  {
    trek: "Hampta Pass",
    slug: "hampta-pass",
    date: "Jul 12, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 6,
    price: 9500,
    full: false,
    tab: ["Next Month", "Summer 2025"],
  },
  {
    trek: "Kheerganga",
    slug: "kheerganga",
    date: "Jun 28, 2026",
    duration: "2 Days",
    difficulty: "Easy",
    slots: 15,
    price: 3000,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Chandratal Lake",
    slug: "chandratal-lake",
    date: "Jul 19, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 4,
    price: 10000,
    full: false,
    tab: ["Next Month", "Summer 2025"],
  },
  {
    trek: "Bhrigu Lake",
    slug: "bhrigu-lake",
    date: "Jun 14, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 8500,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Sar Pass",
    slug: "sar-pass",
    date: "Jun 21, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 6,
    price: 9000,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Beas Kund",
    slug: "beas-kund",
    date: "Jun 28, 2026",
    duration: "4 Days",
    difficulty: "Easy",
    slots: 10,
    price: 7500,
    full: false,
    tab: ["This Month", "Summer 2025"],
  },
  {
    trek: "Pin Parvati Pass",
    slug: "pin-parvati-pass",
    date: "Sep 6, 2026",
    duration: "10 Days",
    difficulty: "Difficult",
    slots: 3,
    price: 16500,
    full: false,
    tab: ["Next Month"],
  },
  {
    trek: "Deo Tibba Base Camp",
    slug: "deo-tibba-base-camp",
    date: "Sep 12, 2026",
    duration: "8 Days",
    difficulty: "Difficult",
    slots: 4,
    price: 14000,
    full: false,
    tab: ["Next Month"],
  },
  {
    trek: "Char Dham Yatra",
    slug: "char-dham-yatra",
    date: "Sep 6, 2026",
    duration: "12 Days",
    difficulty: "Easy-Moderate",
    slots: 6,
    price: 28000,
    full: false,
    tab: ["Next Month"],
  },
  {
    trek: "Kedarnath Yatra",
    slug: "kedarnath-yatra",
    date: "Sep 13, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 9500,
    full: false,
    tab: ["Next Month"],
  },
  {
    trek: "Chopta Tungnath",
    slug: "chopta-tungnath",
    date: "Oct 11, 2026",
    duration: "5 Days",
    difficulty: "Easy-Moderate",
    slots: 8,
    price: 7200,
    full: false,
    tab: ["Winter 2025/26"],
  },
  {
    trek: "Deoriatal-Chandrashila",
    slug: "deoriatal-chandrashila",
    date: "Oct 4, 2026",
    duration: "4 Days",
    difficulty: "Easy-Moderate",
    slots: 9,
    price: 7000,
    full: false,
    tab: ["Winter 2025/26"],
  },
  {
    trek: "Kedarkantha Trek",
    slug: "kedarkantha-trek",
    date: "Dec 5, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 8500,
    full: false,
    tab: ["Winter 2025/26"],
  },
  {
    trek: "Brahmatal Trek",
    slug: "brahmatal-trek",
    date: "Dec 20, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 10,
    price: 9000,
    full: false,
    tab: ["Winter 2025/26"],
  },
];

const TABS = [
  "All",
  "This Month",
  "Next Month",
  "Summer 2025",
  "Winter 2025/26",
];

function SlotsCell({ slots }: { slots: number }) {
  if (slots <= 3)
    return (
      <span className="text-[11px] font-bold" style={{ color: "#C0001C" }}>
        Only {slots} seat{slots === 1 ? "" : "s"} left!
      </span>
    );
  if (slots <= 5)
    return (
      <span className="text-[11px] font-semibold" style={{ color: "#E87722" }}>
        {slots} seats — filling fast
      </span>
    );
  return (
    <span className="text-[11px] font-semibold" style={{ color: "#16a34a" }}>
      {slots} seats available
    </span>
  );
}

export default function UpcomingBatchesSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [batchDrawer, setBatchDrawer] = useState<{
    open: boolean;
    trekName: string;
    trekSlug: string;
    price: number;
    duration: string;
    difficulty: string;
    image?: string;
    maxSlots: number;
    suggestedDateIso?: string;
  } | null>(null);

  const openBatchBook = (b: Batch) => {
    const meta = batchRowMeta(b);
    if (!meta) return;
    const suggestedDateIso = displayDateToIso(b.date);
    if (meta.kind === "trek") {
      const t = meta.trek;
      setBatchDrawer({
        open: true,
        trekName: t.name,
        trekSlug: t.slug,
        price: t.price,
        duration: `${t.duration} Days`,
        difficulty: t.difficulty,
        image: t.image,
        maxSlots: b.slots,
        suggestedDateIso,
      });
    } else {
      const y = meta.yatra;
      setBatchDrawer({
        open: true,
        trekName: y.name,
        trekSlug: y.slug,
        price: y.price,
        duration: `${y.duration} Days`,
        difficulty: y.distance > 200 ? "Moderate" : "Easy",
        image: y.image,
        maxSlots: b.slots,
        suggestedDateIso,
      });
    }
  };

  const filtered =
    activeTab === "All"
      ? BATCH_DATA
      : BATCH_DATA.filter((b) => b.tab.includes(activeTab));

  const visible = showAll ? filtered : filtered.slice(0, 10);

  return (
    <section
      className="py-12"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="batches2.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6"
        >
          <div>
            <h2 className="section-title">Upcoming Batch Dates</h2>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Book your spot — seats fill up weeks in advance
            </p>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div
          className="flex gap-0 overflow-x-auto scrollbar-hide border-b mb-5"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setShowAll(false);
              }}
              className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? "tab-active" : ""
              }`}
              style={activeTab !== tab ? { color: "var(--ew-gray-dark)" } : {}}
              data-ocid={`batches2.tab.${tab.toLowerCase().replace(/[\s/]+/g, "_")}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto rounded-xl overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  background: "#1A1A2E",
                  color: "#fff",
                }}
              >
                {[
                  "Trek / Yatra",
                  "Next Batch",
                  "Duration",
                  "Difficulty",
                  "Slots",
                  "Price",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-4 text-left text-[12px] font-semibold uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((b, i) => (
                <tr
                  key={`${b.trek}-${b.date}`}
                  className="transition-colors"
                  style={{
                    background: i % 2 === 0 ? "#fff" : "#F5F5F5",
                    borderBottom: "1px solid var(--ew-gray-mid)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      "#FFF0E0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background =
                      i % 2 === 0 ? "#fff" : "#F5F5F5";
                  }}
                  data-ocid={`batches2.row.${i + 1}`}
                >
                  <td
                    className="py-3 px-4 font-semibold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {b.trek}
                  </td>
                  <td
                    className="py-3 px-4"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {b.date}
                  </td>
                  <td
                    className="py-3 px-4"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {b.duration}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        background: b.difficulty.includes("Easy")
                          ? "#dcfce7"
                          : b.difficulty === "Moderate"
                            ? "#fef3c7"
                            : "#fee2e2",
                        color: b.difficulty.includes("Easy")
                          ? "#16a34a"
                          : b.difficulty === "Moderate"
                            ? "#92400e"
                            : "#991b1b",
                      }}
                    >
                      {b.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <SlotsCell slots={b.slots} />
                  </td>
                  <td
                    className="py-3 px-4 font-bold text-[15px]"
                    style={{ color: "var(--ew-orange)" }}
                  >
                    ₹{b.price.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      className="batches-book-btn text-[12px] font-semibold px-4 py-2 rounded-lg whitespace-nowrap text-white transition-opacity hover:opacity-90 active:opacity-80"
                      style={{ background: "#E87722" }}
                      data-ocid={`batches2.book_button.${i + 1}`}
                      onClick={() => openBatchBook(b)}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-3">
          {visible.map((b, i) => (
            <div
              key={`${b.trek}-${b.date}`}
              className="bg-white rounded-xl p-4 shadow-card"
              data-ocid={`batches2.mobile_card.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p
                  className="font-semibold text-[14px]"
                  style={{ color: "var(--ew-text)" }}
                >
                  {b.trek}
                </p>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: "var(--ew-orange)" }}
                >
                  ₹{b.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div
                className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] mb-3"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <span>📅 {b.date}</span>
                <span>⏱ {b.duration}</span>
                <span>🏔 {b.difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <SlotsCell slots={b.slots} />
                <button
                  type="button"
                  className="batches-book-btn text-[12px] font-semibold px-4 py-2 rounded-lg text-white active:opacity-80"
                  style={{ background: "#E87722" }}
                  data-ocid={`batches2.mobile_book_button.${i + 1}`}
                  onClick={() => openBatchBook(b)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 10 && !showAll && (
          <div className="text-center mt-5">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="btn-secondary"
              style={{ borderColor: "var(--ew-red)", color: "var(--ew-red)" }}
              data-ocid="batches2.show_more_button"
            >
              Show All {filtered.length} Batches ↓
            </button>
          </div>
        )}
      </div>

      {batchDrawer && (
        <BookingDrawer
          isOpen={batchDrawer.open}
          onClose={() => setBatchDrawer((d) => (d ? { ...d, open: false } : d))}
          trekName={batchDrawer.trekName}
          trekSlug={batchDrawer.trekSlug}
          price={batchDrawer.price}
          duration={batchDrawer.duration}
          difficulty={batchDrawer.difficulty}
          image={batchDrawer.image}
          maxSlots={batchDrawer.maxSlots}
          suggestedDateIso={batchDrawer.suggestedDateIso}
        />
      )}
    </section>
  );
}
