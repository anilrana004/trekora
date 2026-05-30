import { getCloudinaryCloudName } from "./cloudinary-config";
import {
  CLOUDINARY_FOLDERS,
  type CloudinaryAsset,
  type CloudinaryResourceKind,
  type UploadProgress,
  type UploadRequest,
} from "./upload-types";

function getUploadPreset(): string | undefined {
  const raw =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ??
    import.meta.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (typeof raw !== "string") return undefined;
  const v = raw.trim();
  return v.length > 0 ? v : undefined;
}

function toCloudinaryAsset(raw: Record<string, unknown>): CloudinaryAsset {
  return {
    assetId: String(raw.asset_id ?? ""),
    publicId: String(raw.public_id ?? ""),
    version: Number(raw.version ?? 0),
    signature: String(raw.signature ?? ""),
    width: Number(raw.width ?? 0),
    height: Number(raw.height ?? 0),
    format: String(raw.format ?? ""),
    resourceType: String(raw.resource_type ?? ""),
    createdAt: String(raw.created_at ?? ""),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    bytes: Number(raw.bytes ?? 0),
    type: String(raw.type ?? ""),
    etag: typeof raw.etag === "string" ? raw.etag : undefined,
    placeholder: Boolean(raw.placeholder),
    url: String(raw.url ?? ""),
    secureUrl: String(raw.secure_url ?? ""),
    originalFilename: String(raw.original_filename ?? ""),
  };
}

function xhrUpload(
  url: string,
  formData: FormData,
  onProgress?: (progress: UploadProgress) => void,
  signal?: AbortSignal,
): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.onprogress = (event) => {
      if (!onProgress || !event.lengthComputable) return;
      const percentage = Math.round((event.loaded / event.total) * 100);
      onProgress({ loaded: event.loaded, total: event.total, percentage });
    };

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Cloudinary upload failed (${xhr.status})`));
        return;
      }
      try {
        resolve(JSON.parse(xhr.responseText) as Record<string, unknown>);
      } catch {
        reject(new Error("Invalid Cloudinary response payload"));
      }
    };
    xhr.onerror = () =>
      reject(new Error("Network error during Cloudinary upload"));
    xhr.onabort = () => reject(new Error("Upload cancelled"));

    if (signal) {
      signal.addEventListener(
        "abort",
        () => {
          xhr.abort();
        },
        { once: true },
      );
    }

    xhr.send(formData);
  });
}

function inferResourceType(file: File): CloudinaryResourceKind {
  if (file.type.startsWith("video/")) return "video";
  return "image";
}

export async function uploadToCloudinary({
  file,
  folder = "gallery",
  folderPath,
  resourceType: resourceTypeArg,
  tags,
  context,
  onProgress,
  signal,
}: UploadRequest): Promise<CloudinaryAsset> {
  const cloudName = getCloudinaryCloudName();
  const uploadPreset = getUploadPreset();
  if (!cloudName) {
    throw new Error("Missing Cloudinary cloud name");
  }
  if (!uploadPreset) {
    throw new Error("Missing Cloudinary upload preset");
  }

  const resourceType = resourceTypeArg ?? inferResourceType(file);
  const resourceSegment = resourceType === "video" ? "video" : "image";
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceSegment}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folderPath?.trim() || CLOUDINARY_FOLDERS[folder]);
  if (tags?.length) formData.append("tags", tags.join(","));
  if (context && Object.keys(context).length > 0) {
    const contextStr = Object.entries(context)
      .map(([k, v]) => {
        const safe = String(v).replace(/[|=]/g, " ").trim();
        return `${k}=${safe}`;
      })
      .join("|");
    formData.append("context", contextStr);
  }

  const payload = await xhrUpload(endpoint, formData, onProgress, signal);
  return toCloudinaryAsset(payload);
}
