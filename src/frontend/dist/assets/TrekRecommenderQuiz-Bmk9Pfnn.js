import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion, A as AnimatePresence, T as TREKS } from "./index-C6rgoof8.js";
import { X } from "./icons-DrFRvHmE.js";
const STEPS = [
  {
    step: 1,
    question: "Your fitness level?",
    field: "fitness",
    options: [
      { value: "beginner", label: "Beginner", icon: "🚶" },
      { value: "moderate", label: "Moderate", icon: "🏃" },
      { value: "fit", label: "Fit", icon: "⛰️" },
      { value: "veryfit", label: "Very Fit", icon: "🏔️" }
    ]
  },
  {
    step: 2,
    question: "Trip duration?",
    field: "duration",
    options: [
      { value: "weekend", label: "Weekend", icon: "📅", sub: "1–2 days" },
      { value: "short", label: "Short Trip", icon: "🗓", sub: "4–6 days" },
      { value: "long", label: "Full Trek", icon: "⛺", sub: "7+ days" }
    ]
  },
  {
    step: 3,
    question: "Your budget?",
    field: "budget",
    options: [
      { value: "budget", label: "Budget", icon: "💰", sub: "Under ₹8,000" },
      { value: "mid", label: "Mid-range", icon: "💳", sub: "₹8,000–15,000" },
      { value: "premium", label: "Premium", icon: "✨", sub: "₹15,000+" }
    ]
  },
  {
    step: 4,
    question: "Preferred terrain?",
    field: "terrain",
    options: [
      { value: "snow", label: "Snow", icon: "🌨", sub: "Glacial & snow routes" },
      {
        value: "forest",
        label: "Forest",
        icon: "🌲",
        sub: "Dense woodland trails"
      },
      {
        value: "altitude",
        label: "High Altitude",
        icon: "🏔",
        sub: "Above 4,000m"
      },
      {
        value: "valley",
        label: "Coastal/Valley",
        icon: "🌊",
        sub: "River valleys & meadows"
      }
    ]
  }
];
function matchTreks(answers) {
  return TREKS.map((trek) => {
    let score = 0;
    const { fitness } = answers;
    const diff = trek.difficulty.toLowerCase();
    if (fitness === "beginner" && diff.includes("easy") && !diff.includes("moderate"))
      score += 3;
    else if (fitness === "moderate" && (diff.includes("moderate") || diff.includes("easy")))
      score += 3;
    else if (fitness === "fit" && (diff.includes("difficult") || diff.includes("moderate")))
      score += 3;
    else if (fitness === "veryfit" && (diff.includes("difficult") || diff.includes("extreme")))
      score += 3;
    else score += 1;
    const { duration } = answers;
    if (duration === "weekend" && trek.duration <= 3) score += 3;
    else if (duration === "short" && trek.duration >= 4 && trek.duration <= 6)
      score += 3;
    else if (duration === "long" && trek.duration >= 7) score += 3;
    else score += 1;
    const { budget } = answers;
    if (budget === "budget" && trek.price < 8e3) score += 3;
    else if (budget === "mid" && trek.price >= 8e3 && trek.price <= 15e3)
      score += 3;
    else if (budget === "premium" && trek.price > 15e3) score += 3;
    else score += 1;
    const { terrain } = answers;
    const cat = `${trek.category} ${trek.description}`.toLowerCase();
    if (terrain === "snow" && (cat.includes("snow") || cat.includes("glacial") || cat.includes("winter")))
      score += 3;
    else if (terrain === "forest" && (cat.includes("forest") || cat.includes("oak") || cat.includes("rhododendron")))
      score += 3;
    else if (terrain === "altitude" && trek.altitude >= 4e3) score += 3;
    else if (terrain === "valley" && (cat.includes("valley") || cat.includes("meadow") || cat.includes("bugyal")))
      score += 3;
    else score += 1;
    return { trek, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3).map((r) => r.trek);
}
function OptionCard({
  icon,
  label,
  sub,
  selected,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-all cursor-pointer border-2",
      style: {
        borderColor: selected ? "var(--ew-red)" : "var(--ew-gray-mid)",
        backgroundColor: selected ? "var(--ew-red-lt)" : "#fff"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-sm font-semibold",
            style: { color: selected ? "var(--ew-red)" : "var(--ew-text)" },
            children: label
          }
        ),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px]", style: { color: "var(--ew-gray-dark)" }, children: sub })
      ]
    }
  );
}
function ResultCard({ trek, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 },
      className: "flex gap-3 rounded-xl overflow-hidden",
      style: { border: "1px solid var(--ew-gray-mid)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: trek.image.replace("w=1200", "w=200"),
            alt: trek.name,
            className: "w-20 h-20 object-cover flex-shrink-0",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 py-2 pr-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-bold text-sm truncate",
              style: { color: "var(--ew-text)" },
              children: trek.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mb-1", style: { color: "var(--ew-gray-dark)" }, children: [
            trek.duration,
            " days · ",
            trek.difficulty
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-sm font-bold mb-2",
              style: { color: "var(--ew-orange)" },
              children: [
                "₹",
                trek.price.toLocaleString("en-IN")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/treks/$slug",
              params: { slug: trek.slug },
              className: "text-xs font-semibold px-3 py-1 rounded-full inline-block",
              style: {
                backgroundColor: "var(--ew-orange)",
                color: "#fff"
              },
              "data-ocid": `quiz.result_book_button.${index + 1}`,
              children: "Book Now"
            }
          )
        ] })
      ]
    }
  );
}
function TrekRecommenderQuiz() {
  const [open, setOpen] = reactExports.useState(false);
  const [step, setStep] = reactExports.useState(1);
  const [answers, setAnswers] = reactExports.useState({});
  const [results, setResults] = reactExports.useState(null);
  const currentStepConfig = STEPS.find((s) => s.step === step);
  const currentAnswer = answers[currentStepConfig.field];
  function handleSelect(value) {
    setAnswers((prev) => ({ ...prev, [currentStepConfig.field]: value }));
  }
  function handleNext() {
    if (!currentAnswer) return;
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      finishQuiz();
    }
  }
  function finishQuiz() {
    const a = answers;
    const matched = matchTreks(a);
    setResults(matched);
    try {
      localStorage.setItem(
        "ih_quiz_result",
        JSON.stringify({ answers: a, results: matched.map((t) => t.slug) })
      );
    } catch {
    }
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: "quiz_complete",
        result: matched.map((t) => t.slug)
      });
    }
  }
  function handleRetake() {
    setAnswers({});
    setStep(1);
    setResults(null);
  }
  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setAnswers({});
      setStep(1);
      setResults(null);
    }, 300);
  }
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setTimeout(() => {
          setAnswers({});
          setStep(1);
          setResults(null);
        }, 300);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const progressPct = results ? 100 : (step - 1) / 4 * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        onClick: () => setOpen(true),
        whileHover: { scale: 1.06 },
        whileTap: { scale: 0.96 },
        className: "fixed bottom-[7.5rem] right-5 z-50 flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-elevated",
        style: { backgroundColor: "var(--ew-orange)" },
        "aria-label": "Open trek recommender quiz",
        "data-ocid": "quiz.open_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🧭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Find My Trek" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
        style: { backgroundColor: "rgba(0,0,0,0.55)" },
        onClick: (e) => {
          if (e.target === e.currentTarget) handleClose();
        },
        "data-ocid": "quiz.modal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.92, opacity: 0, y: 20 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.92, opacity: 0, y: 20 },
            transition: { duration: 0.25 },
            className: "bg-white rounded-2xl shadow-deep w-full max-w-md overflow-hidden",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-5 py-4 flex items-center justify-between",
                  style: { backgroundColor: "var(--ew-red)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium opacity-75 mb-0.5", children: "EternaWings Trek Finder" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-xl font-bold", children: results ? "Your Perfect Treks 🏔" : "Find Your Perfect Trek" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleClose,
                        className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                        style: { backgroundColor: "rgba(255,255,255,0.15)" },
                        "aria-label": "Close quiz",
                        "data-ocid": "quiz.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18, className: "text-white" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5",
                  style: { backgroundColor: "var(--ew-gray-mid)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "h-full rounded-r-full",
                      style: { backgroundColor: "var(--ew-red)" },
                      initial: { width: 0 },
                      animate: { width: `${progressPct}%` },
                      transition: { duration: 0.4 }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !results ? (
                /* Quiz step */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 30 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -30 },
                    transition: { duration: 0.2 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-3", children: [
                        [1, 2, 3, 4].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex-1 h-1 rounded-full transition-colors",
                            style: {
                              backgroundColor: s <= step ? "var(--ew-red)" : "var(--ew-gray-mid)"
                            }
                          },
                          s
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-xs ml-2 font-medium whitespace-nowrap",
                            style: { color: "var(--ew-gray-dark)" },
                            children: [
                              step,
                              "/4"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "text-base font-bold mb-4",
                          style: { color: "var(--ew-text)" },
                          children: currentStepConfig.question
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `grid gap-3 mb-5 ${currentStepConfig.options.length === 4 ? "grid-cols-2" : "grid-cols-3"}`,
                          children: currentStepConfig.options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            OptionCard,
                            {
                              icon: opt.icon,
                              label: opt.label,
                              sub: opt.sub,
                              selected: currentAnswer === opt.value,
                              onClick: () => handleSelect(opt.value)
                            },
                            opt.value
                          ))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleNext,
                          disabled: !currentAnswer,
                          className: "w-full font-semibold py-3 rounded-xl text-sm transition-all",
                          style: {
                            backgroundColor: currentAnswer ? "var(--ew-orange)" : "var(--ew-gray-mid)",
                            color: currentAnswer ? "#fff" : "var(--ew-gray-dark)",
                            cursor: currentAnswer ? "pointer" : "not-allowed"
                          },
                          "data-ocid": `quiz.step${step}.next_button`,
                          children: step === 4 ? "Find My Trek →" : "Next →"
                        }
                      )
                    ]
                  },
                  `step-${step}`
                )
              ) : (
                /* Results */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 30 },
                    animate: { opacity: 1, x: 0 },
                    transition: { duration: 0.25 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm mb-4",
                          style: { color: "var(--ew-text-lt)" },
                          children: "Based on your preferences, here are your top 3 recommended treks:"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: results.map((trek, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { trek, index: i }, trek.id)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleRetake,
                          className: "w-full border-2 font-semibold py-2.5 rounded-xl text-sm transition-colors",
                          style: {
                            borderColor: "var(--ew-red)",
                            color: "var(--ew-red)"
                          },
                          "data-ocid": "quiz.retake_button",
                          children: "🔄 Retake Quiz"
                        }
                      )
                    ]
                  },
                  "results"
                )
              ) }) })
            ]
          }
        )
      }
    ) })
  ] });
}
export {
  TrekRecommenderQuiz as T
};
