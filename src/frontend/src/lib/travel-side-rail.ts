import { useCallback, useEffect, useRef, useState } from "react";

/** One full viewport — used as fallback when no hero sentinel exists */
export const TRAVEL_FIRST_VIEWPORT_SCROLL_PX = () =>
  typeof window !== "undefined" ? window.innerHeight : 0;

/** Navbar clearance for hero-sentinel intersection checks */
export const TRAVEL_RAIL_NAV_OFFSET_PX = 72;

/** Mark hero blocks — pre-engage chat float styling only */
export const TRAVEL_IMAGE_SECTION_ATTR = "data-travel-image-section";

const IMAGE_SECTION_VISIBLE_RATIO = 0.22;

function useRafScrollSync(sync: () => void) {
  useEffect(() => {
    let raf = 0;
    const onFrame = () => {
      raf = 0;
      sync();
    };
    const schedule = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(onFrame);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [sync]);
}

/** True while a marked hero/image block covers ~22%+ of the viewport */
export function useTravelImageSectionOverlap(): boolean {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  const sync = useCallback(() => {
    const sections = document.querySelectorAll(
      `[${TRAVEL_IMAGE_SECTION_ATTR}]`,
    );
    const vh = window.innerHeight;
    const hit = Array.from(sections).some((el) => {
      const r = el.getBoundingClientRect();
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      return visible >= vh * IMAGE_SECTION_VISIBLE_RATIO;
    });
    if (hit === activeRef.current) return;
    activeRef.current = hit;
    setActive(hit);
  }, []);

  useRafScrollSync(sync);

  return active;
}

/**
 * Side-rail visibility — true while scroll is past one full viewport.
 * Updates live: hides again when the user scrolls back to the first page.
 */
export function useTravelSideRailEngaged(options?: {
  /** Booking / no-hero flows — full stack always visible */
  immediate?: boolean;
}): boolean {
  const { immediate = false } = options ?? {};

  const readEngaged = useCallback(() => {
    if (immediate) return true;
    if (typeof window === "undefined") return false;
    return window.scrollY >= TRAVEL_FIRST_VIEWPORT_SCROLL_PX();
  }, [immediate]);

  const [engaged, setEngaged] = useState(readEngaged);
  const engagedRef = useRef(engaged);

  const sync = useCallback(() => {
    const next = readEngaged();
    if (next === engagedRef.current) return;
    engagedRef.current = next;
    setEngaged(next);
  }, [readEngaged]);

  useEffect(() => {
    engagedRef.current = readEngaged();
    setEngaged(engagedRef.current);
  }, [readEngaged]);

  useRafScrollSync(immediate ? () => {} : sync);

  return immediate ? true : engaged;
}

/** @deprecated Use useTravelSideRailEngaged */
export function useLatchedRailEngaged(options?: {
  enabled?: boolean;
  sentinelId?: string;
  immediate?: boolean;
}): boolean {
  return useTravelSideRailEngaged({
    immediate: options?.immediate ?? false,
  });
}

/** @deprecated Use useTravelSideRailEngaged */
export function usePastFirstViewport(): boolean {
  return useTravelSideRailEngaged();
}

/** Pages that use vertical side-tab CTAs + integrated chat (replaces legacy FABs) */
export function usesTravelSideActionRail(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (
    path === "/" ||
    path === "/treks" ||
    path === "/yatras" ||
    path === "/destinations" ||
    path === "/packages" ||
    path === "/corporate" ||
    path === "/gallery" ||
    path === "/blog" ||
    path === "/press" ||
    path === "/about" ||
    path === "/reviews" ||
    path === "/contact" ||
    path === "/book" ||
    path === "/compare" ||
    path === "/upcoming-batches"
  )
    return true;
  if (/^\/treks\/state\/[^/]+$/.test(path)) return true;
  return (
    /^\/treks\/[^/]+$/.test(path) ||
    /^\/yatras\/[^/]+$/.test(path) ||
    /^\/blog\/[^/]+$/.test(path)
  );
}

export const HOME_RAIL_WHATSAPP_MESSAGE =
  "Hi Trekora! I'd like help planning a Himalayan trek or yatra.";

export const TREKS_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm browsing your Himalayan treks and need guidance.";

export const YATRAS_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm browsing your yatras and need guidance.";

export const DESTINATIONS_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm exploring Himalayan destinations and need guidance.";

export const PACKAGES_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm interested in Trekora trek packages and need guidance.";

export const CORPORATE_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'd like to enquire about corporate or school treks.";

export const GALLERY_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm browsing your trek photo gallery and have a question.";

export const BLOG_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm reading your trek guides and travel stories and have a question.";

export const PRESS_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I saw Trekora in the press and would like help planning a trek or yatra.";

export const ABOUT_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'd like to learn more about Trekora and plan a Himalayan trek.";

export const REVIEWS_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I saw your trekker reviews and would like help planning a trek or yatra.";

export const CONTACT_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'd like to get in touch about a trek or yatra.";

export const BOOKING_WHATSAPP_MESSAGE =
  "Hi Trekora! I need help completing my trek or yatra booking.";

export const COMPARE_LISTING_WHATSAPP_MESSAGE =
  "Hi Trekora! I'm comparing treks and would like help choosing or booking.";

export type TravelSideActionRailVariant =
  | "home"
  | "listing-treks"
  | "listing-yatras"
  | "listing-destinations"
  | "listing-packages"
  | "listing-corporate"
  | "listing-gallery"
  | "listing-blog"
  | "listing-press"
  | "listing-about"
  | "listing-reviews"
  | "listing-contact"
  | "listing-booking"
  | "listing-compare"
  | "product";

const CONTACT_ONLY_RAIL_VARIANTS = new Set<TravelSideActionRailVariant>([
  "listing-destinations",
  "listing-corporate",
]);

/** Destinations & corporate: chat + WhatsApp only (no callback / plan / find) */
export function isContactOnlyRailVariant(
  variant: TravelSideActionRailVariant,
): boolean {
  return CONTACT_ONLY_RAIL_VARIANTS.has(variant);
}

export function isBookingRailVariant(
  variant: TravelSideActionRailVariant,
): boolean {
  return variant === "listing-booking";
}

export function isProductDetailRailVariant(
  variant: TravelSideActionRailVariant,
): boolean {
  return variant === "product";
}

export function isHeroSentinelRailVariant(
  variant: TravelSideActionRailVariant,
): boolean {
  if (isBookingRailVariant(variant)) return false;
  return true;
}

export function getRailWhatsAppMessage(
  variant: TravelSideActionRailVariant,
  productName?: string,
): string {
  switch (variant) {
    case "home":
      return HOME_RAIL_WHATSAPP_MESSAGE;
    case "listing-treks":
      return TREKS_LISTING_WHATSAPP_MESSAGE;
    case "listing-yatras":
      return YATRAS_LISTING_WHATSAPP_MESSAGE;
    case "listing-destinations":
      return DESTINATIONS_LISTING_WHATSAPP_MESSAGE;
    case "listing-packages":
      return PACKAGES_LISTING_WHATSAPP_MESSAGE;
    case "listing-corporate":
      return CORPORATE_LISTING_WHATSAPP_MESSAGE;
    case "listing-gallery":
      return GALLERY_LISTING_WHATSAPP_MESSAGE;
    case "listing-blog":
      return BLOG_LISTING_WHATSAPP_MESSAGE;
    case "listing-press":
      return PRESS_LISTING_WHATSAPP_MESSAGE;
    case "listing-about":
      return ABOUT_LISTING_WHATSAPP_MESSAGE;
    case "listing-reviews":
      return REVIEWS_LISTING_WHATSAPP_MESSAGE;
    case "listing-contact":
      return CONTACT_LISTING_WHATSAPP_MESSAGE;
    case "listing-booking":
      return productName
        ? `Hi Trekora! I'm booking ${productName} and have a question.`
        : BOOKING_WHATSAPP_MESSAGE;
    case "listing-compare":
      return productName
        ? `Hi Trekora! I'm comparing ${productName} and would like help choosing or booking.`
        : COMPARE_LISTING_WHATSAPP_MESSAGE;
    case "product":
      return `Hi Trekora! I'm interested in ${productName ?? "your treks"}. Please share details.`;
  }
}

/** Matches travel-side-rail.css mobile layout (bottom edge tabs). */
export const TRAVEL_SIDE_RAIL_MOBILE_BREAKPOINT_PX = 1024;

export function useTravelSideRailMobile(): boolean {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${TRAVEL_SIDE_RAIL_MOBILE_BREAKPOINT_PX - 1}px)`,
    );
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mobile;
}
