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
import { Suspense as WeatherSuspense } from "react";
import BookingFileUpload from "../BookingFileUpload";
import PackageBookingSummary from "../PackageBookingSummary";
import {
  BLOOD_GROUPS,
  CITIES,
  COMPANION_RELATIONSHIPS,
  type CoTraveler,
  type CoTravelerFieldErrors,
  DAYS_OF_WEEK,
  type FormDataAccumulated,
  MEDICAL_CONDITIONS,
  type Step2FieldErrors,
  type Step2FieldKey,
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

function Step4({
  fd,
  setFd,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
}) {
  const inp =
    "w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]";
  const lbl = "block text-[13px] font-medium mb-1";

  return (
    <div className="space-y-6">
      {/* ID Proof */}
      <div>
        <p
          className="text-sm font-bold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          Upload Government ID Proof *
        </p>
        <div className="booking-doc-chip-grid">
          {["Aadhaar", "Passport", "Driving License", "Voter ID"].map((doc) => (
            <span key={doc} className="booking-doc-chip">
              {doc}
            </span>
          ))}
        </div>
        <BookingFileUpload
          id="s4-id-proof"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          kind="idProof"
          dataOcid="booking.id_proof.upload_button"
          buttonLabel="Upload government ID"
          value={fd.idProofFile}
          onChange={(file) => setFd((p) => ({ ...p, idProofFile: file }))}
        />
      </div>

      {/* Photo */}
      <div>
        <p
          className="text-sm font-bold mb-1"
          style={{ color: "var(--ew-text)" }}
        >
          Upload Passport-size Photo *
        </p>
        <p className="text-xs mb-2" style={{ color: "var(--ew-gray-dark)" }}>
          Face clearly visible, white/light background. JPG or PNG, max 2MB.
        </p>
        <BookingFileUpload
          id="s4-photo"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          kind="photo"
          dataOcid="booking.photo.upload_button"
          buttonLabel="Take or choose passport-size photo"
          value={fd.photoFile}
          onChange={(file) => setFd((p) => ({ ...p, photoFile: file }))}
        />
      </div>

      {/* Heard from */}
      <div>
        <label
          htmlFor="s4-heard"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          How did you hear about Trekora?
        </label>
        <select
          id="s4-heard"
          value={fd.heardFrom}
          onChange={(e) => setFd((p) => ({ ...p, heardFrom: e.target.value }))}
          className={inp}
          style={{ minHeight: 48 }}
          data-ocid="booking.heard_from.select"
        >
          <option value="">Select</option>
          {[
            "Google Search",
            "Instagram",
            "Facebook",
            "YouTube",
            "Friend / Family Referral",
            "Travel Blog",
            "Other",
          ].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Step4;
