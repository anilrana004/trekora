import { buildOptimizedImageUrl } from "@/lib/images/cloudinary-url";
import {
  type VideoDeliveryProfile,
  buildOptimizedVideoUrl,
  videoWidthForProfile,
} from "@/utils/mediaTransform";
import {
  type VideoHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type OptimizedVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  "src" | "poster"
> & {
  src: string;
  poster?: string;
  fill?: boolean;
  priority?: boolean;
  maxWidth?: number;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useRawSrc, setUseRawSrc] = useState(false);

  const deliveryWidth = useMemo(() => {
    if (maxWidth) return maxWidth;
    if (profile) return videoWidthForProfile(profile);
    return 720;
  }, [maxWidth, profile]);

  const optimizedSrc = useMemo(
    () => buildOptimizedVideoUrl(src, { width: deliveryWidth }),
    [src, deliveryWidth],
  );

  const activeSrc = useRawSrc ? src : optimizedSrc;

  const optimizedPoster = useMemo(
    () => (poster ? buildOptimizedImageUrl(poster, { width: 720 }) : undefined),
    [poster],
  );

  useEffect(() => {
    setUseRawSrc(false);
  }, [src, optimizedSrc]);

  useEffect(() => {
    const el = videoRef.current;
    return () => {
      el?.pause();
    };
  }, []);

  const tryPlay = useCallback(async (el: HTMLVideoElement) => {
    el.muted = true;
    try {
      await el.play();
    } catch {
      /* iOS may block until user gesture — poster stays visible */
    }
  }, []);

  const handleError = useCallback(() => {
    if (!useRawSrc) {
      setUseRawSrc(true);
    }
  }, [useRawSrc]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoPlay) return;

    const onReady = () => {
      void tryPlay(el);
    };

    if (priority) {
      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        onReady();
      } else {
        el.addEventListener("loadeddata", onReady, { once: true });
        el.addEventListener("canplay", onReady, { once: true });
      }
      return () => {
        el.removeEventListener("loadeddata", onReady);
        el.removeEventListener("canplay", onReady);
      };
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          void tryPlay(el);
        } else {
          el.pause();
        }
      },
      { threshold: 0.15, rootMargin: "48px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, priority, activeSrc, tryPlay]);

  return (
    <video
      {...rest}
      ref={videoRef}
      key={activeSrc}
      src={activeSrc}
      poster={optimizedPoster}
      muted={muted}
      playsInline={playsInline}
      loop={loop}
      autoPlay={autoPlay}
      preload={priority ? "auto" : "metadata"}
      disablePictureInPicture
      onError={handleError}
      className={cn(
        fill && "absolute inset-0 h-full w-full object-cover",
        className,
      )}
    />
  );
}
