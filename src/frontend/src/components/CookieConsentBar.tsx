import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ew-cookie-accepted";

export function readCookieAccepted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function acceptCookies(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* private mode */
  }
}

type CookieConsentBarProps = {
  /** Delay before slide-in (ms). Use 0 on booking for faster dismiss. */
  showDelayMs?: number;
};

export default function CookieConsentBar({
  showDelayMs = 800,
}: CookieConsentBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readCookieAccepted()) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.classList.add("cookie-consent-visible");
      return () => document.body.classList.remove("cookie-consent-visible");
    }
    document.body.classList.remove("cookie-consent-visible");
  }, [visible]);

  const dismiss = () => {
    acceptCookies();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.28, delay: showDelayMs / 1000 }}
          className="cookie-consent-bar fixed left-0 right-0 z-[70] px-4 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          style={{
            bottom: 0,
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
            background: "var(--ew-gray-lt)",
            borderTop: "1px solid var(--ew-gray-mid)",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
          }}
          data-ocid="cookie.bar"
        >
          <p
            className="text-sm text-center sm:text-left m-0 flex-1"
            style={{ color: "var(--ew-text-lt)" }}
          >
            We use essential cookies to run Trekora and improve your experience.
            By continuing, you agree to our{" "}
            <a
              href="/privacy-policy"
              className="underline font-medium"
              style={{ color: "var(--ew-red)" }}
            >
              Privacy Policy
            </a>
            .
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Accept cookies"
            className="btn-primary text-sm shrink-0 min-h-[48px] px-6 w-full sm:w-auto"
            data-ocid="cookie.accept_button"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
