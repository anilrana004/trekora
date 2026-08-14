import { ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { TrekReel } from "@/data/trek-reels";
import { reelInstanceKey } from "@/data/trek-reels";
import { reelVideoSrc } from "@/lib/reel-media";
import { buildOptimizedVideoUrl } from "@/utils/mediaTransform";
import ReelBookButton from "./ReelBookButton";

type MobileReelsFeedProps = {
  reels: TrekReel[];
  ocidPrefix?: string;
  currentProductSlug?: string;
};

type FeedSlide = {
  reel: TrekReel;
  key: string;
  rawSrc: string;
  optimizedSrc: string;
};

/** Auto-advance if playback makes no progress for this long (stalled CDN / blocked autoplay). */
const STALL_TIMEOUT_MS = 8000;
const STALL_CHECK_MS = 2000;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Phone home feed: one full-height reel per screen with horizontal scroll-snap, so
 * vertical swipes still scroll the page instead of being trapped in the feed. Auto-
 * advances when a clip ends and loops back to the first.
 */
export default function MobileReelsFeed({
  reels,
  ocidPrefix = "reels",
  currentProductSlug,
}: MobileReelsFeedProps) {
  const slides = useMemo<FeedSlide[]>(
    () =>
      reels.flatMap((reel) => {
        const src = reelVideoSrc(reel);
        if (!src) return [];
        return [
          {
            reel,
            key: reelInstanceKey(reel),
            rawSrc: src,
            optimizedSrc: buildOptimizedVideoUrl(src, {
              profile: "lightbox-mobile",
            }),
          },
        ];
      }),
    [reels],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const progressAtRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [feedInView, setFeedInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [failedKeys, setFailedKeys] = useState<Record<string, boolean>>({});

  const count = slides.length;
  const canPlay = feedInView && !pageHidden && !userPaused && count > 0;
  const slidesKey = useMemo(() => slides.map((s) => s.key).join("|"), [slides]);

  const goToIndex = useCallback(
    (next: number) => {
      const scroller = scrollerRef.current;
      if (!scroller || count === 0) return;
      const index = ((next % count) + count) % count;
      const target = slideRefs.current[index];
      if (!target) return;
      // Wrapping from the last clip back to the first would be a very long smooth scroll.
      const isNeighbour = Math.abs(index - activeIndex) <= 1;
      scroller.scrollTo({
        left: target.offsetLeft,
        behavior: isNeighbour && !prefersReducedMotion() ? "smooth" : "auto",
      });
      setActiveIndex(index);
      progressAtRef.current = Date.now();
    },
    [activeIndex, count],
  );

  const advance = useCallback(() => {
    if (count < 2) return;
    goToIndex(activeIndex + 1);
  }, [activeIndex, count, goToIndex]);

  const playSlide = useCallback(
    async (el: HTMLVideoElement, sound: boolean) => {
      el.muted = !sound;
      if (sound) el.volume = 1;
      try {
        await el.play();
      } catch {
        if (!sound) return;
        el.muted = true;
        setSoundOn(false);
        await el.play().catch(() => null);
      }
    },
    [],
  );

  /** Which slide is centred in the scroller. */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || slidesKey === "") return;

    const io = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (entry.intersectionRatio < 0.6) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.slideIndex ?? "",
          );
          if (!Number.isInteger(index)) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActiveIndex(best.index);
      },
      { root: scroller, threshold: [0.25, 0.6, 0.9] },
    );

    for (const el of slideRefs.current) {
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [slidesKey]);

  /** Only play while the feed itself is on screen and the tab is visible. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => setFeedInView(Boolean(entries[0]?.isIntersecting)),
      { threshold: 0.4 },
    );
    io.observe(el);

    // Nothing downloads until the feed is one screen away — it sits far below the fold.
    const preloadIo = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setArmed(true);
          preloadIo.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    preloadIo.observe(el);

    const onVisibility = () => setPageHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      preloadIo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  /** Single source of truth for playback: active slide plays, every other one rewinds. */
  useEffect(() => {
    videoRefs.current.forEach((el, index) => {
      if (!el || index === activeIndex) return;
      el.pause();
      el.muted = true;
      if (!el.getAttribute("src")) {
        // Src was dropped because the slide left the preload window — free the buffer.
        if (el.currentSrc) el.load();
        return;
      }
      if (el.currentTime > 0) el.currentTime = 0;
    });

    const el = videoRefs.current[activeIndex];
    if (!el) return;

    if (!canPlay) {
      el.pause();
      return;
    }

    progressAtRef.current = Date.now();
    void playSlide(el, soundOn);
  }, [activeIndex, canPlay, soundOn, playSlide]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, count);
    slideRefs.current = slideRefs.current.slice(0, count);
    setActiveIndex(0);
  }, [count, slidesKey]);

  /** Watchdog: a clip that stops reporting progress must not freeze the feed. */
  useEffect(() => {
    if (!canPlay || count < 2) return;
    const id = window.setInterval(() => {
      if (Date.now() - progressAtRef.current > STALL_TIMEOUT_MS) advance();
    }, STALL_CHECK_MS);
    return () => window.clearInterval(id);
  }, [advance, canPlay, count]);

  useEffect(() => {
    const el = videoRefs.current[activeIndex];
    if (el) el.muted = !soundOn;
  }, [activeIndex, soundOn]);

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className="reel-feed"
      data-ocid={`${ocidPrefix}.feed`}
      aria-roledescription="carousel"
      aria-label="Trek video reels"
    >
      <div ref={scrollerRef} className="reel-feed__scroller relative">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const inPreloadWindow =
            Math.abs(index - activeIndex) <= 1 ||
            (activeIndex === count - 1 && index === 0);
          const shouldLoad = armed && inPreloadWindow;
          const src = failedKeys[slide.key] ? slide.rawSrc : slide.optimizedSrc;

          return (
            <article
              key={slide.key}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              data-slide-index={index}
              className="reel-feed__slide"
              aria-label={`${slide.reel.title} — reel ${index + 1} of ${count}`}
              data-ocid={`${ocidPrefix}.feed.reel.${index + 1}`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={shouldLoad ? src : undefined}
                className="absolute inset-0 h-full w-full bg-black object-cover"
                playsInline
                muted={!(isActive && soundOn)}
                loop={count === 1}
                preload={isActive ? "auto" : "metadata"}
                disablePictureInPicture
                aria-label={slide.reel.title}
                onTimeUpdate={() => {
                  if (isActive) progressAtRef.current = Date.now();
                }}
                onEnded={() => {
                  if (isActive) advance();
                }}
                onError={(event) => {
                  // Ignore the empty-src error fired when a slide leaves the preload window.
                  if (!event.currentTarget.getAttribute("src")) return;
                  if (!failedKeys[slide.key]) {
                    setFailedKeys((prev) => ({ ...prev, [slide.key]: true }));
                  }
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85"
                aria-hidden
              />

              {isActive ? (
                <button
                  type="button"
                  onClick={() => setUserPaused((prev) => !prev)}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer border-0 bg-transparent p-0"
                  aria-label={userPaused ? "Play video" : "Pause video"}
                  data-ocid={`${ocidPrefix}.feed.toggle.${index + 1}`}
                />
              ) : null}

              {isActive && userPaused ? (
                <span
                  className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                  aria-hidden
                >
                  <Play size={26} className="ml-1 text-white" fill="white" />
                </span>
              ) : null}

              <div className="reel-feed__copy pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-1.5 px-6 pb-5 pt-14 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/70">
                  {slide.reel.productType === "yatra"
                    ? "Trekora Yatra"
                    : "Trekora Trek"}
                </p>
                <h4 className="line-clamp-2 text-balance text-[15px] font-bold leading-snug text-white drop-shadow-sm">
                  {slide.reel.title}
                </h4>
                {slide.reel.productSlug ? (
                  <div className="pointer-events-auto mt-0.5">
                    <ReelBookButton
                      reel={slide.reel}
                      currentProductSlug={currentProductSlug}
                      variant="feed"
                      ocidPrefix={`${ocidPrefix}.feed`}
                      index={index}
                    />
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setSoundOn((prev) => !prev)}
        className="absolute right-3 top-8 z-30 flex h-9 w-9 items-center justify-center rounded-full text-white transition-opacity active:opacity-70"
        style={{ background: "rgba(0,0,0,0.55)" }}
        aria-label={soundOn ? "Mute reels" : "Turn sound on"}
        data-ocid={`${ocidPrefix}.feed.${soundOn ? "mute" : "unmute"}`}
      >
        {soundOn ? (
          <Volume2 size={18} aria-hidden />
        ) : (
          <VolumeX size={18} aria-hidden />
        )}
      </button>

      {/* Story-style segments: position at a glance without 12 stacked dots. */}
      <div
        className="pointer-events-none absolute inset-x-3 top-3 z-30 flex gap-1"
        aria-hidden
      >
        {slides.map((slide, index) => (
          <span
            key={slide.key}
            className="h-[3px] flex-1 rounded-full transition-colors duration-300"
            style={{
              background:
                index === activeIndex ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {activeIndex === 0 && count > 1 ? (
        <span className="reel-feed__hint pointer-events-none absolute left-1/2 top-9 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white">
          Swipe for the next trek
          <ChevronRight size={12} aria-hidden />
        </span>
      ) : null}
    </div>
  );
}
