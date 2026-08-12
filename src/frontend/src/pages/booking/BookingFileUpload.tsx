import {
  type BOOKING_DOC_LIMITS,
  type BookingFilePayload,
  fileToBookingPayload,
  formatFileSize,
} from "@/lib/booking-documents";
import { CTA_OUTLINE_DASHED, ctaMerge } from "@/lib/cta-buttons";
import { Check, Loader2, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export default function BookingFileUpload({
  id,
  accept,
  kind,
  dataOcid,
  value,
  onChange,
  buttonLabel = "Choose file to upload",
}: {
  id: string;
  accept: string;
  kind: keyof typeof BOOKING_DOC_LIMITS;
  dataOcid: string;
  value: BookingFilePayload | null;
  onChange: (file: BookingFilePayload | null) => void;
  buttonLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const isPhoto = kind === "photo";
  const mobileAccept = isPhoto
    ? "image/*,image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.heic,.heif"
    : accept;

  const previewUrl = useMemo(() => {
    if (!value || !value.contentType.startsWith("image/")) return null;
    return `data:${value.contentType};base64,${value.contentBase64}`;
  }, [value]);

  const openPicker = () => {
    if (loading) return;
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Allow re-selecting the same file after a failed attempt
    e.target.value = "";
    if (!file) return;

    setLoading(true);
    try {
      const result = await fileToBookingPayload(file, kind);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      onChange(result.data);
      if (isPhoto) {
        toast.success("Photo added");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="booking-file-upload">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={mobileAccept}
        className="sr-only"
        onChange={handleChange}
        tabIndex={-1}
      />

      {value && previewUrl ? (
        <div className="booking-file-upload__preview-wrap booking-file-upload__preview-wrap--success">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="booking-file-upload__thumb"
          />
          <div className="booking-file-upload__meta">
            <p className="booking-file-upload__filename flex items-center gap-1.5">
              <Check size={16} style={{ color: "#22C55E" }} aria-hidden />
              {value.filename}
            </p>
            <p className="booking-file-upload__hint">
              {formatFileSize(value.sizeBytes)} · ready to submit
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openPicker}
                disabled={loading}
                className="text-xs font-semibold underline"
                style={{ color: "var(--ew-red)" }}
              >
                {loading ? "Processing…" : "Replace"}
              </button>
              <button
                type="button"
                onClick={clearFile}
                disabled={loading}
                className="text-xs font-medium"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {value && !previewUrl ? (
        <div className="booking-file-upload__preview-wrap booking-file-upload__preview-wrap--success">
          <div className="booking-file-upload__meta" style={{ padding: "0.25rem 0" }}>
            <p className="booking-file-upload__filename flex items-center gap-1.5">
              <Check size={16} style={{ color: "#22C55E" }} aria-hidden />
              {value.filename}
            </p>
            <p className="booking-file-upload__hint">
              {formatFileSize(value.sizeBytes)} · ready to submit
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openPicker}
                disabled={loading}
                className="text-xs font-semibold underline"
                style={{ color: "var(--ew-red)" }}
              >
                {loading ? "Processing…" : "Replace"}
              </button>
              <button
                type="button"
                onClick={clearFile}
                disabled={loading}
                className="text-xs font-medium"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Primary picker only when empty — avoids duplicate Replace controls */}
      {!value ? (
        <button
          type="button"
          onClick={openPicker}
          disabled={loading}
          className={ctaMerge(
            CTA_OUTLINE_DASHED,
            "booking-file-upload__trigger",
            loading && "opacity-60",
          )}
          data-ocid={dataOcid}
          aria-controls={id}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin shrink-0" aria-hidden />
              {isPhoto ? "Preparing photo…" : "Reading file…"}
            </>
          ) : (
            <>
              <Upload size={18} className="shrink-0" aria-hidden />
              {buttonLabel}
            </>
          )}
        </button>
      ) : null}
    </div>
  );
}
