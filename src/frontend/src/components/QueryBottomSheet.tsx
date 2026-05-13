import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "../hooks/use-mobile";

export interface QueryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  trekName?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const INITIAL: FormState = { name: "", phone: "", email: "", message: "" };

export default function QueryBottomSheet({
  isOpen,
  onClose,
  trekName,
}: QueryBottomSheetProps) {
  const isMobile = useIsMobile();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
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
      }, 300);
    }
  }, [isOpen]);

  function validate() {
    const errs: Partial<FormState> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Enter valid 10-digit mobile";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Enter valid email";
    if (!form.message.trim()) errs.message = "Please write a message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // Optimistic UI
    setSubmitted(true);
    // Log data (no backend in this SPA)
    console.log("[EternaWings] Query submitted:", {
      trek: trekName,
      ...form,
      timestamp: new Date().toISOString(),
    });
    toast.success("Query sent! We'll contact you within 1 hour. 🏔️");
    setTimeout(onClose, 1800);
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
            // biome-ignore lint/a11y/useSemanticElements: motion.div cannot be changed to dialog element
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
                  We'll respond within 1 hour · Toll-free: 1800-XXX-XXXX
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                  data-ocid="query_sheet.success_state"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
                    style={{ backgroundColor: "#E8F5E9" }}
                  >
                    ✅
                  </div>
                  <h4
                    className="font-bold text-lg mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Query Sent!
                  </h4>
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    Our trek expert will contact you at {form.phone} within 1
                    hour.
                  </p>
                </motion.div>
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
                        Mobile *
                      </label>
                      <input
                        id="qs-phone"
                        type="tel"
                        placeholder="10-digit number"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        onFocus={(e) =>
                          e.currentTarget.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                          })
                        }
                        className="w-full rounded-xl px-4 text-sm focus:outline-none"
                        style={{
                          height: 48,
                          border: `1px solid ${errors.phone ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)",
                        }}
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
                    className="w-full rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                    style={{ height: 48, backgroundColor: "var(--ew-orange)" }}
                    data-ocid="query_sheet.submit_button"
                  >
                    Send Query 🏔️
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
