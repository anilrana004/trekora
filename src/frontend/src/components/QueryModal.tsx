import PhoneInput from "@/components/ui/PhoneInput";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import {
  isNationalPhoneValid,
  normalizeIndianPhoneDigits,
  validateNationalPhone,
} from "@/lib/phone-countries";
import { buildPlanMyTrekPayload } from "@/lib/query-email-payloads";
import { WHATSAPP_CHAT_URL } from "@/lib/site-contact";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { Clock, Loader2, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

interface QueryFormValues {
  name: string;
  phone: string;
  phoneCountry: string;
  email: string;
  destination: string;
  message: string;
}

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_TREKS_OPTS = TREKS.map((t) => ({
  value: t.slug,
  label: t.name,
}));
const ALL_YATRA_OPTS = YATRAS.map((y) => ({
  value: y.slug,
  label: y.name,
}));

function destinationLabel(slug: string): string {
  if (!slug) return "Not specified";
  const trek = TREKS.find((t) => t.slug === slug);
  if (trek) return trek.name;
  const yatra = YATRAS.find((y) => y.slug === slug);
  if (yatra) return yatra.name;
  return slug;
}

export default function QueryModal({ isOpen, onClose }: QueryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<QueryFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      phoneCountry: "IN",
      email: "",
      destination: "",
      message: "",
    },
  });

  const watchedName = watch("name", "");
  const watchedPhone = watch("phone", "");
  const watchedPhoneCountry = watch("phoneCountry", "IN");
  const watchedEmail = watch("email", "");
  const isValid =
    watchedName.trim().length >= 2 &&
    isNationalPhoneValid(watchedPhone, watchedPhoneCountry) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail.trim());

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const onSubmit = (data: QueryFormValues) => {
    const phoneDigits =
      data.phoneCountry === "IN"
        ? normalizeIndianPhoneDigits(data.phone)
        : data.phone.replace(/\D/g, "");

    if (submitting) return;
    setSubmitting(true);
    submitEmailOptimistic(
      () =>
        submitPlanTrekEmail(
          buildPlanMyTrekPayload({
            name: data.name,
            email: data.email,
            phone: phoneDigits,
            phoneCountry: data.phoneCountry,
            destinationSlug: data.destination,
            destinationLabel: destinationLabel(data.destination),
            message: data.message,
          }),
        ),
      () => {
        setSubmitted(true);
        toast.success("Request sent! We'll contact you within 1 hour.");
      },
      (message) => {
        setSubmitted(false);
        toast.error(message);
      },
      () => {
        setSubmitting(false);
      },
    );
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 300);
  };

  const fieldError = (hasError: boolean) =>
    `plan-trek-modal__input ${hasError ? "plan-trek-modal__input--error" : ""}`;

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="plan-trek-modal__backdrop fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          onClick={handleClose}
          data-ocid="query.dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="plan-trek-modal__panel bg-white"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-trek-modal-title"
          >
            <div className="plan-trek-modal__header relative flex items-start justify-between gap-3">
              <div className="min-w-0 pr-2">
                <h2
                  id="plan-trek-modal-title"
                  className="text-white font-bold text-lg sm:text-xl leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Plan Your Trek with Trekora
                </h2>
                <p className="text-white/80 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
                  <Clock
                    size={14}
                    className="shrink-0 opacity-90"
                    aria-hidden
                  />
                  Our expert will contact you within 1 hour
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 flex items-center justify-center rounded-full shrink-0 transition-colors hover:bg-white/25"
                style={{ background: "rgba(255,255,255,0.18)" }}
                aria-label="Close modal"
                data-ocid="query.close_button"
              >
                <X size={18} color="#fff" strokeWidth={2.25} />
              </button>
            </div>

            <div className="plan-trek-modal__body">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                  data-ocid="query.success_state"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: "var(--ew-green)" }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Thank You! 🙏
                  </h3>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Your request has been received.
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--ew-green)" }}
                  >
                    Our expert will contact you within 1 hour.
                  </p>
                  <p
                    className="text-xs mt-3"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    Support hours: Mon–Sat, 9AM–9PM IST
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-secondary mt-6 min-h-[3rem] px-8"
                    data-ocid="query.success.close_button"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form
                  id="plan-trek-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  <div className="plan-trek-modal__field">
                    <label htmlFor="qm-name">
                      Full Name <span className="plan-trek-modal__req">*</span>
                    </label>
                    <input
                      id="qm-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      {...register("name", { required: "Name is required" })}
                      className={fieldError(Boolean(errors.name))}
                      data-ocid="query.name.input"
                    />
                    {errors.name && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.name.field_error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="plan-trek-modal__field">
                    <label htmlFor="qm-phone">
                      Mobile Number{" "}
                      <span className="plan-trek-modal__req">*</span>
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        validate: (v) =>
                          validateNationalPhone(v, watchedPhoneCountry),
                      }}
                      render={({ field }) => (
                        <PhoneInput
                          id="qm-phone"
                          value={field.value}
                          countryIso={watchedPhoneCountry}
                          onValueChange={field.onChange}
                          onCountryChange={(meta) => {
                            setValue("phoneCountry", meta.iso, {
                              shouldValidate: true,
                            });
                          }}
                          hasError={Boolean(errors.phone)}
                          data-ocid="query.phone.input"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.phone.field_error"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="plan-trek-modal__field">
                    <label htmlFor="qm-email">
                      Email Address{" "}
                      <span className="plan-trek-modal__req">*</span>
                    </label>
                    <input
                      id="qm-email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={fieldError(Boolean(errors.email))}
                      data-ocid="query.email.input"
                    />
                    {errors.email && (
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.email.field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="plan-trek-modal__field">
                    <label htmlFor="qm-destination">Select Destination</label>
                    <select
                      id="qm-destination"
                      {...register("destination")}
                      className={fieldError(false)}
                      style={{ background: "#fff" }}
                      data-ocid="query.destination.select"
                    >
                      <option value="">— Choose a Trek or Yatra —</option>
                      <optgroup label="── Treks ──">
                        {ALL_TREKS_OPTS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="── Yatras ──">
                        {ALL_YATRA_OPTS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="plan-trek-modal__field">
                    <label htmlFor="qm-message">
                      Message / Special Requirements
                    </label>
                    <textarea
                      id="qm-message"
                      rows={3}
                      placeholder="Tell us about your travel plans, preferred dates, group size..."
                      {...register("message")}
                      className={`${fieldError(false)} plan-trek-modal__textarea`}
                      data-ocid="query.message.textarea"
                    />
                  </div>
                </form>
              )}
            </div>

            {!submitted && (
              <div className="plan-trek-modal__footer">
                <button
                  type="submit"
                  form="plan-trek-form"
                  disabled={!isValid || submitting}
                  className="plan-trek-modal__submit btn-primary justify-center inline-flex items-center gap-2"
                  style={{
                    opacity: isValid && !submitting ? 1 : 0.55,
                    cursor: isValid && !submitting ? "pointer" : "not-allowed",
                  }}
                  data-ocid="query.submit_button"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
                <p className="plan-trek-modal__trust">
                  <ShieldCheck
                    size={14}
                    style={{ color: "var(--ew-green)" }}
                    aria-hidden
                  />
                  Your details are shared only with Trekora. No spam.
                </p>
                <p
                  className="text-center text-xs mt-2"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Or{" "}
                  <a
                    href={WHATSAPP_CHAT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#25D366",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    chat directly on WhatsApp
                  </a>{" "}
                  for instant reply
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
