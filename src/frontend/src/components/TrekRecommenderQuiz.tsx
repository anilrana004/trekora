import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usesTravelSideActionRail } from "@/lib/travel-side-rail";
import { TREKS } from "../data/treks";
import type { Trek } from "../data/treks";
import OptimizedImage from "./media/OptimizedImage";
import { bookSearch } from "@/lib/book-search";

/* ── Types ────────────────────────────────────────────────── */
type Fitness = "beginner" | "moderate" | "fit" | "veryfit";
type Duration = "weekend" | "short" | "long";
type Budget = "budget" | "mid" | "premium";
type Terrain = "snow" | "forest" | "altitude" | "valley";

interface QuizAnswers {
  fitness?: Fitness;
  duration?: Duration;
  budget?: Budget;
  terrain?: Terrain;
}

type Step = 1 | 2 | 3 | 4;

/* ── Step config ──────────────────────────────────────────── */
const STEPS = [
  {
    step: 1 as Step,
    question: "Your fitness level?",
    field: "fitness" as const,
    options: [
      { value: "beginner", label: "Beginner", icon: "🚶" },
      { value: "moderate", label: "Moderate", icon: "🏃" },
      { value: "fit", label: "Fit", icon: "⛰️" },
      { value: "veryfit", label: "Very Fit", icon: "🏔️" },
    ],
  },
  {
    step: 2 as Step,
    question: "Trip duration?",
    field: "duration" as const,
    options: [
      { value: "weekend", label: "Weekend", icon: "📅", sub: "1–2 days" },
      { value: "short", label: "Short Trip", icon: "🗓", sub: "4–6 days" },
      { value: "long", label: "Full Trek", icon: "⛺", sub: "7+ days" },
    ],
  },
  {
    step: 3 as Step,
    question: "Your budget?",
    field: "budget" as const,
    options: [
      { value: "budget", label: "Budget", icon: "💰", sub: "Under ₹8,000" },
      { value: "mid", label: "Mid-range", icon: "💳", sub: "₹8,000–15,000" },
      { value: "premium", label: "Premium", icon: "✨", sub: "₹15,000+" },
    ],
  },
  {
    step: 4 as Step,
    question: "Preferred terrain?",
    field: "terrain" as const,
    options: [
      { value: "snow", label: "Snow", icon: "🌨", sub: "Glacial & snow routes" },
      {
        value: "forest",
        label: "Forest",
        icon: "🌲",
        sub: "Dense woodland trails",
      },
      {
        value: "altitude",
        label: "High Altitude",
        icon: "🏔",
        sub: "Above 4,000m",
      },
      {
        value: "valley",
        label: "Coastal/Valley",
        icon: "🌊",
        sub: "River valleys & meadows",
      },
    ],
  },
];

/* ── Matching logic ──────────────────────────────────────── */
function matchTreks(answers: Required<QuizAnswers>): Trek[] {
  return TREKS.map((trek) => {
    let score = 0;

    // Fitness → difficulty
    const { fitness } = answers;
    const diff = trek.difficulty.toLowerCase();
    if (
      fitness === "beginner" &&
      diff.includes("easy") &&
      !diff.includes("moderate")
    )
      score += 3;
    else if (
      fitness === "moderate" &&
      (diff.includes("moderate") || diff.includes("easy"))
    )
      score += 3;
    else if (
      fitness === "fit" &&
      (diff.includes("difficult") || diff.includes("moderate"))
    )
      score += 3;
    else if (
      fitness === "veryfit" &&
      (diff.includes("difficult") || diff.includes("extreme"))
    )
      score += 3;
    else score += 1; // partial match

    // Duration
    const { duration } = answers;
    if (duration === "weekend" && trek.duration <= 3) score += 3;
    else if (duration === "short" && trek.duration >= 4 && trek.duration <= 6)
      score += 3;
    else if (duration === "long" && trek.duration >= 7) score += 3;
    else score += 1;

    // Budget
    const { budget } = answers;
    if (budget === "budget" && trek.price < 8000) score += 3;
    else if (budget === "mid" && trek.price >= 8000 && trek.price <= 15000)
      score += 3;
    else if (budget === "premium" && trek.price > 15000) score += 3;
    else score += 1;

    // Terrain
    const { terrain } = answers;
    const cat = `${trek.category} ${trek.description}`.toLowerCase();
    if (
      terrain === "snow" &&
      (cat.includes("snow") ||
        cat.includes("glacial") ||
        cat.includes("winter"))
    )
      score += 3;
    else if (
      terrain === "forest" &&
      (cat.includes("forest") ||
        cat.includes("oak") ||
        cat.includes("rhododendron"))
    )
      score += 3;
    else if (terrain === "altitude" && trek.altitude >= 4000) score += 3;
    else if (
      terrain === "valley" &&
      (cat.includes("valley") ||
        cat.includes("meadow") ||
        cat.includes("bugyal"))
    )
      score += 3;
    else score += 1;

    return { trek, score };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.trek);
}

/* ── Option Card ─────────────────────────────────────────── */
function OptionCard({
  icon,
  label,
  sub,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-all cursor-pointer border-2"
      style={{
        borderColor: selected ? "var(--ew-red)" : "var(--ew-gray-mid)",
        backgroundColor: selected ? "var(--ew-red-lt)" : "#fff",
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span
        className="text-sm font-semibold"
        style={{ color: selected ? "var(--ew-red)" : "var(--ew-text)" }}
      >
        {label}
      </span>
      {sub && (
        <span className="text-[11px]" style={{ color: "var(--ew-gray-dark)" }}>
          {sub}
        </span>
      )}
    </button>
  );
}

/* ── Result Card ─────────────────────────────────────────── */
function ResultCard({
  trek,
  index,
  onBook,
}: {
  trek: Trek;
  index: number;
  onBook: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-3 rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--ew-gray-mid)" }}
    >
      <OptimizedImage
        src={trek.image}
        alt={trek.name}
        variant="thumbnail"
        width={80}
        height={80}
        className="w-20 h-20 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 py-2 pr-2">
        <p
          className="font-bold text-sm truncate"
          style={{ color: "var(--ew-text)" }}
        >
          {trek.name}
        </p>
        <p className="text-xs mb-1" style={{ color: "var(--ew-gray-dark)" }}>
          {trek.duration} days · {trek.difficulty}
        </p>
        <p
          className="text-sm font-bold mb-2"
          style={{ color: "var(--ew-orange)" }}
        >
          ₹{trek.price.toLocaleString("en-IN")}
        </p>
        <Link
          to="/book"
          search={bookSearch({ trek: trek.slug })}
          preload="intent"
          onClick={(e) => {
            // Only close for same-tab navigations (standard travel-site behavior).
            if (
              e.button !== 0 ||
              e.metaKey ||
              e.ctrlKey ||
              e.shiftKey ||
              e.altKey
            )
              return;
            onBook();
          }}
          className="text-xs font-semibold px-3 py-1.5 rounded-full inline-block text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--ew-orange)" }}
          data-ocid={`quiz.result_book_button.${index + 1}`}
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
}

export interface TrekRecommenderQuizProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/* ── Main Component ──────────────────────────────────────── */
export default function TrekRecommenderQuiz({
  open: openControlled,
  onOpenChange,
}: TrekRecommenderQuizProps = {}) {
  const pathname = useRouterState().location.pathname;
  const onDetailPage = usesTravelSideActionRail(pathname);
  const [openInternal, setOpenInternal] = useState(false);
  const open = openControlled ?? openInternal;
  const setOpen = onOpenChange ?? setOpenInternal;
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [results, setResults] = useState<Trek[] | null>(null);

  const currentStepConfig = STEPS.find((s) => s.step === step)!;
  const currentAnswer = answers[currentStepConfig.field];

  function handleSelect(value: string) {
    setAnswers((prev) => ({ ...prev, [currentStepConfig.field]: value }));
  }

  function handleNext() {
    if (!currentAnswer) return;
    if (step < 4) {
      setStep((s) => (s + 1) as Step);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const a = answers as Required<QuizAnswers>;
    const matched = matchTreks(a);
    setResults(matched);

    // Persist to localStorage
    try {
      localStorage.setItem(
        "ih_quiz_result",
        JSON.stringify({ answers: a, results: matched.map((t) => t.slug) }),
      );
    } catch {}

    // dataLayer push
    if (typeof window !== "undefined") {
      (window as Window & { dataLayer?: object[] }).dataLayer =
        (window as Window & { dataLayer?: object[] }).dataLayer ?? [];
      (window as Window & { dataLayer?: object[] }).dataLayer!.push({
        event: "quiz_complete",
        result: matched.map((t) => t.slug),
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
    // Reset after animation
    setTimeout(() => {
      setAnswers({});
      setStep(1);
      setResults(null);
    }, 300);
  }

  useEffect(() => {
    if (onOpenChange) return;
    const onOpen = () => setOpenInternal(true);
    window.addEventListener("open-trek-quiz", onOpen);
    return () => window.removeEventListener("open-trek-quiz", onOpen);
  }, [onOpenChange]);

  // Keyboard close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
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

  const progressPct = results ? 100 : ((step - 1) / 4) * 100;

  return (
    <>
      {!onDetailPage && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-[11.5rem] right-5 z-50 flex max-lg:bottom-[calc(var(--mobile-fab-bottom,7.5rem)+4rem)] items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-elevated transition-[filter] hover:brightness-95"
          style={{ backgroundColor: "var(--ew-red)" }}
          aria-label="Open trek recommender quiz"
          data-ocid="quiz.open_button"
        >
          <span>🧭</span>
          <span>Find My Trek</span>
        </motion.button>
      )}

      {/* Modal — portaled so listing pages / side rail clicks always show on top */}
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[110] flex items-center justify-center p-4"
                  style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) handleClose();
                  }}
                  data-ocid="quiz.modal"
                >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-deep w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{ backgroundColor: "var(--ew-red)" }}
              >
                <div>
                  <p className="text-white text-sm font-medium opacity-75 mb-0.5">
                    Trekora Trek Finder
                  </p>
                  <h2 className="text-white text-xl font-bold">
                    {results
                      ? "Your Perfect Treks 🏔"
                      : "Find Your Perfect Trek"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Close quiz"
                  data-ocid="quiz.close_button"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>

              {/* Progress bar */}
              <div
                className="h-1.5"
                style={{ backgroundColor: "var(--ew-gray-mid)" }}
              >
                <motion.div
                  className="h-full rounded-r-full"
                  style={{ backgroundColor: "var(--ew-red)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-5">
                <AnimatePresence mode="wait">
                  {!results ? (
                    /* Quiz step */
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Step indicator */}
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4].map((s) => (
                          <div
                            key={s}
                            className="flex-1 h-1 rounded-full transition-colors"
                            style={{
                              backgroundColor:
                                s <= step
                                  ? "var(--ew-red)"
                                  : "var(--ew-gray-mid)",
                            }}
                          />
                        ))}
                        <span
                          className="text-xs ml-2 font-medium whitespace-nowrap"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          {step}/4
                        </span>
                      </div>

                      <h3
                        className="text-base font-bold mb-4"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {currentStepConfig.question}
                      </h3>

                      <div
                        className={`grid gap-3 mb-5 ${
                          currentStepConfig.options.length === 4
                            ? "grid-cols-2"
                            : "grid-cols-3"
                        }`}
                      >
                        {currentStepConfig.options.map((opt) => (
                          <OptionCard
                            key={opt.value}
                            icon={opt.icon}
                            label={opt.label}
                            sub={(opt as { sub?: string }).sub}
                            selected={currentAnswer === opt.value}
                            onClick={() => handleSelect(opt.value)}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!currentAnswer}
                        className="w-full font-semibold py-3 rounded-xl text-sm transition-all"
                        style={{
                          backgroundColor: currentAnswer
                            ? "var(--ew-orange)"
                            : "var(--ew-gray-mid)",
                          color: currentAnswer ? "#fff" : "var(--ew-gray-dark)",
                          cursor: currentAnswer ? "pointer" : "not-allowed",
                        }}
                        data-ocid={`quiz.step${step}.next_button`}
                      >
                        {step === 4 ? "Find My Trek →" : "Next →"}
                      </button>
                    </motion.div>
                  ) : (
                    /* Results */
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        Based on your preferences, here are your top 3
                        recommended treks:
                      </p>
                      <div className="space-y-3 mb-5">
                        {results.map((trek, i) => (
                          <ResultCard
                            key={trek.id}
                            trek={trek}
                            index={i}
                            onBook={handleClose}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="w-full border-2 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                        style={{
                          borderColor: "var(--ew-red)",
                          color: "var(--ew-red)",
                        }}
                        data-ocid="quiz.retake_button"
                      >
                        🔄 Retake Quiz
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
