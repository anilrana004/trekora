import { AnimatePresence, motion } from "@/lib/motion";
import { Play } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { TrekReel } from "@/data/trek-reels";
import { reelInstanceKey } from "@/data/trek-reels";
import { reelPosterSrc, reelVideoSrc } from "@/lib/reel-media";
import ReelBookButton from "./ReelBookButton";
import ReelVideoLightbox from "./ReelVideoLightbox";
import OptimizedImage from "./media/OptimizedImage";

type ReelsShortsRowProps = {
  reels: TrekReel[];
  ocidPrefix?: string;
  currentProductSlug?: string;
};

export { reelVideoSrc };

function reelPreviewSrc(reel: TrekReel, videoSrc: string): string {
  return reelPosterSrc(reel, videoSrc) ?? "";
}

export default function ReelsShortsRow({
  reels,
  ocidPrefix = "reels",
  currentProductSlug,
}: ReelsShortsRowProps) {
  const [activeReelKey, setActiveReelKey] = useState<string | null>(null);

  const videoReels = useMemo(
    () => reels.filter((r) => Boolean(reelVideoSrc(r))),
    [reels],
  );

  const activeReel = useMemo(
    () =>
      activeReelKey
        ? (reels.find((r) => reelInstanceKey(r) === activeReelKey) ?? null)
        : null,
    [reels, activeReelKey],
  );

  const activeVideoSrc = activeReel ? reelVideoSrc(activeReel) : undefined;
  const activePoster =
    activeReel && activeVideoSrc
      ? reelPreviewSrc(activeReel, activeVideoSrc)
      : undefined;

  const openReel = useCallback((reel: TrekReel) => {
    const src = reelVideoSrc(reel);
    if (!src) return;
    setActiveReelKey(reelInstanceKey(reel));
  }, []);

  const closeLightbox = useCallback(() => setActiveReelKey(null), []);

  const lightbox =
    activeReel && activeVideoSrc ? (
      <ReelVideoLightbox
        reel={activeReel}
        videoSrc={activeVideoSrc}
        poster={activePoster || undefined}
        videoReels={videoReels}
        onClose={closeLightbox}
        onNavigate={(reel) => setActiveReelKey(reelInstanceKey(reel))}
        ocidPrefix={ocidPrefix}
        defaultMuted
      />
    ) : null;

  return (
    <>
      <div
        className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-3 -mx-1 px-1 snap-x snap-mandatory touch-pan-x"
        role="list"
        aria-label="Trek video reels"
      >
        {reels.map((r, i) => {
          const videoSrc = reelVideoSrc(r);
          const isVideo = Boolean(videoSrc);
          const previewSrc =
            isVideo && videoSrc ? reelPreviewSrc(r, videoSrc) : r.thumb;
          const hasBook = Boolean(r.productSlug);
          const cardKey = reelInstanceKey(r);

          return (
            <motion.article
              key={cardKey}
              role="listitem"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex-none snap-center relative w-[min(72vw,200px)] sm:w-[220px] md:w-[260px] lg:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-900 shadow-md ring-1 ring-black/10"
              data-ocid={`${ocidPrefix}.reel.${i + 1}`}
            >
              {isVideo && videoSrc ? (
                <button
                  type="button"
                  onClick={() => openReel(r)}
                  className="absolute inset-0 z-0 w-full h-full p-0 border-0 cursor-pointer bg-neutral-900 touch-manipulation"
                  aria-label={`Play ${r.title}`}
                >
                  {previewSrc ? (
                    <OptimizedImage
                      src={previewSrc}
                      alt=""
                      fill
                      variant="gallery-thumb"
                      className="object-cover pointer-events-none bg-neutral-900"
                      sizes="(max-width: 280px) 280px"
                      aria-hidden
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-neutral-800"
                      aria-hidden
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                      style={{ background: "rgba(0,0,0,0.55)" }}
                    >
                      <Play
                        size={22}
                        className="ml-0.5 text-white"
                        fill="white"
                        aria-hidden
                      />
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
                  <span
                    className="absolute top-2.5 left-2.5 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full pointer-events-none"
                    style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                  >
                    Watch reel
                  </span>
                </button>
              ) : previewSrc ? (
                <div className="absolute inset-0 z-0">
                  <OptimizedImage
                    src={previewSrc}
                    alt={r.title}
                    fill
                    variant="gallery-thumb"
                    className="object-cover"
                    sizes="(max-width: 280px) 280px"
                  />
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-neutral-800"
                  aria-label={r.title}
                />
              )}

              {r.duration ? (
                <span
                  className="absolute top-2.5 right-2.5 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                >
                  {r.duration}
                </span>
              ) : null}

              <div
                className={`absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none ${
                  hasBook ? "p-2.5 sm:p-3 pt-12 sm:pt-14" : "p-2.5 sm:p-3 pt-8"
                }`}
              >
                <p className="text-center text-white text-[11px] sm:text-sm font-bold leading-snug line-clamp-2 px-1">
                  {r.title}
                </p>
                {hasBook ? (
                  <div className="pointer-events-auto">
                    <ReelBookButton
                      reel={r}
                      currentProductSlug={currentProductSlug}
                      variant="card"
                      ocidPrefix={ocidPrefix}
                      index={i}
                    />
                  </div>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </div>

      {typeof document !== "undefined" && lightbox ? (
        createPortal(
          <AnimatePresence>{lightbox}</AnimatePresence>,
          document.body,
        )
      ) : (
        <AnimatePresence>{lightbox}</AnimatePresence>
      )}
    </>
  );
}
