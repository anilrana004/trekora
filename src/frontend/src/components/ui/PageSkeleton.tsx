/** Route-level loading placeholder — reduces layout shift vs spinner-only. */
export default function PageSkeleton() {
  return (
    <div
      className="page-skeleton mx-auto w-full max-w-6xl px-4 py-10 sm:py-14"
      role="status"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="page-skeleton__hero mb-8 rounded-2xl" />
      <div className="mb-4 flex gap-3">
        <div className="page-skeleton__pill h-8 w-24 rounded-full" />
        <div className="page-skeleton__pill h-8 w-32 rounded-full" />
      </div>
      <div className="page-skeleton__line mb-3 h-8 w-2/3 max-w-md rounded-lg" />
      <div className="page-skeleton__line mb-8 h-4 w-full max-w-xl rounded-md" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["a", "b", "c", "d", "e", "f"].map((id) => (
          <div key={id} className="page-skeleton__card rounded-xl" />
        ))}
      </div>
    </div>
  );
}
