import { useIsMobile } from "@/hooks/use-mobile";
import { buildOptimizedImageUrl } from "@/lib/images/cloudinary-url";
import {
  buildOptimizedVideoUrl,
  type VideoDeliveryProfile,
  videoWidthForProfile,
} from "@/utils/mediaTransform";
import { type VideoHTMLAttributes, useEffect, useMemo, useRef } from "react";

export type OptimizedVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "poster"
> & {
  src: string;
  /** Poster frame (any image URL; optimized via Cloudinary fetch). */
  poster?: string;
  /** Fill parent like OptimizedImage `fill` (parent must be `relative` + sized). */
  fill?: boolean;
  /** Hero / above-fold: preload more aggressively. */
  priority?: boolean;
  /** Explicit max width, or use `profile` for presets. */
  maxWidth?: number;
  /** Mobile-friendly Cloudinary delivery preset (overrides maxWidth when set). */
  profile?: VideoDeliveryProfile;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function OptimizedVideo({
  src,
  poster,
  fill,
  priority,
  className,
  maxWidth,
  profile,
  muted = true,
  playsInline = true,
  loop,
  autoPlay,
  ...rest
}: OptimizedVideoProps) {
  const isMobile = useIsMobile(1024);
  const videoRef = useRef<HTMLVideoElement>(null);

  const deliveryWidth = useMemo(() => {
    if (maxWidth) return maxWidth;
    if (profile) return videoWidthForProfile(profile);
    return isMobile ? 720 : 1280;
  }, [maxWidth, profile, isMobile]);

  const optimizedSrc = useMemo(
    () => buildOptimizedVideoUrl(src, { width: deliveryWidth }),
    [src, deliveryWidth],
  );

  const optimizedPoster = useMemo(
    () =>
      poster ? buildOptimizedImageUrl(poster, { width: 1200 }) : undefined,
    [poster],
  );

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.12, rootMargin: "64px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, optimizedSrc]);

  return (
    <video
      {...rest}
      ref={videoRef}
      src={optimizedSrc}
      poster={optimizedPoster}
      muted={muted}
      playsInline={playsInline}
      loop={loop}
      autoPlay={autoPlay}
      preload={priority ? "auto" : "metadata"}
      disablePictureInPicture
      className={cn(
        fill && "absolute inset-0 h-full w-full object-cover",
        className,
      )}
    />
  );
}
