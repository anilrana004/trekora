import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchGallery,
  type GalleryApiItem,
  type ProductKind,
} from "@/lib/reviews-api";

/**
 * Trekker Photos for one trek/yatra — loads once per slug, no global refresh loop.
 */
export function useTrekkerPhotos(
  trekSlug: string,
  productType: ProductKind,
) {
  const [photos, setPhotos] = useState<GalleryApiItem[]>([]);
  const [loading, setLoading] = useState(Boolean(trekSlug));
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const reload = useCallback(
    async (silent = false) => {
      const slug = trekSlug.trim().toLowerCase();
      if (!slug) {
        setPhotos([]);
        setLoading(false);
        return;
      }

      const reqId = ++requestIdRef.current;
      if (!silent) setLoading(true);
      setError(null);

      try {
        const res = await fetchGallery({
          trekSlug: slug,
          type: productType,
          limit: 48,
          includeCloudinary: false,
        });
        if (reqId !== requestIdRef.current) return;

        if (!res.success) {
          setError(res.message ?? "Could not load trekker photos");
          if (!silent) setPhotos([]);
        } else {
          setPhotos(res.items ?? []);
        }
      } catch {
        if (reqId !== requestIdRef.current) return;
        setError("Could not load trekker photos.");
        if (!silent) setPhotos([]);
      } finally {
        if (reqId === requestIdRef.current) setLoading(false);
      }
    },
    [trekSlug, productType],
  );

  useEffect(() => {
    void reload(false);
  }, [reload]);

  useEffect(() => {
    const onRefresh = (ev: Event) => {
      const detail = (ev as CustomEvent<{ trekSlug?: string; type?: string }>)
        .detail;
      const slug = trekSlug.trim().toLowerCase();
      if (detail?.trekSlug && detail.trekSlug !== slug) return;
      if (detail?.type && detail.type !== productType) return;
      void reload(true);
    };
    window.addEventListener("trekora-gallery-refresh", onRefresh);
    return () =>
      window.removeEventListener("trekora-gallery-refresh", onRefresh);
  }, [trekSlug, productType, reload]);

  return {
    photos,
    loading: loading && photos.length === 0,
    error,
    reload,
  };
}
