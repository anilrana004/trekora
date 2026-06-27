import rawContent from "./yatra-detail-content.json";
import type { Yatra, YatraHowToReach } from "./yatras";

export type YatraDetailContent = {
  slug: string;
  sourceUrl?: string;
  description?: string;
  significance?: string;
  spiritualBenefits?: string[];
  itinerary?: Record<string, string>;
  faqs?: { question: string; answer: string }[];
  inclusions?: string[];
  exclusions?: string[];
  howToReach?: Partial<YatraHowToReach>;
  accommodation?: string;
};

const YATRA_DETAIL_BY_SLUG = rawContent as unknown as Record<
  string,
  YatraDetailContent
>;

export function getYatraDetailContent(
  slug: string,
): YatraDetailContent | undefined {
  const entry = YATRA_DETAIL_BY_SLUG[slug];
  if (!entry) return undefined;
  if (
    !entry.description &&
    (!entry.itinerary || Object.keys(entry.itinerary).length === 0)
  ) {
    return undefined;
  }
  return entry;
}

export function mergeYatraDisplay(
  yatra: Yatra,
  detail?: YatraDetailContent,
): Yatra {
  if (!detail) return yatra;

  const baseHowToReach: YatraHowToReach | null =
    typeof yatra.howToReach === "object" ? yatra.howToReach : null;

  const howToReach: Yatra["howToReach"] = detail.howToReach
    ? baseHowToReach
      ? { ...baseHowToReach, ...detail.howToReach }
      : {
          byAir: detail.howToReach.byAir ?? "",
          byTrain: detail.howToReach.byTrain ?? "",
          byRoad: detail.howToReach.byRoad ?? "",
          localTransport: detail.howToReach.localTransport ?? "",
          helicopter: detail.howToReach.helicopter,
        }
    : yatra.howToReach;

  return {
    ...yatra,
    description: detail.description ?? yatra.description,
    significance: detail.significance ?? yatra.significance,
    spiritualBenefits: detail.spiritualBenefits?.length
      ? detail.spiritualBenefits
      : yatra.spiritualBenefits,
    itinerary: detail.itinerary ?? yatra.itinerary,
    faqs: detail.faqs?.length ? detail.faqs : yatra.faqs,
    inclusions: detail.inclusions?.length
      ? detail.inclusions
      : yatra.inclusions,
    exclusions: detail.exclusions?.length
      ? detail.exclusions
      : yatra.exclusions,
    howToReach,
    accommodation: detail.accommodation ?? yatra.accommodation,
  };
}

export { YATRA_DETAIL_BY_SLUG };
