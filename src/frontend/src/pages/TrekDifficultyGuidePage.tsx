import { Link, useParams } from "@tanstack/react-router";
import { Activity, CheckCircle2, Flame } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import BreadcrumbNav from "../components/BreadcrumbNav";
import { TREKS } from "../data/treks";

const TRAINING_PLAN = [
  {
    week: "Week 1–2",
    title: "Build Cardio Base",
    exercises: [
      "30-min brisk walk daily",
      "20 push-ups × 3 sets",
      "Cycling 40 min × 3 days",
      "Stretching 15 min",
    ],
  },
  {
    week: "Week 3–4",
    title: "Increase Endurance",
    exercises: [
      "5km run in < 35 min",
      "Stair climbs 20 floors × 2 sets",
      "50 squats × 3 sets",
      "Core planks 60 sec × 3",
    ],
  },
  {
    week: "Week 5–6",
    title: "Altitude Simulation",
    exercises: [
      "10km hike with 10kg pack",
      "Incline treadmill 45 min",
      "100 lunges per leg",
      "Swimming 30 min (lung capacity)",
    ],
  },
  {
    week: "Week 7–8",
    title: "Peak Conditioning",
    exercises: [
      "15km trail walk",
      "Mock overnight camp hike",
      "Wear final trek boots",
      "Yoga / flexibility training",
    ],
  },
];

const ACCLIMATIZATION_TIPS = [
  {
    title: "Climb High, Sleep Low",
    desc: "Follow the golden rule — trek to higher altitude during the day but return to lower camp to sleep. Ascend no more than 500m per day above 3,000m.",
  },
  {
    title: "Hydrate Aggressively",
    desc: "Drink 3–4 litres of water daily at altitude. Dehydration accelerates AMS symptoms. Avoid alcohol for the first 48 hours at altitude.",
  },
  {
    title: "Take Acclimatization Days",
    desc: "Acclimatization rest days (built into the itinerary) are non-negotiable. Do not skip them even if you feel fine — symptoms can onset suddenly.",
  },
  {
    title: "Recognize AMS Early",
    desc: "Headache, nausea, fatigue = mild AMS. Descend immediately if confusion, ataxia (loss of balance), or persistent vomiting occur. These indicate severe AMS.",
  },
];

const DIFFICULTY_FAQS = [
  {
    q: "Am I fit enough for this trek?",
    a: "If you can jog 5km without stopping and climb 10 floors of stairs without breathlessness, you have the base fitness. 8 weeks of preparation will get you trail-ready.",
  },
  {
    q: "What does Moderate-Difficult mean exactly?",
    a: "Long days (6–8 hr walking), sustained steep ascents, and altitude above 4,000m. Prior experience on at least 2 easier treks (3,500m+) is highly recommended.",
  },
  {
    q: "Can senior citizens (55–65) attempt this trek?",
    a: "With medical clearance and prior trekking experience, yes. We have guided trekkers up to age 68 successfully. Consult your cardiologist before booking.",
  },
  {
    q: "What is the minimum age?",
    a: "Minimum 12 years for Easy treks, 16 years for Moderate, and 18 years for Difficult/Extreme. Participants under 18 require guardian consent.",
  },
  {
    q: "Should I take Diamox (altitude medication)?",
    a: "Consult your physician. Diamox can help prevent AMS but has side effects including frequent urination and tingling fingers. Not a substitute for acclimatization.",
  },
  {
    q: "What if I feel unwell on the trail?",
    a: "Our certified guide carries a first-aid kit and pulse oximeter. Any participant showing severe AMS symptoms will be evacuated immediately — safety first.",
  },
  {
    q: "Can I turn back midway?",
    a: "Absolutely. You can descend at any time with a guide escort. No guilt, no pressure. Your safety always takes precedence over completing the route.",
  },
  {
    q: "Does weight affect difficulty?",
    a: "Yes. Carrying excess weight adds strain. We recommend keeping your pack under 10kg. Porters are available (₹1,500/day) to carry heavy loads.",
  },
];

const DIFF_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  Easy: { bg: "#e8f5e9", text: "var(--ew-green)" },
  "Easy-Moderate": { bg: "#e8f5e9", text: "var(--ew-green)" },
  Moderate: { bg: "var(--ew-orange-lt)", text: "var(--ew-orange)" },
  "Moderate-Difficult": { bg: "var(--ew-orange-lt)", text: "var(--ew-orange)" },
  Difficult: { bg: "var(--ew-red-lt)", text: "var(--ew-red)" },
  "Difficult-Extreme": { bg: "var(--ew-red-lt)", text: "var(--ew-red)" },
  Extreme: { bg: "#ede7f6", text: "#7b1fa2" },
};

export default function TrekDifficultyGuidePage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/difficulty-guide" });
  const trek = TREKS.find((t) => t.slug === slug);

  useEffect(() => {
    const name = trek?.name ?? slug;
    document.title = `Difficulty Guide — ${name} | EternaWings`;
  }, [slug, trek]);

  if (!trek) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Link to="/treks" className="btn-primary">
          Browse Treks
        </Link>
      </div>
    );
  }

  const diffStyle = DIFF_COLOR_MAP[trek.difficulty] ?? DIFF_COLOR_MAP.Moderate;
  const needsAcclim = trek.altitude > 3500;

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
            Difficulty Guide — {trek.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <BreadcrumbNav
          items={[
            { label: "Treks", href: "/treks" },
            { label: trek.name, href: `/treks/${trek.slug}` },
            { label: "Difficulty Guide" },
          ]}
        />

        {/* Difficulty overview card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-card mb-6"
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: diffStyle.bg }}
            >
              <Flame
                size={22}
                style={{ color: diffStyle.text }}
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className="font-bold text-lg"
                  style={{ color: "var(--ew-text)" }}
                >
                  {trek.name}
                </h2>
                <span
                  className="text-sm font-bold px-3 py-1 rounded-full"
                  style={{ background: diffStyle.bg, color: diffStyle.text }}
                >
                  {trek.difficulty}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Duration", val: `${trek.duration} days` },
                  {
                    label: "Max Altitude",
                    val: `${trek.altitude.toLocaleString()}m`,
                  },
                  { label: "Distance", val: `${trek.distance} km` },
                  { label: "Difficulty", val: trek.difficulty },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    className="rounded-lg p-3 text-center"
                    style={{ background: "var(--ew-gray-lt)" }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Physical requirements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-5 shadow-card mb-6"
        >
          <h2
            className="font-bold text-base mb-4 flex items-center gap-2"
            style={{ color: "var(--ew-text)" }}
          >
            <Activity
              size={18}
              style={{ color: "var(--ew-red)" }}
              aria-hidden="true"
            />
            Physical Requirements
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              "Jog 5km continuously without stopping",
              "Climb 15 floors of stairs without rest",
              "Carry a 10kg backpack for 6 hours",
              "Walk 15km in a single day with elevation",
              "Prior experience on at least one Himalayan trek",
              trek.altitude > 4000
                ? "Familiarity with altitude symptoms (AMS)"
                : "Basic first-aid knowledge",
              "No active heart, lung, or joint conditions",
              trek.altitude > 4500
                ? "Experience above 4,000m altitude"
                : "Good overall cardiovascular health",
            ].map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--ew-green)" }}
                  aria-hidden="true"
                />
                <span style={{ color: "var(--ew-text-lt)" }}>{req}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 8-week training plan */}
        <h2 className="section-title mb-5">8-Week Training Plan</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {TRAINING_PLAN.map((phase, i) => (
            <motion.div
              key={phase.week}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-card"
              data-ocid={`difficulty.training.${i + 1}`}
            >
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3"
                style={{
                  background: "var(--ew-red-lt)",
                  color: "var(--ew-red)",
                }}
              >
                {phase.week}
              </div>
              <h3
                className="font-bold mb-3"
                style={{ color: "var(--ew-text)" }}
              >
                {phase.title}
              </h3>
              <ul className="space-y-1.5">
                {phase.exercises.map((ex) => (
                  <li key={ex} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      size={14}
                      className="shrink-0 mt-0.5"
                      style={{ color: "var(--ew-orange)" }}
                      aria-hidden="true"
                    />
                    <span style={{ color: "var(--ew-text-lt)" }}>{ex}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Altitude acclimatization (conditional) */}
        {needsAcclim && (
          <>
            <h2 className="section-title mb-5">Altitude Acclimatization</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {ACCLIMATIZATION_TIPS.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-xl p-4 shadow-card"
                  style={{ borderLeft: "4px solid var(--ew-orange)" }}
                  data-ocid={`difficulty.acclimatization.${i + 1}`}
                >
                  <h3
                    className="font-bold text-sm mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {tip.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    {tip.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* FAQs */}
        <h2 className="section-title mb-5">Difficulty FAQs</h2>
        <div className="space-y-3 mb-8">
          {DIFFICULTY_FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-card"
              data-ocid={`difficulty.faq.${i + 1}`}
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
            data-ocid="difficulty.view_trek_button"
          >
            Book {trek.name}
          </Link>
          <Link
            to="/treks/$slug/altitude-profile"
            params={{ slug: trek.slug }}
            className="btn-secondary"
            data-ocid="difficulty.altitude_link"
          >
            Altitude Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}
