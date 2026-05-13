import { Link, useParams } from "@tanstack/react-router";
import { Calendar, Cloud, Sun, Thermometer } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { TREKS } from "../data/treks";

interface MonthInfo {
  name: string;
  short: string;
  weather: string;
  tempMin: number;
  tempMax: number;
  trailStatus: "Open" | "Partial" | "Closed";
  crowd: "Low" | "Medium" | "High";
  recommended: boolean;
}

function getMonthData(bestSeason: string, altitude: number): MonthInfo[] {
  const isHighAlt = altitude > 4000;
  const seasonLower = bestSeason.toLowerCase();

  const isGoodMonth = (m: string) => {
    const map: Record<string, boolean> = {
      jan: seasonLower.includes("jan") || seasonLower.includes("win"),
      feb: seasonLower.includes("feb") || seasonLower.includes("win"),
      mar: seasonLower.includes("mar") || seasonLower.includes("spr"),
      apr: seasonLower.includes("apr") || seasonLower.includes("sum"),
      may: seasonLower.includes("may") || seasonLower.includes("sum"),
      jun: seasonLower.includes("jun") || seasonLower.includes("sum"),
      jul: seasonLower.includes("jul") || seasonLower.includes("mon"),
      aug: seasonLower.includes("aug") || seasonLower.includes("mon"),
      sep: seasonLower.includes("sep") || seasonLower.includes("aut"),
      oct: seasonLower.includes("oct") || seasonLower.includes("aut"),
      nov: seasonLower.includes("nov") || seasonLower.includes("aut"),
      dec: seasonLower.includes("dec") || seasonLower.includes("win"),
    };
    return map[m] ?? false;
  };

  const months: Array<{
    name: string;
    short: string;
    baseMin: number;
    baseMax: number;
  }> = [
    { name: "January", short: "Jan", baseMin: -10, baseMax: 2 },
    { name: "February", short: "Feb", baseMin: -8, baseMax: 5 },
    { name: "March", short: "Mar", baseMin: -2, baseMax: 10 },
    { name: "April", short: "Apr", baseMin: 2, baseMax: 15 },
    { name: "May", short: "May", baseMin: 5, baseMax: 20 },
    { name: "June", short: "Jun", baseMin: 8, baseMax: 22 },
    { name: "July", short: "Jul", baseMin: 10, baseMax: 20 },
    { name: "August", short: "Aug", baseMin: 10, baseMax: 19 },
    { name: "September", short: "Sep", baseMin: 6, baseMax: 18 },
    { name: "October", short: "Oct", baseMin: 0, baseMax: 14 },
    { name: "November", short: "Nov", baseMin: -5, baseMax: 8 },
    { name: "December", short: "Dec", baseMin: -10, baseMax: 1 },
  ];

  const altFactor = isHighAlt ? -6 : -3;

  const _trailOpen = (m: MonthInfo) => m.trailStatus !== "Closed";

  return months.map(({ name, short, baseMin, baseMax }) => {
    const rec = isGoodMonth(short.toLowerCase());
    let status: MonthInfo["trailStatus"] = rec ? "Open" : "Closed";
    if (["May", "Jun", "Sep", "Oct"].includes(short) && !isHighAlt)
      status = "Open";
    if (["Jul", "Aug"].includes(short) && isHighAlt) status = "Closed";
    const crowd: MonthInfo["crowd"] = ["May", "Jun", "Oct"].includes(short)
      ? "High"
      : ["Apr", "Sep"].includes(short)
        ? "Medium"
        : "Low";
    const weather = rec
      ? "Clear skies, excellent visibility, ideal conditions"
      : ["Jul", "Aug"].includes(short)
        ? "Heavy monsoon rains, slippery trails, poor visibility"
        : ["Dec", "Jan", "Feb"].includes(short)
          ? "Heavy snowfall, extreme cold, trail blocked"
          : "Variable weather, check conditions before starting";
    return {
      name,
      short,
      weather,
      tempMin: baseMin + altFactor,
      tempMax: baseMax + altFactor,
      trailStatus: status,
      crowd,
      recommended: rec,
    } satisfies MonthInfo;
  });
}

const BEST_TIME_FAQS = [
  {
    q: "When is the absolute best time to trek?",
    a: "The spring window (April–June) offers clear skies, blooming rhododendrons, and stable trails. Post-monsoon October is equally spectacular with crystal visibility and fewer crowds.",
  },
  {
    q: "Can I trek during monsoon (July–August)?",
    a: "Most high-altitude treks close during peak monsoon. Valley-level treks like Valley of Flowers are best in July–August when wildflowers bloom. Always check with your guide.",
  },
  {
    q: "Is winter trekking possible?",
    a: "Yes! Kedarkantha, Brahmatal, and Chopta are superb winter treks (Dec–Feb) with heavy snowfall making for dramatic scenery. These require proper winter gear.",
  },
  {
    q: "How does altitude affect the best season?",
    a: "High-altitude treks (>4,500m) have a narrow window — typically May–June and September–October. Lower treks are accessible for longer periods.",
  },
  {
    q: "What about weekends — is the trail crowded?",
    a: "Weekend treks like Triund and Kheerganga are busiest on Saturday–Sunday. Weekday starts guarantee a quieter, more immersive experience.",
  },
  {
    q: "Can I book last-minute?",
    a: "We recommend booking at least 3–4 weeks in advance, especially for May–June and October batches that fill up 2–3 months ahead.",
  },
  {
    q: "Does rain affect the itinerary?",
    a: "Moderate rain is manageable. Continuous heavy rain or thunderstorm may cause a 1-day delay at base camp — built into our itineraries as a buffer day.",
  },
  {
    q: "What is the ideal group size for off-season treks?",
    a: "Smaller groups (4–6 people) are ideal for off-season when facilities may be limited. EternaWings caps batches at 12 for all seasons.",
  },
];

const STATUS_COLORS: Record<MonthInfo["trailStatus"], string> = {
  Open: "var(--ew-green)",
  Partial: "var(--ew-orange)",
  Closed: "#9e9e9e",
};

export default function TrekBestTimePage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/best-time" });
  const trek = TREKS.find((t) => t.slug === slug);

  useEffect(() => {
    const name = trek?.name ?? slug;
    document.title = `Best Time to Trek ${name} | EternaWings`;
  }, [slug, trek]);

  if (!trek) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Link to="/treks" className="btn-primary">
            Browse All Treks
          </Link>
        </div>
      </div>
    );
  }

  const months = getMonthData(trek.bestSeason, trek.altitude);

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={trek.image}
          alt={trek.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/20" />
        <div className="absolute bottom-5 left-0 right-0 container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-shadow">
            Best Time — {trek.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <BreadcrumbNav
          items={[
            { label: "Treks", href: "/treks" },
            { label: trek.name, href: `/treks/${trek.slug}` },
            { label: "Best Time" },
          ]}
        />

        {/* Best season summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-card mb-6 flex items-start gap-4"
        >
          <Calendar
            size={22}
            className="shrink-0 mt-1"
            style={{ color: "var(--ew-red)" }}
            aria-hidden="true"
          />
          <div>
            <h2
              className="font-bold text-lg mb-1"
              style={{ color: "var(--ew-text)" }}
            >
              Recommended Season: {trek.bestSeason}
            </h2>
            <p style={{ color: "var(--ew-text-lt)" }}>
              {trek.name} is best trekked during {trek.bestSeason}. At{" "}
              {trek.altitude.toLocaleString()}m max altitude, weather conditions
              vary dramatically — the month-by-month guide below helps you plan
              the perfect trip.
            </p>
          </div>
        </motion.div>

        {/* Month grid */}
        <h2 className="section-title mb-5">Month-by-Month Guide</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {months.map((m, i) => (
            <motion.div
              key={m.short}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl p-4 shadow-card relative overflow-hidden"
              style={{
                background: m.recommended
                  ? "linear-gradient(135deg, #e8f5e9 0%, #fff 100%)"
                  : "#fff",
                border: m.recommended
                  ? "2px solid var(--ew-green)"
                  : "1px solid var(--ew-gray-mid)",
              }}
              data-ocid={`best_time.month.${i + 1}`}
            >
              {m.recommended && (
                <span
                  className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "var(--ew-green)", color: "#fff" }}
                >
                  ✓ BEST
                </span>
              )}
              <p
                className="font-bold text-sm mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                {m.name}
              </p>
              <div className="space-y-1 text-xs">
                <div
                  className="flex items-center gap-1"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  <Thermometer size={11} aria-hidden="true" />
                  {m.tempMin}° / {m.tempMax}°C
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: STATUS_COLORS[m.trailStatus] }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      color: STATUS_COLORS[m.trailStatus],
                      fontWeight: 600,
                    }}
                  >
                    {m.trailStatus}
                  </span>
                </div>
                <div style={{ color: "var(--ew-gray-dark)" }}>
                  Crowd: {m.crowd}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seasonal guide */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            {
              icon: <Sun size={20} aria-hidden="true" />,
              season: "Summer (Apr–Jun)",
              color: "var(--ew-orange)",
              desc: "Clear skies and blooming meadows. Best visibility. Pre-monsoon window is the most popular — book 2–3 months early for this season.",
            },
            {
              icon: <Cloud size={20} aria-hidden="true" />,
              season: "Monsoon (Jul–Sep)",
              color: "#1565C0",
              desc: "Lush greenery and vibrant wildflowers. Trail is slippery. Only experienced trekkers with waterproof gear should attempt high-altitude routes.",
            },
            {
              icon: (
                <span style={{ fontSize: 20 }} aria-hidden="true">
                  ❄️
                </span>
              ),
              season: "Winter (Oct–Mar)",
              color: "var(--ew-red)",
              desc: "Snow-blanketed landscapes for magical winter treks. Kedarkantha and Brahmatal are classics. Requires extra layering and microspike crampons.",
            },
          ].map((s) => (
            <div
              key={s.season}
              className="bg-white rounded-2xl p-5 shadow-card"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: `${s.color}18`, color: s.color }}
                aria-hidden="true"
              >
                {s.icon}
              </div>
              <h3
                className="font-bold mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                {s.season}
              </h3>
              <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <h2 className="section-title mb-5">Timing FAQs</h2>
        <div className="space-y-3 mb-8">
          {BEST_TIME_FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-card"
              data-ocid={`best_time.faq.${i + 1}`}
            >
              <p
                className="font-semibold text-sm mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Q: {faq.q}
              </p>
              <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/treks/$slug"
            params={{ slug: trek.slug }}
            className="btn-primary"
            data-ocid="best_time.view_trek_button"
          >
            Book {trek.name}
          </Link>
          <Link
            to="/treks/$slug/packing-list"
            params={{ slug: trek.slug }}
            className="btn-secondary"
            data-ocid="best_time.packing_list_link"
          >
            Packing List →
          </Link>
        </div>
      </div>
    </div>
  );
}
