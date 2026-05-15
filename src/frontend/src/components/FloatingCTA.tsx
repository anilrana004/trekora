import { Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FloatingCTAProps {
  onOpenModal: () => void;
}

export default function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSent, setCallbackSent] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("ew-cookie-accepted");
    if (accepted) setCookieAccepted(true);
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem("ew-cookie-accepted", "true");
    setCookieAccepted(true);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
    setTimeout(() => {
      setCallbackOpen(false);
      setCallbackSent(false);
      setCallbackPhone("");
    }, 2500);
  };

  return (
    <>
      {/* Bottom-right: Plan My Trek (WhatsApp lives in WhatsAppButton, bottom-left stack) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 items-end">
        <motion.button
          type="button"
          onClick={onOpenModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Plan my trek"
          className="shadow-elevated inline-flex items-center gap-1.5 text-white font-semibold text-[0.9375rem] px-7 py-2.5 rounded-full border-none cursor-pointer transition-[filter] hover:brightness-95"
          style={{ backgroundColor: "var(--ew-red)" }}
          data-ocid="floating.plan_trek_button"
        >
          ✦ Plan My Trek
        </motion.button>
      </div>

      {/* Bottom-left: Callback widget */}
      <div className="fixed bottom-6 left-5 z-40 flex flex-col gap-2 items-start">
        <AnimatePresence>
          {callbackOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-deep p-4 w-64"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
              data-ocid="floating.callback_panel"
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--ew-text)" }}
                >
                  Request Callback
                </p>
                <button
                  type="button"
                  onClick={() => setCallbackOpen(false)}
                  aria-label="Close"
                  data-ocid="floating.callback_close_button"
                >
                  <X size={15} style={{ color: "var(--ew-gray-dark)" }} />
                </button>
              </div>
              {callbackSent ? (
                <div className="text-center py-2">
                  <div className="text-3xl mb-1">✅</div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--ew-green)" }}
                  >
                    We'll call you shortly!
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Within 1 hour (9AM–9PM)
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-2">
                  <input
                    type="tel"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                    style={{
                      borderColor: "var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                    }}
                    data-ocid="floating.callback_phone.input"
                  />
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-sm py-2"
                    data-ocid="floating.callback_submit_button"
                  >
                    Call Me Back
                  </button>
                  <p
                    className="text-[11px] text-center"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    We'll call within 1 hour (9AM–9PM)
                  </p>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

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
              🍪 We use cookies to enhance your experience on EternaWings. By
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
