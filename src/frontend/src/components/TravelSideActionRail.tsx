import TravelSideCallbackButton from "@/components/TravelSideCallbackButton";
import TravelSideChatButton from "@/components/TravelSideChatButton";
import {
  getRailWhatsAppMessage,
  isBookingRailVariant,
  isContactOnlyRailVariant,
  usePastFirstViewport,
  useTravelImageSectionOverlap,
  type TravelSideActionRailVariant,
} from "@/lib/travel-side-rail";
import {
  openQueryModalFromLayout,
  openTrekQuizFromLayout,
} from "@/lib/layout-modals";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import { Binoculars, MapPinned } from "lucide-react";
import { memo, useEffect, useState } from "react";

const NAV_OFFSET_PX = 72;

export const TRAVEL_HERO_SENTINEL_ID = "travel-hero-sentinel";

export type { TravelSideActionRailVariant };

export interface TravelSideActionRailProps {
  productName?: string;
  variant?: TravelSideActionRailVariant;
  sentinelId?: string;
}

interface SideTab {
  id: string;
  accent: "whatsapp" | "brand";
  icon: React.ReactNode;
  /** Full phrase on tab; omit for icon-only WhatsApp */
  label?: string;
  iconOnly?: boolean;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel: string;
  ocid: string;
}

const WA_ICON = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function tabClassName(tab: SideTab, side: "left" | "right") {
  return [
    "travel-side-tab",
    `travel-side-tab--${side}`,
    `travel-side-tab--${tab.accent}`,
    tab.iconOnly ? "travel-side-tab--icon-only" : "travel-side-tab--labeled",
  ].join(" ");
}

function TabContent({ tab }: { tab: SideTab }) {
  if (tab.iconOnly) {
    return <span className="travel-side-tab__icon">{tab.icon}</span>;
  }
  return (
    <>
      <span className="travel-side-tab__icon travel-side-tab__icon--compact">
        {tab.icon}
      </span>
      <span className="travel-side-tab__label">{tab.label}</span>
    </>
  );
}

function renderTabs(tabs: SideTab[], side: "left" | "right") {
  return tabs.map((tab) => {
    const className = tabClassName(tab, side);
    const content = <TabContent tab={tab} />;

    if (tab.href) {
      return (
        <a
          key={tab.id}
          href={tab.href}
          target={tab.external ? "_blank" : undefined}
          rel={tab.external ? "noopener noreferrer" : undefined}
          className={className}
          aria-label={tab.ariaLabel}
          data-ocid={tab.ocid}
        >
          {content}
        </a>
      );
    }

    const fire = () => tab.onClick?.();

    return (
      <button
        key={tab.id}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          fire();
        }}
        className={className}
        aria-label={tab.ariaLabel}
        data-ocid={tab.ocid}
      >
        {content}
      </button>
    );
  });
}

function TravelSideActionRail({
  productName,
  variant = "product",
  sentinelId = TRAVEL_HERO_SENTINEL_ID,
}: TravelSideActionRailProps) {
  /** Latched on: stays visible once user has scrolled past the hero sentinel */
  const [visible, setVisible] = useState(false);
  const bookingRail = isBookingRailVariant(variant);
  const pastFirstViewport = usePastFirstViewport();
  const inImageSection = useTravelImageSectionOverlap();
  /** Booking: side tabs always reachable; chat stays on other listing pages only */
  const listingRail =
    variant.startsWith("listing-") && variant !== "listing-booking";
  const showChat =
    !bookingRail &&
    (listingRail
      ? visible || inImageSection
      : pastFirstViewport && (visible || inImageSection));
  const showWhatsapp = bookingRail
    ? true
    : listingRail
      ? visible && !inImageSection
      : pastFirstViewport && visible && !inImageSection;
  const showCallbackAndRight = bookingRail
    ? !isContactOnlyRailVariant(variant)
    : !isContactOnlyRailVariant(variant) &&
      (listingRail
        ? visible && !inImageSection
        : pastFirstViewport && visible && !inImageSection);

  useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el) {
      setVisible(window.scrollY >= window.innerHeight);
      return;
    }

    const markVisibleIfPastHero = () => {
      const pastHeroSentinel = el.getBoundingClientRect().top <= NAV_OFFSET_PX;
      if (listingRail) {
        setVisible(pastHeroSentinel);
        return;
      }
      if (window.scrollY < window.innerHeight) {
        setVisible(false);
        return;
      }
      setVisible(pastHeroSentinel);
    };

    const observer = new IntersectionObserver(
      () => {
        markVisibleIfPastHero();
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${NAV_OFFSET_PX}px 0px 0px 0px`,
      },
    );

    observer.observe(el);
    markVisibleIfPastHero();
    window.addEventListener("scroll", markVisibleIfPastHero, { passive: true });
    window.addEventListener("resize", markVisibleIfPastHero);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", markVisibleIfPastHero);
      window.removeEventListener("resize", markVisibleIfPastHero);
    };
  }, [sentinelId, listingRail]);

  const waUrl = buildWhatsAppUrl(getRailWhatsAppMessage(variant, productName));

  const leftTabs: SideTab[] = [
    {
      id: "whatsapp",
      accent: "whatsapp",
      icon: WA_ICON,
      iconOnly: true,
      href: waUrl,
      external: true,
      ariaLabel: "Chat on WhatsApp",
      ocid: "travel_rail.whatsapp",
    },
  ];

  const rightTabs: SideTab[] = [
    {
      id: "plan",
      label: "plan my trek",
      accent: "brand",
      icon: <MapPinned size={13} strokeWidth={2.25} aria-hidden />,
      onClick: openQueryModalFromLayout,
      ariaLabel: "Plan my trek",
      ocid: "travel_rail.plan",
    },
    {
      id: "find",
      label: "find my trek",
      accent: "brand",
      icon: <Binoculars size={13} strokeWidth={2.25} aria-hidden />,
      onClick: openTrekQuizFromLayout,
      ariaLabel: "Find my trek",
      ocid: "travel_rail.find",
    },
  ];

  if (!showChat && !showWhatsapp && !showCallbackAndRight) return null;

  return (
    <>
      <nav
        className={`travel-side-rail travel-side-rail--left ${inImageSection && showChat && !showCallbackAndRight ? "travel-side-rail--chat-float" : ""}`}
        aria-label="Contact actions"
        data-ocid="travel_rail.left"
      >
        <div className="travel-side-rail__stack">
          {showChat && (
            <TravelSideChatButton floatingOverImage={inImageSection} />
          )}
          {showWhatsapp && renderTabs(leftTabs, "left")}
          {showCallbackAndRight && <TravelSideCallbackButton />}
        </div>
      </nav>
      {showCallbackAndRight ? (
        <nav
          className="travel-side-rail travel-side-rail--right"
          aria-label="Planning actions"
          data-ocid="travel_rail.right"
        >
          <div className="travel-side-rail__stack travel-side-rail__stack--right">
            {renderTabs(rightTabs, "right")}
          </div>
        </nav>
      ) : null}
    </>
  );
}

export default memo(TravelSideActionRail);
