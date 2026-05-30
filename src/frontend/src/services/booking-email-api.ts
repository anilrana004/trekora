import type { BookingEmailAttachment } from "../lib/booking-documents";
import type { BookingEmailSection } from "../lib/booking-email-details";

export type BookingEmailPayload = {
  bookingRef: string;
  source?: string;
  trekName: string;
  trekSlug?: string;
  batchDate: string;
  groupSize: number;
  totalAmount?: number;
  travelerName: string;
  email: string;
  phone: string;
  addOns?: string[];
  /** Full form breakdown — rendered in admin & customer emails when present. */
  sections?: BookingEmailSection[];
  /** Legacy plain-text details (auto-built from sections when omitted). */
  details?: string;
  /** ID proof, photo, fitness certificate — attached to admin booking email. */
  attachments?: BookingEmailAttachment[];
};

export type BookingEmailResult = { ok: true } | { ok: false; error: string };

export function bookingEmailSuccessMessage(email: string): string {
  return `Confirmation sent to ${email}. Our team will contact you within 2 hours.`;
}

export async function submitBookingEmail(
  payload: BookingEmailPayload,
): Promise<BookingEmailResult> {
  try {
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    if (!res.ok || !data.ok) {
      const hint =
        res.status === 500
          ? " Email could not be sent — check SMTP settings or try WhatsApp."
          : "";
      return {
        ok: false,
        error: `${data.error || "Could not send booking email. Please try again."}${hint}`,
      };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Network error sending confirmation. Check your connection, or contact us on WhatsApp with your booking reference.",
    };
  }
}
