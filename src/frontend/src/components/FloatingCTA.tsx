import { Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FloatingCTAProps {
  onOpenModal: () => void;
}

const WA_ICON = (
  <svg
    width="22"
    height="22"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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
      {/* Bottom-right: WhatsApp + Plan My Trek */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3 items-end">
        {/* WhatsApp bubble */}
        <motion.a
          href="https://wa.me/919876543210?text=Hi%20EternaWings%2C%20I%27d%20like%20to%20plan%20a%20trek"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-13 h-13 flex items-center justify-center rounded-full text-white shadow-elevated"
          style={{ background: "#25D366", width: 52, height: 52 }}
          aria-label="Chat with EternaWings on WhatsApp"
          data-ocid="floating.whatsapp_button"
        >
          {WA_ICON}
        </motion.a>

        {/* Plan My Trek pill */}
        <motion.button
          type="button"
          onClick={onOpenModal}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Plan my trek"
          className="btn-primary shadow-elevated"
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
