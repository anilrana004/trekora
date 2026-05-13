import { Link, useParams } from "@tanstack/react-router";
import { AlertCircle, Mountain } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { TREKS } from "../data/treks";

interface DayProfile {
  day: number;
  label: string;
  altitude: number;
  distance: number;
  description: string;
}

function buildAltitudeProfile(trek: {
  altitude: number;
  duration: number;
  startPoint: string;
  endPoint: string;
  trekType: string;
}): DayProfile[] {
  const peak = trek.altitude;
  const days = trek.duration;
  // Build a realistic altitude curve:
  // Start at ~1,500m, climb steadily, peak near day 60% of trek, descend
  const startAlt = 1400;
  const peakDay = Math.floor(days * 0.6);
  const distPerDay = Math.round(80 / days);

  const labels = [
    "Drive to Base Camp",
    "Acclimatization / Forest Trail",
    "Camp 1 via Meadows",
    "Camp 2 — High Camp",
    "Summit Day",
    "Descent to Base",
    "Return Trek Out",
    "Drive Back",
  ];

  return Array.from({ length: days }, (_, i) => {
    const d = i + 1;
    let alt: number;
    if (d <= peakDay) {
      alt = Math.round(startAlt + ((peak - startAlt) * d) / peakDay);
    } else {
      alt = Math.round(
        peak - ((peak - startAlt) * (d - peakDay)) / (days - peakDay),
      );
    }
    return {
      day: d,
      label: labels[i] ?? `Day ${d}`,
      altitude: alt,
      distance: distPerDay + (i % 2 === 0 ? 2 : -1),
      description:
        d === peakDay
          ? `Summit day — push to the highest point at ${peak.toLocaleString()}m. Start early (3–4 AM) and return to high camp.`
          : d < peakDay
            ? `Gradual ascent to ${alt.toLocaleString()}m. The trail gains approximately ${Math.round((alt - startAlt) / peakDay)}m per day.`
            : `Descend back to ${alt.toLocaleString()}m. Take it easy — your legs will be tired from the summit push.`,
    };
  });
}

const AMS_TIPS = [
  { tip: "Never exceed 500m altitude gain per day above 3,000m", icon: "📏" },
  { tip: "Drink 3–4 litres of water daily — avoid alcohol", icon: "💧" },
  { tip: "Know AMS symptoms: headache, nausea, dizziness", icon: "🤕" },
  {
    tip: "Descend immediately if symptoms worsen — don't 'wait it out'",
    icon: "⬇️",
  },
  { tip: "Carry a pulse oximeter — target SpO2 > 85% at altitude", icon: "🩺" },
  {
    tip: "Consult a doctor about Diamox (acetazolamide) before trekking",
    icon: "💊",
  },
];

const ALTITUDE_FAQS = [
  {
    q: "What altitude is considered dangerous?",
    a: "Above 4,800m is high altitude where AMS risk increases significantly. Above 5,500m is very high altitude requiring serious acclimatization protocols.",
  },
  {
    q: "How does altitude affect the body?",
    a: "Reduced oxygen (hypoxia) at altitude causes increased breathing rate, elevated heart rate, fluid retention, and reduced cognitive function. The body adapts over 3–5 days.",
  },
  {
    q: "What is a pulse oximeter and should I carry one?",
    a: "It measures blood oxygen saturation (SpO2). At altitude, readings of 90–95% are normal. Below 85% signals AMS risk. Available for ₹800–1,500 online.",
  },
  {
    q: "How accurate is the altitude profile?",
    a: "This is an approximated profile. Actual altitudes may vary ±200m. Your trek leader will have a GPS device with live altitude readings throughout the trek.",
  },
  {
    q: "What is the gain per day recommended?",
    a: "500m maximum per day above 3,000m. Our itineraries are designed to honour this rule with rest days built in at critical altitudes.",
  },
  {
    q: "Can children handle high altitude?",
    a: "Children acclimatize faster than adults but are also more susceptible to severe AMS. Medical clearance and pediatrician consultation is mandatory for under-18.",
  },
  {
    q: "What food helps at altitude?",
    a: "High-carbohydrate, easy-to-digest foods. Avoid heavy fat/protein-rich meals. Dal, rice, and soup are ideal high-altitude trail foods.",
  },
  {
    q: "Is the altitude profile the same every year?",
    a: "The terrain is fixed, but snow coverage and trail conditions vary by season. This may affect your ability to reach the summit on certain dates.",
  },
];

export default function TrekAltitudeProfilePage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/altitude-profile" });
  const trek = TREKS.find((t) => t.slug === slug);

  useEffect(() => {
    const name = trek?.name ?? slug;
    document.title = `Altitude Profile — ${name} | EternaWings`;
  }, [slug, trek]);

  const profile = useMemo(
    () => (trek ? buildAltitudeProfile(trek) : []),
    [trek],
  );

  if (!trek) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Link to="/treks" className="btn-primary">
          Browse Treks
        </Link>
      </div>
    );
  }

  // SVG chart dimensions
  const W = 600;
  const H = 200;
  const PAD = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const altMin = Math.min(...profile.map((p) => p.altitude)) - 200;
  const altMax = Math.max(...profile.map((p) => p.altitude)) + 200;

  const xScale = (i: number) => PAD.left + (i / (profile.length - 1)) * chartW;
  const yScale = (alt: number) =>
    PAD.top + chartH - ((alt - altMin) / (altMax - altMin)) * chartH;

  const pathD = profile
    .map((p, i) =>
      i === 0
        ? `M ${xScale(i)} ${yScale(p.altitude)}`
        : `L ${xScale(i)} ${yScale(p.altitude)}`,
    )
    .join(" ");

  const areaD = [
    ...profile.map((p, i) =>
      i === 0
        ? `M ${xScale(i)} ${yScale(p.altitude)}`
        : `L ${xScale(i)} ${yScale(p.altitude)}`,
    ),
    `L ${xScale(profile.length - 1)} ${PAD.top + chartH}`,
    `L ${xScale(0)} ${PAD.top + chartH}`,
    "Z",
  ].join(" ");

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
            Altitude Profile — {trek.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <BreadcrumbNav
          items={[
            { label: "Treks", href: "/treks" },
            { label: trek.name, href: `/treks/${trek.slug}` },
            { label: "Altitude Profile" },
          ]}
        />

        {/* SVG Chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-card mb-6"
          data-ocid="altitude.chart_section"
        >
          <div className="flex items-center gap-2 mb-4">
            <Mountain
              size={20}
              style={{ color: "var(--ew-red)" }}
              aria-hidden="true"
            />
            <h2
              className="font-bold text-base"
              style={{ color: "var(--ew-text)" }}
            >
              Elevation Gain — {trek.duration}-Day Trek Profile
            </h2>
          </div>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              width={W}
              height={H}
              role="img"
              aria-label={`Altitude profile chart for ${trek.name}`}
              style={{ minWidth: "320px", maxWidth: "100%" }}
            >
              {/* Background */}
              <rect
                x={PAD.left}
                y={PAD.top}
                width={chartW}
                height={chartH}
                fill="var(--ew-gray-lt)"
                rx={4}
              />

              {/* Horizontal grid lines */}
              {[0.25, 0.5, 0.75].map((t) => {
                const y = PAD.top + chartH * (1 - t);
                const alt = Math.round(altMin + (altMax - altMin) * t);
                return (
                  <g key={t}>
                    <line
                      x1={PAD.left}
                      y1={y}
                      x2={PAD.left + chartW}
                      y2={y}
                      stroke="#ddd"
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={PAD.left - 5}
                      y={y + 4}
                      textAnchor="end"
                      fontSize={9}
                      fill="var(--ew-gray-dark)"
                    >
                      {alt}m
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="rgba(232,119,34,0.12)" />

              {/* Line */}
              <path
                d={pathD}
                fill="none"
                stroke="var(--ew-orange)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />

              {/* Day markers */}
              {profile.map((p, i) => (
                <g key={p.day}>
                  <circle
                    cx={xScale(i)}
                    cy={yScale(p.altitude)}
                    r={4}
                    fill="var(--ew-red)"
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                  <text
                    x={xScale(i)}
                    y={PAD.top + chartH + 14}
                    textAnchor="middle"
                    fontSize={9}
                    fill="var(--ew-gray-dark)"
                  >
                    D{p.day}
                  </text>
                </g>
              ))}

              {/* Peak label */}
              {(() => {
                const peakIdx = profile.reduce(
                  (best, p, i) =>
                    p.altitude > profile[best].altitude ? i : best,
                  0,
                );
                const px = xScale(peakIdx);
                const py = yScale(profile[peakIdx].altitude);
                return (
                  <g>
                    <text
                      x={px}
                      y={py - 8}
                      textAnchor="middle"
                      fontSize={9}
                      fill="var(--ew-red)"
                      fontWeight={700}
                    >
                      {profile[peakIdx].altitude.toLocaleString()}m
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </motion.div>

        {/* Day-by-day table */}
        <h2 className="section-title mb-5">Day-by-Day Altitude</h2>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--ew-red)", color: "#fff" }}>
                  <th className="px-4 py-3 text-left font-semibold">Day</th>
                  <th className="px-4 py-3 text-left font-semibold">Stage</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Altitude
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Distance
                  </th>
                </tr>
              </thead>
              <tbody>
                {profile.map((p, i) => (
                  <tr
                    key={p.day}
                    style={{
                      background: i % 2 === 0 ? "var(--ew-gray-lt)" : "#fff",
                    }}
                    data-ocid={`altitude.day_row.${i + 1}`}
                  >
                    <td
                      className="px-4 py-3 font-bold"
                      style={{ color: "var(--ew-red)" }}
                    >
                      Day {p.day}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {p.label}
                    </td>
                    <td
                      className="px-4 py-3 text-right font-semibold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      {p.altitude.toLocaleString()}m
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      ~{p.distance} km
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AMS prevention */}
        <h2 className="section-title mb-5">Altitude Sickness Prevention</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {AMS_TIPS.map((t, i) => (
            <motion.div
              key={t.tip}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl p-4 shadow-card flex items-start gap-3"
              data-ocid={`altitude.ams_tip.${i + 1}`}
            >
              <span className="text-xl shrink-0" aria-hidden="true">
                {t.icon}
              </span>
              <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                {t.tip}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Warning box */}
        {trek.altitude > 4500 && (
          <div
            className="flex items-start gap-3 rounded-xl p-4 mb-8"
            style={{
              background: "var(--ew-orange-lt)",
              border: "1px solid var(--ew-orange)",
            }}
            role="alert"
          >
            <AlertCircle
              size={18}
              style={{ color: "var(--ew-orange)", flexShrink: 0 }}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--ew-text)" }}
              >
                High Altitude Warning — {trek.altitude.toLocaleString()}m
              </p>
              <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                This trek exceeds 4,500m. Medical fitness certificate is
                mandatory. Consult a physician and obtain Diamox prescription
                before departure.
              </p>
            </div>
          </div>
        )}

        {/* FAQs */}
        <h2 className="section-title mb-5">Altitude FAQs</h2>
        <div className="space-y-3 mb-8">
          {ALTITUDE_FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-card"
              data-ocid={`altitude.faq.${i + 1}`}
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
            data-ocid="altitude.book_button"
          >
            Book {trek.name}
          </Link>
          <Link
            to="/treks/$slug/difficulty-guide"
            params={{ slug: trek.slug }}
            className="btn-secondary"
            data-ocid="altitude.difficulty_link"
          >
            Difficulty Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
