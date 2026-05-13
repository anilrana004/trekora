import { m as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { B as BreadcrumbNav } from "./BreadcrumbNav-CHc2lt2y.js";
import { T as TREKS, m as motion } from "./index-C6rgoof8.js";
import { ao as Flame, ap as Activity, N as CircleCheck } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const TRAINING_PLAN = [
  {
    week: "Week 1–2",
    title: "Build Cardio Base",
    exercises: [
      "30-min brisk walk daily",
      "20 push-ups × 3 sets",
      "Cycling 40 min × 3 days",
      "Stretching 15 min"
    ]
  },
  {
    week: "Week 3–4",
    title: "Increase Endurance",
    exercises: [
      "5km run in < 35 min",
      "Stair climbs 20 floors × 2 sets",
      "50 squats × 3 sets",
      "Core planks 60 sec × 3"
    ]
  },
  {
    week: "Week 5–6",
    title: "Altitude Simulation",
    exercises: [
      "10km hike with 10kg pack",
      "Incline treadmill 45 min",
      "100 lunges per leg",
      "Swimming 30 min (lung capacity)"
    ]
  },
  {
    week: "Week 7–8",
    title: "Peak Conditioning",
    exercises: [
      "15km trail walk",
      "Mock overnight camp hike",
      "Wear final trek boots",
      "Yoga / flexibility training"
    ]
  }
];
const ACCLIMATIZATION_TIPS = [
  {
    title: "Climb High, Sleep Low",
    desc: "Follow the golden rule — trek to higher altitude during the day but return to lower camp to sleep. Ascend no more than 500m per day above 3,000m."
  },
  {
    title: "Hydrate Aggressively",
    desc: "Drink 3–4 litres of water daily at altitude. Dehydration accelerates AMS symptoms. Avoid alcohol for the first 48 hours at altitude."
  },
  {
    title: "Take Acclimatization Days",
    desc: "Acclimatization rest days (built into the itinerary) are non-negotiable. Do not skip them even if you feel fine — symptoms can onset suddenly."
  },
  {
    title: "Recognize AMS Early",
    desc: "Headache, nausea, fatigue = mild AMS. Descend immediately if confusion, ataxia (loss of balance), or persistent vomiting occur. These indicate severe AMS."
  }
];
const DIFFICULTY_FAQS = [
  {
    q: "Am I fit enough for this trek?",
    a: "If you can jog 5km without stopping and climb 10 floors of stairs without breathlessness, you have the base fitness. 8 weeks of preparation will get you trail-ready."
  },
  {
    q: "What does Moderate-Difficult mean exactly?",
    a: "Long days (6–8 hr walking), sustained steep ascents, and altitude above 4,000m. Prior experience on at least 2 easier treks (3,500m+) is highly recommended."
  },
  {
    q: "Can senior citizens (55–65) attempt this trek?",
    a: "With medical clearance and prior trekking experience, yes. We have guided trekkers up to age 68 successfully. Consult your cardiologist before booking."
  },
  {
    q: "What is the minimum age?",
    a: "Minimum 12 years for Easy treks, 16 years for Moderate, and 18 years for Difficult/Extreme. Participants under 18 require guardian consent."
  },
  {
    q: "Should I take Diamox (altitude medication)?",
    a: "Consult your physician. Diamox can help prevent AMS but has side effects including frequent urination and tingling fingers. Not a substitute for acclimatization."
  },
  {
    q: "What if I feel unwell on the trail?",
    a: "Our certified guide carries a first-aid kit and pulse oximeter. Any participant showing severe AMS symptoms will be evacuated immediately — safety first."
  },
  {
    q: "Can I turn back midway?",
    a: "Absolutely. You can descend at any time with a guide escort. No guilt, no pressure. Your safety always takes precedence over completing the route."
  },
  {
    q: "Does weight affect difficulty?",
    a: "Yes. Carrying excess weight adds strain. We recommend keeping your pack under 10kg. Porters are available (₹1,500/day) to carry heavy loads."
  }
];
const DIFF_COLOR_MAP = {
  Easy: { bg: "#e8f5e9", text: "var(--ew-green)" },
  "Easy-Moderate": { bg: "#e8f5e9", text: "var(--ew-green)" },
  Moderate: { bg: "var(--ew-orange-lt)", text: "var(--ew-orange)" },
  "Moderate-Difficult": { bg: "var(--ew-orange-lt)", text: "var(--ew-orange)" },
  Difficult: { bg: "var(--ew-red-lt)", text: "var(--ew-red)" },
  "Difficult-Extreme": { bg: "var(--ew-red-lt)", text: "var(--ew-red)" },
  Extreme: { bg: "#ede7f6", text: "#7b1fa2" }
};
function TrekDifficultyGuidePage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/difficulty-guide" });
  const trek = TREKS.find((t) => t.slug === slug);
  reactExports.useEffect(() => {
    const name = (trek == null ? void 0 : trek.name) ?? slug;
    document.title = `Difficulty Guide — ${name} | EternaWings`;
  }, [slug, trek]);
  if (!trek) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Browse Treks" }) });
  }
  const diffStyle = DIFF_COLOR_MAP[trek.difficulty] ?? DIFF_COLOR_MAP.Moderate;
  const needsAcclim = trek.altitude > 3500;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 md:h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trek.image,
              alt: trek.name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-0 right-0 container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-bold text-white text-shadow", children: [
            "Difficulty Guide — ",
            trek.name
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNav,
            {
              items: [
                { label: "Treks", href: "/treks" },
                { label: trek.name, href: `/treks/${trek.slug}` },
                { label: "Difficulty Guide" }
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-2xl p-5 shadow-card mb-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    style: { background: diffStyle.bg },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Flame,
                      {
                        size: 22,
                        style: { color: diffStyle.text },
                        "aria-hidden": "true"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-bold text-lg",
                        style: { color: "var(--ew-text)" },
                        children: trek.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm font-bold px-3 py-1 rounded-full",
                        style: { background: diffStyle.bg, color: diffStyle.text },
                        children: trek.difficulty
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                    { label: "Duration", val: `${trek.duration} days` },
                    {
                      label: "Max Altitude",
                      val: `${trek.altitude.toLocaleString()}m`
                    },
                    { label: "Distance", val: `${trek.distance} km` },
                    { label: "Difficulty", val: trek.difficulty }
                  ].map(({ label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-lg p-3 text-center",
                      style: { background: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs",
                            style: { color: "var(--ew-gray-dark)" },
                            children: label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-bold text-sm",
                            style: { color: "var(--ew-text)" },
                            children: val
                          }
                        )
                      ]
                    },
                    label
                  )) })
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "bg-white rounded-2xl p-5 shadow-card mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "font-bold text-base mb-4 flex items-center gap-2",
                    style: { color: "var(--ew-text)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Activity,
                        {
                          size: 18,
                          style: { color: "var(--ew-red)" },
                          "aria-hidden": "true"
                        }
                      ),
                      "Physical Requirements"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: [
                  "Jog 5km continuously without stopping",
                  "Climb 15 floors of stairs without rest",
                  "Carry a 10kg backpack for 6 hours",
                  "Walk 15km in a single day with elevation",
                  "Prior experience on at least one Himalayan trek",
                  trek.altitude > 4e3 ? "Familiarity with altitude symptoms (AMS)" : "Basic first-aid knowledge",
                  "No active heart, lung, or joint conditions",
                  trek.altitude > 4500 ? "Experience above 4,000m altitude" : "Good overall cardiovascular health"
                ].map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 15,
                      className: "shrink-0 mt-0.5",
                      style: { color: "var(--ew-green)" },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: req })
                ] }, req)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "8-Week Training Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4 mb-8", children: TRAINING_PLAN.map((phase, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              className: "bg-white rounded-2xl p-5 shadow-card",
              "data-ocid": `difficulty.training.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3",
                    style: {
                      background: "var(--ew-red-lt)",
                      color: "var(--ew-red)"
                    },
                    children: phase.week
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold mb-3",
                    style: { color: "var(--ew-text)" },
                    children: phase.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: phase.exercises.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 14,
                      className: "shrink-0 mt-0.5",
                      style: { color: "var(--ew-orange)" },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: ex })
                ] }, ex)) })
              ]
            },
            phase.week
          )) }),
          needsAcclim && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Altitude Acclimatization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4 mb-8", children: ACCLIMATIZATION_TIPS.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.06 },
                className: "bg-white rounded-xl p-4 shadow-card",
                style: { borderLeft: "4px solid var(--ew-orange)" },
                "data-ocid": `difficulty.acclimatization.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-sm mb-1",
                      style: { color: "var(--ew-text)" },
                      children: tip.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: tip.desc })
                ]
              },
              tip.title
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Difficulty FAQs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-8", children: DIFFICULTY_FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "bg-white rounded-xl p-5 shadow-card",
              "data-ocid": `difficulty.faq.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-semibold text-sm mb-1",
                    style: { color: "var(--ew-text)" },
                    children: [
                      "Q: ",
                      faq.q
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: faq.a })
              ]
            },
            faq.q
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/treks/$slug",
                params: { slug: trek.slug },
                className: "btn-primary",
                "data-ocid": "difficulty.view_trek_button",
                children: [
                  "Book ",
                  trek.name
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/treks/$slug/altitude-profile",
                params: { slug: trek.slug },
                className: "btn-secondary",
                "data-ocid": "difficulty.altitude_link",
                children: "Altitude Profile →"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  TrekDifficultyGuidePage as default
};
