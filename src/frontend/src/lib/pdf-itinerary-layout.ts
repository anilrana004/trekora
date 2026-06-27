/**
 * Magazine-style 4-page itinerary PDF layout (Trekora design system).
 * Used by pdfGenerator.ts — do not import from UI components.
 */
import { getTrekDetailContent } from "../data/trek-detail-content";
import type { Trek } from "../data/treks";
import { getYatraDetailContent } from "../data/yatra-detail-content";
import type { Yatra } from "../data/yatras";
import { buildSeoImageUrl } from "./images";
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from "./site-contact";

type JsPDFDoc = import("jspdf").jsPDF;
type PdfImage = { dataUrl: string; format: "PNG" | "JPEG" };

export type TrekItineraryDay = {
  day?: number;
  title: string;
  altitude?: string | number;
  stay?: string;
  meals?: string | boolean[];
  description?: string;
  desc?: string;
  distance?: string;
  trekTime?: string;
  highlights?: string;
};

const PDF_COMPANY = {
  website: "www.trekora.in",
  phone: SITE_PHONE_DISPLAY,
  email: SITE_EMAIL,
} as const;

const THEME = {
  primary: [5, 22, 37] as const,
  pine: [26, 36, 30] as const,
  sunset: [232, 119, 34] as const,
  secondary: [79, 99, 85] as const,
  ice: [226, 232, 240] as const,
  surface: [247, 249, 251] as const,
  white: [255, 255, 255] as const,
  muted: [67, 71, 76] as const,
  error: [186, 26, 26] as const,
  w: 210,
  h: 297,
  m: 14,
} as const;

const DEFAULT_INCLUDED = [
  "Accommodation during the trek",
  "Experienced trek / yatra leader",
  "Local guides and support staff",
  "All meals while on trek / yatra",
  "Required permits and entry fees",
  "First-aid kit and emergency oxygen (treks)",
  "Camping equipment where applicable",
];

const DEFAULT_EXCLUDED = [
  "Transport to and from the base point",
  "Personal expenses and snacks",
  "Travel insurance (strongly recommended)",
  "Porter / offloading charges",
  "Personal trekking gear",
  "GST and items not listed in inclusions",
];

const PACKING = {
  clothing: [
    "Down / fleece jacket",
    "Thermal layers",
    "Waterproof shell",
    "Trekking pants",
  ],
  gear: [
    "40-60L backpack",
    "Trekking boots & poles",
    "Headlamp & power bank",
    "Sunscreen & photo ID",
  ],
};

export type MagazinePdfDeps = {
  loadImages: (urls: string[]) => Promise<PdfImage[]>;
  resolveLogo: () => Promise<PdfImage | null>;
};

function cw(): number {
  return THEME.w - THEME.m * 2;
}

function sanitize(text: string): string {
  return text
    .replace(/\u20B9/g, "Rs.")
    .replace(/★/g, "*")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x00-\xFF]/g, "?");
}

function txt(
  doc: JsPDFDoc,
  text: string,
  x: number,
  y: number,
  opts?: Parameters<JsPDFDoc["text"]>[3],
): void {
  doc.text(sanitize(text), x, y, opts);
}

function opacity(doc: JsPDFDoc, value: number): void {
  try {
    const GState = (
      doc as JsPDFDoc & {
        GState?: new (o: { opacity: number }) => unknown;
      }
    ).GState;
    if (GState) doc.setGState(new GState({ opacity: value }));
  } catch {
    /* noop */
  }
}

function drawImg(
  doc: JsPDFDoc,
  img: PdfImage,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  try {
    doc.addImage(img.dataUrl, img.format, x, y, w, h);
  } catch {
    /* skip */
  }
}

function card(
  doc: JsPDFDoc,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: readonly [number, number, number],
): void {
  doc.setDrawColor(...THEME.ice);
  doc.setLineWidth(0.25);
  doc.setFillColor(...fill);
  doc.roundedRect(x, y, w, h, 3, 3, "FD");
}

function header(doc: JsPDFDoc, logo: PdfImage | null): void {
  const y = 8;
  doc.setDrawColor(...THEME.ice);
  doc.setLineWidth(0.3);
  doc.line(THEME.m, 16, THEME.w - THEME.m, 16);
  if (logo) drawImg(doc, logo, THEME.m, y, 32, 11);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Trekora", THEME.m + (logo ? 36 : 0), y + 8);
}

function footer(doc: JsPDFDoc): void {
  const y = THEME.h - 14;
  doc.setFillColor(...THEME.pine);
  doc.rect(0, y, THEME.w, 14, "F");
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  txt(doc, "Trekora", THEME.m, y + 5);
  txt(
    doc,
    `${PDF_COMPANY.email}  |  ${PDF_COMPANY.website}  |  ${PDF_COMPANY.phone}`,
    THEME.w / 2,
    y + 9,
    { align: "center", maxWidth: THEME.w - THEME.m * 2 },
  );
  doc.setFontSize(5);
  doc.setTextColor(200, 200, 200);
  txt(
    doc,
    "(c) Trekora Expeditions. All Rights Reserved.",
    THEME.w - THEME.m,
    y + 5,
    {
      align: "right",
    },
  );
}

function altitudeFt(m: number): string {
  return `${Math.round(m * 3.28084).toLocaleString("en-IN")} ft`;
}

function dayMeta(day: TrekItineraryDay): string {
  const parts = [
    day.distance,
    day.trekTime ? `${day.trekTime}` : undefined,
  ].filter(Boolean);
  return parts.join(" * ") || "As per itinerary";
}

type ProductMeta = {
  kind: "trek" | "yatra";
  name: string;
  slug: string;
  tagline: string;
  blurb: string;
  duration: string;
  region: string;
  altitude: string;
  difficulty: string;
  distance: string;
  season: string;
  startEnd: string;
  price: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  tempRange: string;
  accommodation: string;
  meals: string;
};

function trekMeta(trek: Trek): ProductMeta {
  const detail = getTrekDetailContent(trek.slug);
  const region =
    trek.region ??
    (trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh");
  return {
    kind: "trek",
    name: trek.name,
    slug: trek.slug,
    tagline: trek.shortDesc || `The classic trek in ${region}`,
    blurb: (detail?.overview || trek.description).slice(0, 220),
    duration: `${trek.duration} Days / ${trek.duration - 1} Nights`,
    region,
    altitude: altitudeFt(trek.altitude),
    difficulty: trek.difficulty,
    distance: `~${trek.distance} km`,
    season: trek.bestSeason,
    startEnd:
      trek.endPoint === trek.startPoint
        ? trek.startPoint
        : `${trek.startPoint} - ${trek.endPoint}`,
    price: `Rs.${trek.price.toLocaleString("en-IN")}`,
    highlights: detail?.highlights?.length
      ? detail.highlights.slice(0, 5)
      : (trek.tags ?? []).slice(0, 5),
    inclusions: detail?.inclusions?.length
      ? detail.inclusions
      : DEFAULT_INCLUDED,
    exclusions: detail?.exclusions?.length
      ? detail.exclusions
      : DEFAULT_EXCLUDED,
    tempRange:
      trek.altitude >= 4500
        ? "-10C to 10C"
        : trek.altitude >= 3500
          ? "-5C to 12C"
          : "0C to 18C",
    accommodation: "Guesthouse / Tents",
    meals: "All Included on trail",
  };
}

function yatraMeta(yatra: Yatra): ProductMeta {
  const detail = getYatraDetailContent(yatra.slug);
  const region =
    yatra.district ??
    (yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh");
  const maxAlt = yatra.maxAltitude ?? "As per route";
  return {
    kind: "yatra",
    name: yatra.name,
    slug: yatra.slug,
    tagline: yatra.significance?.slice(0, 90) || `Sacred journey in ${region}`,
    blurb: (
      detail?.description ||
      yatra.description ||
      yatra.significance ||
      ""
    ).slice(0, 220),
    duration: `${yatra.duration} Days / ${yatra.duration - 1} Nights`,
    region,
    altitude: maxAlt.includes("ft") ? maxAlt : maxAlt,
    difficulty: yatra.difficulty ?? "Moderate",
    distance: `~${yatra.distance} km`,
    season: yatra.bestTime,
    startEnd: yatra.startPoint,
    price: `Rs.${yatra.price.toLocaleString("en-IN")}`,
    highlights: detail?.spiritualBenefits?.length
      ? detail.spiritualBenefits.slice(0, 5)
      : (yatra.spiritualBenefits ?? yatra.tags ?? []).slice(0, 5),
    inclusions: detail?.inclusions?.length
      ? detail.inclusions
      : yatra.inclusions?.length
        ? yatra.inclusions
        : DEFAULT_INCLUDED,
    exclusions: detail?.exclusions?.length
      ? detail.exclusions
      : yatra.exclusions?.length
        ? yatra.exclusions
        : DEFAULT_EXCLUDED,
    tempRange: "Varies by season",
    accommodation:
      detail?.accommodation ??
      yatra.accommodation ??
      "Dharamshala / Guesthouse",
    meals: "As per package",
  };
}

/** Page 1 — Hero + Trek Snapshot + Highlights */
function page1(
  doc: JsPDFDoc,
  meta: ProductMeta,
  hero: PdfImage | null,
  logo: PdfImage | null,
): void {
  header(doc, logo);
  const top = 20;
  const heroH = 108;
  if (hero) drawImg(doc, hero, 0, top, THEME.w, heroH);
  else {
    doc.setFillColor(...THEME.pine);
    doc.rect(0, top, THEME.w, heroH, "F");
  }
  for (let i = 0; i < 18; i++) {
    opacity(doc, 0.04 + i * 0.04);
    doc.setFillColor(...THEME.pine);
    doc.rect(0, top + heroH - 55 + i * 3, THEME.w, 4, "F");
  }
  opacity(doc, 1);

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  txt(doc, meta.name, THEME.m, top + heroH - 38, { maxWidth: cw() });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  txt(doc, meta.tagline, THEME.m, top + heroH - 28, { maxWidth: cw() });
  doc.setFontSize(9);
  doc.setTextColor(235, 235, 235);
  txt(doc, meta.blurb, THEME.m, top + heroH - 18, { maxWidth: cw() - 4 });

  const gridY = top + heroH + 6;
  const leftW = cw() * 0.62;
  const rightW = cw() - leftW - 4;
  card(doc, THEME.m, gridY, leftW, 118, THEME.white);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Trek Snapshot", THEME.m + 5, gridY + 9);

  const stats: [string, string][] = [
    ["Duration", meta.duration],
    ["Region", meta.region],
    ["Max Altitude", meta.altitude],
    ["Difficulty", meta.difficulty],
    ["Distance", meta.distance],
    ["Season", meta.season],
    ["Start/End", meta.startEnd],
    ["From", meta.price],
  ];
  let sy = gridY + 16;
  stats.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = THEME.m + 5 + col * (leftW / 2 - 4);
    const yy = sy + row * 14;
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...THEME.muted);
    txt(doc, label.toUpperCase(), x, yy);
    doc.setFontSize(8);
    doc.setTextColor(...THEME.primary);
    txt(doc, value, x, yy + 5, { maxWidth: leftW / 2 - 8 });
  });

  card(doc, THEME.m + leftW + 4, gridY, rightW, 118, THEME.primary);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.sunset);
  txt(doc, "Highlights", THEME.m + leftW + 9, gridY + 9);
  let hy = gridY + 16;
  for (const h of meta.highlights.length
    ? meta.highlights
    : ["Expert-led journey", "Stunning Himalayan views"]) {
    doc.setFillColor(...THEME.sunset);
    doc.circle(THEME.m + leftW + 11, hy, 1.2, "F");
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    txt(doc, h, THEME.m + leftW + 14, hy + 1, { maxWidth: rightW - 12 });
    hy += 8;
  }
  footer(doc);
}

/** Page 2 — Detailed itinerary timeline */
function page2(
  doc: JsPDFDoc,
  meta: ProductMeta,
  days: TrekItineraryDay[],
  images: PdfImage[],
  logo: PdfImage | null,
): void {
  let pageStart = true;
  let y = 22;
  const renderHeader = () => {
    header(doc, logo);
    y = 22;
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...THEME.primary);
    txt(doc, "Detailed Itinerary", THEME.m, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.muted);
    const intro = doc.splitTextToSize(
      sanitize(
        `A carefully curated ${meta.duration.toLowerCase()} journey through ${meta.region}. Each day builds acclimatization and delivers unforgettable Himalayan views.`,
      ),
      cw(),
    );
    doc.text(intro, THEME.m, y);
    y += intro.length * 4 + 6;
  };

  renderHeader();

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const dayNum = day.day ?? i + 1;
    const body = day.desc ?? day.description ?? "";
    const bodyLines = doc.splitTextToSize(sanitize(body), cw() - 22);
    const imgH = i % 2 === 1 && images[(i % images.length) + 1] ? 36 : 0;
    const boxH = 18 + bodyLines.length * 3.8 + imgH;

    if (y + boxH > 268) {
      footer(doc);
      doc.addPage();
      pageStart = true;
      renderHeader();
    }

    doc.setFillColor(...THEME.sunset);
    doc.circle(THEME.m + 3, y + 5, 2.5, "F");
    doc.setFillColor(255, 255, 255);
    doc.circle(THEME.m + 3, y + 5, 1, "F");
    if (i < days.length - 1) {
      doc.setDrawColor(...THEME.ice);
      doc.setLineWidth(0.4);
      doc.line(THEME.m + 3, y + 8, THEME.m + 3, y + boxH + 4);
    }

    card(doc, THEME.m + 10, y, cw() - 10, boxH, THEME.white);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...THEME.primary);
    txt(doc, `Day ${dayNum}: ${day.title}`, THEME.m + 14, y + 7, {
      maxWidth: cw() - 50,
    });
    doc.setFillColor(...THEME.pine);
    const badge = dayMeta(day).toUpperCase();
    const badgeW = Math.min(42, doc.getTextWidth(sanitize(badge)) + 6);
    doc.roundedRect(
      THEME.w - THEME.m - badgeW - 4,
      y + 3,
      badgeW,
      6,
      3,
      3,
      "F",
    );
    doc.setFontSize(5);
    doc.setTextColor(255, 255, 255);
    txt(doc, badge, THEME.w - THEME.m - badgeW / 2 - 4, y + 7.5, {
      align: "center",
    });

    let cy = y + 12;
    const dayImg = images[(i + 1) % images.length];
    if (imgH && dayImg) {
      drawImg(doc, dayImg, THEME.m + 14, cy, cw() - 28, imgH - 4);
      cy += imgH;
    }
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.muted);
    doc.text(bodyLines, THEME.m + 14, cy);
    y += boxH + 6;
    pageStart = false;
  }
  if (!pageStart) footer(doc);
}

/** Page 3 — Trek / Yatra information */
function page3(
  doc: JsPDFDoc,
  meta: ProductMeta,
  logo: PdfImage | null,
  banner: PdfImage | null,
): void {
  header(doc, logo);
  let y = 22;
  const bannerH = 42;
  if (banner) drawImg(doc, banner, THEME.m, y, cw(), bannerH);
  else {
    doc.setFillColor(...THEME.pine);
    doc.rect(THEME.m, y, cw(), bannerH, "F");
  }
  opacity(doc, 0.55);
  doc.setFillColor(...THEME.pine);
  doc.rect(THEME.m, y, cw(), bannerH, "F");
  opacity(doc, 1);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  txt(
    doc,
    meta.kind === "yatra" ? "Yatra Information" : "Trek Information",
    THEME.w / 2,
    y + 18,
    {
      align: "center",
    },
  );
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  txt(
    doc,
    "Essential details for your Himalayan expedition",
    THEME.w / 2,
    y + 26,
    {
      align: "center",
    },
  );
  y += bannerH + 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(
    doc,
    meta.kind === "yatra" ? "Journey Overview" : "Trek Overview",
    THEME.m,
    y,
  );
  y += 8;

  const overview: [string, string][] = [
    ["Difficulty", meta.difficulty],
    ["Altitude", meta.altitude],
    ["Distance", meta.distance],
    ["Duration", meta.duration.split("/")[0].trim()],
    ["Accommodation", meta.accommodation],
    ["Meals", meta.meals],
  ];
  const cellW = (cw() - 8) / 3;
  overview.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = THEME.m + col * (cellW + 4);
    const cy = y + row * 22;
    card(doc, x, cy, cellW, 18, THEME.white);
    doc.setFontSize(6);
    doc.setTextColor(...THEME.muted);
    txt(doc, label.toUpperCase(), x + 3, cy + 6);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...THEME.primary);
    txt(doc, value, x + 3, cy + 12, { maxWidth: cellW - 6 });
  });
  y += 50;

  const colW = (cw() - 6) / 2;
  card(doc, THEME.m, y, colW, 72, [242, 244, 246]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "What's Included", THEME.m + 4, y + 8);
  let iy = y + 14;
  for (const item of meta.inclusions.slice(0, 7)) {
    doc.setTextColor(...THEME.secondary);
    txt(doc, "+", THEME.m + 4, iy);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.primary);
    txt(doc, item, THEME.m + 8, iy, { maxWidth: colW - 12 });
    iy += 6;
  }

  card(doc, THEME.m + colW + 6, y, colW, 72, THEME.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  txt(doc, "Not Included", THEME.m + colW + 10, y + 8);
  let ey = y + 14;
  for (const item of meta.exclusions.slice(0, 6)) {
    doc.setTextColor(...THEME.error);
    txt(doc, "-", THEME.m + colW + 10, ey);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.muted);
    txt(doc, item, THEME.m + colW + 14, ey, { maxWidth: colW - 12 });
    ey += 6;
  }

  card(doc, THEME.m + cw() - 62, y + 78, 62, 28, THEME.pine);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  txt(doc, "Weather", THEME.m + cw() - 58, y + 86);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  txt(doc, `Season: ${meta.season}`, THEME.m + cw() - 58, y + 92);
  txt(doc, `Range: ${meta.tempRange}`, THEME.m + cw() - 58, y + 98);

  footer(doc);
}

/** Page 4 — Essential information */
function page4(
  doc: JsPDFDoc,
  meta: ProductMeta,
  logo: PdfImage | null,
  gearImg: PdfImage | null,
): void {
  header(doc, logo);
  let y = 22;
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Essential Information", THEME.m, y);
  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...THEME.muted);
  txt(
    doc,
    "Prepare for your expedition with the right gear and fitness.",
    THEME.m,
    y,
    {
      maxWidth: cw(),
    },
  );
  y += 12;

  const imgW = cw() * 0.38;
  if (gearImg) {
    card(doc, THEME.m, y, imgW, 52, THEME.white);
    drawImg(doc, gearImg, THEME.m + 1, y + 1, imgW - 2, 50);
  }
  const contentX = gearImg ? THEME.m + imgW + 6 : THEME.m;
  const contentW = gearImg ? cw() - imgW - 6 : cw();

  card(doc, contentX, y, contentW, 52, THEME.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Things to Carry", contentX + 4, y + 8);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.muted);
  txt(doc, "CLOTHING", contentX + 4, y + 14);
  let py = y + 18;
  for (const item of PACKING.clothing) {
    doc.setTextColor(...THEME.ice);
    txt(doc, "[ ]", contentX + 4, py);
    doc.setTextColor(...THEME.primary);
    txt(doc, item, contentX + 10, py);
    py += 5;
  }
  txt(doc, "GEAR & PERSONAL", contentX + contentW / 2, y + 14);
  py = y + 18;
  for (const item of PACKING.gear) {
    doc.setTextColor(...THEME.ice);
    txt(doc, "[ ]", contentX + contentW / 2, py);
    doc.setTextColor(...THEME.primary);
    txt(doc, item, contentX + contentW / 2 + 6, py);
    py += 5;
  }
  y += 58;

  const half = (cw() - 6) / 2;
  card(doc, THEME.m, y, half, 48, THEME.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Fitness Requirements", THEME.m + 4, y + 8);
  const fitness = [
    "Jogging: build cardio 3-4 weeks before departure.",
    "Stair climbing: prepare legs for steep ascents.",
    "Core strength: stability for carrying your pack.",
  ];
  let fy = y + 14;
  for (const line of fitness) {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.muted);
    txt(doc, line, THEME.m + 4, fy, { maxWidth: half - 8 });
    fy += 8;
  }

  card(doc, THEME.m + half + 6, y, half, 48, THEME.white);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...THEME.primary);
  txt(doc, "Safety Guidelines", THEME.m + half + 10, y + 8);
  const safety = [
    "Hydrate well to reduce altitude sickness risk.",
    "Maintain a steady pace — do not rush ascents.",
    `Emergency: ${PDF_COMPANY.phone}`,
  ];
  let sy = y + 14;
  for (const line of safety) {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...THEME.muted);
    txt(doc, line, THEME.m + half + 10, sy, { maxWidth: half - 8 });
    sy += 8;
  }

  doc.setFillColor(...THEME.sunset);
  doc.roundedRect(THEME.m, y + 54, cw(), 10, 4, 4, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  txt(doc, `Book ${meta.name} — ${meta.price}`, THEME.w / 2, y + 60.5, {
    align: "center",
  });

  footer(doc);
}

function normalizeDays(
  days: TrekItineraryDay[],
  fallbackTitle: string,
  fallbackDesc: string,
): TrekItineraryDay[] {
  if (days.length) return days;
  return [{ day: 1, title: fallbackTitle, desc: fallbackDesc }];
}

export async function renderMagazineTrekPdf(
  doc: JsPDFDoc,
  trek: Trek,
  itinerary: TrekItineraryDay[],
  deps: MagazinePdfDeps,
): Promise<void> {
  const meta = trekMeta(trek);
  const urls = [
    ...new Set([...trek.images, ...(trek.galleryImages ?? [])]),
  ].slice(0, 8);
  const logo = await deps.resolveLogo();
  const images = await deps.loadImages(urls);
  const days = normalizeDays(itinerary, trek.startPoint, meta.blurb);
  const hero = images[0] ?? null;

  page1(doc, meta, hero, logo);
  doc.addPage();
  page2(doc, meta, days, images, logo);
  doc.addPage();
  page3(doc, meta, logo, images[1] ?? hero);
  doc.addPage();
  page4(doc, meta, logo, images[2] ?? hero);
}

export async function renderMagazineYatraPdf(
  doc: JsPDFDoc,
  yatra: Yatra,
  deps: MagazinePdfDeps,
): Promise<void> {
  const detail = getYatraDetailContent(yatra.slug);
  const meta = yatraMeta(yatra);
  const rawItinerary = detail?.itinerary ?? yatra.itinerary;
  const days: TrekItineraryDay[] = rawItinerary
    ? Array.isArray(rawItinerary)
      ? rawItinerary.map((d, i) => ({
          day: i + 1,
          title:
            typeof d === "string"
              ? d
              : ((d as { title?: string }).title ?? `Day ${i + 1}`),
          desc:
            typeof d === "string"
              ? d
              : ((d as { description?: string }).description ?? ""),
        }))
      : Object.entries(rawItinerary).map(([title, desc], i) => ({
          day: i + 1,
          title,
          desc,
        }))
    : [];

  const urls = [...new Set(yatra.images.filter(Boolean))].slice(0, 8);
  const logo = await deps.resolveLogo();
  const images = await deps.loadImages(urls);
  const hero = images[0] ?? null;
  const normalized = normalizeDays(
    days,
    yatra.startPoint,
    meta.blurb || meta.tagline,
  );

  page1(doc, meta, hero, logo);
  doc.addPage();
  page2(doc, meta, normalized, images, logo);
  doc.addPage();
  page3(doc, meta, logo, images[1] ?? hero);
  doc.addPage();
  page4(doc, meta, logo, images[2] ?? hero);
}

export async function loadPdfImagesFromUrls(
  urls: string[],
  loader: (url: string, width?: number) => Promise<PdfImage | null>,
): Promise<PdfImage[]> {
  const loaded = await Promise.all(urls.map((url) => loader(url)));
  return loaded.filter((img): img is PdfImage => img !== null);
}
