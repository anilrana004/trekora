import { useRouterState } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  consumePopNavigation,
  getScrollY,
  readRouteScroll,
  restoreScrollPosition,
  routeScrollKey,
  saveRouteScroll,
  scrollToHash,
  scrollToPageTop,
  type ScrollRoot,
} from "@/lib/route-scroll";

type UseRouteScrollManagerOptions = {
  /** When set, scroll is tracked on this element (e.g. admin main panel). */
  scrollRoot?: HTMLElement | null;
};

/**
 * Global scroll restoration for layout routes:
 * - Forward → top (or hash)
 * - Back/forward → previous scroll position
 */
export function useRouteScrollManager(
  options: UseRouteScrollManagerOptions = {},
): void {
  const { scrollRoot: scrollRootEl } = options;
  const location = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      searchStr: s.location.searchStr,
      hash: s.location.hash,
      historyAction:
        (s as { historyAction?: string }).historyAction ??
        (s.location as { historyAction?: string }).historyAction,
    }),
  });
  const reduceMotion = useReducedMotion();
  const isFirstPath = useRef(true);
  const activeKeyRef = useRef(
    routeScrollKey(location.pathname, location.searchStr),
  );
  const restoreCleanupRef = useRef<(() => void) | null>(null);

  const getRoot = (): ScrollRoot => scrollRootEl ?? window;

  useEffect(() => {
    const key = routeScrollKey(location.pathname, location.searchStr);
    activeKeyRef.current = key;

    return () => {
      restoreCleanupRef.current?.();
      restoreCleanupRef.current = null;
      saveRouteScroll(activeKeyRef.current, getScrollY(getRoot()), getRoot());
    };
  }, [location.pathname, location.searchStr, scrollRootEl]);

  useLayoutEffect(() => {
    const key = routeScrollKey(location.pathname, location.searchStr);

    if (isFirstPath.current) {
      isFirstPath.current = false;
      activeKeyRef.current = key;
      const root = getRoot();
      if (location.hash) {
        const id = window.requestAnimationFrame(() => {
          scrollToHash(location.hash, !reduceMotion, root);
        });
        return () => window.cancelAnimationFrame(id);
      }
      scrollToPageTop(root);
      return;
    }

    restoreCleanupRef.current?.();
    restoreCleanupRef.current = null;

    const root = getRoot();

    const run = () => {
      if (location.hash && scrollToHash(location.hash, !reduceMotion, root)) {
        return;
      }

      const isPop =
        consumePopNavigation() ||
        location.historyAction === "POP" ||
        location.historyAction === "GO";

      if (isPop) {
        const saved = readRouteScroll(key);
        if (saved !== null) {
          restoreCleanupRef.current = restoreScrollPosition(saved, root);
          return;
        }
      }

      scrollToPageTop(root);
    };

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run);
    });

    activeKeyRef.current = key;
    return () => {
      window.cancelAnimationFrame(id);
      restoreCleanupRef.current?.();
      restoreCleanupRef.current = null;
    };
  }, [
    location.pathname,
    location.searchStr,
    location.hash,
    location.historyAction,
    reduceMotion,
    scrollRootEl,
  ]);
}
