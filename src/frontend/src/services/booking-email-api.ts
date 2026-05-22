import type { BookingEmailAttachment } from "../lib/booking-documents";
import type {
  BookingEmailSection,
} from "../lib/booking-email-details";

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

export type BookingEmailResult =
  | { ok: true }
  | { ok: false; error: string };

export function bookingEmailSuccessMessage(email: string): string {
  return `Confirmation sent to ${email}. Our team will contact you within 2 hours.`;
}

export async function submitBookingEmail(
  payload: BookingEmailPayload,
): Promise<BookingEmailResult> {
  try {
    const res = await fetch("/api/booking", {
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
        error: data.error || "Could not send booking email. Please try again.",
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
