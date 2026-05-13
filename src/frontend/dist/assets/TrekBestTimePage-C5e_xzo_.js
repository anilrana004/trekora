import { m as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { B as BreadcrumbNav } from "./BreadcrumbNav-CHc2lt2y.js";
import { T as TREKS, m as motion } from "./index-C6rgoof8.js";
import { ab as Calendar, y as Thermometer, aq as Sun, ar as Cloud } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
function getMonthData(bestSeason, altitude) {
  const isHighAlt = altitude > 4e3;
  const seasonLower = bestSeason.toLowerCase();
  const isGoodMonth = (m) => {
    const map = {
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
      dec: seasonLower.includes("dec") || seasonLower.includes("win")
    };
    return map[m] ?? false;
  };
  const months = [
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
    { name: "December", short: "Dec", baseMin: -10, baseMax: 1 }
  ];
  const altFactor = isHighAlt ? -6 : -3;
  return months.map(({ name, short, baseMin, baseMax }) => {
    const rec = isGoodMonth(short.toLowerCase());
    let status = rec ? "Open" : "Closed";
    if (["May", "Jun", "Sep", "Oct"].includes(short) && !isHighAlt)
      status = "Open";
    if (["Jul", "Aug"].includes(short) && isHighAlt) status = "Closed";
    const crowd = ["May", "Jun", "Oct"].includes(short) ? "High" : ["Apr", "Sep"].includes(short) ? "Medium" : "Low";
    const weather = rec ? "Clear skies, excellent visibility, ideal conditions" : ["Jul", "Aug"].includes(short) ? "Heavy monsoon rains, slippery trails, poor visibility" : ["Dec", "Jan", "Feb"].includes(short) ? "Heavy snowfall, extreme cold, trail blocked" : "Variable weather, check conditions before starting";
    return {
      name,
      short,
      weather,
      tempMin: baseMin + altFactor,
      tempMax: baseMax + altFactor,
      trailStatus: status,
      crowd,
      recommended: rec
    };
  });
}
const BEST_TIME_FAQS = [
  {
    q: "When is the absolute best time to trek?",
    a: "The spring window (April–June) offers clear skies, blooming rhododendrons, and stable trails. Post-monsoon October is equally spectacular with crystal visibility and fewer crowds."
  },
  {
    q: "Can I trek during monsoon (July–August)?",
    a: "Most high-altitude treks close during peak monsoon. Valley-level treks like Valley of Flowers are best in July–August when wildflowers bloom. Always check with your guide."
  },
  {
    q: "Is winter trekking possible?",
    a: "Yes! Kedarkantha, Brahmatal, and Chopta are superb winter treks (Dec–Feb) with heavy snowfall making for dramatic scenery. These require proper winter gear."
  },
  {
    q: "How does altitude affect the best season?",
    a: "High-altitude treks (>4,500m) have a narrow window — typically May–June and September–October. Lower treks are accessible for longer periods."
  },
  {
    q: "What about weekends — is the trail crowded?",
    a: "Weekend treks like Triund and Kheerganga are busiest on Saturday–Sunday. Weekday starts guarantee a quieter, more immersive experience."
  },
  {
    q: "Can I book last-minute?",
    a: "We recommend booking at least 3–4 weeks in advance, especially for May–June and October batches that fill up 2–3 months ahead."
  },
  {
    q: "Does rain affect the itinerary?",
    a: "Moderate rain is manageable. Continuous heavy rain or thunderstorm may cause a 1-day delay at base camp — built into our itineraries as a buffer day."
  },
  {
    q: "What is the ideal group size for off-season treks?",
    a: "Smaller groups (4–6 people) are ideal for off-season when facilities may be limited. EternaWings caps batches at 12 for all seasons."
  }
];
const STATUS_COLORS = {
  Open: "var(--ew-green)",
  Partial: "var(--ew-orange)",
  Closed: "#9e9e9e"
};
function TrekBestTimePage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/best-time" });
  const trek = TREKS.find((t) => t.slug === slug);
  reactExports.useEffect(() => {
    const name = (trek == null ? void 0 : trek.name) ?? slug;
    document.title = `Best Time to Trek ${name} | EternaWings`;
  }, [slug, trek]);
  if (!trek) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Browse All Treks" }) }) });
  }
  const months = getMonthData(trek.bestSeason, trek.altitude);
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
            "Best Time — ",
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
                { label: "Best Time" }
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-2xl p-5 shadow-card mb-6 flex items-start gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calendar,
                  {
                    size: 22,
                    className: "shrink-0 mt-1",
                    style: { color: "var(--ew-red)" },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h2",
                    {
                      className: "font-bold text-lg mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Recommended Season: ",
                        trek.bestSeason
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "var(--ew-text-lt)" }, children: [
                    trek.name,
                    " is best trekked during ",
                    trek.bestSeason,
                    ". At",
                    " ",
                    trek.altitude.toLocaleString(),
                    "m max altitude, weather conditions vary dramatically — the month-by-month guide below helps you plan the perfect trip."
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Month-by-Month Guide" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8", children: months.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: i * 0.04 },
              className: "rounded-xl p-4 shadow-card relative overflow-hidden",
              style: {
                background: m.recommended ? "linear-gradient(135deg, #e8f5e9 0%, #fff 100%)" : "#fff",
                border: m.recommended ? "2px solid var(--ew-green)" : "1px solid var(--ew-gray-mid)"
              },
              "data-ocid": `best_time.month.${i + 1}`,
              children: [
                m.recommended && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded",
                    style: { background: "var(--ew-green)", color: "#fff" },
                    children: "✓ BEST"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-sm mb-2",
                    style: { color: "var(--ew-text)" },
                    children: m.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1",
                      style: { color: "var(--ew-text-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { size: 11, "aria-hidden": "true" }),
                        m.tempMin,
                        "° / ",
                        m.tempMax,
                        "°C"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2 h-2 rounded-full",
                        style: { background: STATUS_COLORS[m.trailStatus] },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          color: STATUS_COLORS[m.trailStatus],
                          fontWeight: 600
                        },
                        children: m.trailStatus
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "var(--ew-gray-dark)" }, children: [
                    "Crowd: ",
                    m.crowd
                  ] })
                ] })
              ]
            },
            m.short
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3 mb-8", children: [
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 20, "aria-hidden": "true" }),
              season: "Summer (Apr–Jun)",
              color: "var(--ew-orange)",
              desc: "Clear skies and blooming meadows. Best visibility. Pre-monsoon window is the most popular — book 2–3 months early for this season."
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cloud, { size: 20, "aria-hidden": "true" }),
              season: "Monsoon (Jul–Sep)",
              color: "#1565C0",
              desc: "Lush greenery and vibrant wildflowers. Trail is slippery. Only experienced trekkers with waterproof gear should attempt high-altitude routes."
            },
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, "aria-hidden": "true", children: "❄️" }),
              season: "Winter (Oct–Mar)",
              color: "var(--ew-red)",
              desc: "Snow-blanketed landscapes for magical winter treks. Kedarkantha and Brahmatal are classics. Requires extra layering and microspike crampons."
            }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-5 shadow-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-10 h-10 rounded-full flex items-center justify-center mb-3",
                    style: { background: `${s.color}18`, color: s.color },
                    "aria-hidden": "true",
                    children: s.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: s.season
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: s.desc })
              ]
            },
            s.season
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Timing FAQs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-8", children: BEST_TIME_FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "bg-white rounded-xl p-5 shadow-card",
              "data-ocid": `best_time.faq.${i + 1}`,
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
                "data-ocid": "best_time.view_trek_button",
                children: [
                  "Book ",
                  trek.name
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/treks/$slug/packing-list",
                params: { slug: trek.slug },
                className: "btn-secondary",
                "data-ocid": "best_time.packing_list_link",
                children: "Packing List →"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  TrekBestTimePage as default
};
