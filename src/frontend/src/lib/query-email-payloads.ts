import type {
  PlanTrekEmailPayload,
  QueryFormType,
} from "@/services/query-email-api";

function currentPagePath(): string {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

function slugSegment(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function joinMessage(lines: Array<string | false | null | undefined>): string {
  return lines.filter(Boolean).join("\n");
}

function nameFromEmail(email: string): string {
  const local = email
    .split("@")[0]
    ?.replace(/[._+-]+/g, " ")
    .trim();
  if (!local || local.length < 2) return "Trek explorer";
  const capped = local.slice(0, 48);
  return capped.replace(/\b\w/g, (c) => c.toUpperCase());
}

function withPagePath(
  payload: PlanTrekEmailPayload,
  pagePath?: string,
): PlanTrekEmailPayload {
  const path = pagePath ?? currentPagePath();
  if (!path) return payload;
  return { ...payload, pagePath: path };
}

/** Homepage — Free Trek Planning Guide (PDF) */
export function buildLeadMagnetPayload(email: string): PlanTrekEmailPayload {
  const trimmed = email.trim();
  return withPagePath({
    formType: "lead_magnet",
    name: nameFromEmail(trimmed),
    email: trimmed,
    phone: "",
    phoneCountry: "IN",
    phoneOptional: true,
    leadMagnet: true,
    destination: "lead-magnet/trek-planning-guide-pdf",
    destinationLabel: "Free Trek Planning Guide (PDF)",
    message: joinMessage([
      "Lead magnet: Free Trek Planning Guide (PDF)",
      "Page: Homepage — Get Your Free Trek Planning Guide",
      `Subscriber email: ${trimmed}`,
    ]),
    source: "Get Free Guide — Homepage",
  });
}

/** Navbar / global Plan My Trek modal */
export function buildPlanMyTrekPayload(input: {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  destinationSlug?: string;
  destinationLabel: string;
  message?: string;
}): PlanTrekEmailPayload {
  const slug = input.destinationSlug?.trim() ?? "";
  return withPagePath({
    formType: "plan_my_trek",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone,
    phoneCountry: input.phoneCountry,
    destination: slug,
    destinationLabel: input.destinationLabel,
    message: joinMessage([
      input.message?.trim(),
      slug && `Product slug: ${slug}`,
      "Submitted via Plan My Trek modal",
    ]),
    source: "Plan My Trek",
  });
}

/** Trek / yatra detail — Send Query sheet */
export function buildSendQueryPayload(input: {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  destinationSlug?: string;
  destinationLabel: string;
  message: string;
  productName?: string;
}): PlanTrekEmailPayload {
  const slug = input.destinationSlug?.trim() ?? "";
  const label = input.destinationLabel.trim() || "General enquiry";
  return withPagePath({
    formType: "send_query",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone,
    phoneCountry: input.phoneCountry,
    destination: slug,
    destinationLabel: label,
    message: joinMessage([
      input.message.trim(),
      slug && `Product slug: ${slug}`,
      input.productName && `Product: ${input.productName}`,
      "Submitted via Send Query",
    ]),
    source: input.productName
      ? `Send Query — ${input.productName}`
      : "Send Query",
  });
}

/** /contact — message form */
export function buildContactPagePayload(input: {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  subject?: string;
  trekInterest?: string;
  message: string;
}): PlanTrekEmailPayload {
  const trek = input.trekInterest?.trim() ?? "";
  const subject = input.subject?.trim() ?? "";
  const label = trek || subject || "General contact";
  const slug = slugSegment(label);
  return withPagePath({
    formType: "contact",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone,
    phoneCountry: input.phoneCountry,
    destination: slug ? `contact/${slug}` : "",
    destinationLabel: label,
    message: joinMessage([
      subject && `Subject: ${subject}`,
      trek && `Trek / yatra: ${trek}`,
      input.message.trim(),
      "Submitted via Contact page",
    ]),
    source: "Send Query — Contact page",
  });
}

/** /destinations — Plan Your Destination Trip */
export function buildDestinationPlanPayload(input: {
  name: string;
  email: string;
  destination?: string;
  preferredDates?: string;
}): PlanTrekEmailPayload {
  const destination = input.destination?.trim() ?? "";
  const preferredDates = input.preferredDates?.trim() ?? "";
  const slug = destination ? `destinations/${slugSegment(destination)}` : "";
  return withPagePath({
    formType: "destination_plan",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: "",
    phoneCountry: "IN",
    phoneOptional: true,
    destination: slug,
    destinationLabel: destination || "Himalayan destination (unspecified)",
    preferredDates,
    message: joinMessage([
      destination && `Destination of interest: ${destination}`,
      preferredDates && `Preferred travel dates: ${preferredDates}`,
      "Submitted via Plan Your Destination Trip — Destinations page",
    ]),
    source: "Plan Your Destination Trip — Destinations",
  });
}

/** /yatras — Plan Your Pilgrimage */
export function buildYatraPlanPayload(input: {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  yatra?: string;
  message?: string;
}): PlanTrekEmailPayload {
  const yatra = input.yatra?.trim() ?? "";
  const slug = yatra ? `yatras/${slugSegment(yatra)}` : "";
  return withPagePath({
    formType: "yatra_plan",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone,
    phoneCountry: input.phoneCountry,
    destination: slug,
    destinationLabel: yatra || "Yatra (unspecified)",
    message: joinMessage([
      "Plan Your Pilgrimage — Yatras page",
      yatra && `Preferred yatra: ${yatra}`,
      input.message?.trim() && `Message:\n${input.message.trim()}`,
    ]),
    source: "Plan Your Pilgrimage — Yatras",
  });
}

/** Legacy enquiry modal */
export function buildEnquiryModalPayload(input: {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  interested: string;
  preferredDate?: string;
  groupSize: string;
  message?: string;
}): PlanTrekEmailPayload {
  const interested = input.interested.trim();
  const slug =
    interested && !/select a trek/i.test(interested)
      ? `enquiry/${slugSegment(interested)}`
      : "";
  return withPagePath({
    formType: "send_query",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone,
    phoneCountry: input.phoneCountry,
    destination: slug,
    destinationLabel: interested || "Not specified",
    preferredDates: input.preferredDate?.trim(),
    message: joinMessage([
      input.preferredDate?.trim() &&
        `Preferred date: ${input.preferredDate.trim()}`,
      `Group size: ${input.groupSize}`,
      input.message?.trim(),
      "Submitted via Enquiry modal",
    ]),
    source: "Send Query — Enquiry modal",
  });
}

export type { QueryFormType };
