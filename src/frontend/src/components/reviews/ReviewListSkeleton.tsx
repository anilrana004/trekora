export default function ReviewListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      className="space-y-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading reviews"
    >
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={`review-skel-${i}`}
          className="rounded-xl p-4"
          style={{ border: "1px solid var(--ew-gray-mid)" }}
        >
          <div className="flex gap-3">
            <div
              className="h-10 w-10 rounded-full shrink-0"
              style={{ background: "var(--ew-gray-mid)" }}
            />
            <div className="flex-1 space-y-2">
              <div
                className="h-3 w-32 rounded"
                style={{ background: "var(--ew-gray-mid)" }}
              />
              <div
                className="h-3 w-full rounded"
                style={{ background: "var(--ew-gray-lt)" }}
              />
              <div
                className="h-3 w-4/5 rounded"
                style={{ background: "var(--ew-gray-lt)" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
