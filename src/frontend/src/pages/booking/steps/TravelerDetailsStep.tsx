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
import TravelingWithYouSection from "../TravelingWithYouSection";
import PackageBookingSummary from "../PackageBookingSummary";

function Step2({
  fd,
  setFd,
  fieldErrors,
  onFieldChange,
  maxPartySlots,
  companionErrors,
  onCompanionFieldChange,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  fieldErrors: Step2FieldErrors;
  onFieldChange: (field: Step2FieldKey) => void;
  maxPartySlots: number;
  companionErrors: Record<number, CoTravelerFieldErrors>;
  onCompanionFieldChange: (index: number) => void;
}) {
  const [mobileCountry, setMobileCountry] = useState("IN");
  const [whatsappCountry, setWhatsappCountry] = useState("IN");
  const [emergencyCountry, setEmergencyCountry] = useState("IN");

  const err = (field: Step2FieldKey) =>
    fieldErrors[field] ? (
      <p className="text-xs mt-1" style={{ color: "#C0001C" }} role="alert">
        {fieldErrors[field]}
      </p>
    ) : null;

  const inp =
    "w-full border rounded-lg px-3 text-[16px] focus:outline-none focus:ring-2 transition-colors" +
    " border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]" +
    " min-h-[48px]";
  const lbl = "block text-[13px] font-medium mb-1.5";

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-3 text-xs"
        style={{
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          color: "#795548",
        }}
      >
        ⚠️ Please enter your name exactly as on your Government ID (Aadhaar /
        Passport)
      </div>

      <div data-booking-field="fullName">
        <label
          htmlFor="s2-name"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Full Name (as on Govt ID) *
        </label>
        <input
          id="s2-name"
          type="text"
          autoComplete="name"
          className={inp}
          style={{ minHeight: 48 }}
          value={fd.fullName}
          onChange={(e) => {
            setFd((p) => ({ ...p, fullName: e.target.value }));
            onFieldChange("fullName");
          }}
          data-ocid="booking.name.input"
        />
        {err("fullName")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div data-booking-field="email">
          <label
            htmlFor="s2-email"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            Email Address *
          </label>
          <input
            id="s2-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={inp}
            style={{ minHeight: 48 }}
            value={fd.email}
            onChange={(e) => {
              setFd((p) => ({ ...p, email: e.target.value }));
              onFieldChange("email");
            }}
            data-ocid="booking.email.input"
          />
          {err("email")}
        </div>
        <div data-booking-field="mobile">
          <label
            htmlFor="s2-mobile"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            Mobile Number *
          </label>
          <PhoneInput
            id="s2-mobile"
            value={fd.mobile}
            countryIso={mobileCountry}
            onValueChange={(digits) => {
              setFd((p) => ({
                ...p,
                mobile: digits,
                whatsapp: p.whatsappSame ? digits : p.whatsapp,
              }));
              onFieldChange("mobile");
            }}
            onCountryChange={(meta) => setMobileCountry(meta.iso)}
            hasError={Boolean(fieldErrors.mobile)}
            placeholder="Enter Your Mobile Number"
            data-ocid="booking.mobile.input"
          />
          {err("mobile")}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="s2-wa-same"
          checked={fd.whatsappSame}
          onChange={(e) => {
            const checked = e.target.checked;
            setFd((p) => ({
              ...p,
              whatsappSame: checked,
              whatsapp: checked ? p.mobile : p.whatsapp,
            }));
          }}
          style={{ accentColor: "#C0001C" }}
          className="w-4 h-4"
        />
        <label
          htmlFor="s2-wa-same"
          className="text-sm"
          style={{ color: "var(--ew-text)" }}
        >
          WhatsApp same as mobile number
        </label>
      </div>
      {!fd.whatsappSame && (
        <div>
          <label
            htmlFor="s2-wa"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            WhatsApp Number
          </label>
          <PhoneInput
            id="s2-wa"
            value={fd.whatsapp}
            countryIso={whatsappCountry}
            onValueChange={(digits) =>
              setFd((p) => ({ ...p, whatsapp: digits }))
            }
            onCountryChange={(meta) => setWhatsappCountry(meta.iso)}
            placeholder="Enter Your Mobile Number"
            data-ocid="booking.whatsapp.input"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div data-booking-field="city">
          <label
            htmlFor="s2-city"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            City Travelling From *
          </label>
          <select
            id="s2-city"
            value={fd.city}
            onChange={(e) => {
              setFd((p) => ({ ...p, city: e.target.value }));
              onFieldChange("city");
            }}
            className={inp}
            style={{ minHeight: 48 }}
            data-ocid="booking.city.select"
          >
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("city")}
        </div>
        <div data-booking-field="age">
          <label
            htmlFor="s2-age"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            Age *
          </label>
          <input
            id="s2-age"
            type="number"
            inputMode="numeric"
            min={12}
            max={70}
            value={fd.age}
            onChange={(e) => {
              setFd((p) => ({ ...p, age: e.target.value }));
              onFieldChange("age");
            }}
            className={inp}
            style={{ minHeight: 48 }}
            data-ocid="booking.age.input"
            placeholder="12–70"
          />
          {err("age")}
        </div>
      </div>

      <div data-booking-field="gender">
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Gender *
        </p>
        <div className="flex flex-wrap gap-2">
          {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => {
                setFd((p) => ({ ...p, gender: g }));
                onFieldChange("gender");
              }}
              className={bookingChoicePill(fd.gender === g, true)}
              data-ocid={`booking.gender.${g.toLowerCase().replace(/ /g, "_")}`}
            >
              {g}
            </button>
          ))}
        </div>
        {err("gender")}
      </div>

      <div
        className="border-t pt-4"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <p
          className="text-sm font-bold mb-3"
          style={{ color: "var(--ew-text)" }}
        >
          Emergency Contact
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div data-booking-field="emergencyName">
            <label
              htmlFor="s2-emname"
              className={lbl}
              style={{ color: "var(--ew-text)" }}
            >
              Contact Name *
            </label>
            <input
              id="s2-emname"
              type="text"
              autoComplete="name"
              value={fd.emergencyName}
              onChange={(e) => {
                setFd((p) => ({ ...p, emergencyName: e.target.value }));
                onFieldChange("emergencyName");
              }}
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.emergency_name.input"
            />
            {err("emergencyName")}
          </div>
          <div data-booking-field="emergencyPhone">
            <label
              htmlFor="s2-emphone"
              className={lbl}
              style={{ color: "var(--ew-text)" }}
            >
              Contact Phone *
            </label>
            <PhoneInput
              id="s2-emphone"
              value={fd.emergencyPhone}
              countryIso={emergencyCountry}
              onValueChange={(digits) => {
                setFd((p) => ({ ...p, emergencyPhone: digits }));
                onFieldChange("emergencyPhone");
              }}
              onCountryChange={(meta) => setEmergencyCountry(meta.iso)}
              hasError={Boolean(fieldErrors.emergencyPhone)}
              placeholder="Enter Your Mobile Number"
              data-ocid="booking.emergency_phone.input"
            />
            {err("emergencyPhone")}
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="s2-emrel"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            Relationship
          </label>
          <select
            id="s2-emrel"
            value={fd.emergencyRelation}
            onChange={(e) =>
              setFd((p) => ({ ...p, emergencyRelation: e.target.value }))
            }
            className={inp}
            style={{ minHeight: 48 }}
            data-ocid="booking.emergency_relation.select"
          >
            <option value="">Select</option>
            {["Parent", "Spouse", "Sibling", "Friend", "Child", "Other"].map(
              (r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <TravelingWithYouSection
        fd={fd}
        setFd={setFd}
        maxPartySlots={maxPartySlots}
        companionErrors={companionErrors}
        onCompanionFieldChange={onCompanionFieldChange}
      />
    </div>
  );
}

export default Step2;
