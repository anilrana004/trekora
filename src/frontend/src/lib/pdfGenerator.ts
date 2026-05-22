import type { Trek } from "../data/treks";
import type { Yatra } from "../data/yatras";
import { buildSeoImageUrl } from "./images";
import { SITE_LOGO_URL } from "./site-brand";
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from "./site-contact";

type JsPDFDoc = import("jspdf").jsPDF;

type PdfImage = { dataUrl: string; format: "PNG" | "JPEG" };

const PDF_COMPANY = {
  website: "www.trekora.in",
  phone: SITE_PHONE_DISPLAY,
  email: SITE_EMAIL,
  instagram: "@trekora.in",
  trustLine:
    "Trusted by 10,000+ Adventurers | 4.9* Rated on Google | 100% Responsible Tourism",
  authorization:
    "Authorised Travel Company | Reg. No.: UDYAM-UK-07-0041727 | Recognised by Uttarakhand Tourism Development Board",
} as const;

const PDF_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778744940/wpn00ko2pztesvmf8z76.png";
const IMAGE_LOAD_TIMEOUT_MS = 8_000;
const TREK_IMAGES_BUDGET_MS = 15_000;

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

type ItineraryDay = TrekItineraryDay;

function sanitizePdfText(text: string): string {
  return text
    .replace(/\u20B9/g, "Rs.")
    .replace(/★/g, "*")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x00-\xFF]/g, "?");
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function blobToPdfImage(blob: Blob, dataUrl: string): PdfImage {
  return blob.type.includes("jpeg") || blob.type.includes("jpg")
    ? { dataUrl, format: "JPEG" }
    : { dataUrl, format: "PNG" };
}

async function rasterizeToJpeg(dataUrl: string): Promise<PdfImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve({ dataUrl: canvas.toDataURL("image/jpeg", 0.85), format: "JPEG" });
    };
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = dataUrl;
  });
}

async function fetchWithTimeout(url: string, ms = IMAGE_LOAD_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchRawPdfImage(url: string): Promise<PdfImage | null> {
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to read image"));
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    if (blob.type.includes("webp")) return rasterizeToJpeg(dataUrl);
    return blobToPdfImage(blob, dataUrl);
  } catch {
    return null;
  }
}

async function loadImageForPdf(src: string, width = 800): Promise<PdfImage | null> {
  try {
    const res = await fetchWithTimeout(buildSeoImageUrl(src, width));
    if (!res.ok) return null;
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to read image"));
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    if (blob.type.includes("webp")) return rasterizeToJpeg(dataUrl);
    return blobToPdfImage(blob, dataUrl);
  } catch {
    return null;
  }
}

async function resolveLogoDataUrl(): Promise<PdfImage | null> {
  const primary = await fetchRawPdfImage(PDF_LOGO_URL);
  if (primary) return primary;
  const cloud = await fetchRawPdfImage(SITE_LOGO_URL);
  if (cloud) return cloud;
  try {
    return await fetchRawPdfImage(`${window.location.origin}/logo.png`);
  } catch {
    return null;
  }
}

async function buildWatermarkLogo(logo: PdfImage): Promise<PdfImage | null> {
  try {
    return await new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.07;
        ctx.drawImage(img, 0, 0);
        resolve({ dataUrl: canvas.toDataURL("image/png"), format: "PNG" });
      };
      img.onerror = () => resolve(null);
      img.src = logo.dataUrl;
    });
  } catch {
    return null;
  }
}

function getTrekPhotoUrls(trek: Trek): string[] {
  const extra = trek.galleryImages ?? [];
  return [...new Set([...trek.images, ...extra].filter(Boolean))].slice(0, 6);
}

async function loadTrekPdfImages(trek: Trek): Promise<PdfImage[]> {
  const urls = getTrekPhotoUrls(trek);
  const loaded = await withTimeout(
    Promise.all(urls.map((url) => loadImageForPdf(url))),
    TREK_IMAGES_BUDGET_MS,
    urls.map(() => null),
  );
  return loaded.filter((img): img is PdfImage => img !== null);
}

function getYatraPhotoUrls(yatra: Yatra): string[] {
  return [...new Set(yatra.images.filter(Boolean))].slice(0, 4);
}

async function loadYatraPdfImages(yatra: Yatra): Promise<PdfImage[]> {
  const urls = getYatraPhotoUrls(yatra);
  const loaded = await withTimeout(
    Promise.all(urls.map((url) => loadImageForPdf(url))),
    TREK_IMAGES_BUDGET_MS,
    urls.map(() => null),
  );
  return loaded.filter((img): img is PdfImage => img !== null);
}

function drawPdfImage(doc: JsPDFDoc, img: PdfImage, x: number, y: number, w: number, h: number): void {
  try {
    doc.addImage(img.dataUrl, img.format, x, y, w, h);
  } catch {
    /* skip bad embed */
  }
}

function pdfText(doc: JsPDFDoc, text: string, x: number, y: number, options?: Parameters<JsPDFDoc["text"]>[3]): void {
  doc.text(sanitizePdfText(text), x, y, options);
}

function drawHeaderLogo(doc: JsPDFDoc, logo: PdfImage | null, margin: number): void {
  if (!logo) return;
  drawPdfImage(doc, logo, margin, 5, 38, 14);
}

function drawWatermarkLogo(doc: JsPDFDoc, watermark: PdfImage | null, width: number): void {
  if (!watermark) return;
  const w = 128;
  const h = 46;
  drawPdfImage(doc, watermark, (width - w) / 2, 297 / 2 - h / 2 - 8, w, h);
}

function drawPdfPageFooter(doc: JsPDFDoc, width: number, margin: number, accent: readonly [number, number, number]): void {
  const footerTop = 265;
  doc.setDrawColor(...accent);
  doc.setLineWidth(0.3);
  doc.line(margin, footerTop, width - margin, footerTop);
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 70);
  pdfText(
    doc,
    `Website: ${PDF_COMPANY.website}   Phone: ${PDF_COMPANY.phone}   Email: ${PDF_COMPANY.email}   Instagram: ${PDF_COMPANY.instagram}`,
    width / 2,
    footerTop + 5,
    { align: "center", maxWidth: width - margin * 2 },
  );
  doc.setFontSize(6);
  doc.setTextColor(110, 110, 110);
  pdfText(doc, PDF_COMPANY.trustLine, width / 2, footerTop + 10, { align: "center", maxWidth: width - margin * 2 });
}

function drawAuthorizationLine(doc: JsPDFDoc, width: number, margin: number): void {
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  pdfText(doc, PDF_COMPANY.authorization, width / 2, 292, { align: "center", maxWidth: width - margin * 2 });
}

function applyFootersToAllPages(
  doc: JsPDFDoc,
  width: number,
  margin: number,
  accent: readonly [number, number, number],
  watermark: PdfImage | null,
): void {
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawWatermarkLogo(doc, watermark, width);
    drawPdfPageFooter(doc, width, margin, accent);
    if (p === total) drawAuthorizationLine(doc, width, margin);
  }
}

type PdfColors = { red: readonly [number, number, number]; orange: readonly [number, number, number]; navy: readonly [number, number, number] };

type PdfLayoutState = {
  doc: JsPDFDoc;
  yRef: { y: number };
  margin: number;
  contentW: number;
  colors: PdfColors;
  addPage: () => void;
  checkY: (needed: number) => void;
};

function drawSectionTitle(state: PdfLayoutState, title: string): void {
  const { doc, margin, colors, yRef } = state;
  state.checkY(16);
  doc.setFillColor(...colors.red);
  doc.rect(margin, yRef.y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.navy);
  pdfText(doc, title, margin + 6, yRef.y + 8);
  yRef.y += 14;
}

function trekRegionLabel(trek: Trek): string {
  return trek.region ?? (trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh");
}

function trekTagline(trek: Trek): string {
  return trek.shortDesc || `The classic trek in ${trekRegionLabel(trek)}`;
}

function baseCampLabel(trek: Trek): string {
  return `${trek.startPoint} (~${Math.round(trek.altitude * 0.3).toLocaleString()}m)`;
}

function trekTemperatureRange(altitude: number): string {
  if (altitude >= 5000) return "Day: 5-12C | Night: -10 to -2C";
  if (altitude >= 4000) return "Day: 8-15C | Night: -5 to 3C";
  return "Day: 10-20C | Night: 0 to 8C";
}

function getTrekHighlights(trek: Trek): string[] {
  const ext = trek as Trek & { highlights?: string[] };
  if (ext.highlights?.length) return ext.highlights;
  if (trek.tags?.length) return trek.tags.slice(0, 6);
  return [
    "[Populate trek.highlights in trek data when available]",
    `Panoramic views on the ${trek.name} trail`,
    `High point near ${trek.altitude.toLocaleString()}m`,
    "Expert-led groups with acclimatisation built in",
  ];
}

const PDF_SPEC_INCLUSIONS = [
  "Accommodation",
  "All meals",
  "Trek Leader & Support Staff",
  "Permits and forest entry fees",
  "Camping equipment (Tents, Sleeping bag, Mattress)",
  "First Aid Kit & Oxygen Cylinder",
  "Technical equipment if required",
];

const PDF_SPEC_EXCLUSIONS = [
  "Transport to and from base camp",
  "Personal expenses",
  "Travel insurance",
  "Anything not mentioned in inclusions",
];

function drawBulletList(state: PdfLayoutState, items: string[], color: readonly [number, number, number]): void {
  const { doc, margin, contentW, yRef } = state;
  for (const item of items) {
    state.checkY(7);
    doc.setFillColor(...color);
    doc.circle(margin + 2, yRef.y + 1.5, 1.5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(sanitizePdfText(item), contentW - 6);
    pdfText(doc, lines.join(" "), margin + 6, yRef.y + 3);
    yRef.y += Math.max(6, lines.length * 4);
  }
}

function drawContentHeader(state: PdfLayoutState, trek: Trek): void {
  const { doc, margin, contentW, colors, yRef } = state;
  state.checkY(28);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...colors.navy);
  pdfText(doc, trek.name, margin, yRef.y + 6);
  yRef.y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  pdfText(doc, trekTagline(trek), margin, yRef.y + 4);
  yRef.y += 8;
  doc.setFillColor(...colors.orange);
  doc.roundedRect(margin, yRef.y, contentW, 10, 2, 2, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(
    doc,
    `${trek.duration} Days  |  ${trek.difficulty}  |  ${trekRegionLabel(trek)}`,
    margin + contentW / 2,
    yRef.y + 6.5,
    { align: "center" },
  );
  yRef.y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const intro = doc.splitTextToSize(sanitizePdfText(trek.shortDesc || trek.description), contentW);
  state.checkY(intro.length * 4 + 4);
  doc.text(intro, margin, yRef.y);
  yRef.y += intro.length * 4 + 8;
}

function drawOverviewAndHighlights(state: PdfLayoutState, trek: Trek): void {
  const { doc, margin, contentW, yRef } = state;
  const colW = (contentW - 4) / 2;
  const boxH = 52;
  state.checkY(boxH + 6);
  const boxY = yRef.y;
  const rows: [string, string][] = [
    ["Region", trekRegionLabel(trek)],
    ["Duration", `${trek.duration - 1} Nights / ${trek.duration} Days`],
    ["Best Time", trek.bestSeason],
    ["Max Altitude", `${trek.altitude.toLocaleString()} m`],
    ["Trek Type", trek.trekType],
    ["Difficulty", trek.difficulty],
    ["Base Camp", baseCampLabel(trek)],
    ["Total Distance", `~${trek.distance} km (approx.)`],
  ];
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, boxY, colW, boxH, 2, 2, "F");
  doc.setFillColor(255, 248, 240);
  doc.roundedRect(margin + colW + 4, boxY, colW, boxH, 2, 2, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(26, 26, 46);
  pdfText(doc, "Overview", margin + 3, boxY + 6);
  pdfText(doc, "Highlights", margin + colW + 7, boxY + 6);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  let oy = boxY + 12;
  for (const [l, v] of rows) {
    pdfText(doc, `${l}:`, margin + 3, oy);
    pdfText(doc, v, margin + 28, oy);
    oy += 4.5;
  }
  let hy = boxY + 12;
  for (const p of getTrekHighlights(trek).slice(0, 8)) {
    pdfText(doc, `- ${p}`, margin + colW + 7, hy, { maxWidth: colW - 10 });
    hy += 5;
  }
  yRef.y += boxH + 8;
}

function drawQuickInfoBox(state: PdfLayoutState, trek: Trek): void {
  const { doc, margin, contentW, colors, yRef } = state;
  state.checkY(22);
  doc.setFillColor(...colors.navy);
  doc.roundedRect(margin, yRef.y, contentW, 18, 2, 2, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(
    doc,
    [
      `Max Alt: ${trek.altitude.toLocaleString()}m`,
      `Base: ${trek.startPoint}`,
      `Duration: ${trek.duration} Days`,
      `Difficulty: ${trek.difficulty}`,
      `Temp: ${trekTemperatureRange(trek.altitude)}`,
      `Best: ${trek.bestSeason}`,
    ].join("   |   "),
    margin + contentW / 2,
    yRef.y + 11,
    { align: "center", maxWidth: contentW - 6 },
  );
  yRef.y += 22;
}

function drawItineraryTable(state: PdfLayoutState, itinerary: TrekItineraryDay[]): void {
  const { doc, margin, contentW, colors, yRef } = state;
  if (!itinerary.length) return;
  drawSectionTitle(state, "Day Wise Itinerary");
  const cols = { day: margin, route: margin + 10, dist: margin + 58, time: margin + 76, alt: margin + 98, stay: margin + 118, hi: margin + 148 };
  state.checkY(10);
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yRef.y, contentW, 7, "F");
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(60, 60, 60);
  for (const [label, x] of [
    ["DAY", cols.day],
    ["ROUTE/DESTINATION", cols.route],
    ["DIST", cols.dist],
    ["TREK TIME", cols.time],
    ["ALTITUDE", cols.alt],
    ["OVERNIGHT", cols.stay],
    ["HIGHLIGHTS", cols.hi],
  ] as const) {
    pdfText(doc, label, x, yRef.y + 5);
  }
  yRef.y += 8;
  for (let i = 0; i < itinerary.length; i++) {
    const day = itinerary[i];
    const dayNum = day.day ?? i + 1;
    state.checkY(10);
    doc.setFillColor(...colors.orange);
    doc.circle(cols.day + 3, yRef.y + 3, 3, "F");
    doc.setFontSize(5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(String(dayNum), cols.day + 3, yRef.y + 4, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    pdfText(doc, day.title, cols.route, yRef.y + 4, { maxWidth: 46 });
    pdfText(doc, day.distance ?? "-", cols.dist, yRef.y + 4, { maxWidth: 16 });
    pdfText(doc, day.trekTime ?? "5-7 hrs", cols.time, yRef.y + 4, { maxWidth: 20 });
    const alt = typeof day.altitude === "number" ? `${day.altitude.toLocaleString()}m` : (day.altitude ?? "-");
    pdfText(doc, alt, cols.alt, yRef.y + 4, { maxWidth: 18 });
    pdfText(doc, day.stay ?? "-", cols.stay, yRef.y + 4, { maxWidth: 28 });
    const hi =
      day.highlights ?? ((day.desc ?? day.description ?? "").slice(0, 60) || "-");
    pdfText(doc, hi, cols.hi, yRef.y + 4, { maxWidth: contentW - 150 });
    yRef.y += 8;
  }
  yRef.y += 4;
}

function drawBottomStatsBar(state: PdfLayoutState, trek: Trek): void {
  const { doc, margin, contentW, colors, yRef } = state;
  state.checkY(20);
  doc.setFillColor(...colors.orange);
  doc.rect(margin, yRef.y, contentW, 16, "F");
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  const row = [
    `Best Time: ${trek.bestSeason}`,
    `Max Alt: ${trek.altitude.toLocaleString()}m`,
    `Distance: ~${trek.distance} km`,
    `Difficulty: ${trek.difficulty}`,
    "Permits: Yes (as required)",
    "Safety First: AMS-aware guides, oxygen & first aid on trek",
  ];
  pdfText(doc, row.slice(0, 3).join("  |  "), margin + contentW / 2, yRef.y + 7, { align: "center", maxWidth: contentW - 4 });
  pdfText(doc, row.slice(3).join("  |  "), margin + contentW / 2, yRef.y + 12, { align: "center", maxWidth: contentW - 4 });
  yRef.y += 20;
}

function yatraRegionLabel(yatra: Yatra): string {
  return yatra.district ?? (yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh");
}

function yatraItineraryDays(yatra: Yatra): TrekItineraryDay[] {
  if (!yatra.itinerary) return [];
  return Object.entries(yatra.itinerary).map(([title, desc], i) => ({ day: i + 1, title, desc }));
}

function getYatraHighlights(yatra: Yatra): string[] {
  if (yatra.spiritualBenefits?.length) return yatra.spiritualBenefits.slice(0, 6);
  if (yatra.tags?.length) return yatra.tags.slice(0, 6);
  return ["[Populate yatra highlights in data when available]", `Sacred journey in ${yatraRegionLabel(yatra)}`];
}

export async function downloadTrekItineraryPDF(trek: Trek, itinerary: TrekItineraryDay[]): Promise<void> {
  try {
    await generateTrekItineraryPDF(trek, itinerary);
  } catch (err) {
    console.error("Trek itinerary PDF failed:", err);
    throw new Error("Could not generate the itinerary PDF. Please try again in a moment.");
  }
}

async function generateTrekItineraryPDF(trek: Trek, itinerary: TrekItineraryDay[]): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const logo = await withTimeout(resolveLogoDataUrl(), IMAGE_LOAD_TIMEOUT_MS, null);
  const [watermark, trekImages] = await Promise.all([
    logo ? buildWatermarkLogo(logo) : Promise.resolve(null),
    loadTrekPdfImages(trek),
  ]);

  const RED = [192, 0, 28] as const;
  const ORANGE = [232, 119, 34] as const;
  const NAVY = [26, 26, 46] as const;
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;
  const CONTENT_BOTTOM = 258;
  const yRef = { y: 0 };

  const addPage = () => {
    doc.addPage();
    yRef.y = 20;
    drawPdfPageFooter(doc, WIDTH, MARGIN, ORANGE);
  };

  const checkY = (needed: number) => {
    if (yRef.y + needed > CONTENT_BOTTOM) addPage();
  };

  const layout: PdfLayoutState = {
    doc,
    yRef,
    margin: MARGIN,
    contentW: CONTENT_W,
    colors: { red: RED, orange: ORANGE, navy: NAVY },
    addPage,
    checkY,
  };

  doc.setFillColor(...ORANGE);
  doc.rect(0, 0, WIDTH, 36, "F");
  drawHeaderLogo(doc, logo, MARGIN);

  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(doc, trek.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  pdfText(
    doc,
    `${trek.duration} Days | ${trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from Rs.${trek.price.toLocaleString("en-IN")}`,
    MARGIN,
    57,
  );

  yRef.y = 62;
  if (trekImages[0]) {
    checkY(50);
    drawPdfImage(doc, trekImages[0], MARGIN, yRef.y, CONTENT_W, 46);
    yRef.y += 50;
  } else {
    yRef.y = 70;
  }

  drawContentHeader(layout, trek);
  drawOverviewAndHighlights(layout, trek);
  drawQuickInfoBox(layout, trek);

  // ── Quick Stats Grid ──
  const stats = [
    ["Max Altitude", `${trek.altitude.toLocaleString()}m`],
    ["Difficulty", trek.difficulty],
    ["Distance", `${trek.distance} km`],
    ["Best Season", trek.bestSeason],
    ["Start Point", trek.startPoint],
    ["Trek Type", trek.trekType],
  ];
  doc.setFontSize(8);
  const colW = CONTENT_W / 3;
  stats.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = MARGIN + col * colW;
    const boxY = yRef.y + row * 14;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, boxY, colW - 3, 12, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    pdfText(doc, label, x + 3, boxY + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    pdfText(doc, String(value), x + 3, boxY + 10);
  });

  yRef.y += 32;

  checkY(24);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, yRef.y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  pdfText(doc, "About This Trek", MARGIN + 6, yRef.y + 8);
  yRef.y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(sanitizePdfText(trek.description), CONTENT_W);
  checkY(descLines.length * 5 + 4);
  doc.text(descLines, MARGIN, yRef.y);
  yRef.y += descLines.length * 5 + 8;

  drawItineraryTable(layout, itinerary);

  checkY(16);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, yRef.y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  pdfText(doc, "Day-by-Day Itinerary", MARGIN + 6, yRef.y + 8);
  yRef.y += 14;

  if (trekImages[1] && trekImages[2]) {
    checkY(40);
    const halfW = (CONTENT_W - 4) / 2;
    drawPdfImage(doc, trekImages[1], MARGIN, yRef.y, halfW, 36);
    drawPdfImage(doc, trekImages[2], MARGIN + halfW + 4, yRef.y, halfW, 36);
    yRef.y += 40;
  } else if (trekImages[1]) {
    checkY(42);
    drawPdfImage(doc, trekImages[1], MARGIN, yRef.y, CONTENT_W, 38);
    yRef.y += 42;
  }

  const inlinePhotos = trekImages.slice(3);
  const photoEvery =
    inlinePhotos.length > 0 ? Math.max(1, Math.floor(itinerary.length / inlinePhotos.length)) : 0;
  let inlinePhotoIndex = 0;

  // biome-ignore lint/complexity/noForEach: sequential PDF state mutation, not array transform
  itinerary.forEach((day, i) => {
    const dayNum = day.day ?? i + 1;
    checkY(22);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 5, yRef.y + 4, 5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(`D${dayNum}`, MARGIN + 5, yRef.y + 5.5, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    pdfText(doc, `Day ${dayNum}: ${day.title}`, MARGIN + 13, yRef.y + 3);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const sub = [
      day.stay && `Stay: ${day.stay}`,
      typeof day.altitude === "number" && `Alt: ${day.altitude.toLocaleString()}m`,
      typeof day.altitude === "string" && day.altitude && `Alt: ${day.altitude}`,
    ]
      .filter(Boolean)
      .join(" | ");
    if (sub) pdfText(doc, sub, MARGIN + 13, yRef.y + 8);
    const text = day.desc ?? day.description ?? "";
    if (text) {
      const lines = doc.splitTextToSize(sanitizePdfText(text), CONTENT_W - 13);
      doc.setTextColor(60, 60, 60);
      checkY(lines.length * 4 + 2);
      doc.text(lines, MARGIN + 13, yRef.y + 13);
      yRef.y += lines.length * 4 + 16;
    } else {
      yRef.y += 14;
    }
    if (photoEvery > 0 && (i + 1) % photoEvery === 0 && inlinePhotoIndex < inlinePhotos.length) {
      checkY(44);
      drawPdfImage(doc, inlinePhotos[inlinePhotoIndex], MARGIN, yRef.y, CONTENT_W, 40);
      inlinePhotoIndex += 1;
      yRef.y += 44;
    }
  });

  drawSectionTitle(layout, "Inclusions");
  drawBulletList(layout, PDF_SPEC_INCLUSIONS, [46, 125, 50]);
  yRef.y += 2;
  drawSectionTitle(layout, "Exclusions");
  drawBulletList(layout, PDF_SPEC_EXCLUSIONS, [192, 0, 28]);
  yRef.y += 2;

  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, yRef.y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  pdfText(doc, "What's Included", MARGIN + 6, yRef.y + 8);
  yRef.y += 14;
  const included = [
    "Accommodation (tent/guesthouse as per itinerary)",
    "All meals during the trek (breakfast, lunch, dinner)",
    "Certified NCISM mountain trek leader",
    "Forest department permits & national park entry fees",
    "Quality camping equipment (tents, sleeping mats)",
    "First-aid medical kit with AMS treatment",
    "Portable oxygen cylinder (1 per group)",
  ];
  for (const item of included) {
    checkY(7);
    doc.setFillColor(46, 125, 50);
    doc.circle(MARGIN + 2, yRef.y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    pdfText(doc, item, MARGIN + 6, yRef.y + 3);
    yRef.y += 6;
  }
  yRef.y += 4;
  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, yRef.y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  pdfText(doc, "Essential Gear", MARGIN + 6, yRef.y + 8);
  yRef.y += 14;
  const gear = [
    "Waterproof trekking boots (ankle support)",
    "Layered warm clothing (thermal + fleece + outer shell)",
    "40-50L trekking backpack with rain cover",
    "Trekking poles & headlamp",
    "Sleeping bag (-10C rated)",
    "Sunscreen SPF 50+, UV400 sunglasses",
    "Government photo ID (Aadhaar / Passport)",
  ];
  for (const item of gear) {
    checkY(7);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 2, yRef.y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    pdfText(doc, item, MARGIN + 6, yRef.y + 3);
    yRef.y += 6;
  }

  drawBottomStatsBar(layout, trek);
  applyFootersToAllPages(doc, WIDTH, MARGIN, ORANGE, watermark);
  doc.save(`${trek.slug}-itinerary.pdf`);
}

export async function downloadYatraItineraryPDF(yatra: Yatra): Promise<void> {
  try {
    await generateYatraItineraryPDF(yatra);
  } catch (err) {
    console.error("Yatra itinerary PDF failed:", err);
    throw new Error("Could not generate the itinerary PDF. Please try again in a moment.");
  }
}

async function generateYatraItineraryPDF(yatra: Yatra): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const logo = await withTimeout(resolveLogoDataUrl(), IMAGE_LOAD_TIMEOUT_MS, null);
  const [watermark, yatraImages] = await Promise.all([
    logo ? buildWatermarkLogo(logo) : Promise.resolve(null),
    loadYatraPdfImages(yatra),
  ]);

  const RED = [192, 0, 28] as const;
  const ORANGE = [232, 119, 34] as const;
  const NAVY = [26, 26, 46] as const;
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;
  const CONTENT_BOTTOM = 258;
  const yRef = { y: 0 };
  const yatraDays = yatraItineraryDays(yatra);

  const addPage = () => {
    doc.addPage();
    yRef.y = 20;
    drawPdfPageFooter(doc, WIDTH, MARGIN, ORANGE);
  };

  const checkY = (needed: number) => {
    if (yRef.y + needed > CONTENT_BOTTOM) addPage();
  };

  const layout: PdfLayoutState = {
    doc,
    yRef,
    margin: MARGIN,
    contentW: CONTENT_W,
    colors: { red: RED, orange: ORANGE, navy: NAVY },
    addPage,
    checkY,
  };

  doc.setFillColor(...ORANGE);
  doc.rect(0, 0, WIDTH, 36, "F");
  drawHeaderLogo(doc, logo, MARGIN);

  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(doc, yatra.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  pdfText(
    doc,
    `${yatra.duration} Days | ${yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from Rs.${yatra.price.toLocaleString("en-IN")}`,
    MARGIN,
    57,
  );

  yRef.y = 62;
  if (yatraImages[0]) {
    checkY(50);
    drawPdfImage(doc, yatraImages[0], MARGIN, yRef.y, CONTENT_W, 46);
    yRef.y += 50;
  } else {
    yRef.y = 70;
  }

  layout.checkY(28);
  const { doc: d, margin, contentW, colors, yRef: yr } = layout;
  d.setFontSize(18);
  d.setFont("helvetica", "bold");
  d.setTextColor(...colors.navy);
  pdfText(d, yatra.name, margin, yr.y + 6);
  yr.y += 10;
  d.setFontSize(10);
  d.setFont("helvetica", "normal");
  d.setTextColor(90, 90, 90);
  pdfText(d, (yatra.significance?.slice(0, 120) || `Sacred yatra in ${yatraRegionLabel(yatra)}`), margin, yr.y + 4, { maxWidth: contentW });
  yr.y += 10;
  d.setFillColor(...colors.orange);
  d.roundedRect(margin, yr.y, contentW, 10, 2, 2, "F");
  d.setFontSize(8);
  d.setFont("helvetica", "bold");
  d.setTextColor(255, 255, 255);
  pdfText(
    d,
    `${yatra.duration} Days  |  ${yatra.difficulty ?? "Moderate"}  |  ${yatraRegionLabel(yatra)}`,
    margin + contentW / 2,
    yr.y + 6.5,
    { align: "center" },
  );
  yr.y += 14;

  const colW = (contentW - 4) / 2;
  const boxH = 48;
  layout.checkY(boxH + 6);
  const boxY = yr.y;
  doc.setFillColor(248, 248, 248);
  doc.roundedRect(margin, boxY, colW, boxH, 2, 2, "F");
  doc.setFillColor(255, 248, 240);
  doc.roundedRect(margin + colW + 4, boxY, colW, boxH, 2, 2, "F");
  pdfText(doc, "Overview", margin + 3, boxY + 6);
  pdfText(doc, "Highlights", margin + colW + 7, boxY + 6);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  let oy = boxY + 12;
  for (const [l, v] of [
    ["Region", yatraRegionLabel(yatra)],
    ["Duration", `${yatra.duration - 1} Nights / ${yatra.duration} Days`],
    ["Best Time", yatra.bestTime],
    ["Max Altitude", yatra.maxAltitude ?? "As per route"],
    ["Type", yatra.tags?.[0] ?? "Pilgrimage"],
    ["Difficulty", yatra.difficulty ?? "Moderate"],
    ["Base", yatra.startPoint],
    ["Distance", `~${yatra.distance} km`],
  ] as [string, string][]) {
    pdfText(doc, `${l}: ${v}`, margin + 3, oy);
    oy += 4.5;
  }
  let hy = boxY + 12;
  for (const p of getYatraHighlights(yatra).slice(0, 7)) {
    pdfText(doc, `- ${p}`, margin + colW + 7, hy, { maxWidth: colW - 10 });
    hy += 5;
  }
  yr.y += boxH + 8;

  layout.checkY(22);
  doc.setFillColor(...NAVY);
  doc.roundedRect(margin, yr.y, contentW, 18, 2, 2, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(
    doc,
    [
      `Max Alt: ${yatra.maxAltitude ?? "Varies"}`,
      `Base: ${yatra.startPoint}`,
      `Duration: ${yatra.duration} Days`,
      `Best: ${yatra.bestTime}`,
    ].join("   |   "),
    margin + contentW / 2,
    yr.y + 11,
    { align: "center", maxWidth: contentW - 6 },
  );
  yr.y += 22;

  const stats: [string, string][] = [
    ["Duration", `${yatra.duration} Days`],
    ["Distance", `${yatra.distance} km`],
    ["Start Point", yatra.startPoint],
    ["Best Time", yatra.bestTime],
  ];
  doc.setFontSize(8);
  const statColW = contentW / 4;
  stats.forEach(([label, value], i) => {
    const x = MARGIN + i * statColW;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, yr.y, statColW - 3, 12, 2, 2, "F");
    pdfText(doc, label, x + 3, yr.y + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    pdfText(doc, value, x + 3, yr.y + 10);
    doc.setFont("helvetica", "normal");
  });
  yr.y += 18;

  if (yatra.significance) {
    layout.checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, yr.y, 3, 10, "F");
    pdfText(doc, "Spiritual Significance", MARGIN + 6, yr.y + 8);
    yr.y += 14;
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const sigLines = doc.splitTextToSize(sanitizePdfText(yatra.significance.substring(0, 600)), CONTENT_W);
    layout.checkY(sigLines.length * 5 + 4);
    doc.text(sigLines, MARGIN, yr.y);
    yr.y += sigLines.length * 5 + 8;
  }

  if (yatraDays.length > 0) drawItineraryTable(layout, yatraDays);

  drawSectionTitle(layout, "Inclusions");
  drawBulletList(layout, yatra.inclusions?.length ? yatra.inclusions : PDF_SPEC_INCLUSIONS, [46, 125, 50]);
  yr.y += 2;
  drawSectionTitle(layout, "Exclusions");
  drawBulletList(layout, yatra.exclusions?.length ? yatra.exclusions : PDF_SPEC_EXCLUSIONS, [192, 0, 28]);
  yr.y += 2;

  if (yatraDays.length > 0) {
    layout.checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, yr.y, 3, 10, "F");
    pdfText(doc, "Day-by-Day Itinerary", MARGIN + 6, yr.y + 8);
    yr.y += 14;
    for (const day of yatraDays) {
      layout.checkY(22);
      doc.setFillColor(...ORANGE);
      doc.circle(MARGIN + 5, yr.y + 4, 5, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`D${day.day ?? ""}`, MARGIN + 5, yr.y + 5.5, { align: "center" });
      pdfText(doc, `Day ${day.day}: ${day.title}`, MARGIN + 13, yr.y + 3);
      const text = day.desc ?? day.description ?? "";
      if (text) {
        const lines = doc.splitTextToSize(sanitizePdfText(text), CONTENT_W - 13);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        layout.checkY(lines.length * 4 + 2);
        doc.text(lines, MARGIN + 13, yr.y + 9);
        yr.y += lines.length * 4 + 14;
      } else {
        yr.y += 12;
      }
    }
  }

  layout.checkY(20);
  doc.setFillColor(...ORANGE);
  doc.rect(margin, yr.y, contentW, 16, "F");
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  const permits =
    yatra.permits && yatra.permits.length > 0 ? `Permits: ${yatra.permits.join(", ")}` : "Permits: As required";
  pdfText(
    doc,
    [`Best: ${yatra.bestTime}`, `Distance: ~${yatra.distance} km`, permits].join("  |  "),
    margin + contentW / 2,
    yr.y + 7,
    { align: "center", maxWidth: contentW - 4 },
  );
  pdfText(
    doc,
    "Safety First: Registered guides, medical support & local compliance",
    margin + contentW / 2,
    yr.y + 12,
    { align: "center" },
  );
  yr.y += 20;

  applyFootersToAllPages(doc, WIDTH, MARGIN, ORANGE, watermark);
  doc.save(`${yatra.slug}-itinerary.pdf`);
}

export type FitnessTrainingPlanPdfInput = {
  trekName: string;
  trekSlug?: string;
  trekDifficulty: string;
  trekAltitude: number;
  trekDuration: number;
  age: number;
  fitness: string;
  experience: string;
  conditions: string[];
  score: number;
  readinessLabel: string;
  trainingWeeks: { week: number; plan: string }[];
};

export async function downloadFitnessTrainingPlanPDF(
  input: FitnessTrainingPlanPdfInput,
): Promise<void> {
  try {
    await generateFitnessTrainingPlanPDF(input);
  } catch (err) {
    console.error("Fitness training plan PDF failed:", err);
    throw new Error(
      "Could not generate the training plan PDF. Please try again in a moment.",
    );
  }
}

async function generateFitnessTrainingPlanPDF(
  input: FitnessTrainingPlanPdfInput,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const logo = await withTimeout(resolveLogoDataUrl(), IMAGE_LOAD_TIMEOUT_MS, null);
  const watermark = logo ? await buildWatermarkLogo(logo) : null;

  const RED = [192, 0, 28] as const;
  const ORANGE = [232, 119, 34] as const;
  const NAVY = [26, 26, 46] as const;
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;
  const CONTENT_BOTTOM = 258;

  let y = 0;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };

  const checkY = (needed: number) => {
    if (y + needed > CONTENT_BOTTOM) addPage();
  };

  doc.setFillColor(...ORANGE);
  doc.rect(0, 0, WIDTH, 36, "F");
  drawHeaderLogo(doc, logo, MARGIN);

  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  pdfText(doc, input.trekName, MARGIN, 49);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  pdfText(
    doc,
    `4-Week Training Plan  |  Difficulty: ${input.trekDifficulty}  |  Max altitude: ${input.trekAltitude.toLocaleString()}m  |  ${input.trekDuration} days`,
    MARGIN,
    55,
  );

  y = 66;

  checkY(32);
  doc.setFillColor(255, 248, 240);
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.4);
  doc.roundedRect(MARGIN, y, CONTENT_W, 28, 2, 2, "FD");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...ORANGE);
  pdfText(doc, `Fitness score: ${input.score}/100`, MARGIN + 4, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const labelLines = doc.splitTextToSize(sanitizePdfText(input.readinessLabel), CONTENT_W - 8);
  doc.text(labelLines, MARGIN + 4, y + 15);
  doc.setFontSize(8);
  pdfText(
    doc,
    `Age ${input.age}  |  ${input.fitness}  |  ${input.experience}  |  Conditions: ${input.conditions.join(", ")}`,
    MARGIN + 4,
    y + 22,
  );
  y += 36;

  checkY(16);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  pdfText(doc, "Your Training Schedule", MARGIN + 6, y + 8);
  y += 14;

  for (const week of input.trainingWeeks) {
    const planLines = doc.splitTextToSize(sanitizePdfText(week.plan), CONTENT_W - 20);
    const boxH = Math.max(18, planLines.length * 4 + 10);
    checkY(boxH + 4);

    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2, 2, "FD");

    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 7, y + 7, 5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    pdfText(doc, `W${week.week}`, MARGIN + 7, y + 8, { align: "center" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(planLines, MARGIN + 16, y + 7);

    y += boxH + 4;
  }

  y += 4;
  checkY(12);
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  const disclaimer = doc.splitTextToSize(
    sanitizePdfText(
      "This plan is a general guide. Consult your doctor before starting any fitness program, especially with medical conditions.",
    ),
    CONTENT_W,
  );
  doc.text(disclaimer, MARGIN, y);

  applyFootersToAllPages(doc, WIDTH, MARGIN, ORANGE, watermark);

  const slug =
    input.trekSlug ||
    input.trekName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") ||
    "trek";
  doc.save(`${slug}-training-plan.pdf`);
}
