const SCROLL_PREFIX = "trekora-scroll:";
const MEMORY_CACHE = new Map<string, number>();
const MAX_CACHE_ENTRIES = 80;

/** Set by `popstate` before the router updates — used to restore scroll on back/forward. */
let pendingPopNavigation = false;

export type ScrollRoot = Window | HTMLElement;

export function routeScrollKey(pathname: string, search: string): string {
  return `${pathname}${search}`;
}

function trimCache(): void {
  if (MEMORY_CACHE.size <= MAX_CACHE_ENTRIES) return;
  const drop = MEMORY_CACHE.size - MAX_CACHE_ENTRIES;
  const keys = MEMORY_CACHE.keys();
  for (let i = 0; i < drop; i++) {
    const k = keys.next().value;
    if (k) MEMORY_CACHE.delete(k);
  }
}

function isWindowRoot(root: ScrollRoot): root is Window {
  return root === window;
}

export function getScrollY(root: ScrollRoot = window): number {
  if (isWindowRoot(root)) {
    return (
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
  return root.scrollTop;
}

export function setScrollY(root: ScrollRoot, y: number): void {
  const top = Math.max(0, Math.round(y));
  if (isWindowRoot(root)) {
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
    return;
  }
  root.scrollTop = top;
}

export function saveRouteScroll(
  key: string,
  y: number,
  root: ScrollRoot = window,
): void {
  const top = Math.max(0, Math.round(y));
  MEMORY_CACHE.set(key, top);
  trimCache();
  try {
    sessionStorage.setItem(SCROLL_PREFIX + key, String(top));
  } catch {
    // Storage full or disabled
  }
  if (isWindowRoot(root) && typeof history !== "undefined") {
    try {
      const prev =
        history.state && typeof history.state === "object" ? history.state : {};
      history.replaceState({ ...prev, trekoraScrollY: top }, "");
    } catch {
      // ignore
    }
  }
}

export function readRouteScroll(key: string): number | null {
  if (MEMORY_CACHE.has(key)) {
    return MEMORY_CACHE.get(key) ?? null;
  }
  try {
    const raw = sessionStorage.getItem(SCROLL_PREFIX + key);
    if (raw === null) return null;
    const y = Number(raw);
    if (!Number.isFinite(y)) return null;
    MEMORY_CACHE.set(key, y);
    return y;
  } catch {
    return null;
  }
}

export function consumePopNavigation(): boolean {
  if (!pendingPopNavigation) return false;
  pendingPopNavigation = false;
  return true;
}

export function scrollToHash(
  hash: string,
  smooth: boolean,
  _root: ScrollRoot = window,
): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block: "start",
  });
  return true;
}

/** Forward navigation — instant top avoids layout flicker while lazy routes load. */
export function scrollToPageTop(root: ScrollRoot = window): void {
  setScrollY(root, 0);
}

/**
 * Restore a saved position after paint; retries when lazy content shifts layout.
 */
export function restoreScrollPosition(
  y: number,
  root: ScrollRoot = window,
): () => void {
  const target = Math.max(0, Math.round(y));
  let cancelled = false;
  const apply = () => {
    if (cancelled) return;
    setScrollY(root, target);
  };

  apply();
  let raf1 = 0;
  let raf2 = 0;
  raf1 = window.requestAnimationFrame(() => {
    apply();
    raf2 = window.requestAnimationFrame(apply);
  });

  const t1 = window.setTimeout(apply, 50);
  const t2 = window.setTimeout(apply, 180);
  const onLoad = () => apply();
  window.addEventListener("load", onLoad, { once: true });

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(raf1);
    window.cancelAnimationFrame(raf2);
    window.clearTimeout(t1);
    window.clearTimeout(t2);
    window.removeEventListener("load", onLoad);
  };
}

if (typeof window !== "undefined") {
  window.addEventListener(
    "popstate",
    () => {
      pendingPopNavigation = true;
    },
    { passive: true },
  );

  /** iOS Safari back-forward cache — restore scroll on persisted pageshow. */
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) pendingPopNavigation = true;
    },
    { passive: true },
  );

  /** Flush scroll position before tab close / refresh (helps back navigation). */
  window.addEventListener(
    "pagehide",
    () => {
      try {
        const path = `${window.location.pathname}${window.location.search}`;
        const key = routeScrollKey(path, "");
        saveRouteScroll(key, getScrollY(window));
      } catch {
        /* ignore */
      }
    },
    { passive: true },
  );
}
