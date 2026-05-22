import { RESPONSIVE_IMAGE_WIDTHS } from "@/lib/images/breakpoints";
import {
  buildBlurPlaceholderUrl,
  buildOptimizedImageUrl,
  buildResponsiveSrcSet,
} from "@/lib/images/cloudinary-url";
import { type ImgHTMLAttributes, forwardRef, useMemo, useState } from "react";

export type ImageVariant =
  | "trek-card"
  | "yatra-card"
  | "hero"
  | "gallery-thumb"
  | "gallery-full"
  | "destination"
  | "avatar"
  | "blog-card"
  | "thumbnail"
  | "banner-strip"
  | "default";

const VARIANT_SIZES: Record<ImageVariant, string> = {
  "trek-card": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  "yatra-card": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  hero: "(max-width: 1024px) 100vw, 50vw",
  "gallery-thumb": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  "gallery-full": "(max-width: 1920px) 90vw, 1728px",
  destination: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
  avatar: "48px",
  "blog-card": "(max-width: 640px) 85vw, 256px",
  thumbnail: "64px",
  "banner-strip": "(max-width: 768px) 40vw, 200px",
  default: "100vw",
};

const VARIANT_WIDTHS: Record<ImageVariant, readonly number[]> = {
  "trek-card": [384, 640, 828, 960],
  "yatra-card": [384, 640, 828, 960],
  hero: [640, 828, 1080, 1200, 1440, 1920],
  "gallery-thumb": [400, 600, 800, 1000, 1200],
  "gallery-full": [1080, 1440, 1680, 1920],
  destination: [480, 720, 960, 1200],
  avatar: [64, 96, 128, 160],
  "blog-card": [256, 384, 512, 640],
  thumbnail: [96, 128, 192, 256],
  "banner-strip": [200, 320, 400, 480],
  default: [...RESPONSIVE_IMAGE_WIDTHS],
};

export type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes" | "loading" | "decoding" | "fetchPriority" | "alt"
> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  variant?: ImageVariant;
  /**
   * Blur-up LQIP: tiny Cloudinary-blurred layer + fade-in on load.
   * Use with `fill` or explicit `width` + `height` for stable layout.
   */
  blurUp?: boolean;
};

function cn(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  function OptimizedImage(
    {
      src,
      alt,
      width,
      height,
      fill,
      sizes,
      priority,
      variant = "default",
      blurUp = false,
      className,
      style,
      onLoad: onLoadProp,
      ...rest
    },
    ref,
  ) {
    const [loaded, setLoaded] = useState(!blurUp);
    /** Matches `index.css` lazy fade: `img[loading="lazy"]` starts at opacity 0 until `.loaded`. */
    const [lazyRevealed, setLazyRevealed] = useState(false);
    const widths = VARIANT_WIDTHS[variant];
    const resolvedSizes = sizes ?? VARIANT_SIZES[variant];

    const skipResponsive =
      src.startsWith("blob:") ||
      src.startsWith("data:") ||
      src.startsWith("chrome-extension:");

    const srcSet = useMemo(
      () => (skipResponsive ? undefined : buildResponsiveSrcSet(src, widths)),
      [src, widths, skipResponsive],
    );

    const fallbackSrc = useMemo(() => {
      if (skipResponsive) return src;
      const mid =
        widths[Math.min(widths.length - 1, Math.floor(widths.length / 2))];
      return buildOptimizedImageUrl(src, { width: mid });
    }, [src, widths, skipResponsive]);

    const blurPlaceholderSrc = useMemo(
      () => (blurUp && !skipResponsive ? buildBlurPlaceholderUrl(src) : ""),
      [blurUp, src, skipResponsive],
    );

    const loading: ImgHTMLAttributes<HTMLImageElement>["loading"] = priority
      ? "eager"
      : "lazy";
    const decoding: "async" | "sync" = "async";
    const fetchPriority = priority ? "high" : "auto";

    const needsDefaultCover =
      !fill &&
      variant !== "gallery-thumb" &&
      variant !== "gallery-full" &&
      variant !== "avatar";

    const mergedClass = fill
      ? ["absolute inset-0 h-full w-full object-cover", className]
          .filter(Boolean)
          .join(" ")
      : [needsDefaultCover ? "object-cover" : "", className]
          .filter(Boolean)
          .join(" ");

    const canBlurLayout = Boolean(
      blurPlaceholderSrc.length > 0 && (fill || (width && height)),
    );

    const imgNode = (
      <img
        ref={ref}
        {...rest}
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={srcSet ? resolvedSizes : undefined}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={cn(
          mergedClass,
          canBlurLayout &&
            "relative z-[1] transition-opacity duration-500 ease-out",
          canBlurLayout && (loaded ? "opacity-100" : "opacity-0"),
          loading === "lazy" && lazyRevealed && "loaded",
        )}
        style={style}
        onLoad={(e) => {
          if (canBlurLayout) setLoaded(true);
          if (loading === "lazy") setLazyRevealed(true);
          onLoadProp?.(e);
        }}
      />
    );

    if (!canBlurLayout) {
      return imgNode;
    }

    return (
      <span
        className={cn(
          "relative isolate inline-block max-w-full overflow-hidden",
          fill && "absolute inset-0 block h-full w-full max-w-none",
        )}
        style={
          !fill && width && height
            ? { width, height, maxWidth: "100%" }
            : undefined
        }
      >
        <img
          src={blurPlaceholderSrc}
          alt=""
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover",
            "scale-105 blur-sm",
          )}
          loading="eager"
          decoding="async"
        />
        {imgNode}
      </span>
    );
  },
);

export default OptimizedImage;
