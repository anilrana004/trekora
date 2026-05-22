import CallbackRequestPanel from "@/components/CallbackRequestPanel";
import { usesTravelSideActionRail } from "@/lib/travel-side-rail";
import { useRouterState } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FloatingCTAProps {
  onOpenModal: () => void;
}

export default function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const pathname = useRouterState().location.pathname;
  const onDetailPage = usesTravelSideActionRail(pathname);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ew-cookie-accepted");
    if (accepted) setCookieAccepted(true);
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem("ew-cookie-accepted", "true");
    setCookieAccepted(true);
  };

  if (onDetailPage) {
    return (
      <AnimatePresence>
        {!cookieAccepted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, delay: 1.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              background: "var(--ew-gray-lt)",
              borderTop: "1px solid var(--ew-gray-mid)",
            }}
            data-ocid="cookie.bar"
          >
            <p
              className="text-sm text-center sm:text-left"
              style={{ color: "var(--ew-text-lt)" }}
            >
              🍪 We use cookies to enhance your experience on Trekora. By
              continuing, you agree to our{" "}
              <a href="/contact" style={{ color: "var(--ew-red)" }}>
                Cookie Policy
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleAcceptCookie}
              aria-label="Accept cookies"
              className="btn-primary text-sm shrink-0"
              data-ocid="cookie.accept_button"
            >
              Accept All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
      {/* Bottom-right: Plan My Trek */}
      <div className="floating-cta-tray fixed right-5 z-40">
        <motion.button
          type="button"
          onClick={onOpenModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Plan my trek"
          className="shadow-elevated inline-flex shrink-0 items-center gap-1.5 text-white font-semibold text-[0.9375rem] px-7 py-2.5 rounded-full border-none cursor-pointer transition-[filter] hover:brightness-95 max-lg:px-5 max-lg:text-sm"
          style={{ backgroundColor: "var(--ew-red)" }}
          data-ocid="floating.plan_trek_button"
        >
          ✦ Plan My Trek
        </motion.button>
      </div>

      {/* Bottom-left: Callback widget */}
      <div
        className={`floating-cta-callback fixed z-40 flex flex-col gap-2 items-start left-[max(1rem,env(safe-area-inset-left))] ${onDetailPage ? "max-lg:fab-left-stack-1" : "bottom-6 left-5"}`}
      >
        <CallbackRequestPanel
          open={callbackOpen}
          onClose={() => setCallbackOpen(false)}
          placement="floating-left"
          source="Floating callback"
        />

        {/* Phone icon trigger */}
        <motion.button
          type="button"
          onClick={() => setCallbackOpen((p) => !p)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-elevated"
          style={{ background: "var(--ew-red)" }}
          aria-label="Request a callback"
          data-ocid="floating.callback_button"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">Callback</span>
        </motion.button>
      </div>

      {/* Cookie Consent Bar */}
      <AnimatePresence>
        {!cookieAccepted && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, delay: 1.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              background: "var(--ew-gray-lt)",
              borderTop: "1px solid var(--ew-gray-mid)",
            }}
            data-ocid="cookie.bar"
          >
            <p
              className="text-sm text-center sm:text-left"
              style={{ color: "var(--ew-text-lt)" }}
            >
              🍪 We use cookies to enhance your experience on Trekora. By
              continuing, you agree to our{" "}
              <a href="/contact" style={{ color: "var(--ew-red)" }}>
                Cookie Policy
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleAcceptCookie}
              aria-label="Accept cookies"
              className="btn-primary text-sm shrink-0"
              data-ocid="cookie.accept_button"
            >
              Accept All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
