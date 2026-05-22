import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Wraps `<Outlet />` with a short fade/slide when the pathname changes,
 * and smoothly scrolls to top so trek/yatra detail pages open cleanly.
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

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
