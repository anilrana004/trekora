import { cn } from "@/lib/utils";

type MediaSkeletonProps = {
  className?: string;
  /** Fixed aspect ratio box, e.g. "16/9" */
  aspectRatio?: string;
};

export default function MediaSkeleton({
  className,
  aspectRatio,
}: MediaSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[var(--ew-gray-mid)]",
        className,
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
      aria-hidden
    />
  );
}
