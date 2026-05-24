import LiveChatPanel from "@/components/LiveChatPanel";
import { useTravelSideRailMobile } from "@/lib/travel-side-rail";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface TravelSideChatButtonProps {
  /** True when over a hero/image block — panel uses fixed positioning on small screens */
  floatingOverImage?: boolean;
}

/** Red circular chat FAB — stacks above WhatsApp on the left travel rail (no ping/glow) */
export default function TravelSideChatButton({
  floatingOverImage = false,
}: TravelSideChatButtonProps) {
  const [open, setOpen] = useState(false);
  const railMobile = useTravelSideRailMobile();

  const panelPlacement = railMobile
    ? "modal"
    : floatingOverImage
      ? "floating-left"
      : "inline-right";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={`travel-side-chat-wrap relative pointer-events-auto ${floatingOverImage ? "travel-side-chat-wrap--over-image" : ""}`}
    >
      <LiveChatPanel
        open={open}
        onClose={() => setOpen(false)}
        placement={panelPlacement}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="travel-side-chat-btn relative"
        aria-label={open ? "Close chat" : "Open chat with Priya"}
        aria-expanded={open}
        data-ocid="travel_rail.chat"
      >
        {open ? (
          <X size={18} strokeWidth={2} aria-hidden />
        ) : (
          <MessageCircle size={18} strokeWidth={2} aria-hidden />
        )}
      </button>
    </div>
  );
}
