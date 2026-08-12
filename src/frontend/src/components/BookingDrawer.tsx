import PhoneInput from "@/components/ui/PhoneInput";
import {
  bookingDetailsPlainText,
  buildBookingEmailSections,
} from "@/lib/booking-email-details";
import {
  CTA_NAV_PRIMARY,
  CTA_NAV_PRIMARY_GROW,
  CTA_NAV_SECONDARY_FLEX,
  ctaMerge,
} from "@/lib/cta-buttons";
import { isFeatureLive } from "@/lib/dormant-features";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import { validateNationalPhone } from "@/lib/phone-countries";
import { bookingEmailSuccessMessage } from "@/services/booking-email-api";
import { submitBookingEmail } from "@/services/booking-email-api";
import { AnimatePresence, motion } from "@/lib/motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { isMobileViewport, useIsMobile } from "../hooks/use-mobile";
import OptimizedImage from "./media/OptimizedImage";

/* ── Types ── */
export interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  trekName: string;
  trekSlug: string;
  price: number;
  duration: string;
  difficulty: string;
  image?: string;
  /** When set, group size cannot exceed this (matches batch availability). */
  maxSlots?: number;
  /** Pre-filled trek date (YYYY-MM-DD), e.g. batch start from upcoming batches. */
  suggestedDateIso?: string;
}

type BookingState = {
  step: 1 | 2 | 3;
  selectedDate: string;
  groupSize: number;
  addOns: string[];
  name: string;
  phone: string;
  email: string;
};

type BookingAction =
  | { type: "SET_STEP"; step: 1 | 2 | 3 }
  | { type: "SET_DATE"; date: string }
  | { type: "SET_GROUP"; size: number }
  | { type: "TOGGLE_ADDON"; addon: string }
  | { type: "SET_FIELD"; field: "name" | "phone" | "email"; value: string }
  | { type: "RESET" };

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DATE":
      return { ...state, selectedDate: action.date };
    case "SET_GROUP":
      return { ...state, groupSize: action.size };
    case "TOGGLE_ADDON":
      return {
        ...state,
        addOns: state.addOns.includes(action.addon)
          ? state.addOns.filter((a) => a !== action.addon)
          : [...state.addOns, action.addon],
      };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const initialState: BookingState = {
  step: 1,
  selectedDate: "",
  groupSize: 1,
  addOns: [],
  name: "",
  phone: "",
  email: "",
};

const ADD_ONS = [
  { id: "insurance", label: "Travel Insurance", price: 350 },
  { id: "porter", label: "Porter Service", price: 500 },
  { id: "transfer", label: "Airport Transfer", price: 1200 },
] as const;

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/* ── Component ── */
export default function BookingDrawer({
  isOpen,
  onClose,
  trekName,
  trekSlug,
  price,
  duration,
  difficulty,
  image,
  maxSlots,
  suggestedDateIso,
}: BookingDrawerProps) {
  const paymentLive = isFeatureLive("payment");
  const isMobile = useIsMobile();
  /** Fresh mounts (e.g. upcoming batches) need sync layout — avoid desktop drawer on phone. */
  const mobileLayout = isOpen ? isMobileViewport() : isMobile;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [phoneCountry, setPhoneCountry] = useState("IN");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rzpLoading, setRzpLoading] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const today = new Date().toISOString().split("T")[0];

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* Prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const maxGroup =
    maxSlots !== undefined && maxSlots >= 1 ? Math.min(20, maxSlots) : 20;

  /* Reset on close; on open or batch change, reset then apply batch presets */
  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "RESET" });
      return;
    }
    void trekSlug;
    dispatch({ type: "RESET" });
    if (suggestedDateIso) {
      dispatch({ type: "SET_DATE", date: suggestedDateIso });
    }
    if (maxSlots !== undefined && maxSlots >= 1) {
      const cap = Math.min(20, maxSlots);
      dispatch({ type: "SET_GROUP", size: Math.min(2, cap) });
    }
  }, [isOpen, trekSlug, suggestedDateIso, maxSlots]);

  /* Price calc */
  const addOnTotal = ADD_ONS.filter((a) => state.addOns.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  );
  const total = (price + addOnTotal) * state.groupSize;

  /* Step 1 validation */
  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!state.selectedDate) errs.date = "Please select a date";
    if (state.groupSize < 1) errs.group = "Minimum 1 person required";
    if (maxSlots !== undefined && maxSlots >= 1 && state.groupSize > maxSlots) {
      errs.group = `This batch has only ${maxSlots} seat(s) available`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  /* Step 2 validation */
  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!state.name.trim()) errs.name = "Full name is required";
    const phoneCheck = validateNationalPhone(state.phone, phoneCountry);
    if (phoneCheck !== true) errs.phone = phoneCheck;
    if (!state.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Enter valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function bookingRef() {
    return `EW-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  function submitBookingRequest(): boolean {
    const ref = bookingRef();
    const addOnLabels = ADD_ONS.filter((a) => state.addOns.includes(a.id)).map(
      (a) => a.label,
    );
    const sections = buildBookingEmailSections(
      {
        batchDate: state.selectedDate,
        groupSize: state.groupSize,
        addOns: state.addOns,
        fullName: state.name.trim(),
        email: state.email.trim(),
        mobile: state.phone.trim(),
        whatsappSame: true,
        whatsapp: state.phone.trim(),
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
        idProofFile: null,
        photoFile: null,
        fitnessCertFile: null,
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
        termsAccepted: true,
      },
      {
        itemType: "trek",
        itemName: trekName,
        trekSlug,
        batchDateLabel: state.selectedDate,
        batchStatus: maxSlots
          ? `Batch — up to ${maxSlots} seat(s)`
          : "Quick booking — team will confirm",
        addOnLabels,
        pricing: {
          unitPrice: price,
          groupSize: state.groupSize,
          base: price * state.groupSize,
          groupDiscount: 0,
          addOnsTotal: addOnTotal * state.groupSize,
          gst: 0,
          promoSavings: 0,
          grandTotal: total,
        },
      },
    );
    const email = state.email.trim();
    submitEmailOptimistic(
      () =>
        submitBookingEmail({
          bookingRef: ref,
          source: "Booking Drawer",
          trekName,
          trekSlug,
          batchDate: state.selectedDate,
          groupSize: state.groupSize,
          totalAmount: total,
          travelerName: state.name.trim(),
          email,
          phone: state.phone.trim(),
          addOns: addOnLabels,
          sections,
          details: bookingDetailsPlainText(sections),
        }),
      () => {
        toast.success(`🎉 ${bookingEmailSuccessMessage(email)}`);
        onClose();
      },
      (message) => {
        toast.error(
          `${message} Reference ${ref} — save it and WhatsApp us if needed.`,
        );
      },
    );
    return true;
  }

  /* Razorpay payment or enquiry submit */
  async function initiatePayment() {
    if (!validateStep2()) return;

    if (paymentLive && typeof window.Razorpay !== "undefined") {
      setRzpLoading(true);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
        amount: total * 100,
        currency: "INR",
        name: "Trekora",
        description: `${trekName} — ${state.selectedDate}`,
        prefill: {
          name: state.name,
          email: state.email,
          contact: state.phone,
        },
        theme: { color: "#C0001C" },
        handler: (_response: RazorpayResponse) => {
          submitBookingRequest();
          setRzpLoading(false);
        },
        modal: {
          ondismiss: () => setRzpLoading(false),
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      return;
    }

    setRzpLoading(false);
    submitBookingRequest();
  }

  /* Step dots */
  function StepDots() {
    const steps = paymentLive ? ([1, 2, 3] as const) : ([1, 2] as const);
    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((s) => (
          <div
            key={s}
            className="rounded-full transition-all duration-300"
            style={{
              width: state.step === s ? 24 : 8,
              height: 8,
              backgroundColor:
                state.step === s
                  ? "var(--ew-red)"
                  : state.step > s
                    ? "var(--ew-orange)"
                    : "var(--ew-gray-mid)",
            }}
          />
        ))}
      </div>
    );
  }

  const drawerContent = (
    <div
      ref={drawerRef}
      className="flex flex-col h-full bg-white"
      style={{ maxWidth: mobileLayout ? "100%" : 480 }}
    >
      {/* Mobile handle bar */}
      {mobileLayout && (
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div
            className="rounded-full"
            style={{
              width: 32,
              height: 4,
              backgroundColor: "var(--ew-gray-mid)",
            }}
          />
        </div>
      )}

      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
        style={{
          backgroundColor: "var(--ew-red)",
          color: "#fff",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {image && (
            <OptimizedImage
              src={image}
              alt={trekName}
              width={48}
              height={48}
              variant="thumbnail"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
              Book Trek
            </p>
            <p className="font-bold text-base truncate">{trekName}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>
              {duration} · {difficulty}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking drawer"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-2"
          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          data-ocid="booking_drawer.close_button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Price bar */}
      <div
        className="px-5 py-2 flex items-center justify-between flex-shrink-0"
        style={{ backgroundColor: "var(--ew-footer)", color: "#fff" }}
      >
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          Step {state.step} of 3
        </span>
        <span className="font-bold" style={{ color: "var(--ew-orange)" }}>
          ₹{price.toLocaleString("en-IN")}/person
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <StepDots />

        <AnimatePresence mode="wait">
          {/* ── STEP 1 ── */}
          {state.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <h3
                className="font-bold text-base"
                style={{ color: "var(--ew-text)" }}
              >
                Select Date &amp; Group Size
              </h3>

              {/* Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  Trek Date *
                </label>
                <div
                  className={`booking-departure-date-wrap${state.selectedDate ? "" : " booking-departure-date-wrap--empty"}`}
                >
                  {!state.selectedDate ? (
                    <span
                      className="booking-departure-date-placeholder"
                      aria-hidden
                    >
                      Tap to select trek date
                    </span>
                  ) : null}
                  <input
                    id="booking-date"
                    type="date"
                    min={today}
                    value={state.selectedDate}
                    onChange={(e) =>
                      dispatch({ type: "SET_DATE", date: e.target.value })
                    }
                    onFocus={(e) =>
                      e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                      })
                    }
                    className="booking-departure-date-input w-full rounded-xl text-sm focus:outline-none transition-colors"
                    style={{
                      height: 48,
                      border: errors.date
                        ? "1px solid var(--ew-red)"
                        : undefined,
                    }}
                    data-ocid="booking_drawer.date_input"
                  />
                </div>
                {errors.date && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-red)" }}
                  >
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Group size stepper */}
              <div>
                <p
                  className="text-xs font-semibold mb-1.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  Group Size *
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "SET_GROUP",
                        size: Math.max(1, state.groupSize - 1),
                      })
                    }
                    aria-label="Decrease group size"
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors"
                    style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
                    data-ocid="booking_drawer.group_minus"
                  >
                    −
                  </button>
                  <span
                    className="text-2xl font-bold w-8 text-center"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {state.groupSize}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "SET_GROUP",
                        size: Math.min(maxGroup, state.groupSize + 1),
                      })
                    }
                    aria-label="Increase group size"
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors"
                    style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
                    data-ocid="booking_drawer.group_plus"
                  >
                    +
                  </button>
                  <span
                    className="text-xs"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    persons (max {maxGroup})
                  </span>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  Optional Add-ons
                </p>
                <div className="space-y-2">
                  {ADD_ONS.map((addon) => {
                    const checked = state.addOns.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className="flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 transition-colors"
                        style={{
                          backgroundColor: checked
                            ? "var(--ew-orange-lt)"
                            : "var(--ew-gray-lt)",
                          border: `1px solid ${checked ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
                          height: 48,
                        }}
                        data-ocid={`booking_drawer.addon.${addon.id}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            dispatch({ type: "TOGGLE_ADDON", addon: addon.id })
                          }
                          className="w-4 h-4"
                        />
                        <span
                          className="flex-1 text-sm font-medium"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {addon.label}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--ew-orange)" }}
                        >
                          +₹{addon.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price summary */}
              <div
                className="rounded-xl p-4 space-y-1.5 text-sm"
                style={{ backgroundColor: "var(--ew-gray-lt)" }}
              >
                <div className="flex justify-between">
                  <span style={{ color: "var(--ew-text-lt)" }}>
                    Trek (₹{price.toLocaleString("en-IN")} × {state.groupSize})
                  </span>
                  <span style={{ color: "var(--ew-text)" }}>
                    ₹{(price * state.groupSize).toLocaleString("en-IN")}
                  </span>
                </div>
                {ADD_ONS.filter((a) => state.addOns.includes(a.id)).map(
                  (addon) => (
                    <div key={addon.id} className="flex justify-between">
                      <span style={{ color: "var(--ew-text-lt)" }}>
                        {addon.label} × {state.groupSize}
                      </span>
                      <span style={{ color: "var(--ew-text)" }}>
                        ₹
                        {(addon.price * state.groupSize).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>
                  ),
                )}
                <div
                  className="flex justify-between font-bold pt-1.5 border-t"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  <span style={{ color: "var(--ew-text)" }}>Total</span>
                  <span style={{ color: "var(--ew-orange)" }}>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {state.step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h3
                className="font-bold text-base"
                style={{ color: "var(--ew-text)" }}
              >
                Traveler Details
              </h3>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  Full Name *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="Your full name"
                  value={state.name}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "name",
                      value: e.target.value,
                    })
                  }
                  onFocus={(e) =>
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    })
                  }
                  className="w-full rounded-xl px-4 text-sm focus:outline-none"
                  style={{
                    height: 48,
                    border: `1px solid ${errors.name ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                    color: "var(--ew-text)",
                  }}
                  data-ocid="booking_drawer.name_input"
                />
                {errors.name && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-red)" }}
                    data-ocid="booking_drawer.name_field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="booking-phone"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  Mobile Number *
                </label>
                <PhoneInput
                  id="booking-phone"
                  value={state.phone}
                  countryIso={phoneCountry}
                  onValueChange={(value) =>
                    dispatch({ type: "SET_FIELD", field: "phone", value })
                  }
                  onCountryChange={(meta) => setPhoneCountry(meta.iso)}
                  hasError={Boolean(errors.phone)}
                  placeholder="Enter Your Mobile Number"
                  data-ocid="booking_drawer.phone_input"
                />
                {errors.phone && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-red)" }}
                    data-ocid="booking_drawer.phone_field_error"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="booking-email"
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  Email Address *
                </label>
                <input
                  id="booking-email"
                  type="email"
                  placeholder="your@email.com"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "email",
                      value: e.target.value,
                    })
                  }
                  onFocus={(e) =>
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    })
                  }
                  className="w-full rounded-xl px-4 text-sm focus:outline-none"
                  style={{
                    height: 48,
                    border: `1px solid ${errors.email ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                    color: "var(--ew-text)",
                  }}
                  data-ocid="booking_drawer.email_input"
                />
                {errors.email && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-red)" }}
                    data-ocid="booking_drawer.email_field_error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <p
                className="text-xs p-3 rounded-lg"
                style={{
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "#92400E",
                }}
              >
                📧 We'll send your booking confirmation and voucher to this
                email.
              </p>
            </motion.div>
          )}

          {/* ── STEP 3 ── */}
          {paymentLive && state.step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <h3
                className="font-bold text-base"
                style={{ color: "var(--ew-text)" }}
              >
                Review &amp; Pay
              </h3>

              {/* Summary card */}
              <div
                className="rounded-xl p-4"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
              >
                <div className="flex items-start gap-3 mb-4">
                  {image && (
                    <OptimizedImage
                      src={image}
                      alt={trekName}
                      width={56}
                      height={56}
                      variant="thumbnail"
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {trekName}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      Date: {state.selectedDate} · {state.groupSize} person
                      {state.groupSize > 1 ? "s" : ""}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {state.name} · {state.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--ew-text-lt)" }}>
                      Trek price × {state.groupSize}
                    </span>
                    <span style={{ color: "var(--ew-text)" }}>
                      ₹{(price * state.groupSize).toLocaleString("en-IN")}
                    </span>
                  </div>
                  {ADD_ONS.filter((a) => state.addOns.includes(a.id)).map(
                    (addon) => (
                      <div key={addon.id} className="flex justify-between">
                        <span style={{ color: "var(--ew-text-lt)" }}>
                          {addon.label} × {state.groupSize}
                        </span>
                        <span style={{ color: "var(--ew-text)" }}>
                          ₹
                          {(addon.price * state.groupSize).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      </div>
                    ),
                  )}
                  <div
                    className="flex justify-between font-bold pt-2 mt-1 border-t text-base"
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                  >
                    <span style={{ color: "var(--ew-text)" }}>
                      Total Payable
                    </span>
                    <span style={{ color: "var(--ew-orange)" }}>
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shimmer / trust */}
              <div
                className="rounded-xl p-4 text-center text-sm"
                style={{ backgroundColor: "var(--ew-gray-lt)" }}
              >
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  🔒 100% Secure Payment via Razorpay
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  UPI · Cards · Net Banking
                  {isFeatureLive("emi") ? " · EMI available" : ""}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <div
        className="flex-shrink-0 px-5 py-4 border-t space-y-2"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        {state.step === 1 && (
          <button
            type="button"
            onClick={() => {
              if (validateStep1()) dispatch({ type: "SET_STEP", step: 2 });
            }}
            className={ctaMerge(CTA_NAV_PRIMARY, "w-full")}
            data-ocid="booking_drawer.step1_continue"
          >
            Continue
          </button>
        )}

        {state.step === 2 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", step: 1 })}
              className={CTA_NAV_SECONDARY_FLEX}
              data-ocid="booking_drawer.step2_back"
            >
              Back
            </button>
            <button
              type="button"
              disabled={rzpLoading}
              onClick={() => {
                if (!validateStep2()) return;
                if (paymentLive) {
                  dispatch({ type: "SET_STEP", step: 3 });
                } else {
                  void initiatePayment();
                }
              }}
              className={ctaMerge(CTA_NAV_PRIMARY_GROW, "disabled:opacity-60")}
              data-ocid="booking_drawer.step2_proceed"
            >
              {rzpLoading
                ? "Sending…"
                : paymentLive
                  ? "Proceed to Pay"
                  : "Submit enquiry"}
            </button>
          </div>
        )}

        {paymentLive && state.step === 3 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "SET_STEP", step: 2 })}
              className={CTA_NAV_SECONDARY_FLEX}
              data-ocid="booking_drawer.step3_back"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => void initiatePayment()}
              disabled={rzpLoading}
              className={ctaMerge(
                CTA_NAV_PRIMARY_GROW,
                "!bg-[var(--ew-red)] hover:!brightness-95 disabled:opacity-60",
              )}
              data-ocid="booking_drawer.pay_button"
            >
              {rzpLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="30 70"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                `Pay Now ₹${total.toLocaleString("en-IN")}`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110]"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel — portaled + full-width bottom sheet on phone */}
          <motion.div
            key="drawer"
            initial={mobileLayout ? { y: "100%" } : { x: "100%" }}
            animate={mobileLayout ? { y: 0 } : { x: 0 }}
            exit={mobileLayout ? { y: "100%" } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="booking-drawer fixed z-[120] overflow-hidden shadow-2xl max-md:inset-x-0 max-md:bottom-0 max-md:w-full max-md:max-w-[100vw] max-md:rounded-t-[20px] md:top-0 md:right-0 md:bottom-0 md:left-auto md:w-[480px] md:rounded-l-[20px]"
            style={{
              ...(mobileLayout
                ? {
                    maxHeight: "min(95vh, 100dvh)",
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                  }
                : {}),
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${trekName}`}
            data-ocid="booking_drawer.dialog"
          >
            {drawerContent}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
