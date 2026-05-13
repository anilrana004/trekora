import { Download, Share2, Upload, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SEOHead } from "../components/SEOHead";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "../data/gallery";
import type { GalleryItem } from "../data/gallery";

/* ───────────────────────────────────
   LIGHTBOX
─────────────────────────────────── */
function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = images[index];
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const handleShare = () => {
    const url = `${window.location.origin}/gallery?image=${item.id}`;
    navigator.clipboard.writeText(url).catch(() => null);
    toast.success("Link copied to clipboard!", { duration: 3000 });
  };

  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-ocid="gallery.lightbox"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-label="Close lightbox"
        data-ocid="gallery.lightbox.close_button"
      >
        <X size={22} className="text-white" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-label="Previous image"
        data-ocid="gallery.lightbox.prev"
      >
        <span className="text-white font-bold text-lg leading-none">‹</span>
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10 transition-colors hover:opacity-80"
        style={{ background: "rgba(255,255,255,0.15)" }}
        aria-label="Next image"
        data-ocid="gallery.lightbox.next"
      >
        <span className="text-white font-bold text-lg leading-none">›</span>
      </button>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="max-w-5xl w-full px-16 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src.replace("w=800", "w=1200")}
          alt={item.title}
          className="w-full max-h-[72vh] object-contain rounded-xl"
          loading="eager"
        />
        {/* Caption row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div>
            <p className="text-white font-bold text-sm">{item.title}</p>
            <p className="text-white/60 text-xs mt-0.5">
              {item.category} · Photo: {item.credit}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={item.src}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white px-3 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--ew-orange)" }}
              aria-label="Download image"
              data-ocid="gallery.lightbox.download"
            >
              <Download size={13} /> Download
            </a>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-white px-3 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.15)" }}
              aria-label="Share image"
              data-ocid="gallery.lightbox.share"
            >
              <Share2 size={13} /> Share
            </button>
          </div>
        </div>
        {/* Counter */}
        <p className="text-center text-white/40 text-xs mt-2">
          {index + 1} / {images.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────
   UPLOAD FORM
─────────────────────────────────── */
function UploadSection() {
  const [name, setName] = useState("");
  const [trek, setTrek] = useState("");
  const [when, setWhen] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5 MB.");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a photo first.");
      return;
    }
    if (!name.trim() || !trek.trim() || !when.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success(
      "📸 Thank you! Your photo is under review and will appear soon.",
      { duration: 5000 },
    );
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#e8f5e9" }}
        >
          <span className="text-3xl">✅</span>
        </div>
        <h3
          className="font-bold text-xl mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          Photo submitted!
        </h3>
        <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
          Our team will review it and publish within 24–48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="gallery.upload_form"
    >
      {/* File dropzone */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 transition-colors cursor-pointer"
        style={{
          borderColor: preview ? "var(--ew-green)" : "var(--ew-gray-mid)",
          backgroundColor: "var(--ew-gray-lt)",
        }}
        data-ocid="gallery.dropzone"
        aria-label="Upload photo"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 rounded-lg object-contain mb-2"
          />
        ) : (
          <>
            <Upload
              size={32}
              className="mb-3"
              style={{ color: "var(--ew-gray-dark)" }}
            />
            <p
              className="font-semibold text-sm"
              style={{ color: "var(--ew-text)" }}
            >
              Click to select your photo
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              JPEG or PNG · Max 5 MB
            </p>
          </>
        )}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFile}
        className="hidden"
        data-ocid="gallery.upload_button"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label
            htmlFor="upload-name"
            className="text-xs font-semibold block mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            Your Name *
          </label>
          <input
            id="upload-name"
            type="text"
            placeholder="Priya Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            style={{
              border: "1px solid var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
            data-ocid="gallery.upload_name.input"
          />
        </div>
        <div>
          <label
            htmlFor="upload-trek"
            className="text-xs font-semibold block mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            Which Trek? *
          </label>
          <input
            id="upload-trek"
            type="text"
            placeholder="Roopkund Trek"
            value={trek}
            onChange={(e) => setTrek(e.target.value)}
            required
            className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            style={{
              border: "1px solid var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
            data-ocid="gallery.upload_trek.input"
          />
        </div>
        <div>
          <label
            htmlFor="upload-when"
            className="text-xs font-semibold block mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            When? *
          </label>
          <input
            id="upload-when"
            type="month"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            required
            className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            style={{
              border: "1px solid var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
            data-ocid="gallery.upload_when.input"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary w-full justify-center gap-2"
        data-ocid="gallery.upload.submit_button"
      >
        <Upload size={16} /> Submit Photo for Review
      </button>
    </form>
  );
}

/* ───────────────────────────────────
   GALLERY PAGE
─────────────────────────────────── */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((i) =>
        i === null ? 0 : (i + dir + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  return (
    <>
      <SEOHead
        title="Trek Photo Gallery — Himalayan Trekking & Yatra Photos | EternaWings"
        description="Browse stunning photos from Himalayan treks and yatras — Roopkund, Valley of Flowers, Kedarnath, Spiti Valley. Submit your own trek photos."
        canonical="https://www.eternawings.com/gallery"
      />

      <div
        className="pt-16 min-h-screen"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        {/* Hero */}
        <div
          className="py-14 text-center"
          style={{
            background: "var(--ew-white)",
            borderBottom: "1px solid var(--ew-gray-mid)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Visual Stories
            </span>
            <h1 className="section-title mt-2 mx-auto block">
              Himalayan Gallery
            </h1>
            <p className="mt-3 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              60+ stunning images from across the Himalayas — Uttarakhand &amp;
              Himachal Pradesh
            </p>
          </motion.div>
        </div>

        {/* Filter tabs — sticky */}
        <div
          className="bg-white py-3 shadow-sm sticky z-20"
          style={{ top: 64, borderBottom: "1px solid var(--ew-gray-mid)" }}
        >
          <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat
                    ? { background: "var(--ew-red)", color: "#fff" }
                    : {
                        background: "var(--ew-gray-lt)",
                        color: "var(--ew-text-lt)",
                        border: "1px solid var(--ew-gray-mid)",
                      }
                }
                data-ocid={`gallery.filter.${cat.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="container mx-auto px-4 py-10">
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
              hidden: {},
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid mb-4"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="w-full text-left group relative rounded-xl overflow-hidden shadow-card"
                  onClick={() => openLightbox(i)}
                  data-ocid={`gallery.item.${i + 1}`}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto group-hover:scale-[1.06] transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                    style={{ background: "rgba(192,0,28,0.62)" }}
                  >
                    <ZoomIn size={28} className="text-white mb-2" />
                    <p className="text-white font-bold text-sm px-3 text-center leading-tight">
                      {item.title}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">
                      {item.credit}
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20" data-ocid="gallery.empty_state">
              <span className="text-5xl block mb-4">🏔️</span>
              <p
                className="font-bold text-lg"
                style={{ color: "var(--ew-text)" }}
              >
                No photos in this category yet
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Be the first to contribute!
              </p>
            </div>
          )}
        </div>

        {/* Upload section */}
        <div
          className="py-16"
          style={{
            borderTop: "1px solid var(--ew-gray-mid)",
            background: "var(--ew-white)",
          }}
        >
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--ew-orange)" }}
              >
                Community Photos
              </span>
              <h2 className="section-title mt-2">
                Trek with us? Share your moment!
              </h2>
              <p
                className="mt-3 text-sm max-w-md mx-auto"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Upload your best Himalayan shot. Approved photos appear here and
                may be featured on our homepage.
              </p>
            </motion.div>
            <div
              className="rounded-2xl p-6 shadow-card"
              style={{
                background: "var(--ew-white)",
                border: "1px solid var(--ew-gray-mid)",
              }}
            >
              <UploadSection />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNav={navLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
