/** Route-level loading fallback — used by router Suspense and pending states. */
export default function PageLoader() {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center gap-3 px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div
        className="w-10 h-10 border-4 border-[#E87722] border-t-transparent rounded-full animate-spin"
        aria-hidden
      />
      <p className="text-sm m-0" style={{ color: "var(--ew-gray-dark)" }}>
        Loading…
      </p>
    </div>
  );
}
