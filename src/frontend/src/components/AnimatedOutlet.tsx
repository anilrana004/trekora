import { Outlet, useRouterState } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Renders the matched route and scrolls to top on pathname changes.
 * (Route transitions previously used `motion` + `AnimatePresence`; that led to
 * an all-white viewport on some setups when the enter animation never completed.)
 */
export default function AnimatedOutlet() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const reduceMotion = useReducedMotion();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    void pathname;
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, reduceMotion]);

  return <Outlet />;
}
