import { Star } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { getReviewsByTrek } from "../data/reviews";
import type { Review } from "../data/reviews";
import OptimizedImage from "./media/OptimizedImage";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ReviewSubmitFormProps {
  trekSlug: string;
  trekName: string;
}

// ─── Rating bar breakdown ─────────────────────────────────────────────────────

function RatingBreakdown({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const avg =
    total > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : "—";

  return (
    <div
      className="flex flex-col sm:flex-row gap-6 items-start rounded-xl p-5 mb-6"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
    >
      {/* Average */}
      <div className="text-center flex-shrink-0">
        <div
          className="text-5xl font-bold leading-none mb-1"
          style={{ color: "var(--ew-text)" }}
        >
          {avg}
        </div>
        <div className="flex justify-center gap-0.5 my-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={15}
              style={{ color: "var(--ew-gold)" }}
              className={
                n <= Math.round(Number(avg))
                  ? "fill-[var(--ew-gold)]"
                  : "fill-none"
              }
            />
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
          {total} {total === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* Bar breakdown */}
      <div className="flex-1 w-full space-y-1.5">
        {counts.map(({ star, count }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span
                className="text-xs w-3 flex-shrink-0"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {star}
              </span>
              <Star
                size={11}
                style={{ color: "var(--ew-gold)" }}
                className="fill-[var(--ew-gold)] flex-shrink-0"
              />
              <div
                className="flex-1 rounded-full h-2"
                style={{ backgroundColor: "var(--ew-gray-mid)" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "var(--ew-orange)",
                  }}
                />
              </div>
              <span
                className="text-[11px] w-8 text-right flex-shrink-0"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Existing review card ─────────────────────────────────────────────────────

function ExistingReviewCard({
  review,
  index,
}: { review: Review; index: number }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ border: "1px solid var(--ew-gray-mid)" }}
      data-ocid={`review_form.review.${index + 1}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
          style={{
            background: "var(--ew-red-lt)",
            color: "var(--ew-red)",
          }}
        >
          {review.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--ew-text)" }}
              >
                {review.author}
              </p>
              <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                {review.city} · {review.date}
              </p>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={13}
                  style={{ color: "var(--ew-gold)" }}
                  className={
                    n <= review.rating ? "fill-[var(--ew-gold)]" : "fill-none"
                  }
                />
              ))}
            </div>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--ew-text-lt)" }}
          >
            {review.review}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Star picker ──────────────────────────────────────────────────────────────

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
          className="transition-transform hover:scale-110"
          style={{ padding: 2 }}
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
      {value > 0 && (
        <span
          className="text-sm font-medium ml-2"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {["Bad", "Poor", "Okay", "Good", "Amazing!"][value - 1]}
        </span>
      )}
    </div>
  );
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  rating: number;
  title: string;
  text: string;
  month: string;
  year: string;
  name: string;
  city: string;
  photos: File[];
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const YEARS = Array.from({ length: 6 }, (_, i) => String(2025 - i));

// ─── Main component ───────────────────────────────────────────────────────────

export default function ReviewSubmitForm({
  trekSlug,
  trekName,
}: ReviewSubmitFormProps) {
  const [form, setForm] = useState<FormState>({
    rating: 0,
    title: "",
    text: "",
    month: "",
    year: "",
    name: "",
    city: "",
    photos: [],
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load seeded reviews for this trek + any locally submitted ones
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const seededReviews = getReviewsByTrek(trekSlug);
  const allReviews = [...seededReviews, ...localReviews];

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
    const files = Array.from(e.target.files ?? []).slice(0, 5);
    setForm((prev) => ({ ...prev, photos: files }));
    const previews = files.map((f) => URL.createObjectURL(f));
    setPhotoPreviews(previews);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Build a local review object and prepend to the list
    const newReview: Review = {
      id: Date.now(),
      author: form.name.trim(),
      city: form.city.trim() || "India",
      rating: form.rating,
      review: form.text.trim(),
      trek: trekName,
      trekSlug,
      trekBadge: true,
      date:
        `${form.month ? form.month.slice(0, 3) : ""} ${form.year}`.trim() ||
        "2025",
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);

    // Reset
    setForm({
      rating: 0,
      title: "",
      text: "",
      month: "",
      year: "",
      name: "",
      city: "",
      photos: [],
    });
    setPhotoPreviews([]);
    setErrors({});

    toast.success(
      "Thank you! Your review will appear after verification (usually within 24 hours).",
      { duration: 5000 },
    );

    setTimeout(() => setSubmitted(false), 6000);
  }

  const inputCls =
    "w-full rounded-lg px-3 py-3 text-sm focus:outline-none transition-colors";
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    border: `1px solid ${hasError ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
    color: "var(--ew-text)",
    height: 48,
    background: "#fff",
  });

  return (
    <div className="space-y-6">
      {/* ── Existing reviews section ── */}
      {allReviews.length === 0 ? (
        <div
          className="text-center py-12 rounded-2xl"
          style={{ background: "var(--ew-gray-lt)" }}
          data-ocid="review_form.empty_state"
        >
          <div className="text-5xl mb-3">🏔️</div>
          <h3
            className="font-bold text-base mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            Be the first to review {trekName}!
          </h3>
          <p
            className="text-sm max-w-xs mx-auto"
            style={{ color: "var(--ew-text-lt)" }}
          >
            Share your experience and help other trekkers plan their adventure.
          </p>
        </div>
      ) : (
        <>
          <RatingBreakdown reviews={allReviews} />
          <div className="space-y-4">
            {allReviews.map((r, i) => (
              <ExistingReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>

          {/* Google share CTA */}
          <div
            className="flex items-center justify-between rounded-xl p-4 flex-wrap gap-3"
            style={{
              background: "var(--ew-orange-lt)",
              border: "1px solid var(--ew-orange)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--ew-text)" }}
                >
                  4.8 ⭐ on Google · 2,400+ reviews
                </p>
                <p className="text-xs" style={{ color: "var(--ew-text-lt)" }}>
                  Powered by Google My Business
                </p>
              </div>
            </div>
            <a
              href="https://g.page/r/eternawings/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold px-4 py-2 rounded-full transition-colors"
              style={{
                background: "var(--ew-orange)",
                color: "#fff",
                textDecoration: "none",
              }}
              data-ocid="review_form.google_share_button"
            >
              Share on Google
            </a>
          </div>
        </>
      )}

      {/* ── Submit form ── */}
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
          <div
            className="text-center py-8"
            data-ocid="review_form.success_state"
          >
            <div className="text-5xl mb-3">✅</div>
            <p
              className="font-bold text-base"
              style={{ color: "var(--ew-text)" }}
            >
              Review Submitted!
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Your review will appear after our team verifies it (usually within
              24 hours).
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
            data-ocid="review_form.form"
          >
            {/* Q1: Star rating */}
            <div>
              <label
                htmlFor="star-rating-input"
                className="block text-sm font-semibold mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                Rate your experience{" "}
                <span style={{ color: "var(--ew-red)" }}>*</span>
              </label>
              <input
                type="hidden"
                id="star-rating-input"
                value={form.rating}
                aria-label="Star rating"
                aria-required="true"
              />
              <StarPicker
                value={form.rating}
                onChange={(n) => setForm((p) => ({ ...p, rating: n }))}
              />
              {errors.rating && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="review_form.rating.field_error"
                >
                  {errors.rating}
                </p>
              )}
            </div>

            {/* Q2: Title */}
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
                placeholder="E.g., 'Most magical week of my life'"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="review_form.title.input"
              />
              {errors.title && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="review_form.title.field_error"
                >
                  {errors.title}
                </p>
              )}
            </div>

            {/* Q3: Review text */}
            <div>
              <label
                htmlFor="rv-text"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Your review <span style={{ color: "var(--ew-red)" }}>*</span>
              </label>
              <div className="relative">
                <textarea
                  id="rv-text"
                  rows={5}
                  className="w-full rounded-lg px-3 py-3 text-sm focus:outline-none resize-none"
                  style={{
                    border: `1px solid ${
                      errors.text ? "var(--ew-red)" : "var(--ew-gray-mid)"
                    }`,
                    color: "var(--ew-text)",
                    background: "#fff",
                    minHeight: 120,
                  }}
                  placeholder="Consider covering: Was the guide helpful? How was the food? Was the difficulty rating accurate? What surprised you most?"
                  value={form.text}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, text: e.target.value }))
                  }
                  data-ocid="review_form.text.textarea"
                />
                <span
                  className="absolute bottom-2 right-3 text-[11px]"
                  style={{
                    color:
                      wordCount < 50
                        ? "var(--ew-gray-dark)"
                        : "var(--ew-green)",
                  }}
                >
                  {wordCount} / 500 words
                </span>
              </div>
              {errors.text && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="review_form.text.field_error"
                >
                  {errors.text}
                </p>
              )}
            </div>

            {/* Q4: When */}
            <div>
              <label
                htmlFor="month-select"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                When did you complete this trek?
              </label>
              <div className="flex gap-3">
                <select
                  id="month-select"
                  className="flex-1 rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                  style={{
                    border: "1px solid var(--ew-gray-mid)",
                    color: "var(--ew-text)",
                    height: 48,
                    background: "#fff",
                  }}
                  value={form.month}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, month: e.target.value }))
                  }
                  data-ocid="review_form.month.select"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  className="flex-1 rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                  style={{
                    border: "1px solid var(--ew-gray-mid)",
                    color: "var(--ew-text)",
                    height: 48,
                    background: "#fff",
                  }}
                  value={form.year}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, year: e.target.value }))
                  }
                  data-ocid="review_form.year.select"
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Q5: Photo upload */}
            <div>
              <label
                htmlFor="photo-upload-input"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Upload photos{" "}
                <span
                  className="font-normal"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  (optional, max 5)
                </span>
              </label>
              <label
                htmlFor="photo-upload-input"
                className="w-full rounded-lg py-3 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
                style={{
                  border: "2px dashed var(--ew-gray-mid)",
                  color: "var(--ew-text-lt)",
                  background: "var(--ew-gray-lt)",
                }}
                data-ocid="review_form.photo.upload_button"
              >
                📷 Click to upload trek photos (JPG/PNG, max 5MB each)
              </label>
              <input
                ref={fileInputRef}
                id="photo-upload-input"
                type="file"
                accept="image/jpeg,image/png"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              {photoPreviews.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {photoPreviews.map((src, i) => (
                    <OptimizedImage
                      // biome-ignore lint/suspicious/noArrayIndexKey: stable preview list
                      key={i}
                      src={src}
                      alt={`Preview ${i + 1}`}
                      variant="thumbnail"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Q6: Name */}
            <div>
              <label
                htmlFor="rv-name"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Your name (displayed publicly){" "}
                <span style={{ color: "var(--ew-red)" }}>*</span>
              </label>
              <input
                id="rv-name"
                type="text"
                className={inputCls}
                style={inputStyle(!!errors.name)}
                placeholder="Your full name or display name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="review_form.name.input"
              />
              {errors.name && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="review_form.name.field_error"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Q7: City */}
            <div>
              <label
                htmlFor="rv-city"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Your city{" "}
                <span
                  className="font-normal"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  (optional)
                </span>
              </label>
              <input
                id="rv-city"
                type="text"
                className={inputCls}
                style={inputStyle(false)}
                placeholder="Mumbai, Delhi, Bangalore..."
                value={form.city}
                onChange={(e) =>
                  setForm((p) => ({ ...p, city: e.target.value }))
                }
                data-ocid="review_form.city.input"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--ew-red)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(192,0,28,0.3)",
              }}
              data-ocid="review_form.submit_button"
            >
              Submit Review
            </button>
            <p
              className="text-center text-[11px]"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Your review will also help future trekkers plan their adventure.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
