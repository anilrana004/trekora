import { getCloudinaryCloudName } from "@/lib/images/cloudinary-config";
import { uploadToCloudinary } from "@/lib/images/cloudinary-upload";
import type {
  CloudinaryAsset,
  CloudinaryFolderKey,
} from "@/lib/images/upload-types";
import { withRetry } from "@/lib/retry";
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
  folderPath?: string;
  tags?: string[];
  context?: Record<string, string>;
}

function createUploadId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useImageUpload(options: UseCloudinaryUploadOptions = {}) {
  const { folder = "gallery", folderPath, tags, context } = options;
  const [items, setItems] = useState<UploadItem[]>([]);
  const itemsRef = useRef<UploadItem[]>([]);
  const controllersRef = useRef(new Map<string, AbortController>());

  const syncItems = useCallback((next: UploadItem[]) => {
    itemsRef.current = next;
    setItems(next);
  }, []);

  const queueFiles = useCallback(
    (files: FileList | File[]) => {
      const list = Array.from(files);
      const queued = list.map<UploadItem>((file) => ({
        id: createUploadId(),
        file,
        status: "queued",
        progress: 0,
        previewUrl: URL.createObjectURL(file),
      }));
      syncItems([...itemsRef.current, ...queued]);
      return queued.map((q) => q.id);
    },
    [syncItems],
  );

  const uploadOne = useCallback(
    async (id: string): Promise<CloudinaryAsset | undefined> => {
      const snapshot = itemsRef.current.find((i) => i.id === id);
      if (!snapshot?.file) return undefined;

      const controller = new AbortController();
      controllersRef.current.set(id, controller);

      syncItems(
        itemsRef.current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "uploading" as const,
                progress: 0,
                error: undefined,
              }
            : item,
        ),
      );

      try {
        const asset = await withRetry(
          () =>
            uploadToCloudinary({
              file: snapshot.file,
              folder,
              folderPath,
              tags,
              context,
              onProgress: (progress) => {
                const pct = progress.percentage;
                syncItems(
                  itemsRef.current.map((item) =>
                    item.id === id ? { ...item, progress: pct } : item,
                  ),
                );
              },
              signal: controller.signal,
            }),
          {
            attempts: 2,
            delayMs: 800,
            shouldRetry: (err) =>
              !(err instanceof DOMException && err.name === "AbortError"),
          },
        );

        syncItems(
          itemsRef.current.map((item) =>
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
        const message =
          error instanceof Error
            ? error.message
            : "Upload failed. Please retry.";
        syncItems(
          itemsRef.current.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "error",
                  error: message,
                }
              : item,
          ),
        );
        return undefined;
      } finally {
        controllersRef.current.delete(id);
      }
    },
    [folder, folderPath, tags, context, syncItems],
  );

  /** Upload every queued/failed file; include files already marked success. */
  const uploadAllForSubmit = useCallback(async (): Promise<{
    assets: CloudinaryAsset[];
    errors: string[];
  }> => {
    const collected: CloudinaryAsset[] = [];
    const errors: string[] = [];
    const current = [...itemsRef.current];

    for (const item of current) {
      if (item.status === "success" && item.asset) {
        collected.push(item.asset);
        continue;
      }
      if (item.status === "queued" || item.status === "error") {
        const asset = await uploadOne(item.id);
        if (asset) collected.push(asset);
        else {
          const latest = itemsRef.current.find((i) => i.id === item.id);
          errors.push(latest?.error ?? `Failed to upload ${item.file.name}`);
        }
      }
    }

    return { assets: collected, errors };
  }, [uploadOne]);

  const cancel = useCallback(
    (id: string) => {
      const controller = controllersRef.current.get(id);
      if (controller) controller.abort();
      const item = itemsRef.current.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      syncItems(itemsRef.current.filter((i) => i.id !== id));
    },
    [syncItems],
  );

  const clear = useCallback(() => {
    for (const [, controller] of controllersRef.current) controller.abort();
    controllersRef.current.clear();
    for (const item of itemsRef.current) URL.revokeObjectURL(item.previewUrl);
    syncItems([]);
  }, [syncItems]);

  /** @deprecated Prefer uploadAllForSubmit — kept for review/admin forms. */
  const uploadQueued = useCallback(async (): Promise<CloudinaryAsset[]> => {
    const { assets } = await uploadAllForSubmit();
    return assets;
  }, [uploadAllForSubmit]);

  const successfulAssets = useMemo(
    () =>
      items
        .map((item) => item.asset)
        .filter((a): a is CloudinaryAsset => Boolean(a)),
    [items],
  );

  const cloudinaryReady = useMemo(() => {
    const cloud = getCloudinaryCloudName();
    const preset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ??
      import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    return Boolean(cloud && preset && String(preset).trim());
  }, []);

  return {
    items,
    queueFiles,
    uploadOne,
    uploadQueued,
    uploadAllForSubmit,
    cancel,
    clear,
    successfulAssets,
    cloudinaryReady,
  };
}

export const useCloudinaryUpload = useImageUpload;
