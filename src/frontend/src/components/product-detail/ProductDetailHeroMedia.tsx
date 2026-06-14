import { homeTrekReelVideo } from "@/data/trek-reels";
import { useEffect, useState } from "react";
import OptimizedImage, { type ImageVariant } from "../media/OptimizedImage";
import OptimizedVideo from "../media/OptimizedVideo";

type ProductDetailHeroMediaProps = {
  trekSlug: string;
  image: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  variant?: ImageVariant;
  /** True when the hero carousel is on slide 1 — only then play the mobile reel. */
  isPrimaryHeroSlide: boolean;
};

/**
 * Trek detail hero slide: Cloudflare reel on phone for slide 1 only; photos on all other slides.
 */
export default function ProductDetailHeroMedia({
  trekSlug,
  image,
  alt,
  sizes,
  className = "object-cover",
  priority,
  variant = "hero",
  isPrimaryHeroSlide,
}: ProductDetailHeroMediaProps) {
  const reelVideo = isPrimaryHeroSlide
    ? homeTrekReelVideo(trekSlug)
    : undefined;
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [reelVideo, trekSlug, isPrimaryHeroSlide]);

  if (reelVideo && !videoFailed) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <OptimizedVideo
          src={reelVideo}
          poster={image}
          profile="hero-mobile"
          fill
          muted
          loop
          playsInline
          autoPlay
          priority={priority}
          className={`${className} lg:hidden`}
          aria-label={`${alt} trek reel`}
          onVideoError={() => setVideoFailed(true)}
        />
        <OptimizedImage
          src={image}
          alt={alt}
          fill
          variant={variant}
          priority={priority}
          sizes={sizes}
          className={`${className} hidden lg:block`}
        />
      </div>
    );
  }

  return (
    <OptimizedImage
      src={image}
      alt={alt}
      fill
      variant={variant}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
