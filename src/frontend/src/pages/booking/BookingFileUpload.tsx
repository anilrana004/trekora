import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  BOOKING_DOC_LIMITS,
  fileToBookingPayload,
  formatFileSize,
  type BookingFilePayload,
} from "@/lib/booking-documents";
import { CTA_OUTLINE_DASHED, ctaMerge } from "@/lib/cta-buttons";


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

  return (
    <div className="booking-file-upload">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className={ctaMerge(CTA_OUTLINE_DASHED, loading && "opacity-60")}
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
      {value && (
        <p className="text-xs mt-2" style={{ color: "#22C55E" }}>
          ✓ {value.filename} ({formatFileSize(value.sizeBytes)})
        </p>
      )}
    </div>
  );
}


