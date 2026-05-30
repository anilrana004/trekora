import type { BookingDeliveryStatus } from "@/lib/booking-optimistic";
import {
  CTA_COMPACT_GREEN,
  CTA_OUTLINE_RED_BLOCK,
  CTA_OUTLINE_WHATSAPP_BLOCK,
  ctaMerge,
} from "@/lib/cta-buttons";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import { bookingEmailSuccessMessage } from "@/services/booking-email-api";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SuccessScreen({
  bookingRef,
  trekName,
  email,
  emailDelivery,
}: {
  bookingRef: string;
  trekName: string;
  email: string;
  emailDelivery: BookingDeliveryStatus;
}) {
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard
      .writeText(bookingRef)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Reference copied!");
      })
      .catch(() => toast.error("Could not copy"));
  };

  const waHref = buildWhatsAppUrl(
    `Hi Trekora! My booking reference is ${bookingRef} for ${trekName}. Please confirm my booking.`,
  );

  return (
    <div
      className="max-w-lg mx-auto text-center"
      data-ocid="booking.success_state"
    >
      {/* Animated checkmark */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 success-check-ring">
        <Check size={40} className="text-white" />
      </div>

      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--ew-text)" }}
      >
        Booking Request Submitted! 🎉
      </h2>
      <p className="text-sm mb-3" style={{ color: "var(--ew-gray-dark)" }}>
        {emailDelivery === "failed"
          ? `Your booking reference ${bookingRef} is saved. We could not email ${email} — use WhatsApp below and we'll confirm manually.`
          : emailDelivery === "delivered"
            ? bookingEmailSuccessMessage(email)
            : `Your booking is confirmed. Sending full details to ${email} now…`}
      </p>
      {emailDelivery === "sending" && (
        <p
          className="text-xs mb-6 flex items-center justify-center gap-2"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <Loader2 size={14} className="animate-spin" aria-hidden />
          Delivering confirmation email
        </p>
      )}
      {emailDelivery !== "sending" && <div className="mb-6" />}

      {/* Reference card */}
      <div
        className="rounded-2xl p-5 mb-6 text-left"
        style={{
          background: "var(--ew-orange-lt)",
          border: "1px solid #E87722",
        }}
      >
        <p
          className="text-xs font-semibold mb-1"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          YOUR BOOKING REFERENCE
        </p>
        <div className="flex items-center gap-3">
          <span
            className="text-2xl font-bold font-mono"
            style={{ color: "#C0001C" }}
          >
            {bookingRef}
          </span>
          <button
            type="button"
            onClick={copyRef}
            className={ctaMerge(CTA_COMPACT_GREEN, copied && "!bg-[#22C55E]")}
            data-ocid="booking.copy_ref_button"
          >
            {copied ? <Check size={12} /> : <ClipboardCopy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* What happens next */}
      <div
        className="rounded-2xl p-5 mb-6 text-left"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <p
          className="font-bold text-sm mb-4"
          style={{ color: "var(--ew-text)" }}
        >
          What happens next?
        </p>
        <div className="space-y-3">
          {[
            { icon: "✅", text: "Your request is received", sub: "Right now" },
            { icon: "📞", text: "Our team calls you", sub: "Within 2 hours" },
            {
              icon: "💳",
              text: "Payment link sent",
              sub: "Via WhatsApp & Email",
            },
            {
              icon: "📄",
              text: "Booking confirmation + PDF voucher",
              sub: "On payment",
            },
          ].map((item, i) => (
            <div key={`step-${i + 1}`} className="flex items-start gap-3">
              <span className="text-lg leading-none mt-0.5">{item.icon}</span>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--ew-text)" }}
                >
                  {item.text}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={CTA_OUTLINE_WHATSAPP_BLOCK}
          data-ocid="booking.whatsapp_button"
        >
          <MessageCircle size={18} aria-hidden />
          WhatsApp Our Team
          <ChevronRight size={14} className="opacity-70" aria-hidden />
        </a>
        <Link
          to="/"
          className={CTA_OUTLINE_RED_BLOCK}
          data-ocid="booking.home_link"
        >
          <ChevronLeft size={18} aria-hidden />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SuccessScreen;
