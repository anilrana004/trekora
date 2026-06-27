import CallbackRequestPanel from "@/components/CallbackRequestPanel";
import CookieConsentBar from "@/components/CookieConsentBar";
import { usesTravelSideActionRail } from "@/lib/travel-side-rail";
import { useRouterState } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { motion } from "@/lib/motion";
import { useState } from "react";

interface FloatingCTAProps {
  onOpenModal: () => void;
}

function isBookingPath(pathname: string): boolean {
  return pathname === "/book" || pathname.startsWith("/book/");
}

export default function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const pathname = useRouterState().location.pathname;
  const onDetailPage = usesTravelSideActionRail(pathname);
  const onBookingPage = isBookingPath(pathname);
  const [callbackOpen, setCallbackOpen] = useState(false);

  if (onDetailPage) {
    return <CookieConsentBar showDelayMs={600} />;
  }

  return (
    <>
      {!onBookingPage && (
        <>
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

          <div className="floating-cta-callback fixed z-40 flex flex-col gap-2 items-start left-[max(1rem,env(safe-area-inset-left))] bottom-6 left-5">
            <CallbackRequestPanel
              open={callbackOpen}
              onClose={() => setCallbackOpen(false)}
              placement="floating-left"
              source="Floating callback"
            />

            <motion.button
              type="button"
              onClick={() => setCallbackOpen((p) => !p)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-elevated min-h-[44px]"
              style={{ background: "var(--ew-red)" }}
              aria-label="Request a callback"
              data-ocid="floating.callback_button"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Callback</span>
            </motion.button>
          </div>
        </>
      )}

      <CookieConsentBar showDelayMs={onBookingPage ? 0 : 800} />
    </>
  );
}
