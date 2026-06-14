import { homeTrekReelVideo } from "@/data/trek-reels";
import { useEffect, useState, type ReactNode } from "react";
import OptimizedImage, { type ImageVariant } from "./OptimizedImage";
import OptimizedVideo from "./OptimizedVideo";

type ListingCardMediaProps = {
  src: string;
  alt: string;
  /** When set, plays homepage reel on phone (lg:hidden). */
  trekSlug?: string;
  variant?: Extract<ImageVariant, "trek-card" | "yatra-card">;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Shared 16:9 media frame for trek & yatra listing cards (home, /treks, /yatras).
 * Cloudinary delivery (fill + g_auto) is applied via OptimizedImage variant presets.
 */
export default function ListingCardMedia({
  src,
  alt,
  trekSlug,
  variant = "trek-card",
  priority,
  children,
  className,
}: ListingCardMediaProps) {
  const reelVideo = trekSlug ? homeTrekReelVideo(trekSlug) : undefined;
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [reelVideo, trekSlug]);

  return (
    <div className={cn("listing-card-media", className)}>
      {reelVideo && !videoFailed ? (
        <>
          <OptimizedVideo
            src={reelVideo}
            poster={src}
            profile="card-mobile"
            fill
            muted
            loop
            playsInline
            autoPlay
            priority={priority}
            className="listing-card-media__img pointer-events-none lg:hidden"
            aria-label={`${alt} trek reel`}
            onVideoError={() => setVideoFailed(true)}
          />
          <OptimizedImage
            src={src}
            alt={alt}
            fill
            variant={variant}
            priority={priority}
            className="listing-card-media__img hidden lg:block"
          />
        </>
      ) : (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          variant={variant}
          priority={priority}
          className="listing-card-media__img"
        />
      )}
      {children}
    </div>
  );
}
