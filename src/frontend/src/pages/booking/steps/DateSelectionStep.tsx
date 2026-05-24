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
  MAX_PARTY_SIZE,
} from "../booking-form-shared";
import { isPackageBooking } from "@/lib/booking-product";
import PackageBookingSummary from "../PackageBookingSummary";

function Step1({
  fd,
  setFd,
  trek,
  batches,
  batchesLoading,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  trek: BookableProduct | undefined;
  batches: TrekBatchPublic[];
  batchesLoading: boolean;
}) {
  const [selectedBatchObj, setSelectedBatchObj] =
    useState<TrekBatchPublic | null>(null);

  useEffect(() => {
    if (!fd.batchDate || batchesLoading) return;
    const actives = batches.filter((b) => b.isActive);
    const matches = actives.filter(
      (b) => formatYmdFromBatchTs(b.batchDate) === fd.batchDate,
    );
    if (matches.length === 0) {
      setSelectedBatchObj(null);
      return;
    }
    const best = matches.reduce((a, b) =>
      Number(b.availableSlots) > Number(a.availableSlots) ? b : a,
    );
    if (Number(best.availableSlots) <= 0) {
      setSelectedBatchObj(null);
      setFd((p) =>
        p.batchDate === fd.batchDate ? { ...p, batchDate: null } : p,
      );
      toast.error("This batch is now full. Please pick another date.");
      return;
    }
    setSelectedBatchObj((prev) => {
      if (
        prev &&
        prev.id === best.id &&
        Number(prev.availableSlots) === Number(best.availableSlots)
      ) {
        return prev;
      }
      return best;
    });
  }, [batches, batchesLoading, fd.batchDate, setFd]);

  const todayYmd = useMemo(() => formatYmdLocal(new Date()), []);

  const onDepartureDateChange = (value: string) => {
    setFd((p) => ({ ...p, batchDate: value || null }));
    if (!value) setSelectedBatchObj(null);
  };

  const toggleAddOn = (id: string) => {
    setFd((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(id)
        ? prev.addOns.filter((a) => a !== id)
        : [...prev.addOns, id],
    }));
  };

  const unitPrice = useMemo(() => {
    if (selectedBatchObj?.priceOverride != null)
      return Number(selectedBatchObj.priceOverride);
    return trek?.price ?? 0;
  }, [selectedBatchObj, trek]);

  const productWeather = useMemo(
    () =>
      trek && trek.kind !== "package"
        ? resolveProductWeather(trek.kind, trek.slug)
        : null,
    [trek],
  );

  const headcount = partyHeadcount(fd);
  const prices = calcPrices(unitPrice, headcount, fd.addOns, 0);

  const maxParty = selectedBatchObj
    ? Math.max(
        1,
        Math.min(MAX_PARTY_SIZE, Number(selectedBatchObj.availableSlots)),
      )
    : MAX_PARTY_SIZE;

  const onGroupSizeChange = (next: number) => {
    setFd((p) => {
      const capped = Math.min(maxParty, Math.max(1, next));
      const maxCompanions = Math.max(0, capped - 1);
      const coTravelers =
        p.coTravelers.length > maxCompanions
          ? p.coTravelers.slice(0, maxCompanions)
          : p.coTravelers;
      return syncPartyGroupSize(
        { ...p, groupSize: capped, coTravelers },
        maxParty,
      );
    });
  };

  return (
    <div className="space-y-6">
      {trek && isPackageBooking(trek) ? (
        <PackageBookingSummary product={trek} />
      ) : null}
      {trek && !isPackageBooking(trek) ? (
        <div
          className="rounded-xl p-4 flex items-center gap-4"
          style={{ background: "var(--ew-gray-lt)" }}
        >
          <OptimizedImage
            src={trek.image}
            alt={trek.name}
            variant="thumbnail"
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg flex-shrink-0"
          />
          <div className="min-w-0">
            <p
              className="font-bold text-base truncate"
              style={{ color: "var(--ew-text)" }}
            >
              {trek.name}
            </p>
            <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
              {trek.duration} days · {trek.difficulty}
            </p>
            <p className="text-sm font-semibold" style={{ color: "#C0001C" }}>
              Rs.{formatINR(trek.price)}/person
            </p>
          </div>
        </div>
      ) : null}

      {productWeather ? (
        <Suspense
          fallback={
            <div
              className="h-20 rounded-xl animate-pulse"
              style={{ background: "var(--ew-gray-lt)" }}
              aria-hidden
            />
          }
        >
          <WeatherWidget
            trekName={productWeather.productName}
            location={productWeather.location}
          />
        </Suspense>
      ) : null}

      {/* Q1: Date */}
      <div>
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: "var(--ew-text)" }}
        >
          Select departure date *
        </p>
        {trek && (
          <p className="text-xs mb-2" style={{ color: "var(--ew-text-lt)" }}>
            {isPackageBooking(trek)
              ? "Pick your preferred start date — we’ll confirm the full bundle itinerary."
              : "Pick any future date — our team will confirm availability."}
          </p>
        )}
        {!trek ? (
          <div
            className="rounded-xl border-2 border-dashed py-8 text-center text-sm"
            style={{
              borderColor: "var(--ew-gray-mid)",
              color: "var(--ew-gray-dark)",
            }}
          >
            Select a trek, yatra, or package to continue
          </div>
        ) : (
          <div className="booking-departure-date-wrap">
            <input
              type="date"
              required
              min={todayYmd}
              value={fd.batchDate ?? ""}
              onChange={(e) => onDepartureDateChange(e.target.value)}
              className="booking-departure-date-input w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:border-[#C0001C] border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30"
              data-ocid="booking.preferred_date"
              aria-label="Departure date"
            />
          </div>
        )}
        {fd.batchDate && (
          <div
            className="mt-2 flex items-center justify-between rounded-lg px-4 py-2.5"
            style={{
              background: "var(--ew-orange-lt)",
              border: "1px solid #E87722",
            }}
            aria-live="polite"
          >
            <div className="min-w-0">
              <p
                className="text-sm font-bold"
                style={{ color: "var(--ew-text)" }}
              >
                {formatBatchDateLongIN(fd.batchDate)}
              </p>
              <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                {selectedBatchObj
                  ? `${Number(selectedBatchObj.availableSlots)} slots available`
                  : "We'll confirm availability for this date"}
              </p>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
              style={{ background: "#E8F5E9", color: "#2E7D32" }}
            >
              Selected ✓
            </span>
          </div>
        )}
      </div>

      {/* Q2: Group size — manual +/- starting at 1 */}
      <div>
        <ProductDetailGroupSizeStepper
          variant="booking"
          value={headcount}
          onChange={onGroupSizeChange}
          min={1}
          max={maxParty}
          hint="Use + / − to set party size. Add companion details on the next step if needed."
          ocidPrefix="booking"
        />
        <p
          className="mt-3 text-lg font-bold"
          style={{ color: "var(--ew-orange)" }}
        >
          Total: Rs.{formatINR(prices.grandTotal)}
        </p>
        {headcount >= 5 && (
          <div
            className="mt-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
            style={{
              background: "#E8F5E9",
              color: "#2E7D32",
              border: "1px solid #a7d7a8",
            }}
          >
            🎉 15% Group Discount Applied! You save Rs.
            {formatINR(prices.groupDiscount)}
          </div>
        )}
      </div>

      {/* Q3: Add-ons */}
      <div>
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          Would you like any add-ons? (optional)
        </p>
        <div className="space-y-2">
          {BOOKING_ADD_ONS.map((addon) => {
            const checked = fd.addOns.includes(addon.id);
            return (
              <label
                key={addon.id}
                className={bookingCheckRow(checked)}
                data-ocid={`booking.addon.${addon.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAddOn(addon.id)}
                />
                <span className="text-xl flex-shrink-0">{addon.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {addon.label}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {addon.desc}
                  </p>
                </div>
                <span
                  className="text-sm font-bold flex-shrink-0"
                  style={{ color: "#C0001C" }}
                >
                  +Rs.{formatINR(addon.price)}
                  {addon.perPerson ? "/person" : "/group"}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price summary */}
      {trek && (
        <div
          className="rounded-xl p-4 space-y-2 text-sm"
          style={{ background: "var(--ew-gray-lt)" }}
        >
          <p className="font-bold" style={{ color: "var(--ew-text)" }}>
            Price Summary
          </p>
          <div className="flex justify-between">
            <span style={{ color: "var(--ew-text-lt)" }}>
              Base: Rs.{formatINR(unitPrice)} × {headcount}
            </span>
            <span>Rs.{formatINR(prices.base)}</span>
          </div>
          {prices.groupDiscount > 0 && (
            <div className="flex justify-between" style={{ color: "#22C55E" }}>
              <span>Group discount (15%)</span>
              <span>−Rs.{formatINR(prices.groupDiscount)}</span>
            </div>
          )}
          {prices.addOnsTotal > 0 && (
            <div className="flex justify-between">
              <span>Add-ons</span>
              <span>+Rs.{formatINR(prices.addOnsTotal)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span style={{ color: "var(--ew-text-lt)" }}>GST (5%)</span>
            <span>Rs.{formatINR(prices.gst)}</span>
          </div>
          <div
            className="flex justify-between font-bold text-base border-t pt-2"
            style={{ borderColor: "var(--ew-gray-mid)" }}
          >
            <span>TOTAL</span>
            <span style={{ color: "#E87722" }}>
              Rs.{formatINR(prices.grandTotal)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Step1;
