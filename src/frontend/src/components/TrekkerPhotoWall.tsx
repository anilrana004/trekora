import { useImageUpload } from "@/hooks/useImageUpload";
import { refreshTrekkerGallery } from "@/lib/gallery-refresh";
import { buildPhotoCredit, parsePhotoCredit } from "@/lib/photo-credit";
import {
  productCloudinaryContext,
  productCloudinaryTags,
  productPhotoFolder,
} from "@/lib/product-cloudinary";
import type { GalleryApiItem, ProductKind } from "@/lib/reviews-api";
import { saveTrekkerPhotosToApi } from "@/lib/submit-trekker-photos";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

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

interface TrekkerPhotoWallProps {
  trekSlug: string;
  trekName: string;
  productType: ProductKind;
  /** Shared with parent Photos grid (above Reels) — single React Query cache. */
  communityPhotos: GalleryApiItem[];
  communityLoading?: boolean;
  communityError?: string | null;
  prependPhotos: (items: GalleryApiItem[]) => void;
  clearOptimistic: () => void;
  reloadGallery: (silent?: boolean) => Promise<void>;
  /** `reviews` — copy for Reviews tab photo block */
  variant?: "photos" | "reviews";
}

function TrekkerGridImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      className="w-full h-auto min-h-[120px] object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}

export default function TrekkerPhotoWall({
  trekSlug,
  trekName,
  productType,
  communityPhotos,
  communityLoading = false,
  communityError = null,
  prependPhotos,
  clearOptimistic,
  reloadGallery,
  variant = "photos",
}: TrekkerPhotoWallProps) {
  const normalizedSlug = trekSlug.trim().toLowerCase();
  const photos = communityPhotos;
  const loading = communityLoading;
  const error = communityError;

  const productLabel = productType === "yatra" ? "Yatra" : "Trek";

  const uploadOptions = useMemo(
    () => ({
      folder: "treks" as const,
      folderPath: productPhotoFolder(productType, normalizedSlug),
      tags: productCloudinaryTags(productType, normalizedSlug),
      context: productCloudinaryContext(trekName, normalizedSlug, productType),
    }),
    [productType, normalizedSlug, trekName],
  );

  const {
    items: uploadItems,
    queueFiles,
    uploadAllForSubmit,
    cancel,
    clear,
    cloudinaryReady,
  } = useImageUpload(uploadOptions);

  const [name, setName] = useState("");
  const [month, setMonth] = useState(MONTHS[0]);
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [submitting, setSubmitting] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const hasReadyFiles = uploadItems.length > 0;
  const canSubmit =
    Boolean(normalizedSlug && trekName.trim()) &&
    hasReadyFiles &&
    !submitting &&
    cloudinaryReady;

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const remaining = 5 - uploadItems.length;
      const files = Array.from(e.target.files ?? []).slice(0, remaining);
      if (files.length) queueFiles(files);
      e.target.value = "";
    },
    [queueFiles, uploadItems.length],
  );

  async function handleShareMemory() {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!normalizedSlug) {
      toast.error("This page is still loading. Try again in a moment.");
      return;
    }
    if (!cloudinaryReady) {
      toast.error(
        "Photo upload is temporarily unavailable. Please try again later or contact us on WhatsApp.",
      );
      return;
    }
    if (!hasReadyFiles) {
      toast.error("Choose at least one photo first.");
      return;
    }
    if (submitting) return;

    const credit = buildPhotoCredit(name, month, year);
    const displayName = name.trim();
    setSubmitting(true);

    try {
      const { assets: uploaded, errors: uploadErrors } =
        await uploadAllForSubmit();

      if (uploaded.length === 0) {
        const detail =
          uploadErrors[0] ?? "Photo upload failed. Please try again.";
        toast.error(detail);
        return;
      }
      if (uploadErrors.length > 0) {
        toast.warning(
          `${uploaded.length} photo(s) uploaded; ${uploadErrors.length} failed.`,
        );
      }

      const optimistic: GalleryApiItem[] = uploaded.map((asset, i) => ({
        id: `optimistic-${Date.now()}-${i}`,
        src: asset.secureUrl,
        title: trekName.trim(),
        subtitle: productLabel,
        category: productType === "yatra" ? "Yatras" : "Treks",
        credit: `Photo by ${credit}`,
        trekSlug: normalizedSlug,
        trekName: trekName.trim(),
        type: productType,
        source: "product",
        reviewId: "",
        createdAt: new Date().toISOString(),
        publicId: asset.publicId,
      }));

      prependPhotos(optimistic);

      const res = await saveTrekkerPhotosToApi({
        trekSlug: normalizedSlug,
        trekName: trekName.trim(),
        productType,
        uploadedBy: credit,
        assets: uploaded,
      });

      if (!res.success) {
        setName("");
        clear();
        toast.warning(
          res.message ??
            "Your photos are visible here. Gallery sync will retry when the server is available.",
          { duration: 6000 },
        );
        return;
      }

      setName("");
      clear();

      refreshTrekkerGallery(normalizedSlug, productType);
      await reloadGallery(true);

      toast.success(
        res.message ??
          `Thank you, ${displayName}! Your photo${uploaded.length > 1 ? "s are" : " is"} now live on ${trekName} and in the Gallery.`,
        { duration: 6000 },
      );

      requestAnimationFrame(() => {
        document
          .querySelector("[data-ocid='ugc.photo.item.1']")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch (err) {
      clearOptimistic();
      const msg = err instanceof Error ? err.message : "Upload failed.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/30" +
    " border-[var(--ew-gray-mid)] text-[var(--ew-text)]";
  const labelCls = "block text-xs font-semibold mb-1";
  const isReviewsVariant = variant === "reviews";
  const sectionTitle = isReviewsVariant ? "Review Photos" : "Trekker Photos";
  const sectionHint = isReviewsVariant
    ? `Share photos from your ${productLabel.toLowerCase()} — they appear here, on the Photos tab, and in the site Gallery.`
    : `Share your moments from ${trekName}. Approved photos appear here and in the site Gallery, tagged with this ${productLabel.toLowerCase()}.`;

  return (
    <div className={isReviewsVariant ? "space-y-6" : "mt-8 space-y-6"}>
      <div>
        <h2
          className="text-lg font-bold flex items-center gap-2"
          style={{ color: "var(--ew-text)" }}
        >
          <span>📸</span> {sectionTitle}
        </h2>
        <div
          className="h-0.5 w-16 mt-1 rounded"
          style={{ background: "var(--ew-red)" }}
        />
        <p className="text-xs mt-2" style={{ color: "var(--ew-text-lt)" }}>
          {sectionHint}
        </p>
      </div>

      {!cloudinaryReady ? (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "#fff3e0", color: "var(--ew-text)" }}
        >
          Photo upload is temporarily unavailable. Please try again later or
          WhatsApp us your photos with the trek name.
        </p>
      ) : null}

      <div
        className="rounded-2xl p-5"
        style={{
          border: "1px solid var(--ew-gray-mid)",
          background: isReviewsVariant ? "#fff" : "var(--ew-gray-lt)",
        }}
      >
        <h3
          className="font-semibold text-sm mb-4"
          style={{ color: "var(--ew-text)" }}
        >
          Share Your Memory
        </h3>
        <div className="space-y-3" data-ocid="ugc.upload_form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor={`ugc-name-${normalizedSlug}`}
                className={labelCls}
                style={{ color: "var(--ew-text)" }}
              >
                Your Name
              </label>
              <input
                id={`ugc-name-${normalizedSlug}`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className={inputCls}
                data-ocid="ugc.name.input"
              />
            </div>
            <div>
              <p className={labelCls} style={{ color: "var(--ew-text)" }}>
                {productLabel} Date
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
              htmlFor={`ugc-file-${normalizedSlug}`}
              className={labelCls}
              style={{ color: "var(--ew-text)" }}
            >
              Choose photos (JPEG / PNG / WebP, max 5 MB each)
            </label>
            <input
              id={`ugc-file-${normalizedSlug}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={submitting || uploadItems.length >= 5}
              onChange={handleFile}
              className="block w-full text-sm text-[var(--ew-text-lt)] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[var(--ew-red)] hover:file:bg-[var(--ew-red-lt)] cursor-pointer disabled:opacity-50"
              data-ocid="ugc.photo.upload_button"
            />
          </div>

          {uploadItems.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {uploadItems.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.previewUrl}
                    alt=""
                    className="h-24 w-24 rounded-xl object-cover border-2 border-[var(--ew-orange)]"
                  />
                  {item.status === "uploading" ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                      <Loader2 className="animate-spin text-white" size={18} />
                    </div>
                  ) : null}
                  {item.status === "error" && item.error ? (
                    <p className="absolute bottom-0 left-0 right-0 text-[9px] bg-red-600 text-white px-1 truncate">
                      {item.error}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => cancel(item.id)}
                    disabled={submitting}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center border border-[var(--ew-gray-mid)] text-[var(--ew-red)]"
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => void handleShareMemory()}
            className="btn-primary text-sm disabled:opacity-60 inline-flex items-center gap-2 min-h-11"
            data-ocid="ugc.submit_button"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden />
                Uploading…
              </>
            ) : (
              "Share Your Memory"
            )}
          </button>
        </div>
      </div>

      {error ? (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "var(--ew-gray-lt)", color: "var(--ew-red)" }}
        >
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
          ))}
        </div>
      ) : null}

      {!loading && photos.length === 0 && !error ? (
        <div
          className="rounded-2xl p-8 text-center"
          style={{ border: "1px dashed var(--ew-gray-mid)" }}
          data-ocid="ugc.empty_state"
        >
          <p className="text-3xl mb-2">📷</p>
          <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
            Be the first to share a photo from {trekName}!
          </p>
        </div>
      ) : null}

      {!loading && photos.length > 0 ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, idx) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              className="group relative break-inside-avoid rounded-xl overflow-hidden block w-full"
              data-ocid={`ugc.photo.item.${idx + 1}`}
            >
              <TrekkerGridImage
                src={photo.src}
                alt={`${photo.trekName} — ${photo.credit}`}
              />
              <div className="absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">
                <p className="text-white text-xs font-bold truncate">
                  {photo.trekName || trekName}
                </p>
                {(() => {
                  const { name: uploader, when } = parsePhotoCredit(
                    photo.credit,
                  );
                  return (
                    <p className="text-[10px] truncate text-white/80">
                      {uploader}
                      {when ? ` · ${when}` : ""}
                    </p>
                  );
                })()}
              </div>
            </button>
          ))}
        </div>
      ) : null}

      <AnimatePresence>
        {lightboxIdx !== null && photos.length > 0 ? (
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
            >
              ✕
            </button>
            <motion.div
              key={photos[lightboxIdx]?.src}
              className="max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightboxIdx].src}
                alt={photos[lightboxIdx].trekName}
                className="max-w-[90vw] max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
