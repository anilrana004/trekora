import {
  ActivitySquare,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useState } from "react";
import { toast } from "sonner";
import { downloadFitnessTrainingPlanPDF } from "../lib/pdfGenerator";

interface FitnessCalculatorProps {
  trekName?: string;
  trekSlug?: string;
  trekDifficulty: string;
  trekAltitude: number;
  trekDuration: number;
  /** Trek detail (default) or yatra detail — adjusts headings and result copy. */
  productKind?: "trek" | "yatra";
}

type FitnessLevel = "Sedentary" | "Active" | "Fit";
type ExperienceLevel = "Beginner" | "Some experience" | "Experienced";
type MedicalCondition =
  | "Heart condition"
  | "High blood pressure"
  | "Asthma"
  | "Diabetes"
  | "None";

const FITNESS_LEVELS: FitnessLevel[] = ["Sedentary", "Active", "Fit"];
const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Beginner",
  "Some experience",
  "Experienced",
];
const MEDICAL_CONDITIONS: MedicalCondition[] = [
  "Heart condition",
  "High blood pressure",
  "Asthma",
  "Diabetes",
  "None",
];

const TRAINING_WEEKS = [
  {
    week: 1,
    plan: "Walk 5 km daily at a comfortable pace, building base endurance.",
  },
  {
    week: 2,
    plan: "Jog 5 km daily + stair climbing for 20 minutes (2–3 floors).",
  },
  { week: 3, plan: "10 km walks with a 5 kg backpack to simulate trek load." },
  {
    week: 4,
    plan: "Interval training: jog 1 min, sprint 30 sec, repeat 10×. Practice hike 15 km on a weekend.",
  },
];

function calculateScore(
  age: number,
  fitness: FitnessLevel,
  experience: ExperienceLevel,
  conditions: MedicalCondition[],
  difficulty: string,
  altitude: number,
): number {
  let score = 100;
  if (age > 60) score -= 20;
  else if (age > 50) score -= 10;
  else if (age < 18) score -= 10;
  if (fitness === "Sedentary") score -= 30;
  else if (fitness === "Active") score -= 10;
  if (experience === "Beginner" && difficulty !== "Easy") score -= 20;
  if (conditions.includes("Heart condition")) score -= 30;
  if (conditions.includes("High blood pressure")) score -= 15;
  if (conditions.includes("Asthma")) score -= 10;
  if (altitude > 5000) score -= 20;
  else if (altitude > 4000) score -= 10;
  return Math.max(0, score);
}

export default function FitnessCalculator({
  trekName = "Your Trek",
  trekSlug,
  trekDifficulty,
  trekAltitude,
  trekDuration,
  productKind = "trek",
}: FitnessCalculatorProps) {
  const isYatra = productKind === "yatra";
  const productNoun = isYatra ? "Yatra" : "Trek";
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState(30);
  const [fitness, setFitness] = useState<FitnessLevel>("Active");
  const [experience, setExperience] =
    useState<ExperienceLevel>("Some experience");
  const [conditions, setConditions] = useState<MedicalCondition[]>(["None"]);
  const [result, setResult] = useState<number | null>(null);

  function toggleCondition(c: MedicalCondition) {
    setConditions((prev) => {
      if (c === "None") return ["None"];
      const withoutNone = prev.filter((x) => x !== "None");
      if (withoutNone.includes(c))
        return withoutNone.filter((x) => x !== c).length === 0
          ? ["None"]
          : withoutNone.filter((x) => x !== c);
      return [...withoutNone, c];
    });
  }

  function handleCalculate() {
    const score = calculateScore(
      age,
      fitness,
      experience,
      conditions,
      trekDifficulty,
      trekAltitude,
    );
    setResult(score);
  }

  function getBadge(score: number) {
    if (score >= 70)
      return {
        emoji: "✅",
        text: isYatra
          ? "You're Ready for This Yatra!"
          : "You're Fit for This Trek!",
        bg: "#E8F5E9",
        border: "#2E7D32",
        textColor: "#2E7D32",
      };
    if (score >= 40)
      return {
        emoji: "⚠️",
        text: "Moderate Fitness Required — Follow Training Plan",
        bg: "var(--ew-orange-lt)",
        border: "var(--ew-orange)",
        textColor: "var(--ew-orange)",
      };
    return {
      emoji: "❌",
      text: isYatra
        ? "This yatra may be challenging — Consider easier routes or helicopter options"
        : "This trek may not be suitable — Consider easier alternatives",
      bg: "var(--ew-red-lt)",
      border: "var(--ew-red)",
      textColor: "var(--ew-red)",
    };
  }

  const badge = result !== null ? getBadge(result) : null;

  async function handleDownloadTrainingPlan() {
    if (result === null || !badge) {
      toast.error("Calculate your fitness score first.");
      return;
    }
    try {
      await downloadFitnessTrainingPlanPDF({
        trekName,
        trekSlug,
        trekDifficulty,
        trekAltitude,
        trekDuration,
        age,
        fitness,
        experience,
        conditions,
        score: result,
        readinessLabel: badge.text,
        trainingWeeks: TRAINING_WEEKS,
      });
      toast.success("Training plan PDF downloaded.");
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Could not download training plan PDF. Please try again.",
      );
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--ew-gray-mid)" }}
    >
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{
          backgroundColor: open ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
        }}
        data-ocid="fitness.toggle"
      >
        <div className="flex items-center gap-2">
          <ActivitySquare size={18} style={{ color: "var(--ew-orange)" }} />
          <span
            className="font-bold text-sm"
            style={{ color: "var(--ew-text)" }}
          >
            {`Are You Ready for This ${productNoun}?`}
          </span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "var(--ew-orange)",
              color: "#fff",
            }}
          >
            Fitness Calculator
          </span>
        </div>
        {open ? (
          <ChevronDown size={18} style={{ color: "var(--ew-gray-dark)" }} />
        ) : (
          <ChevronRight size={18} style={{ color: "var(--ew-gray-dark)" }} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-5 bg-white">
              {/* Age */}
              <div>
                <label
                  htmlFor="fitness-age"
                  className="text-xs font-semibold block mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  1. Your Age:{" "}
                  <span style={{ color: "var(--ew-orange)" }}>{age}</span>
                </label>
                <input
                  id="fitness-age"
                  type="range"
                  min={15}
                  max={70}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-[var(--ew-orange)]"
                  data-ocid="fitness.age.input"
                />
                <div
                  className="flex justify-between text-[10px] mt-1"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  <span>15</span>
                  <span>70</span>
                </div>
              </div>

              {/* Fitness level */}
              <div>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  2. Current Fitness Level
                </p>
                <div className="flex gap-2 flex-wrap">
                  {FITNESS_LEVELS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFitness(f)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          fitness === f
                            ? "var(--ew-orange)"
                            : "var(--ew-gray-lt)",
                        color: fitness === f ? "#fff" : "var(--ew-text)",
                        border: `1px solid ${
                          fitness === f
                            ? "var(--ew-orange)"
                            : "var(--ew-gray-mid)"
                        }`,
                      }}
                      data-ocid={`fitness.fitness_level.${f.toLowerCase().replace(/ /g, "_")}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  3. Trekking Experience
                </p>
                <div className="flex gap-2 flex-wrap">
                  {EXPERIENCE_LEVELS.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setExperience(ex)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          experience === ex
                            ? "var(--ew-red)"
                            : "var(--ew-gray-lt)",
                        color: experience === ex ? "#fff" : "var(--ew-text)",
                        border: `1px solid ${
                          experience === ex
                            ? "var(--ew-red)"
                            : "var(--ew-gray-mid)"
                        }`,
                      }}
                      data-ocid={`fitness.experience.${ex.toLowerCase().replace(/ /g, "_")}`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medical conditions */}
              <div>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  4. Medical Conditions (select all that apply)
                </p>
                <div className="flex flex-wrap gap-2">
                  {MEDICAL_CONDITIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCondition(c)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                      style={{
                        backgroundColor: conditions.includes(c)
                          ? c === "None"
                            ? "var(--ew-green)"
                            : "var(--ew-red-lt)"
                          : "var(--ew-gray-lt)",
                        color: conditions.includes(c)
                          ? c === "None"
                            ? "#fff"
                            : "var(--ew-red)"
                          : "var(--ew-text)",
                        border: `1px solid ${
                          conditions.includes(c)
                            ? c === "None"
                              ? "var(--ew-green)"
                              : "var(--ew-red)"
                            : "var(--ew-gray-mid)"
                        }`,
                      }}
                      data-ocid={`fitness.medical.${c.toLowerCase().replace(/ /g, "_")}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate button */}
              <button
                type="button"
                onClick={handleCalculate}
                className="btn-primary w-full justify-center text-sm"
                data-ocid="fitness.calculate_button"
              >
                Calculate My Fitness Score
              </button>

              {/* Result */}
              <AnimatePresence>
                {result !== null && badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="space-y-4"
                  >
                    {/* Score badge */}
                    <div
                      className="rounded-xl p-4 text-center"
                      style={{
                        backgroundColor: badge.bg,
                        border: `2px solid ${badge.border}`,
                      }}
                      data-ocid="fitness.result"
                    >
                      <p className="text-3xl mb-1">{badge.emoji}</p>
                      <p
                        className="font-bold text-sm"
                        style={{ color: badge.textColor }}
                      >
                        {badge.text}
                      </p>
                      <p
                        className="text-[11px] mt-1 font-medium"
                        style={{ color: badge.textColor, opacity: 0.75 }}
                      >
                        Fitness score: {result}/100
                      </p>
                    </div>

                    {/* 4-week training plan */}
                    <div>
                      <h4
                        className="font-bold text-sm mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        🏋️ Your 4-Week Training Plan
                      </h4>
                      <div className="space-y-2">
                        {TRAINING_WEEKS.map((w) => (
                          <div
                            key={w.week}
                            className="flex gap-3 items-start rounded-xl p-3"
                            style={{
                              backgroundColor: "var(--ew-gray-lt)",
                              border: "1px solid var(--ew-gray-mid)",
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
                              style={{
                                backgroundColor: "var(--ew-orange)",
                                color: "#fff",
                              }}
                            >
                              W{w.week}
                            </div>
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: "var(--ew-text-lt)" }}
                            >
                              {w.plan}
                            </p>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => void handleDownloadTrainingPlan()}
                        className="mt-3 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors w-full justify-center"
                        style={{
                          backgroundColor: "var(--ew-orange-lt)",
                          color: "var(--ew-orange)",
                          border: "1px solid var(--ew-orange)",
                        }}
                        data-ocid="fitness.download_button"
                      >
                        <Download size={13} />
                        Download Training Plan PDF
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
