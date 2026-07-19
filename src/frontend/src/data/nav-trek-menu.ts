import { TREKS } from "./treks";

/** Navbar mega-menu trek link — slug must exist in `TREKS`. */
export type NavTrekItem = {
  name: string;
  slug: string;
};

const UK_NAV_RAW: NavTrekItem[] = [
  { name: "Valley of Flowers Trek", slug: "valley-of-flowers" },
  { name: "Roopkund Trek", slug: "roopkund-trek" },
  { name: "Kedarnath Trek", slug: "kedarnath-trek" },
  { name: "Brahmatal Trek", slug: "brahmatal-trek" },
  { name: "Rupin Pass", slug: "rupin-pass" },
  { name: "Har Ki Dun", slug: "har-ki-dun" },
  { name: "Kedarkantha", slug: "kedarkantha-trek" },
  { name: "Chopta Tungnath", slug: "chopta-tungnath" },
  { name: "Pangarchulla Peak", slug: "pangarchulla-peak" },
  { name: "Dayara Bugyal", slug: "dayara-bugyal" },
  { name: "Kuari Pass", slug: "kuari-pass" },
  { name: "Deoriatal Chandrashila", slug: "deoriatal-chandrashila" },
];

const HP_NAV_RAW: NavTrekItem[] = [
  { name: "Triund Trek", slug: "triund-trek" },
  { name: "Hampta Pass", slug: "hampta-pass" },
  { name: "Chandratal Lake", slug: "chandratal-lake" },
  { name: "Sar Pass", slug: "sar-pass" },
  { name: "Pin Parvati Pass", slug: "pin-parvati-pass" },
  { name: "Spiti Valley", slug: "spiti-valley-trek" },
  { name: "Kheerganga", slug: "kheerganga" },
  { name: "Bhrigu Lake", slug: "bhrigu-lake" },
  { name: "Beas Kund", slug: "beas-kund" },
  { name: "Deo Tibba", slug: "deo-tibba-base-camp" },
  { name: "Chandra Tal", slug: "chandra-tal-baralacha" },
  { name: "Friendship Peak", slug: "friendship-peak" },
];

function resolveNavTreks(items: NavTrekItem[]): NavTrekItem[] {
  return items.filter((item) => {
    const trek = TREKS.find((t) => t.slug === item.slug);
    if (!trek && import.meta.env.DEV) {
      console.warn(`[nav-trek-menu] No trek for slug "${item.slug}"`);
    }
    return Boolean(trek);
  });
}

/** Uttarakhand — desktop & mobile trek mega-menu (links → `/treks/$slug`). */
export const NAV_UK_TREKS = resolveNavTreks(UK_NAV_RAW);

/** Himachal Pradesh — desktop & mobile trek mega-menu. */
export const NAV_HP_TREKS = resolveNavTreks(HP_NAV_RAW);
