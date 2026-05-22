import CallbackRequestPanel from "@/components/CallbackRequestPanel";
import { openCallbackFromLayout } from "@/lib/layout-modals";
import { useTravelSideRailMobile } from "@/lib/travel-side-rail";
import { Phone } from "lucide-react";
import { useState } from "react";

/** Slim call back tab — inline panel on desktop; centered modal on mobile (no overlap with bottom nav). */
export default function TravelSideCallbackButton() {
  const [open, setOpen] = useState(false);
  const compactRail = useTravelSideRailMobile();

  const handleOpen = () => {
    if (compactRail) {
      openCallbackFromLayout();
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="travel-side-callback-wrap relative pointer-events-auto">
      {!compactRail && (
        <CallbackRequestPanel
          open={open}
          onClose={() => setOpen(false)}
          placement="inline-right"
          source="Side rail callback"
        />
      )}
      <button
        type="button"
        onClick={handleOpen}
        className="travel-side-tab travel-side-tab--left travel-side-tab--brand travel-side-tab--labeled"
        aria-label="Request a call back"
        aria-expanded={compactRail ? undefined : open}
        data-ocid="travel_rail.call"
      >
        <span className="travel-side-tab__icon travel-side-tab__icon--compact">
          <Phone size={12} strokeWidth={2.5} aria-hidden />
        </span>
        <span className="travel-side-tab__label">call back</span>
      </button>
    </div>
  );
}
