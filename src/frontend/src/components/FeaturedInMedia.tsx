import { isVideoMediaUrl } from "@/lib/media-url";
import OptimizedImage from "./media/OptimizedImage";
import OptimizedVideo from "./media/OptimizedVideo";

export type FeaturedInItem = {
  name: string;
  /** Image logo URL (press / partner). */
  logoSrc?: string;
  /** Optional inline video instead of a still logo. */
  videoSrc?: string;
};

type FeaturedInMediaProps = {
  item: FeaturedInItem;
  className?: string;
};

/** Renders a press / partner logo as image or muted looping video. */
export default function FeaturedInMedia({
  item,
  className = "h-9 w-auto max-w-[min(180px,40vw)] object-contain opacity-75",
}: FeaturedInMediaProps) {
  const videoSrc =
    item.videoSrc ??
    (item.logoSrc && isVideoMediaUrl(item.logoSrc) ? item.logoSrc : undefined);
  const imageSrc =
    item.logoSrc && !isVideoMediaUrl(item.logoSrc) ? item.logoSrc : undefined;

  if (videoSrc) {
    return (
      <span className="inline-flex items-center justify-center max-w-[min(180px,40vw)]">
        <OptimizedVideo
          src={videoSrc}
          poster={imageSrc}
          width={200}
          height={48}
          muted
          loop
          playsInline
          autoPlay
          className={`${className} max-h-9 rounded`}
        />
      </span>
    );
  }

  if (!imageSrc) return null;

  return (
    <OptimizedImage
      src={imageSrc}
      alt={item.name}
      width={200}
      height={48}
      variant="blog-card"
      className={className}
    />
  );
}
