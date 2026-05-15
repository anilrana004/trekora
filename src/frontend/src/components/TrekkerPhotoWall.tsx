import { createActor } from "@/backend";
import type { UgcPhoto, UgcPhotoInput } from "@/backend.d.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "@trekora/icp";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import OptimizedImage from "./media/OptimizedImage";

// Local enum mirror — avoids importing runtime values from a .d.ts file
const Variant_pending_approved_rejected = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);

interface Props {
  trekSlug: string;
}

function useApprovedPhotos(trekSlug: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UgcPhoto[]>({
    queryKey: ["ugcPhotos", trekSlug],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getUgcPhotosByTrek(trekSlug);
      return all.filter(
        (p) => p.status === Variant_pending_approved_rejected.approved,
      );
    },
    enabled: !!actor && !isFetching,
  });
}

function useSubmitPhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<UgcPhoto, Error, UgcPhotoInput>({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not ready");
      const result = await actor.submitUgcPhoto(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["ugcPhotos", vars.trekSlug] });
      toast.success("Photo submitted! It will appear after admin review.");
    },
    onError: (e) => toast.error(e.message ?? "Upload failed."),
  });
}

export default function TrekkerPhotoWall({ trekSlug }: Props) {
  const { data: photos, isLoading } = useApprovedPhotos(trekSlug);
  const submitMutation = useSubmitPhoto();

  const [name, setName] = useState("");
  const [month, setMonth] = useState(MONTHS[0]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [preview, setPreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      toast.error("Only JPEG and PNG files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      setFileData(result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileData) {
      toast.error("Please select a photo.");
      return;
    }
    await submitMutation.mutateAsync({
      trekSlug,
      trekkerName: name.trim(),
      trekDate: `${month} ${year}`,
      photoData: fileData,
    });
    setName("");
    setPreview(null);
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const inputCls =
    "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/30" +
    " border-[var(--ew-gray-mid)] text-[var(--ew-text)]";
  const labelCls = "block text-xs font-semibold mb-1";

  return (
    <div className="mt-8 space-y-6">
      {/* Section header */}
      <div>
        <h2
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: "var(--ew-text)" }}
        >
          <span>📸</span> Trekker Photos
        </h2>
        <div
          className="h-0.5 w-16 mt-1 rounded"
          style={{ background: "var(--ew-red)" }}
        />
      </div>

      {/* Upload form */}
      <div
        className="rounded-2xl p-5"
        style={{
          border: "1px solid var(--ew-gray-mid)",
          background: "var(--ew-gray-lt)",
        }}
      >
        <h3
          className="font-semibold text-sm mb-4"
          style={{ color: "var(--ew-text)" }}
        >
          Share Your Memory
        </h3>
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          data-ocid="ugc.upload_form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="ugc-name"
                className={labelCls}
                style={{ color: "var(--ew-text)" }}
              >
                Your Name
              </label>
              <input
                id="ugc-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                required
                className={inputCls}
                data-ocid="ugc.name.input"
              />
            </div>
            <div>
              <p className={labelCls} style={{ color: "var(--ew-text)" }}>
                Trek Date
              </p>
              <div className="flex gap-2">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={inputCls}
                  aria-label="Month"
                  data-ocid="ugc.month.select"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={inputCls}
                  aria-label="Year"
                  data-ocid="ugc.year.select"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="ugc-file"
              className={labelCls}
              style={{ color: "var(--ew-text)" }}
            >
              Upload Photo (JPEG / PNG, max 5 MB)
            </label>
            <input
              id="ugc-file"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFile}
              className="block w-full text-sm text-[var(--ew-text-lt)] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[var(--ew-red)] hover:file:bg-[var(--ew-red-lt)] cursor-pointer"
              data-ocid="ugc.photo.upload_button"
            />
          </div>

          {preview && (
            <div className="relative inline-block">
              <OptimizedImage
                src={preview}
                alt="Preview"
                variant="gallery-thumb"
                className="h-32 w-auto rounded-xl object-cover"
                style={{ border: "2px solid var(--ew-orange)" }}
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFileData(null);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-red)",
                }}
                aria-label="Remove photo"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="btn-primary text-sm disabled:opacity-60"
            data-ocid="ugc.submit_button"
          >
            {submitMutation.isPending ? "Uploading…" : "Share Your Memory"}
          </button>
        </form>
      </div>

      {/* Approved photos grid */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
          ))}
        </div>
      )}

      {!isLoading && (!photos || photos.length === 0) && (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ border: "1px dashed var(--ew-gray-mid)" }}
          data-ocid="ugc.empty_state"
        >
          <p className="text-3xl mb-2">📷</p>
          <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
            Be the first to share a photo from this trek!
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--ew-gray-dark)" }}>
            Upload your trekking memories above.
          </p>
        </div>
      )}

      {!isLoading && photos && photos.length > 0 && (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              className="group relative break-inside-avoid rounded-xl overflow-hidden block w-full"
              data-ocid={`ugc.photo.item.${idx + 1}`}
            >
              <OptimizedImage
                src={photo.photoData}
                alt={`${photo.trekkerName} on ${photo.trekDate}`}
                variant="gallery-thumb"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs font-semibold truncate">
                  {photo.trekkerName}
                </p>
                <p
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="text-[10px]"
                >
                  {photo.trekDate}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && photos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/92"
            onClick={() => setLightboxIdx(null)}
            data-ocid="ugc.lightbox"
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(255,255,255,0.15)" }}
              onClick={() => setLightboxIdx(null)}
              aria-label="Close"
              data-ocid="ugc.lightbox.close_button"
            >
              ✕
            </button>
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (i) => ((i ?? 0) - 1 + photos.length) % photos.length,
                );
              }}
              aria-label="Previous"
            >
              ‹
            </button>
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={photos[lightboxIdx].photoData}
                alt={photos[lightboxIdx].trekkerName}
                variant="gallery-full"
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <p className="text-white font-semibold">
                  {photos[lightboxIdx].trekkerName}
                </p>
                <p
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  className="text-sm"
                >
                  {photos[lightboxIdx].trekDate}
                </p>
              </div>
            </motion.div>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
              style={{ background: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => ((i ?? 0) + 1) % photos.length);
              }}
              aria-label="Next"
            >
              ›
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {lightboxIdx + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
