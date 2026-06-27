import FormSuccessMessage from "@/components/FormSuccessMessage";
import PhoneInput from "@/components/ui/PhoneInput";
import { TREKS } from "@/data/treks";
import { YATRAS } from "@/data/yatras";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import {
  formatPhoneForDisplay,
  normalizeIndianPhoneDigits,
  validateNationalPhone,
} from "@/lib/phone-countries";
import { buildSendQueryPayload } from "@/lib/query-email-payloads";
import { SITE_PHONE_DISPLAY } from "@/lib/site-contact";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "../hooks/use-mobile";

function resolveProductSlug(productName?: string): string | undefined {
  if (!productName) return undefined;
  const trek = TREKS.find((t) => t.name === productName);
  if (trek) return trek.slug;
  const yatra = YATRAS.find((y) => y.name === productName);
  return yatra?.slug;
}

export interface QueryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  trekName?: string;
}

interface FormState {
  name: string;
  phone: string;
  phoneCountry: string;
  email: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  phone: "",
  phoneCountry: "IN",
  email: "",
  message: "",
};

export default function QueryBottomSheet({
  isOpen,
  onClose,
  trekName,
}: QueryBottomSheetProps) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successSnapshot, setSuccessSnapshot] = useState<{
    phone: string;
  } | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Reset on close */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(INITIAL);
        setErrors({});
        setSubmitted(false);
        setSuccessSnapshot(null);
      }, 300);
    }
  }, [isOpen]);

  function validate() {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    const phoneCheck = validateNationalPhone(form.phone, form.phoneCountry);
    if (phoneCheck !== true) errs.phone = phoneCheck;
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Enter valid email";
    if (!form.message.trim()) errs.message = "Please write a message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    if (submitting) return;

    const phone =
      form.phoneCountry === "IN"
        ? normalizeIndianPhoneDigits(form.phone)
        : form.phone.replace(/\D/g, "");

    setSubmitting(true);
    submitEmailOptimistic(
      () =>
        submitPlanTrekEmail(
          buildSendQueryPayload({
            name: form.name,
            email: form.email,
            phone,
            phoneCountry: form.phoneCountry,
            destinationSlug: resolveProductSlug(trekName),
            destinationLabel: trekName ?? "General enquiry",
            message: form.message,
            productName: trekName,
          }),
        ),
      () => {
        setSuccessSnapshot({
          phone: formatPhoneForDisplay(phone, form.phoneCountry),
        });
        setSubmitted(true);
        toast.success("Query sent! We'll contact you within 1 hour.");
        window.setTimeout(onClose, 2200);
      },
      (message) => {
        setSubmitted(false);
        setSuccessSnapshot(null);
        toast.error(message);
      },
      () => {
        setSubmitting(false);
      },
    );
  }

  function setField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  const sheetHeight = isMobile ? "85vh" : "60vh";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qs-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110]"
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            key="qs-sheet"
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-[120] bg-white overflow-hidden flex flex-col"
            style={{
              borderRadius: "20px 20px 0 0",
              maxHeight: sheetHeight,
              boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
            }}
            role="dialog"
            data-ocid="query_sheet.dialog"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div
                className="rounded-full"
                style={{
                  width: 36,
                  height: 4,
                  backgroundColor: "var(--ew-gray-mid)",
                }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 pb-3 pt-1 flex-shrink-0 border-b"
              style={{ borderColor: "var(--ew-gray-mid)" }}
            >
              <div>
                <h3
                  className="font-bold text-base"
                  style={{ color: "var(--ew-text)" }}
                >
                  {trekName ? `Ask Us About ${trekName}` : "Send a Query"}
                </h3>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  We'll respond within 1 hour · {SITE_PHONE_DISPLAY}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close query sheet"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: "var(--ew-gray-lt)",
                  color: "var(--ew-text)",
                }}
                data-ocid="query_sheet.close_button"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {submitted ? (
                <FormSuccessMessage
                  title="Query sent!"
                  description={
                    successSnapshot
                      ? `Our trek expert will call you at ${successSnapshot.phone} within 1 hour (9AM–9PM).`
                      : "Our trek expert will contact you within 1 hour (9AM–9PM)."
                  }
                  data-ocid="query_sheet.success_state"
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                  data-ocid="query_sheet.form"
                >
                  {/* Hidden trek name */}
                  <input type="hidden" name="trek" value={trekName ?? ""} />

                  {/* Name + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="qs-name"
                        className="block text-xs font-semibold mb-1"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="qs-name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
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
                        data-ocid="query_sheet.name_input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--ew-red)" }}
                          data-ocid="query_sheet.name_field_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="qs-phone"
                        className="block text-xs font-semibold mb-1"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Mobile Number *
                      </label>
                      <PhoneInput
                        id="qs-phone"
                        value={form.phone}
                        countryIso={form.phoneCountry}
                        onValueChange={(v) => setField("phone", v)}
                        onCountryChange={(meta) =>
                          setField("phoneCountry", meta.iso)
                        }
                        hasError={Boolean(errors.phone)}
                        placeholder="Enter Your Mobile Number"
                        data-ocid="query_sheet.phone_input"
                      />
                      {errors.phone && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--ew-red)" }}
                          data-ocid="query_sheet.phone_field_error"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="qs-email"
                      className="block text-xs font-semibold mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Email *
                    </label>
                    <input
                      id="qs-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
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
                      data-ocid="query_sheet.email_input"
                    />
                    {errors.email && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query_sheet.email_field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="qs-message"
                      className="block text-xs font-semibold mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="qs-message"
                      placeholder={
                        trekName
                          ? `I'd like to know more about ${trekName}...`
                          : "Type your question or requirement..."
                      }
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      onFocus={(e) =>
                        e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        })
                      }
                      rows={3}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                      style={{
                        border: `1px solid ${errors.message ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                        color: "var(--ew-text)",
                      }}
                      data-ocid="query_sheet.message_textarea"
                    />
                    {errors.message && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query_sheet.message_field_error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90 inline-flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{ height: 48, backgroundColor: "var(--ew-orange)" }}
                    data-ocid="query_sheet.submit_button"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                          aria-hidden
                        />
                        Sending…
                      </>
                    ) : (
                      "Send Query 🏔️"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
