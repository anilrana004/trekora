import { hasAdminSession } from "@/lib/admin-access";
import {
  approveReview,
  deleteReview,
  fetchPendingReviews,
  formatReviewDate,
  type TrekoraReview,
} from "@/lib/reviews-api";
import { Loader2, Star, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import OptimizedImage from "@/components/media/OptimizedImage";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<TrekoraReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!hasAdminSession()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchPendingReviews();
      if (!res.success) {
        toast.error(res.message ?? "Could not load pending reviews");
        setReviews([]);
      } else {
        setReviews(res.reviews ?? []);
      }
    } catch {
      toast.error("Failed to load reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleApprove(id: string) {
    setActingId(id);
    try {
      const res = await approveReview(id);
      if (res.success) {
        toast.success("Review approved");
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error(res.message ?? "Approve failed");
      }
    } catch {
      toast.error("Approve failed");
    } finally {
      setActingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this review permanently?")) return;
    setActingId(id);
    try {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error(res.message ?? "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setActingId(null);
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.reviews.page">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Review Moderation
          </h1>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Approve trekker reviews — photos go live on trek/yatra pages and the
            gallery.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm font-semibold px-4 py-2 rounded-full border-2 min-h-11"
          style={{ borderColor: "var(--ew-red)", color: "var(--ew-red)" }}
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-16 justify-center">
          <Loader2 className="animate-spin" size={22} />
          <span style={{ color: "var(--ew-gray-dark)" }}>Loading…</span>
        </div>
      ) : null}

      {!loading && reviews.length === 0 ? (
        <p
          className="text-sm rounded-xl px-4 py-8 text-center"
          style={{ background: "var(--ew-gray-lt)", color: "var(--ew-text-lt)" }}
        >
          No reviews awaiting approval.
        </p>
      ) : null}

      <div className="space-y-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-xl p-5 bg-white shadow-sm"
            style={{ border: "1px solid var(--ew-gray-mid)" }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-bold" style={{ color: "var(--ew-text)" }}>
                  {r.userName} · {r.trekName}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  {r.type} · {r.trekSlug} · {formatReviewDate(r.createdAt)}
                </p>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={14}
                      className={
                        n <= r.rating ? "fill-[var(--ew-gold)]" : "fill-none"
                      }
                      style={{ color: "var(--ew-gold)" }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={actingId === r.id}
                  onClick={() => void handleApprove(r.id)}
                  className="text-sm font-semibold px-4 py-2 rounded-full text-white min-h-11"
                  style={{ background: "var(--ew-green)" }}
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={actingId === r.id}
                  onClick={() => void handleDelete(r.id)}
                  className="text-sm font-semibold px-3 py-2 rounded-full border-2 min-h-11 inline-flex items-center gap-1"
                  style={{ borderColor: "var(--ew-red)", color: "var(--ew-red)" }}
                  aria-label="Delete review"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "var(--ew-text-lt)" }}
            >
              {r.reviewText}
            </p>
            {r.photoUrls.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {r.photoUrls.map((src, i) => (
                  <OptimizedImage
                    key={`${r.id}-p-${i}`}
                    src={src}
                    alt=""
                    variant="gallery-thumb"
                    width={100}
                    height={80}
                    className="w-full aspect-[4/3] rounded-lg object-cover"
                  />
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
