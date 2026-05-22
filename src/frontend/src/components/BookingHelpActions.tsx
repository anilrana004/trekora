import {
  CTA_OUTLINE_ORANGE,
  CTA_OUTLINE_RED,
  CTA_OUTLINE_WHATSAPP,
} from "@/lib/cta-buttons";
import { openQueryModalFromLayout } from "@/lib/layout-modals";
import {
  buildWhatsAppUrl,
  SITE_PHONE_TEL,
} from "@/lib/site-contact";
import { ChevronRight, MapPinned, MessageCircle, Phone } from "lucide-react";

export interface BookingHelpActionsProps {
  productName?: string;
  bookingRef?: string;
  compact?: boolean;
}

export default function BookingHelpActions({
  productName,
  bookingRef,
  compact = false,
}: BookingHelpActionsProps) {
  const waMessage = bookingRef
    ? `Hi Trekora! My booking reference is ${bookingRef}${productName ? ` for ${productName}` : ""}. I need assistance.`
    : productName
      ? `Hi Trekora! I'm booking ${productName} and have a question.`
      : "Hi Trekora! I need help with my trek booking.";

  const waHref = buildWhatsAppUrl(waMessage);

  return (
    <div
      className={
        compact
          ? "booking-help-actions booking-help-actions--compact"
          : "booking-help-actions"
      }
      role="group"
      aria-label="Get booking help"
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className={CTA_OUTLINE_WHATSAPP}
        data-ocid="booking.help.whatsapp"
      >
        <MessageCircle size={16} aria-hidden />
        WhatsApp
        <ChevronRight size={14} className="opacity-70" aria-hidden />
      </a>
      <a
        href={`tel:${SITE_PHONE_TEL}`}
        className={CTA_OUTLINE_ORANGE}
        data-ocid="booking.help.call"
      >
        <Phone size={16} aria-hidden />
        Call
        <ChevronRight size={14} className="opacity-70" aria-hidden />
      </a>
      <button
        type="button"
        onClick={() => openQueryModalFromLayout()}
        className={CTA_OUTLINE_RED}
        data-ocid="booking.help.plan_trek"
      >
        <MapPinned size={16} aria-hidden />
        Plan my trek
        <ChevronRight size={14} className="opacity-70" aria-hidden />
      </button>
    </div>
  );
}
