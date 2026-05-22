import type { BookingEmailPayload, BookingEmailResult } from "@/services/booking-email-api";
import { submitBookingEmail } from "@/services/booking-email-api";
import {
  submitEmailOptimistic,
  type EmailSubmitResult,
} from "@/lib/optimistic-email";

export type BookingDeliveryStatus = "sending" | "delivered" | "failed";

export type BookingBackgroundJob = {
  emailPayload: BookingEmailPayload;
  canisterPayload?: {
    itemId: bigint;
    itemName: string;
    itemType: string;
    travelerName: string;
    email: string;
    phone: string;
    groupSize: bigint;
    totalAmount: bigint;
    advanceAmount: bigint;
    batchDate: bigint;
  } | null;
  createBooking?: (payload: NonNullable<BookingBackgroundJob["canisterPayload"]>) => Promise<unknown>;
};

/** Instant success UI; email + optional canister run on the next microtask in parallel. */
export function submitBookingOptimistic(
  job: BookingBackgroundJob,
  onInstantSuccess: () => void,
  handlers: {
    onSendFailed: (message: string) => void;
    onSendSucceeded?: () => void;
  },
): void {
  submitEmailOptimistic(
    async (): Promise<EmailSubmitResult> => {
      const emailPromise = submitBookingEmail(job.emailPayload);

      const canisterPromise =
        job.canisterPayload && job.createBooking
          ? job.createBooking(job.canisterPayload).catch((err) => {
              console.warn("Canister booking skipped:", err);
              return null;
            })
          : Promise.resolve(null);

      const [emailResult] = await Promise.all([emailPromise, canisterPromise]);
      if (!emailResult.ok) return emailResult;
      return { ok: true };
    },
    onInstantSuccess,
    handlers.onSendFailed,
    handlers.onSendSucceeded,
  );
}
