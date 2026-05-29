export type QueryFormType =
  | "plan_my_trek"
  | "send_query"
  | "contact"
  | "destination_plan"
  | "yatra_plan"
  | "lead_magnet";

export type PlanTrekEmailPayload = {
  /** Stable routing key for admin + customer emails */
  formType?: QueryFormType;
  name: string;
  phone: string;
  /** ISO 3166-1 alpha-2 — default IN */
  phoneCountry?: string;
  /** Destinations “Plan Your Trip” form — phone not required */
  phoneOptional?: boolean;
  /** Homepage PDF guide / newsletter — email-only lead capture */
  leadMagnet?: boolean;
  email: string;
  destination?: string;
  destinationLabel?: string;
  preferredDates?: string;
  message?: string;
  source?: string;
  /** Where the form was submitted (SEO / ops) */
  pagePath?: string;
};

export type PlanTrekEmailResult = { ok: true } | { ok: false; error: string };

export async function submitPlanTrekEmail(
  payload: PlanTrekEmailPayload,
): Promise<PlanTrekEmailResult> {
  try {
    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
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
          "Could not send your request. Please try again or WhatsApp us.",
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
