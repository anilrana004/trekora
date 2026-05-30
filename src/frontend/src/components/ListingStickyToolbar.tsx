import { useListingScrollChromeContext } from "@/contexts/ListingScrollChromeContext";
import { LISTING_CHROME_PIN_MEDIA } from "@/lib/listing-scroll-chrome";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** Matches Navbar show animation duration in Navbar.tsx. */
const CHROME_UNPIN_HOLD_MS = 420;

export interface ListingStickyToolbarProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Listing filters — sticky below navbar; when navbar scrolls away on mobile,
 * toolbar pins to the top (Contact-style chrome flow).
 */
export default function ListingStickyToolbar({
  children,
  className = "",
  style,
}: ListingStickyToolbarProps) {
  const { chromeActive, pinEnabled } = useListingScrollChromeContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const [holdSpacer, setHoldSpacer] = useState(false);
  const [canPinLayout, setCanPinLayout] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(LISTING_CHROME_PIN_MEDIA).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(LISTING_CHROME_PIN_MEDIA);
    const apply = () => setCanPinLayout(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const usePinLayout = pinEnabled && canPinLayout;

  useLayoutEffect(() => {
    if (!usePinLayout) return;
    const el = toolbarRef.current;
    if (!el) return;

    const measure = () => {
      const h = el.offsetHeight;
      setSpacerHeight((prev) => (prev === h ? prev : h));
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [usePinLayout]);

  useEffect(() => {
    if (!usePinLayout) {
      setHoldSpacer(false);
      return;
    }
    if (chromeActive) {
      setHoldSpacer(true);
      return;
    }
    if (!holdSpacer) return;
    const t = window.setTimeout(
      () => setHoldSpacer(false),
      CHROME_UNPIN_HOLD_MS,
    );
    return () => window.clearTimeout(t);
  }, [chromeActive, holdSpacer, usePinLayout]);

  const showSpacer =
    usePinLayout && (chromeActive || holdSpacer) && spacerHeight > 0;

  const toolbarClass = [
    "listing-sticky-toolbar",
    chromeActive ? "listing-sticky-toolbar--chrome-pinned" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {showSpacer ? (
        <div
          className="listing-chrome-spacer"
          style={{ height: spacerHeight }}
          aria-hidden
        />
      ) : null}
      <div ref={toolbarRef} className={toolbarClass} style={style}>
        {children}
      </div>
    </>
  );
}
