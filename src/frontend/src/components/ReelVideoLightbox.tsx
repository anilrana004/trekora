import type { TrekReel } from "@/data/trek-reels";
import { reelInstanceKey } from "@/data/trek-reels";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  buildOptimizedVideoUrl,
  buildVideoPosterUrl,
} from "@/utils/mediaTransform";
import { Volume2, VolumeX, X } from "lucide-react";
import { motion } from "@/lib/motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ReelVideoLightboxProps = {
  reel: TrekReel;
  videoSrc: string;
  poster?: string;
  /** Reels that have video — used for prev/next */
  videoReels: TrekReel[];
  onClose: () => void;
  onNavigate: (reel: TrekReel) => void;
  ocidPrefix?: string;
  /** Phone: only the tapped reel plays — no prev/next between videos. */
  singleVideoOnly?: boolean;
  /** Shorts-style: start muted; user opts in to sound (default true). */
  defaultMuted?: boolean;
};

export default function ReelVideoLightbox({
  reel,
  videoSrc,
  poster,
  videoReels,
  onClose,
  onNavigate,
  ocidPrefix = "reels",
  singleVideoOnly = false,
  defaultMuted = true,
}: ReelVideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(!defaultMuted);
  const isMobile = useIsMobile(1024);

  const [useRawSrc, setUseRawSrc] = useState(false);

  const optimizedSrc = useMemo(
    () =>
      buildOptimizedVideoUrl(videoSrc, {
        profile: isMobile ? "lightbox-mobile" : "lightbox-desktop",
      }),
    [videoSrc, isMobile],
  );

  const activeSrc = useRawSrc ? videoSrc : optimizedSrc;

  const optimizedPoster = useMemo(
    () => poster ?? buildVideoPosterUrl(videoSrc, isMobile ? 480 : 720),
    [poster, videoSrc, isMobile],
  );

  const currentIdx = videoReels.findIndex(
    (r) => reelInstanceKey(r) === reelInstanceKey(reel),
  );
  const hasNav = !singleVideoOnly && videoReels.length > 1;

  const goPrev = useCallback(() => {
    if (!hasNav) return;
    const next =
      videoReels[(currentIdx - 1 + videoReels.length) % videoReels.length];
    onNavigate(next);
  }, [currentIdx, hasNav, onNavigate, videoReels]);

  const goNext = useCallback(() => {
    if (!hasNav) return;
    const next = videoReels[(currentIdx + 1) % videoReels.length];
    onNavigate(next);
  }, [currentIdx, hasNav, onNavigate, videoReels]);

  const playReel = useCallback(
    async (el: HTMLVideoElement, withSound: boolean) => {
      el.muted = !withSound;
      if (withSound) el.volume = 1;
      try {
        await el.play();
        return true;
      } catch {
        if (withSound) {
          el.muted = true;
          setSoundOn(false);
          try {
            await el.play();
          } catch {
            /* ignore */
          }
        }
        return false;
      }
    },
    [],
  );

  const attachVideo = useCallback(
    (el: HTMLVideoElement | null) => {
      videoRef.current = el;
      if (!el) return;

      el.currentTime = 0;

      const start = () => {
        void playReel(el, soundOn);
      };

      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        start();
      } else {
        el.addEventListener("loadeddata", start, { once: true });
      }
    },
    [playReel, activeSrc, reelInstanceKey(reel), soundOn],
  );

  const enableSound = useCallback(async () => {
    setSoundOn(true);
    const el = videoRef.current;
    if (!el) return;
    await playReel(el, true);
  }, [playReel]);

  const disableSound = useCallback(() => {
    setSoundOn(false);
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => null);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!hasNav) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext, hasNav]);

  useEffect(() => {
    setUseRawSrc(false);
  }, [videoSrc, reelInstanceKey(reel)]);

  useEffect(() => {
    setSoundOn(!defaultMuted);
  }, [activeSrc, reelInstanceKey(reel), defaultMuted]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    void playReel(el, soundOn);
  }, [activeSrc, reelInstanceKey(reel), soundOn, playReel]);

  return (
    <motion.div
      key="reel-lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${reel.title} video`}
      data-ocid={`${ocidPrefix}.lightbox`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-label="Close video"
        data-ocid={`${ocidPrefix}.lightbox.close`}
      >
        <X size={22} className="text-white" />
      </button>

      {hasNav ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Previous video"
            data-ocid={`${ocidPrefix}.lightbox.prev`}
          >
            <span className="text-lg font-bold leading-none text-white">‹</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.15)" }}
            aria-label="Next video"
            data-ocid={`${ocidPrefix}.lightbox.next`}
          >
            <span className="text-lg font-bold leading-none text-white">›</span>
          </button>
        </>
      ) : null}

      <motion.div
        key={reelInstanceKey(reel)}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative flex max-h-[90vh] w-full max-w-[min(420px,100%)] flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
        style={{ aspectRatio: "9/16" }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={attachVideo}
          key={activeSrc}
          src={activeSrc}
          poster={optimizedPoster}
          className="h-full w-full object-contain bg-black"
          controls
          playsInline
          preload="auto"
          muted={!soundOn}
          aria-label={reel.title}
          onError={() => {
            if (!useRawSrc) setUseRawSrc(true);
          }}
        />

        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          {soundOn ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                disableSound();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-90"
              style={{ background: "rgba(0,0,0,0.55)" }}
              aria-label="Mute video"
              data-ocid={`${ocidPrefix}.lightbox.mute`}
            >
              <VolumeX size={18} className="text-white" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void enableSound();
              }}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
              style={{ background: "rgba(0,0,0,0.55)" }}
              aria-label="Turn sound on"
              data-ocid={`${ocidPrefix}.lightbox.unmute`}
            >
              <Volume2 size={16} aria-hidden />
              Sound
            </button>
          )}
        </div>

        {!soundOn ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void enableSound();
            }}
            className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-xl transition-transform hover:scale-105 pointer-events-auto"
            style={{ background: "var(--ew-red)" }}
            data-ocid={`${ocidPrefix}.lightbox.tap_sound`}
          >
            <Volume2 size={18} aria-hidden />
            Tap for sound
          </button>
        ) : null}

        <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10">
          <p className="text-center text-sm font-bold text-white">
            {reel.title}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
