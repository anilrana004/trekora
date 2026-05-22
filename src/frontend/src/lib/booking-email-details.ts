/** Structured booking form snapshot for confirmation emails (admin + customer). */

import type { BookingFileMeta } from "./booking-documents";
import { formatFileSize } from "./booking-documents";

export type BookingEmailField = { label: string; value: string };

export type BookingEmailSection = {
  title: string;
  fields: BookingEmailField[];
};

export type CoTravelerSnapshot = {
  name: string;
  age: string;
  gender: string;
  email: string;
  mobile: string;
  relationship: string;
  bloodGroup: string;
  medicalNote: string;
};

export type BookingFormSnapshot = {
  batchDate: string | null;
  groupSize: number;
  addOns: string[];
  fullName: string;
  email: string;
  mobile: string;
  whatsappSame: boolean;
  whatsapp: string;
  city: string;
  age: string;
  gender: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  bloodGroup: string;
  medicalConditions: string[];
  medicalOther: string;
  fitnessLevel: string;
  hasTrekked: boolean;
  longestTrek: string;
  idProofFile: BookingFileMeta | null;
  photoFile: BookingFileMeta | null;
  fitnessCertFile: BookingFileMeta | null;
  hasCoTravelers: boolean;
  coTravelers: CoTravelerSnapshot[];
  heardFrom: string;
  dietary: string[];
  accommodationNote: string;
  needsTransport: boolean;
  transportCity: string;
  transportDate: string;
  contactMode: string[];
  promoCode: string;
  promoApplied: boolean;
  promoDiscount: number;
  otherNotes: string;
  termsAccepted: boolean;
};

export type BookingEmailMeta = {
  itemType: string;
  itemName: string;
  trekSlug?: string;
  batchDateLabel: string;
  batchStatus: string;
  addOnLabels: string[];
  packageTagline?: string;
  packageDescription?: string;
  packageCategory?: string;
  packageBadge?: string;
  packageBestSeason?: string;
  packageBundleWas?: string;
  packageHighlights?: string[];
  packageInclusions?: string[];
  packageComponents?: string[];
  pricing?: {
    unitPrice: number;
    groupSize: number;
    base: number;
    groupDiscount: number;
    addOnsTotal: number;
    gst: number;
    promoSavings: number;
    codeSavings?: number;
    grandTotal: number;
  };
};

const MEDICAL_LABELS: Record<string, string> = {
  heart: "Heart condition or High blood pressure",
  diabetes: "Diabetes (Type 1 or Type 2)",
  asthma: "Asthma or respiratory issues",
  epilepsy: "Epilepsy or seizure disorder",
  joints: "Knee, hip, or joint problems",
  none: "None of the above",
};

const FITNESS_LABELS: Record<string, string> = {
  active: "Very Active — gym 4+ days/week or can run 5km easily",
  moderate: "Moderately Active — walk/exercise 2–3 days/week",
  sedentary: "Sedentary — minimal regular exercise",
};

const DIETARY_LABELS: Record<string, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  jain: "Jain Vegetarian",
  glutenfree: "Gluten-free",
  none_req: "No specific requirement",
};

function field(label: string, value: string | null | undefined): BookingEmailField | null {
  const v = value == null ? "" : String(value).trim();
  if (!v) return null;
  return { label, value: v };
}

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

function formatInr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function joinList(items: string[]): string | null {
  const cleaned = items.map((s) => s.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned.join(", ") : null;
}

/** Build labeled sections for booking confirmation emails. */
export function buildBookingEmailSections(
  fd: BookingFormSnapshot,
  meta: BookingEmailMeta,
): BookingEmailSection[] {
  const whatsapp = fd.whatsappSame ? fd.mobile : fd.whatsapp;
  const medicalLabels = fd.medicalConditions
    .map((id) => MEDICAL_LABELS[id] ?? id)
    .filter(Boolean);
  const dietaryLabels = fd.dietary
    .map((id) => DIETARY_LABELS[id] ?? id)
    .filter(Boolean);

  const isPackage = meta.itemType === "package";
  const tripFields = [
    field("Product type", isPackage ? "Curated package" : meta.itemType),
    field(isPackage ? "Package name" : "Trek / Yatra", meta.itemName),
    field("Slug", meta.trekSlug),
    field("Tagline", meta.packageTagline),
    field("Category", meta.packageCategory),
    field("Badge", meta.packageBadge),
    field("Best season", meta.packageBestSeason),
    field("Bundle list price", meta.packageBundleWas),
    field(
      "Package description",
      meta.packageDescription
        ? meta.packageDescription.slice(0, 500)
        : null,
    ),
    field(
      "Included treks & yatras",
      meta.packageComponents ? joinList(meta.packageComponents) : null,
    ),
    field(
      "Highlights",
      meta.packageHighlights ? joinList(meta.packageHighlights) : null,
    ),
    field(
      "Inclusions",
      meta.packageInclusions ? joinList(meta.packageInclusions) : null,
    ),
    field("Departure date", meta.batchDateLabel),
    field("Batch status", meta.batchStatus),
    field("Group size", String(fd.groupSize)),
    field("Add-ons", joinList(meta.addOnLabels)),
  ].filter(Boolean) as BookingEmailField[];

  const pricingFields: BookingEmailField[] = [];
  if (meta.pricing) {
    const p = meta.pricing;
    pricingFields.push(
      { label: "Price per person", value: formatInr(p.unitPrice) },
      { label: "Base (before discounts)", value: formatInr(p.base) },
    );
    if (p.groupDiscount > 0) {
      pricingFields.push({
        label: "Group discount (5+ travelers)",
        value: `−${formatInr(p.groupDiscount)}`,
      });
    }
    if (p.addOnsTotal > 0) {
      pricingFields.push({ label: "Add-ons total", value: formatInr(p.addOnsTotal) });
    }
    pricingFields.push({ label: "GST (5%)", value: formatInr(p.gst) });
    if (p.promoSavings > 0) {
      pricingFields.push({
        label: "Promo savings",
        value: `−${formatInr(p.promoSavings)}`,
      });
    }
    if ((p.codeSavings ?? 0) > 0) {
      pricingFields.push({
        label: "Voucher / gift card",
        value: `−${formatInr(p.codeSavings ?? 0)}`,
      });
    }
    pricingFields.push({
      label: "Estimated grand total",
      value: formatInr(p.grandTotal),
    });
  }

  const travelerFields = [
    field("Full name", fd.fullName),
    field("Email", fd.email),
    field("Mobile", fd.mobile),
    field("WhatsApp", whatsapp),
    field("City", fd.city),
    field("Age", fd.age),
    field("Gender", fd.gender),
    field("Emergency contact", fd.emergencyName),
    field("Emergency relation", fd.emergencyRelation),
    field("Emergency phone", fd.emergencyPhone),
    field("Preferred contact", joinList(fd.contactMode)),
    field("How they heard about us", fd.heardFrom),
  ].filter(Boolean) as BookingEmailField[];

  const healthFields = [
    field("Blood group", fd.bloodGroup),
    field("Medical conditions", joinList(medicalLabels)),
    field("Other conditions / medications", fd.medicalOther),
    field(
      "Fitness level",
      FITNESS_LABELS[fd.fitnessLevel] ?? fd.fitnessLevel,
    ),
    field("Prior trekking experience", yesNo(fd.hasTrekked)),
    field("Longest trek completed", fd.longestTrek),
  ].filter(Boolean) as BookingEmailField[];

  const fileLabel = (f: BookingFileMeta | null) =>
    f ? `${f.filename} (${formatFileSize(f.sizeBytes)})` : null;

  const documentFields = [
    field("Government ID proof", fileLabel(fd.idProofFile) ?? "Not attached"),
    field("Passport-size photo", fileLabel(fd.photoFile) ?? "Not attached"),
    field(
      "Fitness certificate",
      fileLabel(fd.fitnessCertFile) ?? "Not provided",
    ),
    field("Co-travelers", yesNo(fd.hasCoTravelers)),
  ].filter(Boolean) as BookingEmailField[];

  const coTravelerSections: BookingEmailSection[] = fd.hasCoTravelers
    ? fd.coTravelers
        .map((ct, i) => {
          const fields = [
            field("Name", ct.name),
            field("Relationship", ct.relationship),
            field("Age", ct.age),
            field("Gender", ct.gender),
            field("Email", ct.email),
            field("Mobile", ct.mobile),
            field("Blood group", ct.bloodGroup),
            field("Medical note", ct.medicalNote),
          ].filter(Boolean) as BookingEmailField[];
          if (fields.length === 0) return null;
          return {
            title: `Traveling with you — Person ${i + 2}`,
            fields,
          };
        })
        .filter((s): s is BookingEmailSection => s != null)
    : [];

  const preferenceFields = [
    field("Dietary requirements", joinList(dietaryLabels)),
    field("Accommodation preference", fd.accommodationNote),
    field("Needs transport assistance", yesNo(fd.needsTransport)),
    field("Transport from city", fd.transportCity),
    field("Transport date", fd.transportDate),
    field("Promo code", fd.promoApplied ? fd.promoCode : null),
    field(
      "Promo applied",
      fd.promoApplied ? yesNo(true) : null,
    ),
    field("Other notes / special requests", fd.otherNotes),
    field("Terms accepted", yesNo(fd.termsAccepted)),
  ].filter(Boolean) as BookingEmailField[];

  const sections: BookingEmailSection[] = [
    { title: "Trip & batch", fields: tripFields },
  ];
  if (pricingFields.length > 0) {
    sections.push({ title: "Pricing estimate", fields: pricingFields });
  }
  sections.push(
    { title: "Lead traveler", fields: travelerFields },
    { title: "Health & fitness", fields: healthFields },
    { title: "Documents", fields: documentFields },
    ...coTravelerSections,
    { title: "Preferences & notes", fields: preferenceFields },
  );

  return sections.filter((s) => s.fields.length > 0);
}

/** Plain-text block for SMTP `details` and backwards compatibility. */
export function bookingDetailsPlainText(sections: BookingEmailSection[]): string {
  return sections
    .map((section) => {
      const lines = section.fields.map((f) => `${f.label}: ${f.value}`);
      return [`── ${section.title} ──`, ...lines].join("\n");
    })
    .join("\n\n");
}
