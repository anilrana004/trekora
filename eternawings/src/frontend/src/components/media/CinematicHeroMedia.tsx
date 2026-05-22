import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import OptimizedImage from "./OptimizedImage";
import OptimizedVideo from "./OptimizedVideo";

type CinematicHeroMediaProps = {
  className?: string;
  /** Remote MP4/WebM or Cloudinary video URL — optional cinematic background. */
  videoSrc?: string;
  posterSrc?: string;
  /** Shown when `videoSrc` is omitted or for reduced-motion fallbacks. */
  imageSrc: string;
  imageAlt: string;
  /** Overlay content (headlines, CTAs). */
  children?: ReactNode;
  /** Prefer still image (e.g. `prefers-reduced-motion`). */
  preferImage?: boolean;
};

export default function CinematicHeroMedia({
  className,
  videoSrc,
  posterSrc,
  imageSrc,
  imageAlt,
  children,
  preferImage,
}: CinematicHeroMediaProps) {
  const showVideo = Boolean(videoSrc) && !preferImage;

  return (
    <div className={cn("relative min-h-[280px] overflow-hidden", className)}>
      {showVideo ? (
        <OptimizedVideo
          src={videoSrc as string}
          poster={posterSrc ?? imageSrc}
          fill
          priority
          muted
          playsInline
          loop
          autoPlay
          className="object-cover"
        />
      ) : (
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          variant="hero"
          priority
          blurUp
        />
      )}
      {children}
    </div>
  );
}
