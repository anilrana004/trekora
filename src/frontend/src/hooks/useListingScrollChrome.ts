import { TRAVEL_HERO_SENTINEL_ID } from "@/components/TravelSideActionRail";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  isListingScrollChromeRoute,
  LISTING_SCROLL_IDLE_MS,
} from "@/lib/listing-scroll-chrome";
import { syncMobileNavHidden } from "@/lib/site-header-offset";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const NAV_OFFSET_PX = 56;

export interface ListingScrollChromeState {
  /** True while user is actively scrolling past the hero (mobile listing pages). */
  chromeActive: boolean;
  pastHero: boolean;
  isScrolling: boolean;
  enabled: boolean;
}

export function useListingScrollChrome(): ListingScrollChromeState {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isMobile = useIsMobile();
  const enabled = isMobile && isListingScrollChromeRoute(pathname);

  const [pastHero, setPastHero] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIdleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const chromeActive = enabled && pastHero && isScrolling;

  useEffect(() => {
    if (!enabled) {
      setPastHero(false);
      setIsScrolling(false);
      return;
    }

    const sentinel = document.getElementById(TRAVEL_HERO_SENTINEL_ID);
    if (!sentinel) {
      setPastHero(window.scrollY > window.innerHeight * 0.35);
      return;
    }

    const updatePastHero = () => {
      setPastHero(sentinel.getBoundingClientRect().top <= NAV_OFFSET_PX);
    };

    updatePastHero();

    const observer = new IntersectionObserver(
      () => updatePastHero(),
      {
        root: null,
        threshold: 0,
        rootMargin: `-${NAV_OFFSET_PX}px 0px 0px 0px`,
      },
    );
    observer.observe(sentinel);

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updatePastHero();
        setIsScrolling(true);
        if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
        scrollIdleRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollIdleRef.current = null;
        }, LISTING_SCROLL_IDLE_MS);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scrollIdleRef.current) clearTimeout(scrollIdleRef.current);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      syncMobileNavHidden(false);
      delete document.documentElement.dataset.listingChromeActive;
      return;
    }
    syncMobileNavHidden(chromeActive);
    if (chromeActive) {
      document.documentElement.dataset.listingChromeActive = "true";
    } else {
      delete document.documentElement.dataset.listingChromeActive;
    }
    return () => {
      syncMobileNavHidden(false);
      delete document.documentElement.dataset.listingChromeActive;
    };
  }, [enabled, chromeActive]);

  return {
    chromeActive,
    pastHero,
    isScrolling,
    enabled,
  };
}
