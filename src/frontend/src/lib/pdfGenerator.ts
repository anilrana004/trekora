import type { Trek } from "../data/treks";
import type { Yatra } from "../data/yatras";
import { buildSeoImageUrl } from "./images";
import {
  loadPdfImagesFromUrls,
  renderMagazineTrekPdf,
  renderMagazineYatraPdf,
} from "./pdf-itinerary-layout";
import { SITE_LOGO_URL } from "./site-brand";
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from "./site-contact";

export type { TrekItineraryDay } from "./pdf-itinerary-layout";
import type { TrekItineraryDay } from "./pdf-itinerary-layout";

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

const PDF_LOGO_URL = SITE_LOGO_URL;
const IMAGE_LOAD_TIMEOUT_MS = 8_000;
type JsPDFDoc = import("jspdf").jsPDF;

function sanitizePdfText(text: string): string {
  return text
    .replace(/\u20B9/g, "Rs.")
    .replace(/â˜…/g, "*")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[^\x00-\xFF]/g, "?");
}

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  fallback: T,
): Promise<T> {
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
      resolve({
        dataUrl: canvas.toDataURL("image/jpeg", 0.85),
        format: "JPEG",
      });
    };
    img.onerror = () => reject(new Error("Image decode failed"));
    img.src = dataUrl;
  });
}

async function fetchWithTimeout(
  url: string,
  ms = IMAGE_LOAD_TIMEOUT_MS,
): Promise<Response> {
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

async function loadImageForPdf(
  src: string,
  width = 800,
): Promise<PdfImage | null> {
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

function drawPdfImage(
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
    /* skip bad embed */
  }
}

function pdfText(
  doc: JsPDFDoc,
  text: string,
  x: number,
  y: number,
  options?: Parameters<JsPDFDoc["text"]>[3],
): void {
  doc.text(sanitizePdfText(text), x, y, options);
}

function drawHeaderLogo(
  doc: JsPDFDoc,
  logo: PdfImage | null,
  margin: number,
): void {
  if (!logo) return;
  drawPdfImage(doc, logo, margin, 5, 38, 14);
}

function drawWatermarkLogo(
  doc: JsPDFDoc,
  watermark: PdfImage | null,
  width: number,
): void {
  if (!watermark) return;
  const w = 128;
  const h = 46;
  drawPdfImage(doc, watermark, (width - w) / 2, 297 / 2 - h / 2 - 8, w, h);
}

function drawPdfPageFooter(
  doc: JsPDFDoc,
  width: number,
  margin: number,
  accent: readonly [number, number, number],
): void {
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
  pdfText(doc, PDF_COMPANY.trustLine, width / 2, footerTop + 10, {
    align: "center",
    maxWidth: width - margin * 2,
  });
}

function drawAuthorizationLine(
  doc: JsPDFDoc,
  width: number,
  margin: number,
): void {
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 90);
  pdfText(doc, PDF_COMPANY.authorization, width / 2, 292, {
    align: "center",
    maxWidth: width - margin * 2,
  });
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

export async function downloadTrekItineraryPDF(
  trek: Trek,
  itinerary: TrekItineraryDay[],
): Promise<void> {
  try {
    await generateTrekItineraryPDF(trek, itinerary);
  } catch (err) {
    console.error("Trek itinerary PDF failed:", err);
    throw new Error(
      "Could not generate the itinerary PDF. Please try again in a moment.",
    );
  }
}

async function generateTrekItineraryPDF(
  trek: Trek,
  itinerary: TrekItineraryDay[],
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  await renderMagazineTrekPdf(doc, trek, itinerary, {
    resolveLogo: () =>
      withTimeout(resolveLogoDataUrl(), IMAGE_LOAD_TIMEOUT_MS, null),
    loadImages: (urls) => loadPdfImagesFromUrls(urls, loadImageForPdf),
  });
  doc.save(`${trek.slug}-itinerary.pdf`);
}

export async function downloadYatraItineraryPDF(yatra: Yatra): Promise<void> {
  try {
    await generateYatraItineraryPDF(yatra);
  } catch (err) {
    console.error("Yatra itinerary PDF failed:", err);
    throw new Error(
      "Could not generate the itinerary PDF. Please try again in a moment.",
    );
  }
}

async function generateYatraItineraryPDF(yatra: Yatra): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  await renderMagazineYatraPdf(doc, yatra, {
    resolveLogo: () =>
      withTimeout(resolveLogoDataUrl(), IMAGE_LOAD_TIMEOUT_MS, null),
    loadImages: (urls) => loadPdfImagesFromUrls(urls, loadImageForPdf),
  });
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

  const logo = await withTimeout(
    resolveLogoDataUrl(),
    IMAGE_LOAD_TIMEOUT_MS,
    null,
  );
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
  const labelLines = doc.splitTextToSize(
    sanitizePdfText(input.readinessLabel),
    CONTENT_W - 8,
  );
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
    const planLines = doc.splitTextToSize(
      sanitizePdfText(week.plan),
      CONTENT_W - 20,
    );
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
