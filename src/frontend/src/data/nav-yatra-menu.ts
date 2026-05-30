import { YATRAS } from "./yatras";

/** Navbar mega-menu yatra link — slug must exist in `YATRAS`. */
export type NavYatraItem = {
  name: string;
  slug: string;
};

const UK_NAV_RAW: NavYatraItem[] = [
  { name: "Char Dham Yatra", slug: "char-dham-yatra" },
  { name: "Panch Kedar Yatra", slug: "panch-kedar-yatra" },
  { name: "Panch Badri Yatra", slug: "panch-badri-yatra" },
  { name: "Hemkund Sahib", slug: "hemkund-sahib-yatra" },
  { name: "Adi Kailash & Om Parvat", slug: "adi-kailash-om-parvat" },
];

const HP_NAV_RAW: NavYatraItem[] = [
  { name: "Mani Mahesh Yatra", slug: "mani-mahesh-yatra" },
  { name: "Kinnaur Kailash", slug: "kinnaur-kailash-yatra" },
  { name: "Shrikhand Mahadev", slug: "shrikhand-mahadev-yatra" },
  { name: "Churdhar", slug: "churdhar-yatra" },
];

function resolveNavYatras(items: NavYatraItem[]): NavYatraItem[] {
  return items.filter((item) => {
    const yatra = YATRAS.find((y) => y.slug === item.slug);
    if (!yatra && import.meta.env.DEV) {
      console.warn(`[nav-yatra-menu] No yatra for slug "${item.slug}"`);
    }
    return Boolean(yatra);
  });
}

/** Uttarakhand — desktop & mobile yatra mega-menu (links → `/yatras/$slug`). */
export const NAV_UK_YATRAS = resolveNavYatras(UK_NAV_RAW);

/** Himachal Pradesh — desktop & mobile yatra mega-menu. */
export const NAV_HP_YATRAS = resolveNavYatras(HP_NAV_RAW);
