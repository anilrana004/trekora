import { Loader2, Star } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
import { getCloudinaryCloudName } from "@/lib/images/cloudinary-config";
import {
  reviewCloudinaryContext,
  reviewCloudinaryFolder,
  reviewCloudinaryTags,
} from "@/lib/review-cloudinary";
import { reviewToGalleryItems } from "@/lib/review-gallery-items";
import {
  submitReview,
  type GalleryApiItem,
  type ProductKind,
  type TrekoraReview,
} from "@/lib/reviews-api";
import OptimizedImage from "./media/OptimizedImage";

interface ReviewSubmitFormProps {
  trekSlug: string;
  trekName: string;
  productType: ProductKind;
  onSubmitted?: (review?: TrekoraReview) => void;
  onPhotosPublished?: (items: GalleryApiItem[]) => void;
}

function StarPicker({
  value,
  onChange,
}: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}
          aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
          className="transition-transform hover:scale-110 min-h-11 min-w-11 inline-flex items-center justify-center"
        >
          <Star
            size={26}
            style={{
              color:
                s <= (hover || value) ? "var(--ew-gold)" : "var(--ew-gray-mid)",
            }}
            className={
              s <= (hover || value) ? "fill-[var(--ew-gold)]" : "fill-none"
            }
          />
        </button>
      ))}
      {value > 0 ? (
        <span
          className="text-sm font-medium ml-2"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {["Bad", "Poor", "Okay", "Good", "Amazing!"][value - 1]}
        </span>
      ) : null}
    </div>
  );
}

interface FormState {
  rating: number;
  title: string;
  text: string;
  name: string;
  city: string;
}

export default function ReviewSubmitForm({
  trekSlug,
  trekName,
  productType,
  onSubmitted,
  onPhotosPublished,
}: ReviewSubmitFormProps) {
  const normalizedSlug = trekSlug.trim().toLowerCase();
  const [form, setForm] = useState<FormState>({
    rating: 0,
    title: "",
    text: "",
    name: "",
    city: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadOptions = useMemo(
    () => ({
      folder: "reviews" as const,
      folderPath: reviewCloudinaryFolder(productType, normalizedSlug),
      tags: reviewCloudinaryTags(productType, normalizedSlug),
      context: reviewCloudinaryContext(trekName, normalizedSlug, productType),
    }),
    [productType, normalizedSlug, trekName],
  );

  const {
    items: uploadItems,
    queueFiles,
    uploadAllForSubmit,
    cancel: cancelUpload,
    clear,
    cloudinaryReady,
  } = useImageUpload(uploadOptions);

  const isUploading = uploadItems.some((i) => i.status === "uploading");
  const wordCount = form.text.trim().split(/\s+/).filter(Boolean).length;

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.rating) e.rating = "Please select a rating.";
    if (form.title.trim().length < 5)
      e.title = "Title must be at least 5 characters.";
    if (wordCount < 50)
      e.text = `Please write at least 50 words (${wordCount} so far).`;
    if (!form.name.trim()) e.name = "Your name is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const remaining = 5 - uploadItems.length;
    const files = Array.from(e.target.files ?? []).slice(0, remaining);
    if (files.length) queueFiles(files);
    e.target.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || submitting) return;

    if (!cloudinaryReady && uploadItems.length > 0) {
      toast.error("Photo upload is temporarily unavailable.");
      return;
    }

    const failedUpload = uploadItems.some((i) => i.status === "error");
    if (failedUpload && uploadItems.length > 0) {
      toast.error("Some photos failed to upload. Remove them or try again.");
      return;
    }

    const snapshot = { ...form };
    setSubmitting(true);

    try {
      const { assets: uploaded, errors: uploadErrors } =
        uploadItems.length > 0
          ? await uploadAllForSubmit()
          : { assets: [], errors: [] as string[] };

      if (uploadItems.length > 0 && uploaded.length === 0) {
        toast.error(uploadErrors[0] ?? "Photo upload failed. Please try again.");
        return;
      }
      if (uploadErrors.length > 0) {
        toast.warning(
          `${uploaded.length} photo(s) uploaded; ${uploadErrors.length} failed.`,
        );
      }

      const folderPath = reviewCloudinaryFolder(productType, normalizedSlug);
      const photos = uploaded.map((asset) => ({
        url: asset.secureUrl,
        publicId: asset.publicId,
        cloudinaryFolder: folderPath,
        width: asset.width,
        height: asset.height,
      }));
      const photoUrls = photos.map((p) => p.url);
      const tags = snapshot.title.trim() ? [snapshot.title.trim()] : [];

      const res = await submitReview({
        trekSlug: normalizedSlug,
        trekName,
        type: productType,
        userName: snapshot.name.trim(),
        rating: snapshot.rating,
        reviewText: snapshot.text.trim(),
        photos,
        photoUrls,
        tags,
      });

      if (!res.success) {
        toast.error(res.message ?? "Could not submit review. Please try again.");
        return;
      }

      setForm({ rating: 0, title: "", text: "", name: "", city: "" });
      clear();
      setErrors({});
      setSubmitted(true);

      if (res.review) {
        const galleryItems = reviewToGalleryItems(res.review, productType);
        if (galleryItems.length > 0) onPhotosPublished?.(galleryItems);
        onSubmitted?.(res.review);
      }

      toast.success(
        res.message ??
          `Thank you, ${snapshot.name.trim()}! Your review and photos are live on this page and in the Photos tab.`,
        { duration: 6000 },
      );

      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      toast.error("Could not submit review. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg px-3 py-3 text-sm focus:outline-none transition-colors";
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    border: `1px solid ${hasError ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
    color: "var(--ew-text)",
    minHeight: 48,
    background: "#fff",
  });

  const cloudinaryConfigured = Boolean(getCloudinaryCloudName()) && cloudinaryReady;

  return (
    <div
      className="rounded-2xl p-6"
      style={{ border: "1px solid var(--ew-gray-mid)", background: "#fff" }}
      data-ocid="review_form.container"
    >
      <h3
        className="font-bold text-base mb-5"
        style={{ color: "var(--ew-text)" }}
      >
        Write a Review
      </h3>

      {submitted ? (
        <div className="text-center py-8" data-ocid="review_form.success_state">
          <div className="text-5xl mb-3">✅</div>
          <p className="font-bold text-base" style={{ color: "var(--ew-text)" }}>
            Review Submitted!
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
            Your review and photos are live below, in Review Photos, and on the
            Photos tab.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(ev) => void handleSubmit(ev)}
          className="space-y-5"
          noValidate
          data-ocid="review_form.form"
        >
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "var(--ew-text)" }}
            >
              Rate your experience <span style={{ color: "var(--ew-red)" }}>*</span>
            </label>
            <StarPicker
              value={form.rating}
              onChange={(n) => setForm((p) => ({ ...p, rating: n }))}
            />
            {errors.rating ? (
              <p className="text-xs mt-1" style={{ color: "var(--ew-red)" }}>
                {errors.rating}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="rv-title"
              className="block text-sm font-semibold mb-1"
              style={{ color: "var(--ew-text)" }}
            >
              Review title <span style={{ color: "var(--ew-red)" }}>*</span>
            </label>
            <input
              id="rv-title"
              type="text"
              className={inputCls}
              style={inputStyle(!!errors.title)}
              placeholder="E.g., Most magical week of my life"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              data-ocid="review_form.title.input"
            />
            {errors.title ? (
              <p className="text-xs mt-1" style={{ color: "var(--ew-red)" }}>
                {errors.title}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="rv-text"
              className="block text-sm font-semibold mb-1"
              style={{ color: "var(--ew-text)" }}
            >
              Your review <span style={{ color: "var(--ew-red)" }}>*</span>
            </label>
            <textarea
              id="rv-text"
              rows={5}
              className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none resize-none"
              style={{
                border: `1px solid ${errors.text ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                color: "var(--ew-text)",
                background: "#fff",
                minHeight: 120,
              }}
              placeholder="Guide, food, difficulty, highlights — help other trekkers plan."
              value={form.text}
              onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              data-ocid="review_form.text.textarea"
            />
            <p
              className="text-[11px] mt-1 text-right"
              style={{
                color: wordCount < 50 ? "var(--ew-gray-dark)" : "var(--ew-green)",
              }}
            >
              {wordCount} / 50 words minimum
            </p>
            {errors.text ? (
              <p className="text-xs mt-1" style={{ color: "var(--ew-red)" }}>
                {errors.text}
              </p>
            ) : null}
          </div>

          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "var(--ew-text)" }}
            >
              Photos (optional, max 5)
            </label>
            {!cloudinaryConfigured ? (
              <p
                className="text-xs rounded-lg px-3 py-2 mb-2"
                style={{ background: "#fff3e0", color: "var(--ew-text)" }}
              >
                Photo upload is temporarily unavailable. You can still submit your
                review without photos.
              </p>
            ) : null}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              disabled={!cloudinaryConfigured || uploadItems.length >= 5}
              className="sr-only"
              onChange={handleFileChange}
              data-ocid="review_form.photos.input"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={
                !cloudinaryConfigured || uploadItems.length >= 5 || isUploading
              }
              className="text-sm font-semibold px-4 py-2.5 rounded-full border-2 min-h-11 disabled:opacity-50"
              style={{
                borderColor: "var(--ew-red)",
                color: "var(--ew-red)",
              }}
            >
              Choose photos
            </button>
            {uploadItems.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                {uploadItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <OptimizedImage
                      src={item.previewUrl}
                      alt="Upload preview"
                      variant="gallery-thumb"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                    {item.status === "uploading" ? (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 className="animate-spin text-white" size={20} />
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => cancelUpload(item.id)}
                      disabled={submitting}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full w-6 h-6"
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="rv-name"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Your name <span style={{ color: "var(--ew-red)" }}>*</span>
              </label>
              <input
                id="rv-name"
                type="text"
                className={inputCls}
                style={inputStyle(!!errors.name)}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                data-ocid="review_form.name.input"
              />
              {errors.name ? (
                <p className="text-xs mt-1" style={{ color: "var(--ew-red)" }}>
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="rv-city"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                City (optional)
              </label>
              <input
                id="rv-city"
                type="text"
                className={inputCls}
                style={inputStyle(false)}
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                data-ocid="review_form.city.input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || isUploading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-12 px-8 rounded-full font-semibold text-white transition-opacity disabled:opacity-60"
            style={{ background: "var(--ew-red)" }}
            data-ocid="review_form.submit_button"
          >
            {submitting || isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden />
                {isUploading ? "Uploading photos…" : "Submitting…"}
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
