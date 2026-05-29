/**
 * Route pending fallback — intentionally minimal (no spinner) so fast preloaded
 * navigations never flash a “buffering” state on desktop or mobile.
 */
export default function PageLoader() {
  return (
    <div
      className="route-pending-fallback"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      aria-busy="true"
    />
  );
}
