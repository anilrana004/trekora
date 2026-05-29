import { TRAVEL_HERO_SENTINEL_ID } from "@/components/TravelSideActionRail";

import {

  isListingScrollChromeRoute,
  isListingChromeNavbarSwapRoute,

  LISTING_CHROME_ENGAGE_DELAY_MS,

  LISTING_CHROME_MIN_PINNED_MS,

  LISTING_CHROME_PIN_MEDIA,

  LISTING_SCROLL_IDLE_MS,

} from "@/lib/listing-scroll-chrome";

import { useRouterState } from "@tanstack/react-router";

import { useEffect, useRef, useState } from "react";



function navOffsetPx(): number {

  if (typeof window === "undefined") return 56;

  const raw = getComputedStyle(document.documentElement)

    .getPropertyValue("--site-header-height")

    .trim();

  const n = Number.parseFloat(raw);

  if (Number.isFinite(n) && n > 0) {

    return raw.endsWith("rem") ? n * 16 : n;

  }

  return window.matchMedia("(min-width: 768px)").matches ? 64 : 56;

}



export interface ListingScrollChromeState {

  /** Filters pinned to top (navbar hidden) — mobile/tablet only, latched until scroll settles. */

  chromeActive: boolean;

  /** Whether this route uses listing scroll chrome at all. */

  enabled: boolean;

  /** Navbar swap + fixed filter bar (false on desktop — sticky-only for smooth scroll). */

  pinEnabled: boolean;

}



export function useListingScrollChrome(): ListingScrollChromeState {

  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const enabled = isListingScrollChromeRoute(pathname);
  const allowNavbarSwap = isListingChromeNavbarSwapRoute(pathname);



  const [chromePinned, setChromePinned] = useState(false);

  const [pinEnabled, setPinEnabled] = useState(() =>

    typeof window !== "undefined"

      ? window.matchMedia(LISTING_CHROME_PIN_MEDIA).matches

      : false,

  );



  const pinnedAtRef = useRef(0);

  const lastScrollAtRef = useRef(0);

  const engageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rafRef = useRef<number | null>(null);

  const pastHeroRef = useRef(false);

  const chromePinnedRef = useRef(false);

  const pinEnabledRef = useRef(pinEnabled);



  const chromeActive = allowNavbarSwap && pinEnabled && chromePinned;



  useEffect(() => {

    chromePinnedRef.current = chromePinned;

  }, [chromePinned]);



  useEffect(() => {

    pinEnabledRef.current = pinEnabled;

  }, [pinEnabled]);



  const setPinned = (next: boolean) => {

    if (chromePinnedRef.current === next) return;

    chromePinnedRef.current = next;

    setChromePinned(next);

  };



  useEffect(() => {

    const mq = window.matchMedia(LISTING_CHROME_PIN_MEDIA);

    const apply = () => {

      const next = mq.matches;

      pinEnabledRef.current = next;

      setPinEnabled(next);

      if (!next) setPinned(false);

    };

    apply();

    mq.addEventListener("change", apply);

    return () => mq.removeEventListener("change", apply);

  }, []);



  useEffect(() => {

    if (!allowNavbarSwap) {

      setPinned(false);

    }

  }, [allowNavbarSwap]);



  useEffect(() => {

    if (!enabled) {

      setPinned(false);

      pastHeroRef.current = false;

      return;

    }



    const clearEngageTimer = () => {

      if (engageTimerRef.current) {

        clearTimeout(engageTimerRef.current);

        engageTimerRef.current = null;

      }

    };



    const clearIdleTimer = () => {

      if (idleTimerRef.current) {

        clearTimeout(idleTimerRef.current);

        idleTimerRef.current = null;

      }

    };



    const releasePin = () => {

      clearEngageTimer();

      clearIdleTimer();

      setPinned(false);

    };



    const scheduleRelease = () => {

      clearIdleTimer();

      idleTimerRef.current = setTimeout(() => {

        idleTimerRef.current = null;

        const pinnedFor = Date.now() - pinnedAtRef.current;

        if (chromePinnedRef.current && pinnedFor < LISTING_CHROME_MIN_PINNED_MS) {

          scheduleRelease();

          return;

        }

        setPinned(false);

      }, LISTING_SCROLL_IDLE_MS);

    };



    const tryEngagePin = () => {

      if (
        !isListingChromeNavbarSwapRoute(pathname) ||
        !pinEnabledRef.current ||
        !pastHeroRef.current ||
        chromePinnedRef.current
      ) {
        return;
      }

      clearEngageTimer();

      engageTimerRef.current = setTimeout(() => {

        engageTimerRef.current = null;

        const scrolledRecently =

          Date.now() - lastScrollAtRef.current < LISTING_CHROME_ENGAGE_DELAY_MS + 80;

        if (

          !pinEnabledRef.current ||

          !pastHeroRef.current ||

          !scrolledRecently

        ) {

          return;

        }

        pinnedAtRef.current = Date.now();

        setPinned(true);

        scheduleRelease();

      }, LISTING_CHROME_ENGAGE_DELAY_MS);

    };



    const sentinel = document.getElementById(TRAVEL_HERO_SENTINEL_ID);



    const applyPastHero = (next: boolean) => {

      if (pastHeroRef.current === next) return;

      pastHeroRef.current = next;

      if (!next) releasePin();

    };



    const updatePastHeroFromSentinel = () => {

      if (!sentinel) {

        applyPastHero(window.scrollY > window.innerHeight * 0.35);

        return;

      }

      applyPastHero(sentinel.getBoundingClientRect().top <= navOffsetPx());

    };



    updatePastHeroFromSentinel();



    let observer: IntersectionObserver | null = null;

    const bindObserver = () => {

      if (!sentinel) return;

      observer?.disconnect();

      observer = new IntersectionObserver(

        (entries) => {

          const entry = entries[0];

          if (!entry) return;

          applyPastHero(!entry.isIntersecting);

        },

        {

          root: null,

          threshold: 0,

          rootMargin: `-${navOffsetPx()}px 0px 0px 0px`,

        },

      );

      observer.observe(sentinel);

    };

    bindObserver();



    const onScroll = () => {

      if (!pinEnabledRef.current) return;

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {

        rafRef.current = null;

        lastScrollAtRef.current = Date.now();

        if (!pastHeroRef.current) return;



        if (chromePinnedRef.current) {

          scheduleRelease();

          return;

        }

        tryEngagePin();

      });

    };



    const onResize = () => {

      updatePastHeroFromSentinel();

      bindObserver();

    };



    window.addEventListener("scroll", onScroll, { passive: true });

    window.addEventListener("resize", onResize);

    return () => {

      observer?.disconnect();

      window.removeEventListener("scroll", onScroll);

      window.removeEventListener("resize", onResize);

      clearEngageTimer();

      clearIdleTimer();

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    };

  }, [enabled, pathname]);



  useEffect(() => {

    if (!enabled || !chromeActive) {

      delete document.documentElement.dataset.listingChromeActive;

      return;

    }

    document.documentElement.dataset.listingChromeActive = "true";

    return () => {

      delete document.documentElement.dataset.listingChromeActive;

    };

  }, [enabled, chromeActive]);



  return {

    chromeActive,

    enabled,

    pinEnabled,

  };

}

