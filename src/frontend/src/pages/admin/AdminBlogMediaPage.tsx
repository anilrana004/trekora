import OptimizedImage from "@/components/media/OptimizedImage";
import { fetchBlogMediaLibrary, type BlogMediaItem } from "@/lib/blogs-api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminBlogMediaPage() {
  const [media, setMedia] = useState<BlogMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetchBlogMediaLibrary()
      .then(setMedia)
      .catch(() => toast.error("Failed to load media library"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6" data-ocid="admin.blogs.media">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
          Media Library
        </h2>
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          Featured and inline images from blog posts (Cloudinary URLs / IDs).
        </p>
      </div>

      {loading ? (
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          Loading…
        </p>
      ) : media.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow-card text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          No blog media yet. Upload featured images while creating articles —
          they appear here automatically.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => (
            <article
              key={item.url}
              className="rounded-2xl bg-white overflow-hidden shadow-card"
            >
              <div className="relative h-40">
                <OptimizedImage
                  src={item.url}
                  alt={item.postTitle}
                  fill
                  variant="blog-card"
                  className="object-cover"
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold line-clamp-1" style={{ color: "var(--ew-text)" }}>
                  {item.postTitle}
                </p>
                <p className="text-[11px] uppercase font-bold" style={{ color: "var(--ew-orange)" }}>
                  {item.kind}
                </p>
                {item.publicId ? (
                  <p className="text-xs font-mono break-all" style={{ color: "var(--ew-gray-dark)" }}>
                    {item.publicId}
                  </p>
                ) : (
                  <p className="text-xs font-mono break-all line-clamp-2" style={{ color: "var(--ew-gray-dark)" }}>
                    {item.url}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
