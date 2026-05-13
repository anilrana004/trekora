import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

interface QueryFormValues {
  name: string;
  phone: string;
  email: string;
  destination: string;
  message: string;
}

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// All destinations combined for the dropdown
const ALL_TREKS_OPTS = TREKS.map((t) => ({
  value: t.slug,
  label: t.name,
  group: "Treks",
}));
const ALL_YATRA_OPTS = YATRAS.map((y) => ({
  value: y.slug,
  label: y.name,
  group: "Yatras",
}));

export default function QueryModal({ isOpen, onClose }: QueryModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QueryFormValues>();

  const watchedName = watch("name", "");
  const watchedPhone = watch("phone", "");
  const watchedEmail = watch("email", "");
  const isValid =
    (watchedName?.length ?? 0) >= 2 &&
    /^\d{10}$/.test(watchedPhone ?? "") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail ?? "");

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

  const onSubmit = (_data: QueryFormValues) => {
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 300);
  };

  const inputCls =
    "w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors focus:ring-2";
  const inputStyle = {
    borderColor: "var(--ew-gray-mid)",
    color: "var(--ew-text)",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={handleClose}
          data-ocid="query.dialog"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden shadow-deep"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="relative px-6 py-5 flex items-center justify-between"
              style={{ background: "var(--ew-red)" }}
            >
              <div>
                <h2
                  className="text-white font-bold text-lg leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Plan Your Trek with Trekora
                </h2>
                <p className="text-white/75 text-xs mt-0.5">
                  Our expert will contact you within 1 hour
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors shrink-0"
                style={{ background: "rgba(255,255,255,0.18)" }}
                aria-label="Close modal"
                data-ocid="query.close_button"
              >
                <X size={16} color="#fff" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
              {submitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
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
                      aria-hidden="true"
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
                    className="btn-secondary mt-6"
                    data-ocid="query.success.close_button"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="qm-name"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Full Name{" "}
                      <span style={{ color: "var(--ew-red)" }}>*</span>
                    </label>
                    <input
                      id="qm-name"
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name", { required: "Name is required" })}
                      className={inputCls}
                      style={{
                        ...inputStyle,
                        borderColor: errors.name
                          ? "var(--ew-red)"
                          : "var(--ew-gray-mid)",
                      }}
                      data-ocid="query.name.input"
                    />
                    {errors.name && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.name.field_error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="qm-phone"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Mobile Number{" "}
                      <span style={{ color: "var(--ew-red)" }}>*</span>
                    </label>
                    <input
                      id="qm-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      {...register("phone", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Enter valid 10-digit mobile number",
                        },
                      })}
                      className={inputCls}
                      style={{
                        ...inputStyle,
                        borderColor: errors.phone
                          ? "var(--ew-red)"
                          : "var(--ew-gray-mid)",
                      }}
                      data-ocid="query.phone.input"
                    />
                    {errors.phone && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.phone.field_error"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="qm-email"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Email Address{" "}
                      <span style={{ color: "var(--ew-red)" }}>*</span>
                    </label>
                    <input
                      id="qm-email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className={inputCls}
                      style={{
                        ...inputStyle,
                        borderColor: errors.email
                          ? "var(--ew-red)"
                          : "var(--ew-gray-mid)",
                      }}
                      data-ocid="query.email.input"
                    />
                    {errors.email && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="query.email.field_error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Select Destination */}
                  <div>
                    <label
                      htmlFor="qm-destination"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Select Destination
                    </label>
                    <select
                      id="qm-destination"
                      {...register("destination")}
                      className={inputCls}
                      style={{ ...inputStyle, background: "#fff" }}
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

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="qm-message"
                      className="block text-sm font-medium mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Message / Special Requirements
                    </label>
                    <textarea
                      id="qm-message"
                      rows={3}
                      placeholder="Tell us about your travel plans, preferred dates, group size..."
                      {...register("message")}
                      className={inputCls}
                      style={{ ...inputStyle, resize: "none" }}
                      data-ocid="query.message.textarea"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="btn-primary w-full justify-center text-base py-3"
                    style={{
                      borderRadius: 10,
                      opacity: isValid ? 1 : 0.55,
                      cursor: isValid ? "pointer" : "not-allowed",
                    }}
                    data-ocid="query.submit_button"
                  >
                    {isSubmitting ? "Sending..." : "Submit Request"}
                  </button>

                  {/* WhatsApp alternative */}
                  <p
                    className="text-center text-xs"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    Or{" "}
                    <a
                      href="https://wa.me/919876543210?text=Hi%20Trekora%2C%20I%27d%20like%20to%20plan%20a%20trek"
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
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
