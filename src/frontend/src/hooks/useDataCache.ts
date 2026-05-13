import { useCallback, useEffect, useRef, useState } from "react";

export function useDataCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
): { data: T | null; isLoading: boolean; refresh: () => void } {
  const [data, setData] = useState<T | null>(() => {
    try {
      const raw = sessionStorage.getItem(key);
      const ts = sessionStorage.getItem(`${key}_time`);
      if (raw && ts && Date.now() - Number(ts) < ttlMs) {
        return JSON.parse(raw) as T;
      }
    } catch {
      // ignore parse errors
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(data === null);
  const fetchRef = useRef(fetcher);
  fetchRef.current = fetcher;

  const load = useCallback(
    (background = false) => {
      if (!background) setIsLoading(true);
      fetchRef
        .current()
        .then((result) => {
          setData(result);
          try {
            sessionStorage.setItem(key, JSON.stringify(result));
            sessionStorage.setItem(`${key}_time`, String(Date.now()));
          } catch {
            // quota exceeded — silently ignore
          }
        })
        .catch(() => {
          // silently ignore; stale data remains
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [key],
  );

  useEffect(() => {
    if (data !== null) {
      // Cache hit — do a background refresh only if stale
      try {
        const ts = sessionStorage.getItem(`${key}_time`);
        const stale = !ts || Date.now() - Number(ts) >= ttlMs;
        if (stale) load(true);
      } catch {
        load(true);
      }
    } else {
      load(false);
    }
  }, [key, data, load, ttlMs]);

  const refresh = useCallback(() => load(false), [load]);

  return { data, isLoading, refresh };
}
