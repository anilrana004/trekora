/** Booking document uploads → email attachments (base64 over JSON API). */

export type BookingFileMeta = {
  filename: string;
  contentType: string;
  sizeBytes: number;
  label: string;
};

export type BookingFilePayload = BookingFileMeta & {
  contentBase64: string;
};

export type BookingEmailAttachment = BookingFilePayload;

const MB = 1024 * 1024;

export const BOOKING_DOC_LIMITS = {
  idProof: { maxBytes: 5 * MB, label: "Government ID proof" },
  /** After client compress; raw camera files may be larger before processing. */
  photo: { maxBytes: 2 * MB, label: "Passport-size photo" },
  fitnessCert: { maxBytes: 5 * MB, label: "Fitness certificate" },
} as const;

/** Allow large phone-camera originals; we compress photos before attach. */
const PHOTO_RAW_MAX_BYTES = 25 * MB;

/** Max total attachment size per booking email (SMTP-safe). */
export const BOOKING_ATTACHMENTS_MAX_TOTAL_BYTES = 10 * MB;

const ID_PROOF_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);
const PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/*",
]);
const CERT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

function normalizeMime(file: File): string {
  const t = (file.type || "").toLowerCase();
  if (t && t !== "application/octet-stream") return t;
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".heic")) return "image/heic";
  if (lower.endsWith(".heif")) return "image/heif";
  return t || "application/octet-stream";
}

function isLikelyImageFile(file: File, mime: string): boolean {
  if (mime.startsWith("image/")) return true;
  const lower = file.name.toLowerCase();
  return /\.(jpe?g|png|webp|heic|heif|gif|bmp)$/i.test(lower);
}

function mimeAllowed(
  mime: string,
  allowed: Set<string>,
  filename: string,
): boolean {
  if (allowed.has(mime)) return true;
  if (allowed.has("image/*") && mime.startsWith("image/")) return true;
  const lower = filename.toLowerCase();
  if (allowed.has("application/pdf") && lower.endsWith(".pdf")) return true;
  if (
    (allowed.has("image/jpeg") || allowed.has("image/jpg")) &&
    (lower.endsWith(".jpg") || lower.endsWith(".jpeg"))
  ) {
    return true;
  }
  if (allowed.has("image/png") && lower.endsWith(".png")) return true;
  if (allowed.has("image/webp") && lower.endsWith(".webp")) return true;
  if (
    (allowed.has("image/heic") || allowed.has("image/heif")) &&
    (lower.endsWith(".heic") || lower.endsWith(".heif"))
  ) {
    return true;
  }
  return false;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / MB).toFixed(1)} MB`;
}

export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read file"));
        return;
      }
      const base64 = result.includes(",") ? result.split(",")[1]! : result;
      resolve(base64);
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read file"));
        return;
      }
      resolve(result.includes(",") ? result.split(",")[1]! : result);
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("Could not read file"));
    reader.readAsDataURL(blob);
  });
}

function jpegFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim() || "passport-photo";
  return `${base}.jpg`;
}

/**
 * Resize/compress phone camera photos so booking accepts them in one pick.
 * Returns null if the browser cannot decode the image (e.g. some HEIC cases).
 */
export async function compressBookingPhoto(
  file: File,
  maxBytes: number,
): Promise<{
  contentBase64: string;
  contentType: string;
  sizeBytes: number;
  filename: string;
} | null> {
  let bitmap: ImageBitmap | null = null;
  let objectUrl: string | null = null;

  try {
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      objectUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("decode failed"));
        el.src = objectUrl!;
      });
      bitmap = await createImageBitmap(img);
    }

    const maxEdge = 1400;
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);

    let quality = 0.85;
    let blob: Blob | null = null;
    for (let i = 0; i < 8; i++) {
      blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/jpeg", quality);
      });
      if (!blob) return null;
      if (blob.size <= maxBytes) break;
      quality = Math.max(0.45, quality - 0.1);
    }

    if (!blob || blob.size > maxBytes) {
      const w2 = Math.max(1, Math.round(w * 0.7));
      const h2 = Math.max(1, Math.round(h * 0.7));
      canvas.width = w2;
      canvas.height = h2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w2, h2);
      ctx.drawImage(bitmap, 0, 0, w2, h2);
      blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), "image/jpeg", 0.7);
      });
    }

    if (!blob || blob.size > maxBytes) return null;

    const contentBase64 = await blobToBase64(blob);
    return {
      contentBase64,
      contentType: "image/jpeg",
      sizeBytes: blob.size,
      filename: jpegFilename(file.name),
    };
  } catch {
    return null;
  } finally {
    bitmap?.close();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

export async function fileToBookingPayload(
  file: File,
  kind: keyof typeof BOOKING_DOC_LIMITS,
): Promise<
  { ok: true; data: BookingFilePayload } | { ok: false; error: string }
> {
  const { maxBytes, label } = BOOKING_DOC_LIMITS[kind];
  const mime = normalizeMime(file);
  const allowed =
    kind === "idProof"
      ? ID_PROOF_TYPES
      : kind === "photo"
        ? PHOTO_TYPES
        : CERT_TYPES;

  if (kind === "photo") {
    if (!isLikelyImageFile(file, mime)) {
      return {
        ok: false,
        error: `${label}: please choose a photo (JPG, PNG, or from your camera).`,
      };
    }
    if (file.size === 0) {
      return { ok: false, error: `${label}: file is empty.` };
    }
    if (file.size > PHOTO_RAW_MAX_BYTES) {
      return {
        ok: false,
        error: `${label}: file is too large. Try another photo from your gallery.`,
      };
    }

    const compressed = await compressBookingPhoto(file, maxBytes);
    if (compressed) {
      return {
        ok: true,
        data: {
          filename: compressed.filename,
          contentType: compressed.contentType,
          sizeBytes: compressed.sizeBytes,
          label,
          contentBase64: compressed.contentBase64,
        },
      };
    }

    // Browser couldn't decode/compress — accept original if already small enough
    if (
      mimeAllowed(
        mime,
        new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]),
        file.name,
      ) &&
      file.size <= maxBytes
    ) {
      try {
        const contentBase64 = await readFileAsBase64(file);
        return {
          ok: true,
          data: {
            filename: file.name,
            contentType: mime === "image/jpg" ? "image/jpeg" : mime,
            sizeBytes: file.size,
            label,
            contentBase64,
          },
        };
      } catch {
        /* fall through */
      }
    }

    return {
      ok: false,
      error: `${label}: could not process that image. Please pick a JPG or PNG from your gallery.`,
    };
  }

  if (!mimeAllowed(mime, allowed, file.name)) {
    return {
      ok: false,
      error: `${label}: use PDF, JPG, or PNG.`,
    };
  }
  if (file.size > maxBytes) {
    return {
      ok: false,
      error: `${label} must be under ${formatFileSize(maxBytes)}.`,
    };
  }
  if (file.size === 0) {
    return { ok: false, error: `${label}: file is empty.` };
  }

  try {
    const contentBase64 = await readFileAsBase64(file);
    return {
      ok: true,
      data: {
        filename: file.name,
        contentType: mime === "image/jpg" ? "image/jpeg" : mime,
        sizeBytes: file.size,
        label,
        contentBase64,
      },
    };
  } catch {
    return { ok: false, error: `Could not read ${label}. Try again.` };
  }
}

export function collectBookingAttachments(files: {
  idProof: BookingFilePayload | null;
  photo: BookingFilePayload | null;
  fitnessCert: BookingFilePayload | null;
}): { attachments: BookingEmailAttachment[]; error?: string } {
  const list = [files.idProof, files.photo, files.fitnessCert].filter(
    (f): f is BookingFilePayload => f != null,
  );
  const total = list.reduce((sum, f) => sum + f.sizeBytes, 0);
  if (total > BOOKING_ATTACHMENTS_MAX_TOTAL_BYTES) {
    return {
      attachments: [],
      error: `Total uploads must be under ${formatFileSize(BOOKING_ATTACHMENTS_MAX_TOTAL_BYTES)}. Remove a file or use smaller files.`,
    };
  }
  return { attachments: list };
}

export function attachmentSummaryLines(
  attachments: BookingEmailAttachment[],
): string[] {
  if (attachments.length === 0) return ["None"];
  return attachments.map(
    (a) => `${a.label}: ${a.filename} (${formatFileSize(a.sizeBytes)})`,
  );
}
