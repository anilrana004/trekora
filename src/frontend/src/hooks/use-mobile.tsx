import { useEffect, useState } from "react";

function readIsMobile(breakpoint: number): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
}

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => readIsMobile(breakpoint));

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/** Synchronous viewport check — use when a freshly mounted overlay must pick layout immediately. */
export function isMobileViewport(breakpoint = 768): boolean {
  return readIsMobile(breakpoint);
}
