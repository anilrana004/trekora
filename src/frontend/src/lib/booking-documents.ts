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
  photo: { maxBytes: 2 * MB, label: "Passport-size photo" },
  fitnessCert: { maxBytes: 5 * MB, label: "Fitness certificate" },
} as const;

/** Max total attachment size per booking email (SMTP-safe). */
export const BOOKING_ATTACHMENTS_MAX_TOTAL_BYTES = 10 * MB;

const ID_PROOF_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]);
const PHOTO_TYPES = new Set(["image/jpeg", "image/jpg", "image/png"]);
const CERT_TYPES = new Set(["application/pdf", "image/jpeg", "image/jpg"]);

function normalizeMime(file: File): string {
  const t = (file.type || "").toLowerCase();
  if (t) return t;
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

function mimeAllowed(
  mime: string,
  allowed: Set<string>,
  filename: string,
): boolean {
  if (allowed.has(mime)) return true;
  const lower = filename.toLowerCase();
  if (allowed.has("application/pdf") && lower.endsWith(".pdf")) return true;
  if (
    (allowed.has("image/jpeg") || allowed.has("image/jpg")) &&
    (lower.endsWith(".jpg") || lower.endsWith(".jpeg"))
  ) {
    return true;
  }
  if (allowed.has("image/png") && lower.endsWith(".png")) return true;
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
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export async function fileToBookingPayload(
  file: File,
  kind: keyof typeof BOOKING_DOC_LIMITS,
): Promise<{ ok: true; data: BookingFilePayload } | { ok: false; error: string }> {
  const { maxBytes, label } = BOOKING_DOC_LIMITS[kind];
  const mime = normalizeMime(file);
  const allowed =
    kind === "idProof"
      ? ID_PROOF_TYPES
      : kind === "photo"
        ? PHOTO_TYPES
        : CERT_TYPES;

  if (!mimeAllowed(mime, allowed, file.name)) {
    return {
      ok: false,
      error: `${label}: use PDF, JPG, or PNG only.`,
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
        contentType: mime,
        sizeBytes: file.size,
        label,
        contentBase64,
      },
    };
  } catch {
    return { ok: false, error: `Could not read ${label}. Try again.` };
  }
}

export function collectBookingAttachments(
  files: {
    idProof: BookingFilePayload | null;
    photo: BookingFilePayload | null;
    fitnessCert: BookingFilePayload | null;
  },
): { attachments: BookingEmailAttachment[]; error?: string } {
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
