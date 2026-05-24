import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Route outlet with a short cross-fade (standard SPA feel).
 * Avoids layout animations that previously caused white-screen flashes.
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
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, reduceMotion]);

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="route-transition-root"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
