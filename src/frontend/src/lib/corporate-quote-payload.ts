import type { CorporateQuoteEmailPayload } from "@/services/corporate-quote-email-api";

function currentPagePath(): string {
  if (typeof window === "undefined") return "/corporate";
  return `${window.location.pathname}${window.location.search}`;
}

export function buildCorporateQuotePayload(
  input: Omit<CorporateQuoteEmailPayload, "pagePath">,
): CorporateQuoteEmailPayload {
  return {
    ...input,
    company: input.company.trim(),
    contactName: input.contactName.trim(),
    email: input.email.trim(),
    requirements: input.requirements?.trim() ?? "",
    preferredDates: input.preferredDates?.trim() || undefined,
    pagePath: currentPagePath(),
  };
}
