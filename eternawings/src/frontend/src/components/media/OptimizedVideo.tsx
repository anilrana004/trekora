import { buildOptimizedImageUrl } from "@/lib/images/cloudinary-url";
import { buildOptimizedVideoUrl } from "@/utils/mediaTransform";
import { type VideoHTMLAttributes, useMemo } from "react";

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
  maxWidth?: number;
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
  maxWidth = 1920,
  muted = true,
  playsInline = true,
  loop,
  autoPlay,
  ...rest
}: OptimizedVideoProps) {
  const optimizedSrc = useMemo(
    () => buildOptimizedVideoUrl(src, { width: maxWidth }),
    [src, maxWidth],
  );

  const optimizedPoster = useMemo(
    () =>
      poster ? buildOptimizedImageUrl(poster, { width: 1200 }) : undefined,
    [poster],
  );

  return (
    <video
      {...rest}
      src={optimizedSrc}
      poster={optimizedPoster}
      muted={muted}
      playsInline={playsInline}
      loop={loop}
      autoPlay={autoPlay}
      preload={priority ? "auto" : "metadata"}
      className={cn(
        fill && "absolute inset-0 h-full w-full object-cover",
        className,
      )}
    />
  );
}
