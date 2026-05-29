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
  BOOKING_CHOICE_ROW,
  BOOKING_CONTACT_GRID,
  bookingCheckRow,
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

function Step5({
  fd,
  setFd,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
}) {
  const toggleDietary = (id: string) => {
    if (id === "none_req") {
      setFd((p) => ({ ...p, dietary: ["none_req"] }));
      return;
    }
    setFd((p) => ({
      ...p,
      dietary: p.dietary.includes(id)
        ? p.dietary.filter((d) => d !== id && d !== "none_req")
        : [...p.dietary.filter((d) => d !== "none_req"), id],
    }));
  };

  const toggleContact = (mode: string) => {
    setFd((p) => ({
      ...p,
      contactMode: p.contactMode.includes(mode)
        ? p.contactMode.filter((m) => m !== mode)
        : [...p.contactMode, mode],
    }));
  };

  const inp =
    "w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]";
  const lbl = "block text-[13px] font-medium mb-1";

  return (
    <div className="space-y-5">
      {/* Dietary */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Dietary Requirements
        </p>
        <div className="space-y-2">
          {[
            {
              id: "vegetarian",
              icon: "🌿",
              label: "Vegetarian",
              sub: "Standard — all trek meals are vegetarian",
            },
            {
              id: "vegan",
              icon: "🌱",
              label: "Vegan",
              sub: "We'll accommodate",
            },
            {
              id: "jain",
              icon: "🟤",
              label: "Jain Vegetarian",
              sub: "No root vegetables",
            },
            { id: "glutenfree", icon: "🌾", label: "Gluten-free", sub: "" },
            {
              id: "none_req",
              icon: "✅",
              label: "No specific requirement",
              sub: "",
            },
          ].map((d) => {
            const checked = fd.dietary.includes(d.id);
            return (
              <label
                key={d.id}
                className={bookingCheckRow(checked)}
                data-ocid={`booking.dietary.${d.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDietary(d.id)}
                />
                <span>{d.icon}</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {d.label}
                  </p>
                  {d.sub && (
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {d.sub}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Accommodation note */}
      <div>
        <label
          htmlFor="s5-accom"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Special accommodation requests (optional)
        </label>
        <textarea
          id="s5-accom"
          rows={2}
          value={fd.accommodationNote}
          onChange={(e) =>
            setFd((p) => ({ ...p, accommodationNote: e.target.value }))
          }
          className={`${inp} resize-none`}
          placeholder="E.g., prefer single tent, wheelchair access at base camp..."
          data-ocid="booking.accommodation.textarea"
        />
      </div>

      {/* Transport */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Arrange transport from your city?
        </p>
        <div className={BOOKING_CHOICE_ROW}>
          {[
            { val: true, l: "Yes" },
            { val: false, l: "No" },
          ].map(({ val, l }) => {
            const selected = fd.needsTransport === val;
            return (
              <button
                key={l}
                type="button"
                onClick={() => setFd((p) => ({ ...p, needsTransport: val }))}
                className={bookingChoicePill(selected)}
                aria-pressed={selected}
                data-ocid={`booking.transport.${l.toLowerCase()}`}
              >
                {selected ? (
                  <Check size={16} className="shrink-0" strokeWidth={2.5} aria-hidden />
                ) : null}
                {l}
              </button>
            );
          })}
        </div>
        {fd.needsTransport && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="s5-tcity"
                className={lbl}
                style={{ color: "var(--ew-text)" }}
              >
                Pickup city
              </label>
              <input
                id="s5-tcity"
                type="text"
                value={fd.transportCity}
                onChange={(e) =>
                  setFd((p) => ({ ...p, transportCity: e.target.value }))
                }
                className={inp}
                style={{ minHeight: 48 }}
                data-ocid="booking.transport_city.input"
              />
            </div>
            <div>
              <label
                htmlFor="s5-tdate"
                className={lbl}
                style={{ color: "var(--ew-text)" }}
              >
                Pickup date & time
              </label>
              <input
                id="s5-tdate"
                type="datetime-local"
                value={fd.transportDate}
                onChange={(e) =>
                  setFd((p) => ({ ...p, transportDate: e.target.value }))
                }
                className={inp}
                style={{ minHeight: 48 }}
                data-ocid="booking.transport_date.input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact mode */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Preferred contact mode for updates
        </p>
        <div className={BOOKING_CONTACT_GRID}>
          {["SMS", "WhatsApp", "Email", "All"].map((m) => {
            const selected = fd.contactMode.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => toggleContact(m)}
                className={bookingChoicePill(selected)}
                aria-pressed={selected}
                data-ocid={`booking.contact_mode.${m.toLowerCase()}`}
              >
                {selected ? (
                  <Check size={16} className="shrink-0" strokeWidth={2.5} aria-hidden />
                ) : null}
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* ← ADDED: voucher & gift card applied on review step */}
      <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
        Have a voucher or gift card? You can apply it on the final review step.
      </p>

      {/* Other notes */}
      <div>
        <label
          htmlFor="s5-notes"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Anything else we should know? (optional)
        </label>
        <textarea
          id="s5-notes"
          rows={3}
          value={fd.otherNotes}
          onChange={(e) => setFd((p) => ({ ...p, otherNotes: e.target.value }))}
          className={`${inp} resize-none`}
          placeholder="Any special requirements or notes for our team..."
          data-ocid="booking.notes.textarea"
        />
      </div>
    </div>
  );
}

export default Step5;
