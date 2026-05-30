import type { Yatra } from "@/data/yatras";
import type { TrekItineraryDay } from "@/lib/pdfGenerator";

export type DisplayItineraryDay = {
  day: number;
  title: string;
  description: string;
  stay?: string;
  altitude?: string | number;
  distance?: string;
  meals?: string | [boolean, boolean, boolean];
};

const FALLBACK_YATRA_DAYS: DisplayItineraryDay[] = [
  {
    day: 1,
    title: "Arrival & Acclimatization",
    description:
      "Arrive at the base town. Rest, acclimatization, briefing by guide, and distribution of Trekora kit.",
    stay: "Hotel / guesthouse",
    meals: "Dinner",
  },
  {
    day: 2,
    title: "Commence journey to trail head",
    description:
      "Early start. Drive or walk to the main trail head. Begin the pilgrimage with prayers at the base temple.",
    stay: "Dharamshala / camp",
    meals: "Breakfast, Dinner",
  },
  {
    day: 3,
    title: "Main shrine darshan",
    description:
      "Reach the main shrine. Ritual bath in sacred water. VIP darshan and aarti at the temple.",
    stay: "Temple trust accommodation",
    meals: "Breakfast, Dinner",
  },
  {
    day: 4,
    title: "Return journey",
    description:
      "Morning prayers and final darshan. Descend to base town. Debrief and departure preparations.",
    stay: "Hotel / guesthouse",
    meals: "Breakfast",
  },
];

export function yatraItineraryToDisplayDays(
  yatra: Yatra,
): DisplayItineraryDay[] {
  const raw = yatra.itinerary;
  if (!raw) return FALLBACK_YATRA_DAYS;

  if (Array.isArray(raw)) {
    return raw.map((entry, i) => ({
      day: entry.day ?? i + 1,
      title: entry.title,
      description: entry.description ?? "",
      stay: entry.stay,
      altitude: entry.altitude,
      distance: entry.distance,
      meals: entry.meals,
    }));
  }

  return Object.entries(raw).map(([title, description], i) => ({
    day: i + 1,
    title,
    description,
  }));
}

export function trekItineraryToDisplayDays(
  days: TrekItineraryDay[],
): DisplayItineraryDay[] {
  return days.map((d, i) => ({
    day: d.day ?? i + 1,
    title: d.title,
    description: d.desc ?? d.description ?? "",
    stay: d.stay,
    altitude: d.altitude,
    distance: d.distance,
    meals: d.meals as string | [boolean, boolean, boolean] | undefined,
  }));
}
