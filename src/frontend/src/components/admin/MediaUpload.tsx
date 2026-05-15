import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import type { CloudinaryFolderKey } from "@/lib/images/upload-types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import OptimizedImage from "../media/OptimizedImage";

export interface MediaUploadProps {
  label: string;
  folder: CloudinaryFolderKey;
  multiple?: boolean;
  /** When true, allow video files (uploaded to Cloudinary `video` API). */
  acceptVideo?: boolean;
  onUploaded: (urls: string[]) => void;
}

function isVideoFile(f: File) {
  return f.type.startsWith("video/");
}

export default function MediaUpload({
  label,
  folder,
  multiple,
  acceptVideo = true,
  onUploaded,
}: MediaUploadProps) {
  const [dragging, setDragging] = useState(false);
  const { items, queueFiles, uploadQueued, uploadOne, cancel } =
    useCloudinaryUpload({ folder });

  const hasQueued = useMemo(
    () =>
      items.some((item) => item.status === "queued" || item.status === "error"),
    [items],
  );

  function onFileSelection(files: FileList | null) {
    if (!files || files.length === 0) return;
    queueFiles(files);
  }

  async function runUpload() {
    try {
      const assets = await uploadQueued();
      if (assets.length > 0) {
        onUploaded(assets.map((a) => a.secureUrl));
        toast.success(
          assets.some((a) => a.resourceType === "video")
            ? "Media uploaded to Cloudinary"
            : "Images uploaded to Cloudinary",
        );
      }
    } catch {
      toast.error("Upload failed. Please retry.");
    }
  }

  const accept = acceptVideo ? "image/*,video/*" : "image/*";

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ew-text-lt)]">
        {label}
      </p>

      <label
        className={`block w-full cursor-pointer rounded-lg border border-dashed p-4 text-sm transition-colors ${
          dragging
            ? "border-[var(--ew-orange)] bg-[var(--ew-red-lt)]"
            : "border-[var(--ew-gray-mid)]"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onFileSelection(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => onFileSelection(e.target.files)}
        />
        <span className="font-medium text-[var(--ew-text)]">
          Drag and drop {acceptVideo ? "images or videos" : "images"}, or click
          to browse
        </span>
        <span className="mt-1 block text-xs text-[var(--ew-text-lt)]">
          Destination folder: {folder}
        </span>
      </label>

      {items.length > 0 && (
        <div className="space-y-2 rounded-lg border border-[var(--ew-gray-mid)] p-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              {isVideoFile(item.file) ? (
                <video
                  src={item.previewUrl}
                  muted
                  playsInline
                  className="h-12 w-12 rounded-md object-cover"
                  aria-label={item.file.name}
                />
              ) : (
                <OptimizedImage
                  src={item.previewUrl}
                  alt={item.file.name}
                  variant="thumbnail"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-md"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-[var(--ew-text)]">
                  {item.file.name}
                </p>
                <div className="mt-1 h-1.5 rounded bg-[var(--ew-gray-lt)]">
                  <div
                    className="h-1.5 rounded bg-[var(--ew-orange)] transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-[11px] text-[var(--ew-gray-dark)]">
                  {item.status === "error" ? item.error : `${item.progress}%`}
                </p>
              </div>
              {item.status === "error" ? (
                <button
                  type="button"
                  className="text-xs font-semibold text-[var(--ew-red)]"
                  onClick={() => uploadOne(item.id)}
                >
                  Retry
                </button>
              ) : (
                <button
                  type="button"
                  className="text-xs font-semibold text-[var(--ew-gray-dark)]"
                  onClick={() => cancel(item.id)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {hasQueued && (
            <button
              type="button"
              className="btn-primary text-xs"
              onClick={runUpload}
            >
              Upload to Cloudinary
            </button>
          )}
        </div>
      )}
    </div>
  );
}
