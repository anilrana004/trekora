import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import StarRow from "./StarRow";

export type ProductDetailHeroProps = {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  name: string;
  subtitle?: ReactNode;
  rating?: number;
  reviewCount?: number;
  badges?: ReactNode;
  /** Hide prev/next on lg when a hero reel overlaps controls (trek detail). */
  hideNavOnLg?: boolean;
  renderSlide: (src: string, index: number) => ReactNode;
  ocidPrefix: string;
};

export default function ProductDetailHero({
  images,
  activeIndex,
  onIndexChange,
  name,
  subtitle,
  rating,
  reviewCount,
  badges,
  hideNavOnLg = false,
  renderSlide,
  ocidPrefix,
}: ProductDetailHeroProps) {
  const navClass = hideNavOnLg
    ? "absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70 hidden lg:flex"
    : "absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70";

  const navClassRight = navClass.replace("left-3", "right-3 left-auto");

  return (
    <div
      className="relative overflow-hidden bg-black"
      data-travel-image-section
      style={{ minHeight: "clamp(280px, 60vw, 480px)" }}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.35 }}
        >
          {renderSlide(images[activeIndex] ?? images[0], activeIndex)}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() =>
              onIndexChange((activeIndex - 1 + images.length) % images.length)
            }
            className={navClass}
            data-ocid={`${ocidPrefix}.hero_prev`}
          >
            <ChevronRight size={18} className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => onIndexChange((activeIndex + 1) % images.length)}
            className={navClassRight}
            data-ocid={`${ocidPrefix}.hero_next`}
          >
            <ChevronRight size={18} />
          </button>
        </>
      ) : null}
      <div
        className={`absolute bottom-6 left-0 right-0 container mx-auto px-4 ${images.length > 1 ? "pb-6" : ""}`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {badges ? (
              <div className="mb-2 flex flex-wrap gap-2">{badges}</div>
            ) : null}
            <h1 className="mb-1 text-3xl font-bold text-white drop-shadow md:text-4xl">
              {name}
            </h1>
            {subtitle ? (
              <div className="mt-1 text-sm text-white/80">{subtitle}</div>
            ) : null}
          </div>
          {rating != null && reviewCount != null ? (
            <div className="flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2">
              <StarRow rating={rating} size={16} />
              <span className="text-lg font-bold text-white">{rating}</span>
              <span className="text-sm text-white/75">
                ({reviewCount} reviews)
              </span>
            </div>
          ) : null}
        </div>
      </div>
      {images.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((img, i) => (
            <button
              key={img || String(i)}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => onIndexChange(i)}
              className="rounded-full transition-all"
              style={{
                width: activeIndex === i ? 20 : 8,
                height: 8,
                backgroundColor:
                  activeIndex === i ? "var(--ew-red)" : "rgba(255,255,255,0.6)",
              }}
              data-ocid={`${ocidPrefix}.hero_dot.${i + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
