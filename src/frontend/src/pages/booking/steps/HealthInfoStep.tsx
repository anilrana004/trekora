import type { TrekBatchPublic } from "@/backend";
import DiscountInput from "@/components/DiscountInput";
import PriceSummary from "@/components/PriceSummary";
import OptimizedImage from "@/components/media/OptimizedImage";
import ProductDetailGroupSizeStepper from "@/components/product-detail/ProductDetailGroupSizeStepper";
import PhoneInput from "@/components/ui/PhoneInput";
import { BOOKING_ADD_ONS, GEAR_RENTAL_ADDON_ID } from "@/lib/booking-addons";
import {
  BOOKING_DOC_LIMITS,
  type BookingFilePayload,
  collectBookingAttachments,
  fileToBookingPayload,
  formatFileSize,
} from "@/lib/booking-documents";
import type { BookableProduct } from "@/lib/booking-product";
import type { DiscountValidationSuccess } from "@/lib/discount-api";
import { resolveProductWeather } from "@/lib/openweather";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import type { Dispatch, SetStateAction } from "react";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { lazy as lazyVideo } from "react";
import { toast } from "sonner";
const _WeatherWidget = lazyVideo(() => import("@/components/WeatherWidget"));
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
import { Suspense as WeatherSuspense } from "react";
import BookingFileUpload from "../BookingFileUpload";
import PackageBookingSummary from "../PackageBookingSummary";
import {
  BLOOD_GROUPS,
  BOOKING_CHOICE_ROW,
  CITIES,
  COMPANION_RELATIONSHIPS,
  type CoTraveler,
  type CoTravelerFieldErrors,
  DAYS_OF_WEEK,
  type FormDataAccumulated,
  MEDICAL_CONDITIONS,
  type Step2FieldErrors,
  type Step2FieldKey,
  bookingCheckRow,
  bookingChoiceCard,
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
                className={bookingCheckRow(checked)}
                data-ocid={`booking.condition.${c.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCondition(c.id)}
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
          ].map((f) => {
            const selected = fd.fitnessLevel === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFd((p) => ({ ...p, fitnessLevel: f.id }))}
                className={bookingChoiceCard(selected)}
                aria-pressed={selected}
                data-ocid={`booking.fitness.${f.id}`}
              >
                <span className="text-xl" aria-hidden>
                  {f.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="booking-choice-card__title text-sm font-semibold">
                    {f.label}
                  </p>
                  <p className="booking-choice-card__sub text-xs">{f.sub}</p>
                </div>
                {selected ? (
                  <Check
                    size={20}
                    className="booking-choice-card__check shrink-0"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prior trekking */}
      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Have you done any trekking before?
        </p>
        <div className={BOOKING_CHOICE_ROW}>
          {[
            { val: true, l: "Yes" },
            { val: false, l: "No" },
          ].map(({ val, l }) => {
            const selected = fd.hasTrekked === val;
            return (
              <button
                key={l}
                type="button"
                onClick={() => setFd((p) => ({ ...p, hasTrekked: val }))}
                className={bookingChoicePill(selected)}
                aria-pressed={selected}
                data-ocid={`booking.trekked.${l.toLowerCase()}`}
              >
                {selected ? (
                  <Check
                    size={16}
                    className="shrink-0"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                ) : null}
                {l}
              </button>
            );
          })}
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
