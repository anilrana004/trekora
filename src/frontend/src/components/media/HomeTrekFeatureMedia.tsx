import { homeTrekReelVideo } from "@/data/trek-reels";
import { useEffect, useState } from "react";
import OptimizedImage, { type ImageVariant } from "./OptimizedImage";
import OptimizedVideo from "./OptimizedVideo";

type HomeTrekFeatureMediaProps = {
  image: string;
  alt: string;
  trekSlug: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  variant?: ImageVariant;
  /** Phone reel video — homepage promos only; use ProductDetailHeroMedia on detail carousels. */
  showMobileReel?: boolean;
};

/**
 * Trek feature frame: reel video on phone (when enabled), photo on desktop (lg+).
 */
export default function HomeTrekFeatureMedia({
  image,
  alt,
  trekSlug,
  sizes,
  className = "media-frame__img object-cover",
  priority,
  variant = "hero",
  showMobileReel = true,
}: HomeTrekFeatureMediaProps) {
  const reelVideo = showMobileReel ? homeTrekReelVideo(trekSlug) : undefined;
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [reelVideo, trekSlug]);

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
