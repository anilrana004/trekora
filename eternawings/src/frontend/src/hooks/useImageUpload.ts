import { uploadToCloudinary } from "@/lib/images/cloudinary-upload";
import type {
  CloudinaryAsset,
  CloudinaryFolderKey,
} from "@/lib/images/upload-types";
import { useCallback, useMemo, useRef, useState } from "react";

export interface UploadItem {
  id: string;
  file: File;
  status: "queued" | "uploading" | "success" | "error";
  progress: number;
  previewUrl: string;
  error?: string;
  asset?: CloudinaryAsset;
}

interface UseCloudinaryUploadOptions {
  folder?: CloudinaryFolderKey;
}

function createUploadId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useImageUpload(options: UseCloudinaryUploadOptions = {}) {
  const { folder = "gallery" } = options;
  const [items, setItems] = useState<UploadItem[]>([]);
  const controllersRef = useRef(new Map<string, AbortController>());

  const queueFiles = useCallback((files: FileList | File[]) => {
    const list = Array.from(files);
    const queued = list.map<UploadItem>((file) => ({
      id: createUploadId(),
      file,
      status: "queued",
      progress: 0,
      previewUrl: URL.createObjectURL(file),
    }));
    setItems((prev) => [...prev, ...queued]);
    return queued.map((q) => q.id);
  }, []);

  const uploadOne = useCallback(
    async (id: string): Promise<CloudinaryAsset | undefined> => {
      let snapshot: UploadItem | undefined;
      setItems((prev) => {
        snapshot = prev.find((i) => i.id === id);
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "uploading" as const,
                progress: 0,
                error: undefined,
              }
            : item,
        );
      });

      if (!snapshot) return undefined;

      const controller = new AbortController();
      controllersRef.current.set(id, controller);

      try {
        const asset = await uploadToCloudinary({
          file: snapshot.file,
          folder,
          onProgress: (progress) => {
            setItems((prev) =>
              prev.map((item) =>
                item.id === id
                  ? { ...item, progress: progress.percentage }
                  : item,
              ),
            );
          },
          signal: controller.signal,
        });

        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "success",
                  progress: 100,
                  asset,
                  error: undefined,
                }
              : item,
          ),
        );
        return asset;
      } catch (error) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "error",
                  error:
                    error instanceof Error
                      ? error.message
                      : "Upload failed. Please retry.",
                }
              : item,
          ),
        );
        return undefined;
      } finally {
        controllersRef.current.delete(id);
      }
    },
    [folder],
  );

  const uploadQueued = useCallback(async (): Promise<CloudinaryAsset[]> => {
    const collected: CloudinaryAsset[] = [];
    const ids = items
      .filter((item) => item.status === "queued" || item.status === "error")
      .map((item) => item.id);
    for (const id of ids) {
      const asset = await uploadOne(id);
      if (asset) collected.push(asset);
    }
    return collected;
  }, [items, uploadOne]);

  const cancel = useCallback((id: string) => {
    const controller = controllersRef.current.get(id);
    if (controller) controller.abort();
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clear = useCallback(() => {
    for (const [, controller] of controllersRef.current) controller.abort();
    controllersRef.current.clear();
    setItems((prev) => {
      for (const item of prev) URL.revokeObjectURL(item.previewUrl);
      return [];
    });
  }, []);

  const successfulAssets = useMemo(
    () =>
      items
        .map((item) => item.asset)
        .filter((a): a is CloudinaryAsset => Boolean(a)),
    [items],
  );

  return {
    items,
    queueFiles,
    uploadOne,
    uploadQueued,
    cancel,
    clear,
    successfulAssets,
  };
}

/** Preferred name — uploads images or videos via Cloudinary unsigned preset. */
export const useCloudinaryUpload = useImageUpload;
