import type { TrekDayItinerary } from "./spitiValleyTrekDetail";
import rawContent from "./trek-detail-content.json";

export type TrekFaq = { q: string; a: string };

export type TrekDetailContent = {
  slug: string;
  sourceUrl?: string;
  overview: string;
  shortDesc?: string;
  highlights: string[];
  itinerary: TrekDayItinerary[];
  faqs: TrekFaq[];
  inclusions: string[];
  exclusions: string[];
  howToReach: string[];
};

const TREK_DETAIL_BY_SLUG = rawContent as unknown as Record<
  string,
  TrekDetailContent
>;

export function getTrekDetailContent(
  slug: string,
): TrekDetailContent | undefined {
  const entry = TREK_DETAIL_BY_SLUG[slug];
  if (!entry?.itinerary?.length) return undefined;
  return entry;
}

export function hasTrekDetailContent(slug: string): boolean {
  return Boolean(getTrekDetailContent(slug));
}

export { TREK_DETAIL_BY_SLUG };
