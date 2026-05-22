import {
  CURATED_PACKAGES,
  getCuratedPackageBySlug,
  packageItemLabel,
  type CuratedPackage,
  type CuratedPackageItem,
  type CuratedPackageTier,
} from "../data/curated-packages";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

export type BookableKind = "trek" | "yatra" | "package";

export type PackageBookableItem = {
  kind: CuratedPackageItem["kind"];
  slug: string;
  label: string;
};

export interface BookableProduct {
  kind: BookableKind;
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  duration: number;
  difficulty: string;
  /** Curated package fields (when kind === "package") */
  tagline?: string;
  description?: string;
  badge?: string;
  categoryLabel?: string;
  highlights?: string[];
  inclusions?: string[];
  packageItems?: PackageBookableItem[];
  bestSeason?: string;
  priceWas?: number;
  savingsPercent?: number;
  exclusive?: boolean;
  reviewCount?: number;
  rating?: number;
}

const TIER_DIFFICULTY: Record<CuratedPackageTier, string> = {
  explorer: "Easy",
  adventurer: "Moderate",
  summit: "Challenging",
};

const CATEGORY_LABEL: Record<CuratedPackage["category"], string> = {
  sacred: "Sacred",
  adventure: "Adventure",
  luxury: "Luxury",
  offbeat: "Offbeat",
  expedition: "Expedition",
};

function isBookableKind(kind: string): kind is BookableKind {
  return kind === "trek" || kind === "yatra" || kind === "package";
}

export function bookableSelectionKey(kind: BookableKind, slug: string): string {
  return `${kind}:${slug}`;
}

export function parseBookableSelectionKey(
  key: string,
): { kind: BookableKind; slug: string } | null {
  const sep = key.indexOf(":");
  if (sep <= 0) return null;
  const kind = key.slice(0, sep);
  const slug = key.slice(sep + 1);
  if (!isBookableKind(kind) || !slug) return null;
  return { kind, slug };
}

function trekToBookable(trek: (typeof TREKS)[number]): BookableProduct {
  return {
    kind: "trek",
    id: trek.id,
    slug: trek.slug,
    name: trek.name,
    image: trek.image,
    price: trek.price,
    duration: trek.duration,
    difficulty: trek.difficulty,
  };
}

function yatraToBookable(yatra: (typeof YATRAS)[number]): BookableProduct {
  return {
    kind: "yatra",
    id: yatra.id,
    slug: yatra.slug,
    name: yatra.name,
    image: yatra.image,
    price: yatra.price,
    duration: yatra.duration,
    difficulty: yatra.difficulty ?? "Moderate",
  };
}

export function curatedPackageToBookable(pkg: CuratedPackage): BookableProduct {
  return {
    kind: "package",
    id: 0,
    slug: pkg.slug,
    name: pkg.name,
    image: pkg.image,
    price: pkg.priceFrom,
    duration: pkg.durationDays,
    difficulty: TIER_DIFFICULTY[pkg.tier] ?? "Moderate",
    tagline: pkg.tagline,
    description: pkg.description,
    badge: pkg.badge,
    categoryLabel: CATEGORY_LABEL[pkg.category],
    highlights: pkg.highlights,
    inclusions: pkg.inclusions,
    packageItems: pkg.items.map((item) => ({
      kind: item.kind,
      slug: item.slug,
      label: packageItemLabel(item),
    })),
    bestSeason: pkg.bestSeason,
    priceWas: pkg.priceWas,
    savingsPercent: pkg.savingsPercent,
    exclusive: pkg.exclusive,
    reviewCount: pkg.reviewCount,
    rating: pkg.rating,
  };
}

export function findBookablePackage(slug: string): BookableProduct | undefined {
  const pkg = getCuratedPackageBySlug(slug);
  return pkg ? curatedPackageToBookable(pkg) : undefined;
}

export function findBookableProduct(
  kind: BookableKind,
  slug: string,
): BookableProduct | undefined {
  if (kind === "package") return findBookablePackage(slug);
  if (kind === "trek") {
    const trek = TREKS.find((t) => t.slug === slug && t.isActive);
    if (!trek) return undefined;
    return trekToBookable(trek);
  }
  const yatra = YATRAS.find((y) => y.slug === slug && y.isActive);
  if (!yatra) return undefined;
  return yatraToBookable(yatra);
}

/** Resolve product from `/book` search params (any catalog slug, not only active). */
export function findBookableProductForPrefill(
  trek?: string,
  yatra?: string,
  packageSlug?: string,
): BookableProduct | undefined {
  if (packageSlug) return findBookablePackage(packageSlug);
  if (yatra) {
    const match = YATRAS.find((y) => y.slug === yatra);
    return match ? yatraToBookable(match) : undefined;
  }
  if (!trek) return undefined;
  const asTrek = TREKS.find((t) => t.slug === trek);
  if (asTrek) return trekToBookable(asTrek);
  const asYatra = YATRAS.find((y) => y.slug === trek);
  return asYatra ? yatraToBookable(asYatra) : undefined;
}

export function selectionKeyFromBookSearch(
  trek?: string,
  yatra?: string,
  packageSlug?: string,
): string {
  const product = findBookableProductForPrefill(trek, yatra, packageSlug);
  return product ? bookableSelectionKey(product.kind, product.slug) : "";
}

export function findBookableProductBySelectionKey(
  key: string,
): BookableProduct | undefined {
  const parsed = parseBookableSelectionKey(key);
  if (!parsed) return undefined;
  return findBookableProduct(parsed.kind, parsed.slug);
}

/** Active catalog first; fall back to full catalog (e.g. deep link from detail page). */
export function resolveBookableProductFromSelectionKey(
  key: string,
): BookableProduct | undefined {
  if (!key) return undefined;
  const active = findBookableProductBySelectionKey(key);
  if (active) return active;
  const parsed = parseBookableSelectionKey(key);
  if (!parsed) return undefined;
  if (parsed.kind === "package") {
    return findBookablePackage(parsed.slug);
  }
  return findBookableProductForPrefill(
    parsed.kind === "trek" ? parsed.slug : undefined,
    parsed.kind === "yatra" ? parsed.slug : undefined,
  );
}

/** Legacy `/book?trek=` links may pass a yatra slug — resolve against both catalogs. */
export function resolveBookableFromTrekSearchParam(
  trekParam: string | undefined,
): BookableProduct | undefined {
  return findBookableProductForPrefill(trekParam, undefined);
}

export const BOOKABLE_TREKS: BookableProduct[] = TREKS.filter((t) => t.isActive).map(
  (trek) => trekToBookable(trek),
);

export const BOOKABLE_YATRAS: BookableProduct[] = YATRAS.filter((y) => y.isActive).map(
  (yatra) => yatraToBookable(yatra),
);

export const BOOKABLE_PACKAGES: BookableProduct[] =
  CURATED_PACKAGES.map(curatedPackageToBookable);

export function isPackageBooking(
  product: BookableProduct | undefined,
): product is BookableProduct & { kind: "package" } {
  return product?.kind === "package";
}
