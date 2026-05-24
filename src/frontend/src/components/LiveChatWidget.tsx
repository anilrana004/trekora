import LiveChatPanel from "@/components/LiveChatPanel";
import { usesTravelSideActionRail } from "@/lib/travel-side-rail";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

/** Legacy floating chat — hidden where TravelSideActionRail includes chat */
export default function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState().location.pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (usesTravelSideActionRail(pathname)) return null;

  return (
    <div
      className="fixed left-5 z-50 flex flex-col items-start gap-3 bottom-[calc(var(--mobile-nav-height,56px)+env(safe-area-inset-bottom,0px)+1rem)] md:bottom-[7.25rem]"
      aria-live="polite"
    >
      <LiveChatPanel open={open} onClose={() => setOpen(false)} placement="floating-left" />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="live-chat-fab w-14 h-14 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ew-red)]"
        style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
        aria-label={open ? "Close chat" : "Open chat with Priya"}
        aria-expanded={open}
        data-ocid="chat.open_modal_button"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
