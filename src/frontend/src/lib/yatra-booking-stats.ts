import type { Yatra } from "@/data/yatras";

export function yatraDifficultyLabel(yatra: Yatra): string {
  if (yatra.difficulty) return yatra.difficulty.split("-")[0];
  if (yatra.distance > 200) return "Moderate";
  if (yatra.distance > 50) return "Easy-Mod";
  return "Easy";
}

export function yatraAltitudeLabel(yatra: Yatra): string {
  if (yatra.maxAltitude) {
    const match = yatra.maxAltitude.match(/(\d[\d,]*)\s*m/i);
    if (match) return `${match[1].replace(/,/g, "")}m`;
    return yatra.maxAltitude;
  }
  if (yatra.distance > 300) return "3,600m";
  if (yatra.distance > 50) return "3,000m";
  return "2,500m";
}

/** Numeric altitude (m) for fitness scoring — matches label heuristics. */
export function yatraAltitudeMeters(yatra: Yatra): number {
  if (yatra.maxAltitude) {
    const match = yatra.maxAltitude.match(/(\d[\d,]*)/);
    if (match) return Number.parseInt(match[1].replace(/,/g, ""), 10);
  }
  if (yatra.distance > 300) return 3600;
  if (yatra.distance > 50) return 3000;
  return 2500;
}

/** Difficulty string used by FitnessCalculator (Easy / Moderate / …). */
export function yatraFitnessDifficulty(yatra: Yatra): string {
  if (yatra.difficulty) return yatra.difficulty;
  if (yatra.distance > 200) return "Moderate";
  if (yatra.distance > 50) return "Easy-Moderate";
  return "Easy";
}
