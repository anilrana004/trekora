import {
  type Destination,
  getDestinationBySlug,
  getDestinationStateSlug,
} from "./destinations";
import { TREKS, type Trek } from "./treks";

/** Trek slugs grouped by destination hub (gateway town / district). */
export const DESTINATION_TREK_SLUGS: Record<string, readonly string[]> = {
  rishikesh: ["valley-of-flowers", "kedarnath-trek", "roopkund-trek"],
  dehradun: [
    "kedarkantha-trek",
    "har-ki-dun",
    "deoriatal-chandrashila",
    "chopta-tungnath",
  ],
  joshimath: [
    "valley-of-flowers",
    "kedarnath-trek",
    "kuari-pass",
    "pangarchulla-peak",
    "bali-pass",
    "roopkund-trek",
  ],
  chopta: ["chopta-tungnath", "deoriatal-chandrashila"],
  auli: ["kuari-pass", "pangarchulla-peak"],
  "kedarnath-dest": ["kedarnath-trek"],
  gangotri: ["kedartal"],
  nainital: ["pindari-glacier", "kafni-glacier"],
  munsyari: ["milam-glacier", "pindari-glacier", "nanda-devi-base-camp"],
  uttarkashi: ["har-ki-dun", "kedarkantha-trek", "kedartal", "dayara-bugyal"],
  manali: [
    "hampta-pass",
    "beas-kund",
    "bhrigu-lake",
    "friendship-peak",
    "chandratal-lake",
    "pin-parvati-pass",
    "deo-tibba-base-camp",
  ],
  "mcleod-ganj": ["triund-trek"],
  kasol: ["kheerganga", "sar-pass", "pin-parvati-pass"],
  "spiti-valley": ["spiti-valley-trek", "spiti-valley-circuit"],
  shimla: ["shikari-mata", "chandra-tal-baralacha"],
  kaza: ["spiti-valley-trek", "spiti-valley-circuit"],
  "sangla-chitkul": ["kinnaur-kailash-parikrama"],
  dalhousie: ["thamsar-pass"],
  "bir-billing": ["friendship-peak"],
  "parvati-valley": ["kheerganga", "pin-parvati-pass", "sar-pass"],
  kullu: ["hampta-pass", "beas-kund", "bhrigu-lake"],
  kalpa: ["kinnaur-kailash-parikrama"],
};

export type DestinationNavigation =
  | { type: "trek"; slug: string }
  | { type: "treks"; destinationSlug: string }
  | { type: "yatras" }
  | { type: "state"; stateSlug: string };

export function getTreksForDestination(dest: Destination): Trek[] {
  const explicit = DESTINATION_TREK_SLUGS[dest.slug];
  if (explicit?.length) {
    return explicit
      .map((slug) => TREKS.find((t) => t.slug === slug))
      .filter((t): t is Trek => Boolean(t));
  }

  const stateKey =
    dest.state === "Uttarakhand" ? "uttarakhand" : ("himachal" as const);
  const tokens = [
    dest.name,
    dest.slug.replace(/-dest$/, "").replace(/-/g, " "),
  ].map((s) => s.toLowerCase());

  return TREKS.filter((t) => {
    if (t.state !== stateKey) return false;
    const hay =
      `${t.name} ${t.startPoint} ${t.slug} ${t.shortDesc}`.toLowerCase();
    return tokens.some((token) => token.length > 2 && hay.includes(token));
  });
}

export function resolveDestinationNavigation(
  dest: Destination,
): DestinationNavigation {
  const treks = getTreksForDestination(dest);

  if (treks.length === 1) {
    return { type: "trek", slug: treks[0].slug };
  }
  if (treks.length > 1) {
    return { type: "treks", destinationSlug: dest.slug };
  }
  if (dest.yatraCount && dest.yatraCount > 0) {
    return { type: "yatras" };
  }
  return { type: "state", stateSlug: getDestinationStateSlug(dest.state) };
}

export function getTreksForDestinationSlug(slug: string): Trek[] {
  const dest = getDestinationBySlug(slug);
  if (!dest) return [];
  return getTreksForDestination(dest);
}
