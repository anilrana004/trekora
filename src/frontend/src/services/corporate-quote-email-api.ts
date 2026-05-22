export type CorporateQuoteEmailPayload = {
  orgType: "corporate" | "school" | "college" | string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  groupSize?: string;
  budget?: string;
  preferredDates?: string;
  requirements?: string;
  pagePath?: string;
};

export type CorporateQuoteEmailResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitCorporateQuoteEmail(
  payload: CorporateQuoteEmailPayload,
): Promise<CorporateQuoteEmailResult> {
  try {
    const res = await fetch("/api/corporate-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        pagePath:
          payload.pagePath ??
          (typeof window !== "undefined"
            ? `${window.location.pathname}${window.location.search}`
            : "/corporate"),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error:
          data.error ||
          "Could not send your quote request. Please try again or WhatsApp us.",
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    };
  }
}
