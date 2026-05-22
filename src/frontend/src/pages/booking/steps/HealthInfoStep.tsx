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
import BookingFileUpload from "../BookingFileUpload";
import PackageBookingSummary from "../PackageBookingSummary";

function Step3({
  fd,
  setFd,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
}) {
  const toggleCondition = (id: string) => {
    if (id === "none") {
      setFd((p) => ({ ...p, medicalConditions: ["none"] }));
      return;
    }
    setFd((p) => ({
      ...p,
      medicalConditions: p.medicalConditions.includes(id)
        ? p.medicalConditions.filter((c) => c !== id && c !== "none")
        : [...p.medicalConditions.filter((c) => c !== "none"), id],
    }));
  };

  const hasConditions = fd.medicalConditions.some((c) => c !== "none");
  const inp =
    "w-full border rounded-lg px-3 text-[16px] focus:outline-none focus:ring-2 transition-colors" +
    " border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]" +
    " min-h-[48px]";
  const lbl = "block text-[13px] font-medium mb-1.5";

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl p-3 text-xs"
        style={{
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          color: "#795548",
        }}
      >
        🔒 All health information is confidential and used only for your safety
        on the trek.
      </div>

      {/* Blood group */}
      <div>
        <label
          htmlFor="s3-blood"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Blood Group
        </label>
        <select
          id="s3-blood"
          value={fd.bloodGroup}
          onChange={(e) => setFd((p) => ({ ...p, bloodGroup: e.target.value }))}
          className={inp}
          style={{ minHeight: 48 }}
          data-ocid="booking.blood_group.select"
        >
          <option value="">Select blood group</option>
          {BLOOD_GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Medical conditions */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Do you have any of these conditions?
        </p>
        <div className="space-y-2">
          {MEDICAL_CONDITIONS.map((c) => {
            const checked = fd.medicalConditions.includes(c.id);
            return (
              <label
                key={c.id}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                style={{
                  border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
                  background: checked ? "#FFF5F5" : "#fff",
                }}
                data-ocid={`booking.condition.${c.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCondition(c.id)}
                  style={{ accentColor: "#C0001C" }}
                  className="w-4 h-4"
                />
                <span>{c.icon}</span>
                <span className="text-sm" style={{ color: "var(--ew-text)" }}>
                  {c.label}
                </span>
              </label>
            );
          })}
        </div>
        {hasConditions && (
          <div
            className="mt-3 rounded-lg p-3 text-xs"
            style={{
              background: "#FFF8E1",
              border: "1px solid #FFD54F",
              color: "#795548",
            }}
          >
            ⚠️ Our guide will be briefed about your condition. Please bring
            relevant medications and a doctor's certificate.
          </div>
        )}
      </div>

      {/* Other conditions */}
      <div>
        <label
          htmlFor="s3-other"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Other conditions or medications (optional)
        </label>
        <textarea
          id="s3-other"
          rows={2}
          value={fd.medicalOther}
          onChange={(e) =>
            setFd((p) => ({ ...p, medicalOther: e.target.value }))
          }
          className={`${inp} resize-none`}
          placeholder="E.g., taking blood thinners, recent surgery..."
          data-ocid="booking.medical_other.textarea"
        />
      </div>

      {/* Fitness level */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Current Fitness Level *
        </p>
        <div className="space-y-2">
          {[
            {
              id: "active",
              icon: "🟢",
              label: "Very Active",
              sub: "Gym 4+ days/week or can run 5km easily",
            },
            {
              id: "moderate",
              icon: "🟡",
              label: "Moderately Active",
              sub: "Walk or exercise 2–3 days/week",
            },
            {
              id: "sedentary",
              icon: "🔴",
              label: "Sedentary",
              sub: "Minimal regular exercise",
            },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFd((p) => ({ ...p, fitnessLevel: f.id }))}
              className={`booking-choice-card${fd.fitnessLevel === f.id ? " booking-choice-card--active" : ""}`}
              data-ocid={`booking.fitness.${f.id}`}
            >
              <span className="text-xl">{f.icon}</span>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--ew-text)" }}
                >
                  {f.label}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  {f.sub}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prior trekking */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Have you done any trekking before?
        </p>
        <div className="flex gap-3">
          {[
            { val: true, l: "Yes" },
            { val: false, l: "No" },
          ].map(({ val, l }) => (
            <button
              key={l}
              type="button"
              onClick={() => setFd((p) => ({ ...p, hasTrekked: val }))}
              className={bookingChoicePill(fd.hasTrekked === val)}
              data-ocid={`booking.trekked.${l.toLowerCase()}`}
            >
              {l}
            </button>
          ))}
        </div>
        {fd.hasTrekked && (
          <div className="mt-3">
            <label
              htmlFor="s3-longestTrek"
              className={lbl}
              style={{ color: "var(--ew-text)" }}
            >
              Longest trek duration?
            </label>
            <select
              id="s3-longestTrek"
              value={fd.longestTrek}
              onChange={(e) =>
                setFd((p) => ({ ...p, longestTrek: e.target.value }))
              }
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.longest_trek.select"
            >
              <option value="">Select</option>
              {["1–3 days", "4–6 days", "7–10 days", "10+ days"].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Fitness certificate */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Upload Fitness Certificate (optional)
        </p>
        <p className="text-xs mb-2" style={{ color: "var(--ew-gray-dark)" }}>
          Recommended for treks above 4,000m. PDF or JPG, max 5MB.
        </p>
        <BookingFileUpload
          id="s3-cert"
          accept=".pdf,.jpg,.jpeg,application/pdf,image/jpeg"
          kind="fitnessCert"
          dataOcid="booking.fitness_cert.upload_button"
          buttonLabel="Upload fitness certificate"
          value={fd.fitnessCertFile}
          onChange={(file) => setFd((p) => ({ ...p, fitnessCertFile: file }))}
        />
      </div>
    </div>
  );
}


export default Step3;
