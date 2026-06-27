import PhoneInput from "@/components/ui/PhoneInput";

import { parseIndianMobileInput } from "@/lib/phone-countries";

import { submitEmailOptimistic } from "@/lib/optimistic-email";

import { submitCallbackEmail } from "@/services/callback-email-api";

import { X } from "lucide-react";

import { AnimatePresence, motion } from "@/lib/motion";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { toast } from "sonner";

export interface CallbackRequestPanelProps {
  open: boolean;

  onClose: () => void;

  /** `inline-right` = side rail; `modal` = centered overlay (hero / page CTAs). */

  placement?: "floating-left" | "inline-right" | "modal";

  className?: string;

  /** Shown in admin email (e.g. side rail, floating CTA). */

  source?: string;
}

function CallbackPanelBody({
  open,

  onClose,

  sent,

  phone,

  setPhone,

  phoneCountry,

  setPhoneCountry,

  onSubmit,
}: {
  open: boolean;

  onClose: () => void;

  sent: boolean;

  phone: string;

  setPhone: (v: string) => void;

  phoneCountry: string;

  setPhoneCountry: (v: string) => void;

  onSubmit: (e: React.FormEvent) => void;
}) {
  if (!open) return null;

  return (
    <>
      <div className="callback-panel__header">
        <p className="callback-panel__title">Request Callback</p>

        <button
          type="button"
          onClick={onClose}
          className="callback-panel__close"
          aria-label="Close"
          data-ocid="callback.close_button"
        >
          <X size={15} style={{ color: "var(--ew-gray-dark)" }} />
        </button>
      </div>

      {sent ? (
        <div className="callback-panel__success">
          <div className="callback-panel__success-icon" aria-hidden>
            ✅
          </div>

          <p className="callback-panel__success-title">
            We&apos;ll call you shortly!
          </p>

          <p className="callback-panel__success-sub">Within 1 hour (9AM–9PM)</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="callback-panel__form">
          <label
            htmlFor="callback-phone-rail"
            className="callback-panel__label"
          >
            Mobile Number
          </label>

          <PhoneInput
            id="callback-phone-rail"
            value={phone}
            countryIso={phoneCountry}
            onValueChange={setPhone}
            onCountryChange={(meta) => setPhoneCountry(meta.iso)}
            placeholder="Enter Your Mobile Number"
            data-ocid="callback.phone.input"
          />

          <button
            type="submit"
            className="btn-primary callback-panel__submit"
            data-ocid="callback.submit_button"
          >
            Call Me Back
          </button>

          <p className="callback-panel__hint">
            We&apos;ll call within 1 hour (9AM–9PM)
          </p>
        </form>
      )}
    </>
  );
}

export default function CallbackRequestPanel({
  open,

  onClose,

  placement = "inline-right",

  className = "",

  source = "Callback widget",
}: CallbackRequestPanelProps) {
  const [phone, setPhone] = useState("");

  const [phoneCountry, setPhoneCountry] = useState("IN");

  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setSent(false);

        setPhone("");
      }, 280);

      return () => window.clearTimeout(t);
    }

    if (placement === "modal") {
      const prev = document.body.style.overflow;

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open, placement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const digits = parseIndianMobileInput(phone);

    if (!digits) {
      toast.error("Enter a valid 10-digit mobile number.");

      return;
    }

    submitEmailOptimistic(
      () => submitCallbackEmail({ phone: digits, source }),

      () => {
        setSent(true);

        window.setTimeout(() => {
          onClose();

          setSent(false);

          setPhone("");
        }, 2200);
      },

      (message) => {
        setSent(false);

        toast.error(message);
      },
    );
  };

  const body = (
    <CallbackPanelBody
      open={open}
      onClose={onClose}
      sent={sent}
      phone={phone}
      setPhone={setPhone}
      phoneCountry={phoneCountry}
      setPhoneCountry={setPhoneCountry}
      onSubmit={handleSubmit}
    />
  );

  if (placement === "modal") {
    if (typeof document === "undefined") return null;

    return createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="callback-modal-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="callback-modal"
            onClick={onClose}
            data-ocid="callback.modal_backdrop"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className={`callback-modal__dialog callback-panel ${className}`}
              role="dialog"
              aria-modal="true"
              aria-label="Request a callback"
              data-ocid="callback.panel"
              onClick={(e) => e.stopPropagation()}
            >
              {body}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,

      document.body,
    );
  }

  const placementClass =
    placement === "inline-right"
      ? "callback-panel--inline-right"
      : "callback-panel--floating-left";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 8 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className={`callback-panel ${placementClass} ${className}`.trim()}
          role="dialog"
          aria-label="Request a callback"
          data-ocid="callback.panel"
        >
          {body}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
