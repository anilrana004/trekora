import type { Dispatch, SetStateAction } from "react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { TrekBatchPublic } from "@/backend";
import type { BookableProduct } from "@/lib/booking-product";
import type { DiscountValidationSuccess } from "@/lib/discount-api";
import {
  BOOKING_ADD_ONS,
  GEAR_RENTAL_ADDON_ID,
} from "@/lib/booking-addons";
import { resolveProductWeather } from "@/lib/openweather";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import {
  BOOKING_DOC_LIMITS,
  collectBookingAttachments,
  fileToBookingPayload,
  formatFileSize,
  type BookingFilePayload,
} from "@/lib/booking-documents";
import DiscountInput from "@/components/DiscountInput";
import PriceSummary from "@/components/PriceSummary";
import ProductDetailGroupSizeStepper from "@/components/product-detail/ProductDetailGroupSizeStepper";
import PhoneInput from "@/components/ui/PhoneInput";
import OptimizedImage from "@/components/media/OptimizedImage";
import { lazy as lazyVideo } from "react";
const WeatherWidget = lazyVideo(() => import("@/components/WeatherWidget"));
import { Suspense as WeatherSuspense } from "react";
import {
  CTA_COMPACT_GREEN,
  CTA_NAV_PRIMARY,
  CTA_OUTLINE_DASHED,
  CTA_OUTLINE_RED_BLOCK,
  CTA_OUTLINE_WHATSAPP_BLOCK,
  ctaMerge,
} from "@/lib/cta-buttons";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  ClipboardCopy,
  Download,
  Loader2,
  MessageCircle,
  Plus,
  Trash2,
  Upload,
  UserPlus,
  Users,
} from "lucide-react";
import {  type CoTraveler,
  type CoTravelerFieldErrors,
  type FormDataAccumulated,
  type Step2FieldErrors,
  type Step2FieldKey,
  BLOOD_GROUPS,
  CITIES,
  COMPANION_RELATIONSHIPS,
  DAYS_OF_WEEK,
  MEDICAL_CONDITIONS,
  bookingChoicePill,
  calcPrices,
  countFutureAvailableSlotsInMonth,
  emptyCoTraveler,
  firstMonthWithFutureBatch,
  formatBatchDateLongIN,
  formatBatchDateShortIN,
  formatINR,
  formatYmdFromBatchTs,
  formatYmdLocal,
  maxCompanionSlots,
  parseYmdLocal,
  partyHeadcount,
  syncPartyGroupSize,
  upcomingBatchChoices,
} from "../booking-form-shared";

import PackageBookingSummary from "../PackageBookingSummary";

import { isPackageBooking } from "@/lib/booking-product";
import type { AppliedCodeDiscount } from "../booking-form-shared";

function Step6({
  fd,
  setFd,
  trek,
  unitPrice,
  packageId,
  userId,
  codeDiscountAmount,
  onCodeDiscountApplied,
  onCodeDiscountRemoved,
  bundleSavings,
  prefilledVoucherResult,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  trek: BookableProduct | undefined;
  unitPrice: number;
  packageId: string;
  userId: string;
  codeDiscountAmount: number;
  onCodeDiscountApplied: (
    meta: AppliedCodeDiscount,
    result?: DiscountValidationSuccess,
  ) => void;
  onCodeDiscountRemoved: () => void;
  bundleSavings: number;
  prefilledVoucherResult?: DiscountValidationSuccess | null;
}) {
  const prices = calcPrices(
    unitPrice,
    partyHeadcount(fd),
    fd.addOns,
    fd.promoDiscount,
    codeDiscountAmount,
  );
  const bookingAmountForCodes = prices.subtotal;
  const selectedAddOns = BOOKING_ADD_ONS.filter((a) => fd.addOns.includes(a.id));

  return (
    <div className="space-y-5">
      {trek && isPackageBooking(trek) ? (
        <>
          <PackageBookingSummary product={trek} compact />
          {fd.batchDate ? (
            <p className="text-sm -mt-2" style={{ color: "var(--ew-gray-dark)" }}>
              📅 Preferred start: {formatBatchDateShortIN(fd.batchDate)} · 👥{" "}
              {partyHeadcount(fd)} traveler
              {partyHeadcount(fd) !== 1 ? "s" : ""}
            </p>
          ) : null}
        </>
      ) : null}
      {trek && !isPackageBooking(trek) ? (
        <div
          className="flex items-center gap-4 p-4 rounded-xl"
          style={{ background: "var(--ew-gray-lt)" }}
        >
          <OptimizedImage
            src={trek.image}
            alt={trek.name}
            variant="thumbnail"
            width={80}
            height={80}
            className="w-20 h-20 rounded-xl flex-shrink-0"
          />
          <div className="min-w-0">
            <p
              className="font-bold text-base"
              style={{ color: "var(--ew-text)" }}
            >
              {trek.name}
            </p>
            {fd.batchDate && (
              <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                📅 {formatBatchDateShortIN(fd.batchDate)}
              </p>
            )}
            <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
              👥 {partyHeadcount(fd)} person
              {partyHeadcount(fd) !== 1 ? "s" : ""} · {fd.fullName}
              {fd.coTravelers.length > 0
                ? ` + ${fd.coTravelers.length} companion${fd.coTravelers.length !== 1 ? "s" : ""}`
                : ""}
            </p>
            {selectedAddOns.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedAddOns.map((a) => (
                  <span
                    key={a.id}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "#FFF5F5",
                      color: "#C0001C",
                      border: "1px solid #C0001C",
                    }}
                  >
                    {a.icon} {a.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Party roster */}
      <div
        className="rounded-xl p-4 space-y-3 text-sm"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <p className="font-bold" style={{ color: "var(--ew-text)" }}>
          Your group ({partyHeadcount(fd)} people)
        </p>
        <ul className="space-y-2">
          <li
            className="rounded-lg px-3 py-2"
            style={{ background: "#fff", border: "1px solid var(--ew-gray-mid)" }}
          >
            <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
              {fd.fullName || "Lead traveler"}
            </span>
            <span className="text-xs ml-2" style={{ color: "var(--ew-gray-dark)" }}>
              You · Primary contact
            </span>
          </li>
          {fd.coTravelers.map((ct, i) => (
            <li
              key={`review-companion-${i + 1}`}
              className="rounded-lg px-3 py-2"
              style={{
                background: "#fff",
                border: "1px solid var(--ew-gray-mid)",
              }}
            >
              <span
                className="font-semibold"
                style={{ color: "var(--ew-text)" }}
              >
                {ct.name || `Person ${i + 2}`}
              </span>
              <span
                className="text-xs block mt-0.5"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {[
                  ct.relationship,
                  ct.age ? `${ct.age} yrs` : null,
                  ct.gender,
                  ct.bloodGroup,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ← ADDED: voucher / gift card */}
      <DiscountInput
        bookingAmount={bookingAmountForCodes}
        packageId={packageId}
        userId={userId}
        prefilledResult={prefilledVoucherResult}
        onDiscountApplied={(result) => {
          onCodeDiscountApplied(
            {
              kind: result.kind,
              code: result.code,
              amount: result.discountAmount,
            },
            result,
          );
        }}
        onDiscountRemoved={onCodeDiscountRemoved}
      />

      {/* ← ADDED: price summary */}
      <PriceSummary
        packageTotal={prices.subtotal}
        gst={prices.gst}
        codeDiscount={prices.codeSavings}
        promoSavings={prices.promoSavings}
        bundleSavings={bundleSavings}
        grandTotal={prices.grandTotal}
      />

      {/* No payment notice */}
      <div
        className="rounded-xl p-4 text-sm"
        style={{ background: "#E3F2FD", border: "1px solid #90CAF9" }}
      >
        <p className="font-semibold mb-1" style={{ color: "#1565C0" }}>
          💳 No payment required now
        </p>
        <p style={{ color: "#1565C0" }}>
          Our team will contact you within 2 hours to confirm availability and
          share a secure payment link.
        </p>
      </div>

      {/* Email confirmation */}
      <div
        className="rounded-xl p-4 text-sm"
        style={{ background: "#E8F5E9", border: "1px solid #a7d7a8" }}
        data-ocid="booking.confirmation_email_notice"
      >
        <p className="font-semibold mb-1" style={{ color: "#2E7D32" }}>
          ✉️ Confirmation email
        </p>
        <p style={{ color: "#1B5E20" }}>
          <strong>Submit Booking</strong> confirms instantly. Your full details
          go to <strong>{fd.email.trim() || "your step 2 email"}</strong> and our
          team in the background — usually within a minute.
        </p>
      </div>

      {/* Terms */}
      <label
        className="booking-terms-label"
        data-ocid="booking.terms.checkbox"
      >
        <input
          type="checkbox"
          checked={fd.termsAccepted}
          onChange={(e) =>
            setFd((p) => ({ ...p, termsAccepted: e.target.checked }))
          }
        />
        <span className="text-sm" style={{ color: "var(--ew-text)" }}>
          I confirm that the above details are accurate and I agree to Trekora{" "}
          <a href="/terms" className="underline" style={{ color: "#C0001C" }}>
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/cancellation"
            className="underline"
            style={{ color: "#C0001C" }}
          >
            Cancellation Policy
          </a>
          .
        </span>
      </label>
    </div>
  );
}

export default Step6;
