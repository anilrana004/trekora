/**
 * SkeletonCard — shimmer placeholder that matches TrekCard dimensions.
 * Used while trek/yatra lists are loading.
 */
export default function SkeletonCard() {
  return (
    <div
      className="card flex-none w-full flex flex-col h-full"
      aria-hidden="true"
      data-ocid="skeleton.card"
    >
      {/* Image area — matches TrekCard h-52 */}
      <div className="skeleton w-full h-52 shrink-0" />

      {/* Content */}
      <div className="p-5 space-y-2">
        {/* Title */}
        <div className="skeleton h-4 rounded w-3/4" />
        {/* Subtitle row */}
        <div className="flex gap-2">
          <div className="skeleton h-3 rounded w-1/4" />
          <div className="skeleton h-3 rounded w-1/4" />
        </div>
        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-1">
          <div className="skeleton h-5 rounded w-1/3" />
          <div className="skeleton h-8 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * SkeletonCardRow — horizontal row of N skeleton cards for carousel contexts.
 */
export function SkeletonCardRow({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <div key={`sk-${i + 1}`} className="flex-none w-64">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
