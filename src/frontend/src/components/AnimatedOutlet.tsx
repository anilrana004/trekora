import { Outlet, useRouterState } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Route outlet — instant swap (no wait-mode fade) so navigation never feels like buffering.
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
        behavior: "auto",
      });
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname, reduceMotion]);

  return (
    <div className="route-transition-root" key={pathname}>
      <Outlet />
    </div>
  );
}
