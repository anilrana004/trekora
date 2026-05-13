import { useEffect, useRef, useState } from "react";

/**
 * Returns { hasReached40Percent } — true once the user scrolls 40% of page height.
 * Stays true and never resets. Uses IntersectionObserver on a sentinel div.
 */
export function useScrollDepth() {
  const [hasReached40Percent, setHasReached40Percent] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasReached40Percent) return;

    // Create sentinel div at 40% of document height
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "40%";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.style.visibility = "hidden";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setHasReached40Percent(true));
            observer.disconnect();
          }
        }
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (sentinelRef.current && document.body.contains(sentinelRef.current)) {
        document.body.removeChild(sentinelRef.current);
      }
    };
  }, [hasReached40Percent]);

  return { hasReached40Percent };
}
