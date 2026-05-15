import { Link, useSearch } from "@tanstack/react-router";
import { useActor } from "@trekora/icp";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  Download,
  Loader2,
  MessageCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createActor } from "../backend";
import type { TrekBatchPublic } from "../backend";
import OptimizedImage from "../components/media/OptimizedImage";
import { TREKS } from "../data/treks";
import { useTrekBatches } from "../hooks/useTrekBatches";
import { icpTimestampNsToMs } from "../lib/icpTimestamp";

// ── Types ──────────────────────────────────────────────────────────────────

interface AddOn {
  id: string;
  icon: string;
  label: string;
  desc: string;
  price: number;
  perPerson: boolean;
}

const ADD_ONS: AddOn[] = [
  {
    id: "gear",
    icon: "🎒",
    label: "Gear Rental Pack",
    desc: "Trekking poles, crampons, gaiters",
    price: 800,
    perPerson: true,
  },
  {
    id: "insurance",
    icon: "🛡️",
    label: "Personal Travel Insurance",
    desc: "Comprehensive mountain coverage",
    price: 350,
    perPerson: true,
  },
  {
    id: "transport",
    icon: "🚌",
    label: "Base Camp Transport",
    desc: "Pickup from Dehradun / Shimla",
    price: 1200,
    perPerson: false,
  },
  {
    id: "photographer",
    icon: "📸",
    label: "Trek Photographer",
    desc: "Professional photos & reels",
    price: 2500,
    perPerson: false,
  },
  {
    id: "porter",
    icon: "🥾",
    label: "Porter for Luggage",
    desc: "Personal luggage porter service",
    price: 1800,
    perPerson: true,
  },
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Pune",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Dehradun",
  "Other",
];
const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
  "Don't Know",
];
const MEDICAL_CONDITIONS = [
  { id: "heart", icon: "❤️", label: "Heart condition or High blood pressure" },
  { id: "diabetes", icon: "🩸", label: "Diabetes (Type 1 or Type 2)" },
  { id: "asthma", icon: "🫁", label: "Asthma or respiratory issues" },
  { id: "epilepsy", icon: "🧠", label: "Epilepsy or seizure disorder" },
  { id: "joints", icon: "🦵", label: "Knee, hip, or joint problems" },
  { id: "none", icon: "✅", label: "None of the above" },
];
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STEP_LABELS = [
  "Select Date",
  "Your Details",
  "Health Info",
  "Documents",
  "Preferences",
  "Review",
];

interface CoTraveler {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
  medicalNote: string;
}

interface FormDataAccumulated {
  // Step 1
  batchDate: string | null;
  groupSize: number;
  addOns: string[];
  // Step 2
  fullName: string;
  email: string;
  mobile: string;
  whatsappSame: boolean;
  whatsapp: string;
  city: string;
  age: string;
  gender: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  // Step 3
  bloodGroup: string;
  medicalConditions: string[];
  medicalOther: string;
  fitnessLevel: string;
  hasTrekked: boolean;
  longestTrek: string;
  // Step 4
  idProofUploaded: boolean;
  photoUploaded: boolean;
  hasCoTravelers: boolean;
  coTravelers: CoTraveler[];
  heardFrom: string;
  // Step 5
  dietary: string[];
  accommodationNote: string;
  needsTransport: boolean;
  transportCity: string;
  transportDate: string;
  contactMode: string[];
  promoCode: string;
  promoApplied: boolean;
  promoDiscount: number;
  otherNotes: string;
  // Step 6
  termsAccepted: boolean;
}

const DEFAULT_FORM: FormDataAccumulated = {
  batchDate: null,
  groupSize: 2,
  addOns: [],
  fullName: "",
  email: "",
  mobile: "",
  whatsappSame: true,
  whatsapp: "",
  city: "",
  age: "",
  gender: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  bloodGroup: "",
  medicalConditions: [],
  medicalOther: "",
  fitnessLevel: "",
  hasTrekked: false,
  longestTrek: "",
  idProofUploaded: false,
  photoUploaded: false,
  hasCoTravelers: false,
  coTravelers: [],
  heardFrom: "",
  dietary: [],
  accommodationNote: "",
  needsTransport: false,
  transportCity: "",
  transportDate: "",
  contactMode: ["WhatsApp"],
  promoCode: "",
  promoApplied: false,
  promoDiscount: 0,
  otherNotes: "",
  termsAccepted: false,
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatINR(n: number) {
  return n.toLocaleString("en-IN");
}

/** Local calendar key YYYY-MM-DD (matches `Date(y,m,d)` cells; avoids UTC-only `new Date("YYYY-MM-DD")` bugs). */
function formatYmdLocal(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseYmdLocal(ymd: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const day = Number(m[3]);
  const d = new Date(y, mo, day);
  if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== day) {
    return null;
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatYmdFromBatchTs(ts: bigint): string {
  const d = new Date(icpTimestampNsToMs(ts));
  if (Number.isNaN(d.getTime())) return "";
  return formatYmdLocal(d);
}

/** Future bookable days in a calendar month (local dates, matches grid). */
function countFutureAvailableSlotsInMonth(
  viewYear: number,
  viewMonth: number,
  today: Date,
  batchMap: Map<string, TrekBatchPublic>,
): number {
  const dim = new Date(viewYear, viewMonth + 1, 0).getDate();
  let n = 0;
  for (let day = 1; day <= dim; day++) {
    const date = new Date(viewYear, viewMonth, day);
    if (date < today) continue;
    const k = formatYmdLocal(date);
    const batch = batchMap.get(k);
    if (batch && Number(batch.availableSlots) > 0) n++;
  }
  return n;
}

/** Earliest calendar month that still has an active batch on/after `today`. */
function firstMonthWithFutureBatch(
  batches: TrekBatchPublic[],
  today: Date,
): { y: number; m: number } | null {
  let best: { y: number; m: number; t: number } | null = null;
  for (const b of batches) {
    if (!b.isActive || Number(b.availableSlots) <= 0) continue;
    const d = new Date(icpTimestampNsToMs(b.batchDate));
    if (Number.isNaN(d.getTime())) continue;
    d.setHours(0, 0, 0, 0);
    if (d < today) continue;
    const t = d.getTime();
    if (!best || t < best.t) {
      best = { y: d.getFullYear(), m: d.getMonth(), t };
    }
  }
  return best ? { y: best.y, m: best.m } : null;
}

function formatBatchDateLongIN(ymd: string): string {
  const d = parseYmdLocal(ymd);
  if (!d) return ymd;
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatBatchDateShortIN(ymd: string): string {
  const d = parseYmdLocal(ymd);
  if (!d) return ymd;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateRef() {
  return `EW-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}

function calcAddOnsTotal(addOns: string[], groupSize: number) {
  return ADD_ONS.filter((a) => addOns.includes(a.id)).reduce(
    (sum, a) => sum + (a.perPerson ? a.price * groupSize : a.price),
    0,
  );
}

function calcPrices(
  unitPrice: number,
  groupSize: number,
  addOns: string[],
  promoDiscount: number,
) {
  const base = unitPrice * groupSize;
  const groupDiscount = groupSize >= 5 ? Math.round(base * 0.15) : 0;
  const afterGroup = base - groupDiscount;
  const addOnsTotal = calcAddOnsTotal(addOns, groupSize);
  const subtotal = afterGroup + addOnsTotal;
  const gst = Math.round(subtotal * 0.05);
  const promoSavings = Math.round(subtotal * promoDiscount);
  const grandTotal = subtotal + gst - promoSavings;
  return {
    base,
    groupDiscount,
    afterGroup,
    addOnsTotal,
    subtotal,
    gst,
    promoSavings,
    grandTotal,
  };
}

// ── Step Indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center overflow-x-auto pb-1">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              style={{
                background:
                  i < current
                    ? "#22C55E"
                    : i === current
                      ? "#C0001C"
                      : "var(--ew-gray-mid)",
                color: i <= current ? "#fff" : "var(--ew-gray-dark)",
              }}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span
              className="text-[10px] mt-1 font-medium whitespace-nowrap"
              style={{
                color:
                  i === current
                    ? "#C0001C"
                    : i < current
                      ? "#22C55E"
                      : "var(--ew-gray-dark)",
              }}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div
              className="w-8 sm:w-12 h-0.5 mx-1 mb-4 flex-shrink-0 transition-colors"
              style={{
                background: i < current ? "#22C55E" : "var(--ew-gray-mid)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Batch Calendar ─────────────────────────────────────────────────────────

function BatchCalendar({
  batches,
  selectedDate,
  onSelectDate,
  isLoading,
}: {
  batches: TrekBatchPublic[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string, batch: TrekBatchPublic) => void;
  isLoading: boolean;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  const batchMap = useMemo(() => {
    const byDay = new Map<string, TrekBatchPublic[]>();
    for (const b of batches) {
      if (!b.isActive) continue;
      const key = formatYmdFromBatchTs(b.batchDate);
      if (!key) continue;
      const list = byDay.get(key) ?? [];
      list.push(b);
      byDay.set(key, list);
    }
    const map = new Map<string, TrekBatchPublic>();
    for (const [key, list] of byDay) {
      const best = list.reduce((acc, cur) =>
        Number(cur.availableSlots) > Number(acc.availableSlots) ? cur : acc,
      );
      map.set(key, best);
    }
    return map;
  }, [batches]);

  const batchesSnapSig = useMemo(
    () =>
      batches
        .map((b) => `${b.id}:${b.availableSlots}:${b.batchDate}:${b.isActive}`)
        .sort()
        .join("|"),
    [batches],
  );

  const snapSigRef = useRef<string>("");

  useEffect(() => {
    if (isLoading) return;
    if (batches.length === 0) {
      snapSigRef.current = "";
      return;
    }
    if (batchesSnapSig === snapSigRef.current) return;

    const availableHere = countFutureAvailableSlotsInMonth(
      viewYear,
      viewMonth,
      today,
      batchMap,
    );
    if (availableHere > 0) {
      snapSigRef.current = batchesSnapSig;
      return;
    }

    const target = firstMonthWithFutureBatch(batches, today);
    if (target) {
      setViewYear(target.y);
      setViewMonth(target.m);
    }
    snapSigRef.current = batchesSnapSig;
  }, [
    isLoading,
    batches,
    batchesSnapSig,
    viewYear,
    viewMonth,
    today,
    batchMap,
  ]);

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    let startOffset = firstOfMonth.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++)
      cells.push(new Date(viewYear, viewMonth, d));
    return cells;
  }, [viewYear, viewMonth]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });

  if (isLoading) {
    return (
      <div
        className="w-full min-w-0 rounded-xl border p-3 sm:p-4"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            className="h-5 w-28 rounded animate-pulse sm:w-32"
            style={{ background: "var(--ew-gray-mid)" }}
          />
          <div className="flex gap-2">
            <div
              className="h-12 w-12 shrink-0 rounded-full animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
            <div
              className="h-12 w-12 shrink-0 rounded-full animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-1.5">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={`sk-${i + 1}`}
              className="min-h-12 rounded-md animate-pulse"
              style={{ background: "var(--ew-gray-mid)", opacity: 0.5 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const atOrBeforeCurrentMonth =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  return (
    <div
      className="relative z-10 w-full min-w-0 touch-manipulation rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--ew-gray-mid)" }}
      data-ocid="booking.calendar"
      role="application"
      aria-label="Batch departure calendar"
    >
      <div
        className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <button
          type="button"
          onClick={prevMonth}
          disabled={atOrBeforeCurrentMonth}
          className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          style={{ color: "#C0001C" }}
          aria-label="Previous month"
          data-ocid="booking.calendar.prev_button"
        >
          <ChevronLeft size={22} className="shrink-0" strokeWidth={2.25} />
        </button>
        <span
          className="min-w-0 truncate text-center text-sm font-bold sm:text-base px-1"
          style={{ color: "var(--ew-text)" }}
          aria-live="polite"
        >
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-80 active:scale-95"
          style={{ color: "#C0001C" }}
          aria-label="Next month"
          data-ocid="booking.calendar.next_button"
        >
          <ChevronRight size={22} className="shrink-0" strokeWidth={2.25} />
        </button>
      </div>
      <div
        className="grid grid-cols-7 gap-1 px-2 py-1.5 text-center sm:gap-1.5 sm:px-3"
        style={{
          background: "var(--ew-gray-lt)",
          borderBottom: "1px solid var(--ew-gray-mid)",
        }}
      >
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            className="truncate py-1.5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs"
            style={{ color: "var(--ew-gray-dark)" }}
            title={d}
          >
            {d}
          </div>
        ))}
      </div>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">Departure dates</legend>
        <div className="grid grid-cols-7 gap-1 p-2 sm:gap-1.5 sm:p-3">
          {calendarDays.map((date, idx) => {
            if (!date)
              return (
                <div
                  key={`pad-${viewYear}-${viewMonth}-${idx + 1}`}
                  className="min-h-12 min-w-0"
                  aria-hidden
                />
              );
            const key = formatYmdLocal(date);
            const batch = batchMap.get(key);
            const isPast = date < today;
            const isSelected = selectedDate === key;
            const isFull = batch && Number(batch.availableSlots) === 0;
            const isAvailable = batch && Number(batch.availableSlots) > 0;
            const slots = batch ? Number(batch.availableSlots) : 0;

            let cellStyle: React.CSSProperties = {};
            let cellClass =
              "relative flex min-h-12 min-w-0 select-none flex-col items-center justify-center rounded-lg px-0.5 py-1 text-sm font-semibold transition-all sm:min-h-[3.25rem] sm:text-base ";
            if (isAvailable) {
              cellClass +=
                "cursor-pointer transition-transform active:scale-[0.98] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0001C] ";
              cellStyle = { background: "#2E7D32", color: "#fff" };
            } else if (isFull) {
              cellClass +=
                "cursor-not-allowed line-through opacity-90 focus-visible:outline-none ";
              cellStyle = { background: "#EBEBEB", color: "#888" };
            } else if (isPast) {
              cellClass +=
                "cursor-not-allowed opacity-40 focus-visible:outline-none ";
              cellStyle = { color: "var(--ew-gray-dark)" };
            } else {
              cellClass += "cursor-default focus-visible:outline-none ";
              cellStyle = { color: "var(--ew-text-lt)" };
            }
            if (isSelected && isAvailable)
              cellStyle = {
                ...cellStyle,
                outline: "2px solid #E87722",
                outlineOffset: "1px",
              };

            const labelParts = [
              date.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            ];
            if (isAvailable)
              labelParts.push(
                `${slots} slot${slots !== 1 ? "s" : ""} available`,
              );
            else if (isFull) labelParts.push("Full");
            else if (isPast) labelParts.push("Past date");
            else labelParts.push("No departure");

            if (isAvailable && batch) {
              return (
                <button
                  key={key}
                  type="button"
                  className={`${cellClass} w-full border-0 bg-transparent p-0 font-inherit`}
                  style={cellStyle}
                  onClick={() => onSelectDate(key, batch)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDate(key, batch);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={labelParts.join(". ")}
                  title={
                    isAvailable
                      ? `${slots} slot${slots !== 1 ? "s" : ""} available`
                      : undefined
                  }
                  data-ocid="booking.calendar.available_date"
                >
                  <span className="tabular-nums">{date.getDate()}</span>
                  {isAvailable && slots <= 3 && (
                    <span
                      className="mt-0.5 text-[9px] sm:text-[10px] font-bold leading-none"
                      aria-hidden
                    >
                      {slots} left
                    </span>
                  )}
                </button>
              );
            }

            return (
              <div
                key={key}
                className={cellClass}
                style={cellStyle}
                aria-disabled
                aria-label={labelParts.join(". ")}
                title={isFull ? "FULL" : undefined}
              >
                <span className="tabular-nums">{date.getDate()}</span>
                {isFull && (
                  <span
                    className="mt-0.5 text-[9px] sm:text-[10px] font-bold leading-none"
                    style={{ color: "#888" }}
                    aria-hidden
                  >
                    FULL
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
      <div
        className="flex flex-wrap gap-x-4 gap-y-2.5 px-3 pb-3 pt-0.5 text-xs sm:text-sm"
        style={{ color: "var(--ew-gray-dark)" }}
      >
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ background: "#2E7D32" }}
          />{" "}
          Available
        </span>
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ background: "#EBEBEB", border: "1px solid #ccc" }}
          />{" "}
          Full
        </span>
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ outline: "2px solid #E87722" }}
          />{" "}
          Selected
        </span>
      </div>
    </div>
  );
}

// ── Success Screen ─────────────────────────────────────────────────────────

function SuccessScreen({
  bookingRef,
  trekName,
}: { bookingRef: string; trekName: string }) {
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

  const waMsg = encodeURIComponent(
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
      <p className="text-sm mb-6" style={{ color: "var(--ew-gray-dark)" }}>
        Our team will contact you within 2 hours to confirm your spot.
      </p>

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
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors"
            style={{
              background: copied ? "#22C55E" : "#C0001C",
              color: "#fff",
            }}
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
          href={`https://wa.me/919999999999?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold text-white transition-colors hover:opacity-90"
          style={{ background: "#25D366" }}
          data-ocid="booking.whatsapp_button"
        >
          <MessageCircle size={18} />
          WhatsApp Our Team
        </a>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold border-2 transition-colors"
          style={{
            borderColor: "var(--ew-gray-mid)",
            color: "var(--ew-text-lt)",
          }}
          data-ocid="booking.home_link"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

// ── Step 1 ─────────────────────────────────────────────────────────────────

function Step1({
  fd,
  setFd,
  trek,
  batches,
  batchesLoading,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  trek: (typeof TREKS)[0] | undefined;
  batches: TrekBatchPublic[];
  batchesLoading: boolean;
}) {
  const [selectedBatchObj, setSelectedBatchObj] =
    useState<TrekBatchPublic | null>(null);

  const handleSelectDate = useCallback(
    (dateStr: string, batch: TrekBatchPublic) => {
      setFd((prev) => ({ ...prev, batchDate: dateStr }));
      setSelectedBatchObj(batch);
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>('[data-ocid="booking.step1.next_button"]')
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
          });
      });
    },
    [setFd],
  );

  useEffect(() => {
    if (!fd.batchDate || batchesLoading) return;
    const actives = batches.filter((b) => b.isActive);
    const matches = actives.filter(
      (b) => formatYmdFromBatchTs(b.batchDate) === fd.batchDate,
    );
    if (matches.length === 0) {
      setSelectedBatchObj(null);
      setFd((p) =>
        p.batchDate === fd.batchDate ? { ...p, batchDate: null } : p,
      );
      toast.error(
        "This departure is no longer available. Please choose another batch date.",
      );
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

  const prices = calcPrices(unitPrice, fd.groupSize, fd.addOns, 0);

  return (
    <div className="space-y-6">
      {/* Trek info block */}
      {trek && (
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
      )}

      {/* Q1: Date */}
      <div>
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          Select Batch Date *
        </p>
        {!trek ? (
          <div
            className="rounded-xl border-2 border-dashed py-8 text-center text-sm"
            style={{
              borderColor: "var(--ew-gray-mid)",
              color: "var(--ew-gray-dark)",
            }}
          >
            Select a trek to view available batch dates
          </div>
        ) : (
          <BatchCalendar
            batches={batches}
            selectedDate={fd.batchDate}
            onSelectDate={handleSelectDate}
            isLoading={batchesLoading}
          />
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
            <div>
              <p
                className="text-sm font-bold"
                style={{ color: "var(--ew-text)" }}
              >
                {formatBatchDateLongIN(fd.batchDate)}
              </p>
              <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                {selectedBatchObj
                  ? `${Number(selectedBatchObj.availableSlots)} slots available`
                  : ""}
              </p>
            </div>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#E8F5E9", color: "#2E7D32" }}
            >
              Selected ✓
            </span>
          </div>
        )}
      </div>

      {/* Q2: Group size */}
      <div>
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          How many people are joining?
        </p>
        <div className="flex items-center gap-4 touch-manipulation">
          <button
            type="button"
            onClick={() =>
              setFd((p) => ({ ...p, groupSize: Math.max(1, p.groupSize - 1) }))
            }
            className="min-h-12 min-w-12 h-12 w-12 shrink-0 rounded-full flex items-center justify-center font-bold text-xl transition-colors active:scale-95"
            style={{
              border: "2px solid var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
            data-ocid="booking.group_size.decrement_button"
          >
            −
          </button>
          <span
            className="text-2xl font-bold min-w-[2.5rem] text-center tabular-nums"
            style={{ color: "var(--ew-text)" }}
          >
            {fd.groupSize}
          </span>
          <button
            type="button"
            onClick={() =>
              setFd((p) => ({ ...p, groupSize: Math.min(20, p.groupSize + 1) }))
            }
            className="min-h-12 min-w-12 h-12 w-12 shrink-0 rounded-full flex items-center justify-center font-bold text-xl transition-colors active:scale-95"
            style={{
              border: "2px solid var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
            data-ocid="booking.group_size.increment_button"
          >
            +
          </button>
          <span className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            persons
          </span>
        </div>
        <p
          className="mt-2 text-lg font-bold"
          style={{ color: "var(--ew-orange)" }}
        >
          Total: Rs.{formatINR(prices.grandTotal)}
        </p>
        {fd.groupSize >= 5 && (
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
          {ADD_ONS.map((addon) => {
            const checked = fd.addOns.includes(addon.id);
            return (
              <label
                key={addon.id}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                data-ocid={`booking.addon.${addon.id}`}
                style={{
                  border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
                  background: checked ? "#FFF5F5" : "#fff",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAddOn(addon.id)}
                  style={{ accentColor: "#C0001C" }}
                  className="w-4 h-4 flex-shrink-0"
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
              Base: Rs.{formatINR(unitPrice)} × {fd.groupSize}
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

// ── Step 2 ─────────────────────────────────────────────────────────────────

function Step2({
  fd,
  setFd,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
}) {
  const {
    register,
    formState: { errors },
    trigger,
    // getValues intentionally omitted — only register/trigger/errors needed
  } = useForm({
    defaultValues: {
      fullName: fd.fullName,
      email: fd.email,
      mobile: fd.mobile,
      city: fd.city,
      age: fd.age,
      emergencyName: fd.emergencyName,
      emergencyPhone: fd.emergencyPhone,
      emergencyRelation: fd.emergencyRelation,
    },
    mode: "onBlur",
  });

  // Sync to parent on blur
  const syncField =
    (field: keyof FormDataAccumulated) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFd((prev) => ({ ...prev, [field]: e.target.value }));
    };

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

      <div>
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
          className={inp}
          style={{ minHeight: 48 }}
          data-ocid="booking.name.input"
          {...register("fullName", { required: "Name is required" })}
          onBlur={(e) => {
            void trigger("fullName");
            syncField("fullName")(e);
          }}
        />
        {errors.fullName && (
          <p className="text-xs mt-1" style={{ color: "#C0001C" }}>
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
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
            className={inp}
            style={{ minHeight: 48 }}
            data-ocid="booking.email.input"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email",
              },
            })}
            onBlur={(e) => {
              void trigger("email");
              syncField("email")(e);
            }}
          />
          {errors.email && (
            <p className="text-xs mt-1" style={{ color: "#C0001C" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="s2-mobile"
            className={lbl}
            style={{ color: "var(--ew-text)" }}
          >
            Mobile Number *
          </label>
          <div className="flex gap-2">
            <span
              className="flex items-center px-3 text-sm rounded-lg border font-medium flex-shrink-0"
              style={{
                border: "1px solid var(--ew-gray-mid)",
                background: "var(--ew-gray-lt)",
                color: "var(--ew-text)",
                minHeight: 48,
              }}
            >
              +91
            </span>
            <input
              id="s2-mobile"
              type="tel"
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.mobile.input"
              {...register("mobile", {
                required: "Mobile required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit number",
                },
              })}
              onBlur={(e) => {
                void trigger("mobile");
                syncField("mobile")(e);
              }}
            />
          </div>
          {errors.mobile && (
            <p className="text-xs mt-1" style={{ color: "#C0001C" }}>
              {errors.mobile.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="s2-wa-same"
          checked={fd.whatsappSame}
          onChange={(e) =>
            setFd((p) => ({ ...p, whatsappSame: e.target.checked }))
          }
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
          <div className="flex gap-2">
            <span
              className="flex items-center px-3 text-sm rounded-lg border font-medium flex-shrink-0"
              style={{
                border: "1px solid var(--ew-gray-mid)",
                background: "var(--ew-gray-lt)",
                minHeight: 48,
              }}
            >
              +91
            </span>
            <input
              id="s2-wa"
              type="tel"
              value={fd.whatsapp}
              onChange={(e) =>
                setFd((p) => ({ ...p, whatsapp: e.target.value }))
              }
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.whatsapp.input"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
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
            onChange={(e) => setFd((p) => ({ ...p, city: e.target.value }))}
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
        </div>
        <div>
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
            min={12}
            max={70}
            value={fd.age}
            onChange={(e) => setFd((p) => ({ ...p, age: e.target.value }))}
            className={inp}
            style={{ minHeight: 48 }}
            data-ocid="booking.age.input"
            placeholder="12–70"
          />
          {fd.age && (Number(fd.age) < 12 || Number(fd.age) > 70) && (
            <p className="text-xs mt-1" style={{ color: "#C0001C" }}>
              Age must be 12–70 for most treks
            </p>
          )}
        </div>
      </div>

      <div>
        <p className={lbl} style={{ color: "var(--ew-text)" }}>
          Gender *
        </p>
        <div className="flex flex-wrap gap-2">
          {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFd((p) => ({ ...p, gender: g }))}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all border-2"
              style={{
                borderColor: fd.gender === g ? "#C0001C" : "var(--ew-gray-mid)",
                background: fd.gender === g ? "#FFF5F5" : "#fff",
                color: fd.gender === g ? "#C0001C" : "var(--ew-text)",
              }}
              data-ocid={`booking.gender.${g.toLowerCase().replace(/ /g, "_")}`}
            >
              {g}
            </button>
          ))}
        </div>
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
          <div>
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
              value={fd.emergencyName}
              onChange={(e) =>
                setFd((p) => ({ ...p, emergencyName: e.target.value }))
              }
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.emergency_name.input"
            />
          </div>
          <div>
            <label
              htmlFor="s2-emphone"
              className={lbl}
              style={{ color: "var(--ew-text)" }}
            >
              Contact Phone *
            </label>
            <input
              id="s2-emphone"
              type="tel"
              value={fd.emergencyPhone}
              onChange={(e) =>
                setFd((p) => ({ ...p, emergencyPhone: e.target.value }))
              }
              className={inp}
              style={{ minHeight: 48 }}
              data-ocid="booking.emergency_phone.input"
            />
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
    </div>
  );
}

// ── Step 3 ─────────────────────────────────────────────────────────────────

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
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border-2"
              style={{
                borderColor:
                  fd.fitnessLevel === f.id ? "#C0001C" : "var(--ew-gray-mid)",
                background: fd.fitnessLevel === f.id ? "#FFF5F5" : "#fff",
              }}
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
              className="px-6 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={{
                borderColor:
                  fd.hasTrekked === val ? "#C0001C" : "var(--ew-gray-mid)",
                background: fd.hasTrekked === val ? "#FFF5F5" : "#fff",
                color: fd.hasTrekked === val ? "#C0001C" : "var(--ew-text)",
              }}
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
        <label
          htmlFor="s3-cert"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Upload Fitness Certificate (optional)
        </label>
        <p className="text-xs mb-2" style={{ color: "var(--ew-gray-dark)" }}>
          Recommended for treks above 4,000m. PDF or JPG, max 5MB.
        </p>
        <input
          id="s3-cert"
          type="file"
          accept=".pdf,.jpg,.jpeg"
          className="w-full text-sm"
          data-ocid="booking.fitness_cert.upload_button"
        />
      </div>
    </div>
  );
}

// ── Step 4 ─────────────────────────────────────────────────────────────────

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

  const addCoTraveler = () => {
    setFd((p) => ({
      ...p,
      coTravelers: [
        ...p.coTravelers,
        { name: "", age: "", gender: "", bloodGroup: "", medicalNote: "" },
      ],
    }));
  };

  const removeCoTraveler = (i: number) => {
    setFd((p) => ({
      ...p,
      coTravelers: p.coTravelers.filter((_, idx) => idx !== i),
    }));
  };

  const updateCoTraveler = (
    i: number,
    field: keyof CoTraveler,
    value: string,
  ) => {
    setFd((p) => ({
      ...p,
      coTravelers: p.coTravelers.map((ct, idx) =>
        idx === i ? { ...ct, [field]: value } : ct,
      ),
    }));
  };

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
        <div className="flex gap-3 mb-3">
          {["Aadhaar", "Passport", "Driving License", "Voter ID"].map((doc) => (
            <span
              key={doc}
              className="text-xs px-2 py-1 rounded-lg border font-medium"
              style={{
                borderColor: "var(--ew-gray-mid)",
                color: "var(--ew-gray-dark)",
                background: "var(--ew-gray-lt)",
              }}
            >
              {doc}
            </span>
          ))}
        </div>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            setFd((p) => ({ ...p, idProofUploaded: !!e.target.files?.length }))
          }
          className="w-full text-sm"
          data-ocid="booking.id_proof.upload_button"
        />
        {fd.idProofUploaded && (
          <p className="text-xs mt-1" style={{ color: "#22C55E" }}>
            ✓ File uploaded
          </p>
        )}
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
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) =>
            setFd((p) => ({ ...p, photoUploaded: !!e.target.files?.length }))
          }
          className="w-full text-sm"
          data-ocid="booking.photo.upload_button"
        />
        {fd.photoUploaded && (
          <p className="text-xs mt-1" style={{ color: "#22C55E" }}>
            ✓ Photo uploaded
          </p>
        )}
      </div>

      {/* Co-travelers */}
      <div>
        <p
          className="text-sm font-bold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          Additional travelers in your group?
        </p>
        <div className="flex gap-3">
          {[
            { val: true, l: "Yes" },
            { val: false, l: "No" },
          ].map(({ val, l }) => (
            <button
              key={l}
              type="button"
              onClick={() => setFd((p) => ({ ...p, hasCoTravelers: val }))}
              className="px-6 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={{
                borderColor:
                  fd.hasCoTravelers === val ? "#C0001C" : "var(--ew-gray-mid)",
                background: fd.hasCoTravelers === val ? "#FFF5F5" : "#fff",
                color: fd.hasCoTravelers === val ? "#C0001C" : "var(--ew-text)",
              }}
              data-ocid={`booking.co_travelers.${l.toLowerCase()}`}
            >
              {l}
            </button>
          ))}
        </div>
        {fd.hasCoTravelers && (
          <div className="mt-4 space-y-4">
            {fd.coTravelers.map((ct, i) => (
              <div
                key={`ct-${i + 1}`}
                className="rounded-xl p-4 relative"
                style={{
                  background: "var(--ew-gray-lt)",
                  border: "1px solid var(--ew-gray-mid)",
                }}
                data-ocid={`booking.co_traveler.item.${i + 1}`}
              >
                <button
                  type="button"
                  onClick={() => removeCoTraveler(i)}
                  className="absolute top-3 right-3 text-xs px-2 py-1 rounded-lg flex items-center gap-1"
                  style={{ color: "#C0001C", background: "#FFF5F5" }}
                  aria-label="Remove co-traveler"
                  data-ocid={`booking.co_traveler.delete_button.${i + 1}`}
                >
                  <Trash2 size={12} /> Remove
                </button>
                <p
                  className="text-xs font-bold mb-3"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Traveler {i + 2}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor={`ct-name-${i}`}
                      className={lbl}
                      style={{ color: "var(--ew-text)" }}
                    >
                      Name
                    </label>
                    <input
                      id={`ct-name-${i}`}
                      type="text"
                      value={ct.name}
                      onChange={(e) =>
                        updateCoTraveler(i, "name", e.target.value)
                      }
                      className={inp}
                      style={{ minHeight: 44 }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`ct-age-${i}`}
                      className={lbl}
                      style={{ color: "var(--ew-text)" }}
                    >
                      Age
                    </label>
                    <input
                      id={`ct-age-${i}`}
                      type="number"
                      value={ct.age}
                      onChange={(e) =>
                        updateCoTraveler(i, "age", e.target.value)
                      }
                      className={inp}
                      style={{ minHeight: 44 }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`ct-gender-${i}`}
                      className={lbl}
                      style={{ color: "var(--ew-text)" }}
                    >
                      Gender
                    </label>
                    <select
                      id={`ct-gender-${i}`}
                      value={ct.gender}
                      onChange={(e) =>
                        updateCoTraveler(i, "gender", e.target.value)
                      }
                      className={inp}
                      style={{ minHeight: 44 }}
                    >
                      <option value="">Select</option>
                      {[
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say",
                      ].map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={`ct-blood-${i}`}
                      className={lbl}
                      style={{ color: "var(--ew-text)" }}
                    >
                      Blood Group
                    </label>
                    <select
                      id={`ct-blood-${i}`}
                      value={ct.bloodGroup}
                      onChange={(e) =>
                        updateCoTraveler(i, "bloodGroup", e.target.value)
                      }
                      className={inp}
                      style={{ minHeight: 44 }}
                    >
                      <option value="">Select</option>
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    htmlFor={`ct-medical-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Medical conditions (brief)
                  </label>
                  <input
                    id={`ct-medical-${i}`}
                    type="text"
                    value={ct.medicalNote}
                    onChange={(e) =>
                      updateCoTraveler(i, "medicalNote", e.target.value)
                    }
                    className={inp}
                    style={{ minHeight: 44 }}
                    placeholder="None / specify if any"
                  />
                </div>
              </div>
            ))}
            {fd.coTravelers.length < fd.groupSize - 1 && (
              <button
                type="button"
                onClick={addCoTraveler}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors hover:opacity-70"
                style={{ borderColor: "#C0001C", color: "#C0001C" }}
                data-ocid="booking.add_co_traveler_button"
              >
                <Plus size={16} /> Add Traveler
              </button>
            )}
          </div>
        )}
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

// ── Step 5 ─────────────────────────────────────────────────────────────────

function Step5({
  fd,
  setFd,
  unitPrice,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  unitPrice: number;
}) {
  const [promoInput, setPromoInput] = useState(fd.promoCode);
  const [promoStatus, setPromoStatus] = useState<"idle" | "valid" | "invalid">(
    fd.promoApplied ? "valid" : "idle",
  );

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

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "EW25") {
      const discount = 0.05;
      const savings = Math.round(unitPrice * fd.groupSize * discount);
      setFd((p) => ({
        ...p,
        promoCode: code,
        promoApplied: true,
        promoDiscount: discount,
      }));
      setPromoStatus("valid");
      toast.success(`Promo applied! You save Rs.${formatINR(savings)}`);
    } else {
      setPromoStatus("invalid");
      setFd((p) => ({
        ...p,
        promoApplied: false,
        promoDiscount: 0,
        promoCode: "",
      }));
    }
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
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                style={{
                  border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
                  background: checked ? "#FFF5F5" : "#fff",
                }}
                data-ocid={`booking.dietary.${d.id}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDietary(d.id)}
                  style={{ accentColor: "#C0001C" }}
                  className="w-4 h-4"
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
        <div className="flex gap-3">
          {[
            { val: true, l: "Yes" },
            { val: false, l: "No" },
          ].map(({ val, l }) => (
            <button
              key={l}
              type="button"
              onClick={() => setFd((p) => ({ ...p, needsTransport: val }))}
              className="px-6 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={{
                borderColor:
                  fd.needsTransport === val ? "#C0001C" : "var(--ew-gray-mid)",
                background: fd.needsTransport === val ? "#FFF5F5" : "#fff",
                color: fd.needsTransport === val ? "#C0001C" : "var(--ew-text)",
              }}
              data-ocid={`booking.transport.${l.toLowerCase()}`}
            >
              {l}
            </button>
          ))}
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
        <div className="flex flex-wrap gap-2">
          {["SMS", "WhatsApp", "Email", "All"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleContact(m)}
              className="px-4 py-2 rounded-full text-sm font-medium border-2 transition-all"
              style={{
                borderColor: fd.contactMode.includes(m)
                  ? "#C0001C"
                  : "var(--ew-gray-mid)",
                background: fd.contactMode.includes(m) ? "#FFF5F5" : "#fff",
                color: fd.contactMode.includes(m)
                  ? "#C0001C"
                  : "var(--ew-text)",
              }}
              data-ocid={`booking.contact_mode.${m.toLowerCase()}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Promo code */}
      <div>
        <label
          htmlFor="s5-promo"
          className={lbl}
          style={{ color: "var(--ew-text)" }}
        >
          Promo / Referral Code (optional)
        </label>
        <div className="flex gap-2">
          <input
            id="s5-promo"
            type="text"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value);
              setPromoStatus("idle");
            }}
            placeholder="Enter code e.g. EW25"
            className={`${inp} flex-1`}
            style={{ minHeight: 48 }}
            data-ocid="booking.promo.input"
          />
          <button
            type="button"
            onClick={applyPromo}
            className="px-4 rounded-lg text-sm font-semibold text-white transition-colors"
            style={{ background: "#22C55E", minHeight: 48 }}
            data-ocid="booking.promo.apply_button"
          >
            Apply
          </button>
        </div>
        {promoStatus === "valid" && (
          <p
            className="text-xs mt-1 font-semibold"
            style={{ color: "#22C55E" }}
            data-ocid="booking.promo.success_state"
          >
            ✓ Promo applied! 5% discount
          </p>
        )}
        {promoStatus === "invalid" && (
          <p
            className="text-xs mt-1"
            style={{ color: "#C0001C" }}
            data-ocid="booking.promo.error_state"
          >
            ✗ Invalid or expired promo code
          </p>
        )}
      </div>

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

// ── Step 6 ─────────────────────────────────────────────────────────────────

function Step6({
  fd,
  setFd,
  trek,
  unitPrice,
  isSubmitting,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  trek: (typeof TREKS)[0] | undefined;
  unitPrice: number;
  isSubmitting: boolean;
}) {
  const prices = calcPrices(
    unitPrice,
    fd.groupSize,
    fd.addOns,
    fd.promoDiscount,
  );
  const selectedAddOns = ADD_ONS.filter((a) => fd.addOns.includes(a.id));

  return (
    <div className="space-y-5">
      {/* Trek summary */}
      {trek && (
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
              👥 {fd.groupSize} person{fd.groupSize !== 1 ? "s" : ""} ·{" "}
              {fd.fullName}
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
      )}

      {/* Price breakdown */}
      <div
        className="rounded-xl p-4 space-y-2 text-sm"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <p className="font-bold" style={{ color: "var(--ew-text)" }}>
          Price Breakdown
        </p>
        <div className="flex justify-between">
          <span style={{ color: "var(--ew-text-lt)" }}>
            Rs.{formatINR(unitPrice)} × {fd.groupSize} persons
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
        {prices.promoSavings > 0 && (
          <div className="flex justify-between" style={{ color: "#22C55E" }}>
            <span>Promo discount</span>
            <span>−Rs.{formatINR(prices.promoSavings)}</span>
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
          <span style={{ color: "#E87722", fontSize: 18 }}>
            Rs.{formatINR(prices.grandTotal)}
          </span>
        </div>
      </div>

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

      {/* Terms */}
      <label
        className="flex items-start gap-3 cursor-pointer"
        data-ocid="booking.terms.checkbox"
      >
        <input
          type="checkbox"
          checked={fd.termsAccepted}
          onChange={(e) =>
            setFd((p) => ({ ...p, termsAccepted: e.target.checked }))
          }
          style={{ accentColor: "#C0001C", marginTop: 2 }}
          className="w-5 h-5 flex-shrink-0"
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

      {/* Submit button */}
      <button
        type="submit"
        disabled={!fd.termsAccepted || isSubmitting}
        className="w-full flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all disabled:opacity-50"
        style={{
          background:
            fd.termsAccepted && !isSubmitting
              ? "#C0001C"
              : "var(--ew-gray-mid)",
          height: 56,
          fontSize: 16,
        }}
        data-ocid="booking.submit_button"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Submitting your
            booking…
          </>
        ) : (
          <>✅ Submit Booking Request</>
        )}
      </button>
    </div>
  );
}

// ── Main BookingPage ───────────────────────────────────────────────────────

export default function BookingPage() {
  const { trek: trekFromSearch } = useSearch({ from: "/layout/book" });
  const [step, setStep] = useState(0);
  const [trekSlug, setTrekSlug] = useState("");
  const [fd, setFd] = useState<FormDataAccumulated>(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const { actor } = useActor(createActor);

  const trek = TREKS.find((t) => t.slug === trekSlug);

  useEffect(() => {
    if (!trekFromSearch) return;
    const exists = TREKS.some((t) => t.slug === trekFromSearch);
    if (exists) {
      setTrekSlug(trekFromSearch);
      setFd((p) => ({ ...p, batchDate: null }));
    }
  }, [trekFromSearch]);

  const { data: batches = [], isLoading: batchesLoading } = useTrekBatches(
    trek?.id,
  );

  const unitPrice = useMemo(() => trek?.price ?? 0, [trek]);
  const prices = calcPrices(
    unitPrice,
    fd.groupSize,
    fd.addOns,
    fd.promoDiscount,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: step triggers scroll side-effect
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const canGoNext = useCallback(() => {
    switch (step) {
      case 0:
        if (!trekSlug) {
          toast.error("Please select a trek first.");
          return false;
        }
        if (!fd.batchDate) {
          toast.error("Please select an available batch date.");
          return false;
        }
        return true;
      case 1:
        if (!fd.fullName.trim()) {
          toast.error("Please enter your full name.");
          return false;
        }
        if (!fd.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(fd.email)) {
          toast.error("Please enter a valid email.");
          return false;
        }
        if (!fd.mobile.trim() || !/^[6-9]\d{9}$/.test(fd.mobile)) {
          toast.error("Please enter a valid 10-digit mobile number.");
          return false;
        }
        if (!fd.city) {
          toast.error("Please select your city.");
          return false;
        }
        if (!fd.age || Number(fd.age) < 12 || Number(fd.age) > 70) {
          toast.error("Age must be between 12 and 70.");
          return false;
        }
        if (!fd.gender) {
          toast.error("Please select your gender.");
          return false;
        }
        if (!fd.emergencyName.trim()) {
          toast.error("Please provide an emergency contact name.");
          return false;
        }
        if (!fd.emergencyPhone.trim()) {
          toast.error("Please provide an emergency contact number.");
          return false;
        }
        return true;
      case 2:
        return true; // Health info is advisory
      case 3:
        return true; // Documents advisory
      case 4:
        return true; // Special requests all optional
      default:
        return true;
    }
  }, [step, fd, trekSlug]);

  const handleNext = () => {
    if (!canGoNext()) return;
    setStep((s) => Math.min(s + 1, 5));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!fd.termsAccepted) {
        toast.error("Please accept the terms and conditions.");
        return;
      }
      if (!trek || !fd.batchDate) {
        toast.error(
          "Booking data is incomplete. Please go back and try again.",
        );
        return;
      }

      setIsSubmitting(true);
      try {
        const dBatch = parseYmdLocal(fd.batchDate);
        if (!dBatch) {
          toast.error("Invalid batch date. Please pick a date again.");
          return;
        }
        const batchDateNs = BigInt(dBatch.getTime()) * 1_000_000n;
        if (actor) {
          await actor.createBooking({
            itemId: BigInt(trek.id),
            itemName: trek.name,
            itemType: "trek",
            travelerName: fd.fullName,
            email: fd.email,
            phone: fd.mobile,
            groupSize: BigInt(fd.groupSize),
            totalAmount: BigInt(Math.round(prices.grandTotal)),
            advanceAmount: BigInt(0),
            batchDate: batchDateNs,
          });
        }
        const ref = generateRef();
        setSuccessRef(ref);
        toast.success(`Booking submitted! Ref: ${ref}`);
      } catch (err) {
        toast.error("Submission failed. Please try again.");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [fd, trek, actor, prices.grandTotal],
  );

  const STEP_TITLES = [
    {
      title: "Let's plan your Himalayan adventure! 🏔️",
      sub: "Select your trek, batch date, and add-ons",
    },
    {
      title: "Tell us about the lead traveler",
      sub: "These details are for booking confirmation and emergency contact",
    },
    {
      title: "A few health questions for your safety 🏥",
      sub: "This helps our certified mountain guides ensure your safety",
    },
    {
      title: "Documents & co-travelers",
      sub: "Upload your ID proof and add co-traveler details",
    },
    {
      title: "Almost done! Any special requirements? 🌟",
      sub: "Optional preferences — skip if none",
    },
    {
      title: "Review your booking summary",
      sub: "Confirm all details before submitting",
    },
  ];

  // Success screen
  if (successRef) {
    return (
      <div
        className="pt-24 min-h-screen pb-12 px-4"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <SuccessScreen
          bookingRef={successRef}
          trekName={trek?.name ?? "your trek"}
        />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen max-sm:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] sm:pb-32"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Sticky header */}
      <div
        className="sticky top-0 z-40 bg-white shadow-sm border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          {trek ? (
            <>
              <OptimizedImage
                src={trek.image}
                alt={trek.name}
                variant="thumbnail"
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--ew-text)" }}
                >
                  {trek.name}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  {trek.duration} days
                </p>
              </div>
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ color: "#C0001C" }}
              >
                Rs.{formatINR(trek.price)}/person
              </span>
            </>
          ) : (
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--ew-text)" }}
            >
              Trekora Booking
            </p>
          )}
        </div>
        {/* Progress bar */}
        <div
          className="h-1 w-full"
          style={{ background: "var(--ew-gray-mid)" }}
        >
          <div
            className="h-1 transition-all duration-500"
            style={{
              width: `${((step + 1) / 6) * 100}%`,
              background: "#C0001C",
            }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Step indicator */}
        <div className="mb-6 overflow-x-auto">
          <StepIndicator current={step} />
        </div>

        {/* Form card */}
        <form
          onSubmit={
            step === 5
              ? handleSubmit
              : (e) => {
                  e.preventDefault();
                  handleNext();
                }
          }
          noValidate
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
            data-ocid="booking.form_card"
          >
            {/* Step title */}
            <div className="mb-6">
              <h2
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "var(--ew-text)" }}
              >
                {STEP_TITLES[step].title}
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {STEP_TITLES[step].sub}
              </p>
            </div>

            {/* Trek select (step 0 only) */}
            {step === 0 && (
              <div className="mb-5">
                <label
                  htmlFor="trek-select"
                  className="block text-[13px] font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Choose Your Trek *
                </label>
                <select
                  id="trek-select"
                  value={trekSlug}
                  onChange={(e) => {
                    setTrekSlug(e.target.value);
                    setFd((p) => ({ ...p, batchDate: null }));
                  }}
                  className="w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 focus:border-[#C0001C] border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30"
                  style={{ minHeight: 48 }}
                  data-ocid="booking.trek.select"
                >
                  <option value="">Select a trek…</option>
                  {TREKS.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} — Rs.{formatINR(t.price)}/person
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Step content */}
            {step === 0 && (
              <Step1
                fd={fd}
                setFd={setFd}
                trek={trek}
                batches={batches}
                batchesLoading={batchesLoading}
              />
            )}
            {step === 1 && <Step2 fd={fd} setFd={setFd} />}
            {step === 2 && <Step3 fd={fd} setFd={setFd} />}
            {step === 3 && <Step4 fd={fd} setFd={setFd} />}
            {step === 4 && (
              <Step5 fd={fd} setFd={setFd} unitPrice={unitPrice} />
            )}
            {step === 5 && (
              <Step6
                fd={fd}
                setFd={setFd}
                trek={trek}
                unitPrice={unitPrice}
                isSubmitting={isSubmitting}
              />
            )}

            {/* Navigation (only for steps 0-4; step 5 has its own submit button) */}
            {step < 5 && (
              <div className="mt-8 flex items-center justify-between gap-3 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-[35] max-sm:mt-0 max-sm:rounded-none max-sm:border-t max-sm:border-[var(--ew-gray-mid)] max-sm:bg-white max-sm:px-4 max-sm:py-3 max-sm:shadow-[0_-8px_28px_rgba(0,0,0,0.1)] max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold text-sm transition-colors active:scale-[0.98] sm:min-h-0 sm:flex-none sm:px-5"
                    style={{
                      borderColor: "var(--ew-gray-mid)",
                      color: "var(--ew-text-lt)",
                    }}
                    data-ocid={`booking.step${step + 1}.back_button`}
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                ) : null}
                <button
                  type="submit"
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-sm text-white transition-all active:scale-[0.98] sm:min-h-[48px] sm:px-6 ${
                    step === 0
                      ? "w-full max-sm:w-full sm:flex-none sm:w-auto"
                      : "min-w-0 flex-[1.35] sm:flex-none"
                  }`}
                  style={{ background: "#C0001C" }}
                  data-ocid={`booking.step${step + 1}.next_button`}
                >
                  {step === 4 ? "Review Booking" : "Next Step"}{" "}
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
            {step === 5 && step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-colors"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  color: "var(--ew-text-lt)",
                }}
                data-ocid="booking.step6.back_button"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
          </div>
        </form>

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-4 mt-6 text-xs"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <span>🔒 Secure & encrypted</span>
          <span>✅ Free cancellation (30 days)</span>
          <span>⭐ 4.8 rated by 2,400+ trekkers</span>
        </div>
      </div>

      <style>{`
        .success-check-ring {
          background: #22C55E;
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes pop-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
