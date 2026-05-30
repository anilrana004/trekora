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
    ? "image/jpeg,image/png,image/*,.jpg,.jpeg,.png"
    : accept;

  const previewUrl = useMemo(() => {
    if (!value || !value.contentType.startsWith("image/")) return null;
    return `data:${value.contentType};base64,${value.contentBase64}`;
  }, [value]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(null);
      return;
    }
    setLoading(true);
    try {
      const result = await fileToBookingPayload(file, kind);
      if (!result.ok) {
        toast.error(result.error);
        e.target.value = "";
        return;
      }
      onChange(result.data);
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
              {formatFileSize(value.sizeBytes)} · Tap replace to change
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={loading}
              className="text-xs font-semibold mt-2 underline"
              style={{ color: "var(--ew-red)" }}
            >
              Replace photo
            </button>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
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
            Reading file…
          </>
        ) : (
          <>
            <Upload size={18} className="shrink-0" aria-hidden />
            {value ? "Replace file" : buttonLabel}
          </>
        )}
      </button>
      {value && !previewUrl ? (
        <p className="text-xs" style={{ color: "#22C55E" }}>
          ✓ {value.filename} ({formatFileSize(value.sizeBytes)})
        </p>
      ) : null}
      {value ? (
        <button
          type="button"
          onClick={clearFile}
          className="text-xs font-medium self-start"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          Remove file
        </button>
      ) : null}
    </div>
  );
}
