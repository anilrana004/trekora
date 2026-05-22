import { homeTrekReelVideo } from "@/data/trek-reels";
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
};

/**
 * Trek feature frame: reel video on phone, photo on desktop (lg+).
 */
export default function HomeTrekFeatureMedia({
  image,
  alt,
  trekSlug,
  sizes,
  className = "media-frame__img object-cover",
  priority,
  variant = "hero",
}: HomeTrekFeatureMediaProps) {
  const reelVideo = homeTrekReelVideo(trekSlug);

  if (reelVideo) {
    return (
      <>
        <OptimizedVideo
          src={reelVideo}
          poster={image}
          fill
          muted
          loop
          playsInline
          autoPlay
          priority={priority}
          className={`${className} lg:hidden`}
          aria-label={`${alt} trek reel`}
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
      </>
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
