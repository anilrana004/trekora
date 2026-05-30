import PhoneInput from "@/components/ui/PhoneInput";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import {
  normalizeIndianPhoneDigits,
  validateNationalPhone,
} from "@/lib/phone-countries";
import { buildEnquiryModalPayload } from "@/lib/query-email-payloads";
import { WHATSAPP_CHAT_URL } from "@/lib/site-contact";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const INTERESTED_OPTIONS = [
  "Select a trek or yatra",
  "Kedarnath Trek",
  "Valley of Flowers",
  "Har Ki Dun",
  "Roopkund Trek",
  "Char Dham Yatra",
  "Kedarnath Yatra",
  "Badrinath Yatra",
  "Other / Not sure yet",
] as const;

const GROUP_SIZES = [
  "1 person",
  "2 persons",
  "3-5 persons",
  "6-10 persons",
  "10+ persons",
] as const;

export type EnquiryFormValues = {
  name: string;
  phone: string;
  email: string;
  interested: string;
  preferred_date: string;
  group_size: string;
  message: string;
};

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTrekLabel?: string;
}

function matchInterestedOption(trekName?: string): string {
  if (!trekName) return INTERESTED_OPTIONS[0];
  const exact = INTERESTED_OPTIONS.find((o) => o === trekName);
  if (exact) return exact;
  const partial = INTERESTED_OPTIONS.find(
    (o) =>
      o !== INTERESTED_OPTIONS[0] &&
      (trekName.includes(o) || o.includes(trekName)),
  );
  return partial ?? INTERESTED_OPTIONS[0];
}

export default function EnquiryModal({
  isOpen,
  onClose,
  presetTrekLabel,
}: EnquiryModalProps) {
  const [phoneCountry, setPhoneCountry] = useState("IN");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interested: INTERESTED_OPTIONS[0],
      preferred_date: "",
      group_size: GROUP_SIZES[0],
      message: "",
    },
  });

  const [phase, setPhase] = useState<"form" | "success" | "error">("form");
  const [successPhone, setSuccessPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setPhase("form");
      reset({
        name: "",
        phone: "",
        email: "",
        interested: matchInterestedOption(presetTrekLabel),
        preferred_date: "",
        group_size: GROUP_SIZES[0],
        message: "",
      });
    }
  }, [isOpen, presetTrekLabel, reset]);

  const onValid = (data: EnquiryFormValues) => {
    const email = data.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (submitting) return;

    const phoneDigits =
      phoneCountry === "IN"
        ? normalizeIndianPhoneDigits(data.phone)
        : data.phone.replace(/\D/g, "");

    setSubmitting(true);
    submitEmailOptimistic(
      () =>
        submitPlanTrekEmail(
          buildEnquiryModalPayload({
            name: data.name,
            email,
            phone: phoneDigits,
            phoneCountry,
            interested: data.interested,
            preferredDate: data.preferred_date,
            groupSize: data.group_size,
            message: data.message,
          }),
        ),
      () => {
        setSuccessPhone(data.phone);
        setPhase("success");
        toast.success("Enquiry sent! We'll call you within 2 hours.");
      },
      (message) => {
        setPhase("error");
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
      setPhase("form");
      setSuccessPhone("");
    }, 200);
  };

  const inputCls =
    "w-full rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-white/60 focus:outline-none";

  const labelCls = "mb-1 block text-sm text-white/90";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={handleClose}
          data-ocid="enquiry.modal.backdrop"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative mx-4 w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl"
            style={{ background: "var(--ew-footer)" }}
            onClick={(e) => e.stopPropagation()}
            data-ocid="enquiry.modal.panel"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 text-white/70 transition hover:text-white"
              aria-label="Close"
              data-ocid="enquiry.modal.close"
            >
              <X size={22} />
            </button>

            {phase === "success" ? (
              <div className="pt-2 text-center text-white">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <title>Success</title>
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  id="enquiry-modal-title"
                  className="text-xl font-bold text-white"
                >
                  We&apos;ll call you within 2 hours!
                </h2>
                <p className="mt-3 text-sm text-white/75">
                  Our team will reach out to {successPhone} to confirm your trek
                  details.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary mt-6 px-8 py-2.5"
                  data-ocid="enquiry.modal.success_close"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2
                  id="enquiry-modal-title"
                  className="pr-10 text-xl font-bold text-white"
                >
                  Plan your Himalayan adventure
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Fill in your details — we&apos;ll get back shortly.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit(onValid)}
                  noValidate
                >
                  <div>
                    <label htmlFor="eq-name" className={labelCls}>
                      Full Name{" "}
                      <span className="text-red-400" aria-hidden>
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <input
                      id="eq-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className={inputCls}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">Required</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="eq-phone" className={labelCls}>
                      Mobile Number{" "}
                      <span className="text-red-400" aria-hidden>
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Required",
                        validate: (v) => validateNationalPhone(v, phoneCountry),
                      }}
                      render={({ field }) => (
                        <PhoneInput
                          id="eq-phone"
                          value={field.value}
                          countryIso={phoneCountry}
                          onValueChange={field.onChange}
                          onCountryChange={(meta) => setPhoneCountry(meta.iso)}
                          hasError={Boolean(errors.phone)}
                          placeholder="Enter Your Mobile Number"
                          data-ocid="enquiry.phone.input"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.phone.message || "Required"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="eq-email" className={labelCls}>
                      Email Address{" "}
                      <span className="text-red-400" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="eq-email"
                      type="email"
                      autoComplete="email"
                      placeholder="your@email.com"
                      className={inputCls}
                      {...register("email", {
                        required: "Required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email.message || "Required"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="eq-interested" className={labelCls}>
                      Interested In{" "}
                      <span className="text-red-400" aria-hidden>
                        *
                      </span>
                      <span className="sr-only">(required)</span>
                    </label>
                    <select
                      id="eq-interested"
                      className={inputCls}
                      {...register("interested", {
                        validate: (v) =>
                          v !== INTERESTED_OPTIONS[0] || "Please select",
                      })}
                    >
                      {INTERESTED_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {errors.interested && (
                      <p className="mt-1 text-xs text-red-400">
                        Please select an option
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="eq-date" className={labelCls}>
                      Preferred Date
                    </label>
                    <input
                      id="eq-date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className={inputCls}
                      {...register("preferred_date")}
                    />
                  </div>

                  <div>
                    <label htmlFor="eq-group" className={labelCls}>
                      Group Size
                    </label>
                    <select
                      id="eq-group"
                      className={inputCls}
                      {...register("group_size")}
                    >
                      {GROUP_SIZES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="eq-msg" className={labelCls}>
                      Message
                    </label>
                    <textarea
                      id="eq-msg"
                      rows={3}
                      placeholder="Any specific requirements, fitness concerns, or questions..."
                      className={`${inputCls} min-h-[96px] resize-y`}
                      {...register("message")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex w-full items-center justify-center gap-2 py-3 disabled:opacity-70"
                    data-ocid="enquiry.modal.submit"
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
                      "Submit enquiry"
                    )}
                  </button>

                  {phase === "error" && (
                    <p className="text-center text-sm text-red-400">
                      Something went wrong. Please{" "}
                      <a
                        href={WHATSAPP_CHAT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        WhatsApp us directly
                      </a>
                      .
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
