import ListingStickyToolbar from "@/components/ListingStickyToolbar";
import ListingToolbarRegions from "@/components/ListingToolbarRegions";
import GalleryPhotoCard from "@/components/gallery/GalleryPhotoCard";
import ProductNameCombobox from "@/components/gallery/ProductNameCombobox";
import { TREKS } from "@/data/treks";
import { YATRAS } from "@/data/yatras";
import { useDynamicGallery } from "@/hooks/useDynamicGallery";
import { useImageUpload } from "@/hooks/useImageUpload";
import {
  COMMUNITY_GALLERY_FILTERS,
  type CommunityGalleryFilter,
  buildOptimisticGalleryItems,
  communityItemsToGallery,
  filterGalleryByTab,
  galleryUploaderLabel,
} from "@/lib/gallery-community";
import { refreshAllGalleries } from "@/lib/gallery-refresh";
import {
  galleryPageCloudinaryContext,
  galleryPageCloudinaryTags,
  galleryPagePhotoFolder,
} from "@/lib/gallery-upload-cloudinary";
import { buildPhotoCredit } from "@/lib/photo-credit";
import { pushSiteGalleryToCache } from "@/lib/product-gallery-cache";
import { buildGalleryPageSEO } from "@/lib/product-seo";
import { resolveProductForUpload } from "@/lib/resolve-product-upload";
import type { ProductKind } from "@/lib/reviews-api";
import type { GalleryApiItem } from "@/lib/reviews-api";
import { saveGalleryPagePhotosToApi } from "@/lib/submit-gallery-photos";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  Binoculars,
  ChevronRight,
  Download,
  Loader2,
  MapPinned,
  Phone,
  Share2,
  Upload,
  X,
  ZoomIn,
} from "lucide-react";
import { AnimatePresence, motion } from "@/lib/motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";
import type { GalleryItem } from "../data/gallery";

import {
  openCallbackFromLayout,
  openQueryModalFromLayout,
  openTrekQuizFromLayout,
} from "@/lib/layout-modals";

/** Initial grid batch — more rows load on demand to keep DOM light at scale. */
const GALLERY_RENDER_BATCH = 48;

/** Outlined red pill — matches trek / packages / corporate CTAs */
const CTA_OUTLINE_RED =
  "inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-5 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white transition-colors";

/** On dark lightbox backgrounds */
const CTA_OUTLINE_WHITE =
  "inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-[var(--ew-red)] transition-colors";

function filterPillClass(active: boolean): string {
  return `listing-region-pill${active ? " listing-region-pill--active" : ""}`;
}

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
        <OptimizedImage
          src={item.src}
          alt={item.title}
          variant="gallery-full"
          priority
          width={1600}
          height={1200}
          className="w-full max-h-[72vh] object-contain rounded-xl"
          sizes="(max-width: 1920px) 90vw, 1728px"
        />
        {/* Caption row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
          <div>
            <p className="text-white font-bold text-sm">
              {item.trekName ?? item.title}
            </p>
            <p className="text-white/60 text-xs mt-0.5">
              {item.productLabel ?? "Trek"} ·{" "}
              {galleryUploaderLabel(item.credit).name}
              {galleryUploaderLabel(item.credit).when
                ? ` · ${galleryUploaderLabel(item.credit).when}`
                : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={item.src}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={CTA_OUTLINE_WHITE}
              aria-label="Download image"
              data-ocid="gallery.lightbox.download"
            >
              <Download size={13} aria-hidden /> Download
            </a>
            <button
              type="button"
              onClick={handleShare}
              className={CTA_OUTLINE_WHITE}
              aria-label="Share image"
              data-ocid="gallery.lightbox.share"
            >
              <Share2 size={13} aria-hidden /> Share
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

const MONTH_LABELS = [
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

function monthValueToLabel(when: string): { month: string; year: string } {
  const [year, mon] = when.split("-");
  const idx = Number.parseInt(mon ?? "", 10) - 1;
  return {
    month: MONTH_LABELS[idx] ?? "Jan",
    year: year ?? String(new Date().getFullYear()),
  };
}

/* ───────────────────────────────────
   UPLOAD FORM
─────────────────────────────────── */
function UploadSection({
  defaultTrekName,
  onUploaded,
  onPhotosPublished,
}: {
  defaultTrekName?: string;
  onUploaded?: () => void;
  onPhotosPublished?: (items: GalleryApiItem[]) => void;
}) {
  const [name, setName] = useState("");
  const [trek, setTrek] = useState(defaultTrekName ?? "");
  const [when, setWhen] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const resolved = useMemo(() => resolveProductForUpload(trek), [trek]);

  const uploadOptions = useMemo(() => {
    if (!resolved) {
      return {
        folder: "treks" as const,
        folderPath: "trekora/gallery/pending",
        tags: [] as string[],
        context: {} as Record<string, string>,
      };
    }
    const slug = resolved.slug;
    return {
      folder: "treks" as const,
      folderPath: galleryPagePhotoFolder(resolved.type, slug),
      tags: galleryPageCloudinaryTags(resolved.type, slug),
      context: galleryPageCloudinaryContext(resolved.name, slug, resolved.type),
    };
  }, [resolved]);

  const {
    items: uploadItems,
    queueFiles,
    uploadAllForSubmit,
    cancel,
    clear,
    cloudinaryReady,
  } = useImageUpload(uploadOptions);

  useEffect(() => {
    if (defaultTrekName) setTrek(defaultTrekName);
  }, [defaultTrekName]);

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      5 - uploadItems.length,
    );
    if (files.length) queueFiles(files);
    e.target.value = "";
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !trek.trim() || !when.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!resolved) {
      toast.error("Enter a valid trek or yatra name (e.g. Valley of Flowers).");
      return;
    }
    if (!cloudinaryReady) {
      toast.error("Photo upload is temporarily unavailable. Try again later.");
      return;
    }
    if (uploadItems.length === 0) {
      toast.error("Choose at least one photo.");
      return;
    }
    if (submitting) return;

    const { month, year } = monthValueToLabel(when);
    const credit = buildPhotoCredit(name, month, year);
    const displayName = name.trim();
    setSubmitting(true);

    try {
      const { assets: uploaded, errors: uploadErrors } =
        await uploadAllForSubmit();

      if (uploaded.length === 0) {
        toast.error(uploadErrors[0] ?? "Photo upload failed.");
        return;
      }

      const optimistic = buildOptimisticGalleryItems({
        assets: uploaded,
        trekSlug: resolved.slug,
        trekName: resolved.name,
        productType: resolved.type,
        credit,
      });
      onPhotosPublished?.(optimistic);

      const res = await saveGalleryPagePhotosToApi({
        trekSlug: resolved.slug,
        trekName: resolved.name,
        productType: resolved.type,
        uploadedBy: credit,
        assets: uploaded,
      });

      if (!res.success) {
        toast.warning(
          res.message ??
            "Photos are visible here; full gallery sync will retry shortly.",
          { duration: 6000 },
        );
        clear();
        setName("");
        setWhen("");
        return;
      }

      clear();
      setName("");
      setWhen("");
      refreshAllGalleries();
      onUploaded?.();

      toast.success(
        res.message ??
          `Thank you, ${displayName}! Your photos are live in the community gallery.`,
        { duration: 6000 },
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/30 border border-[var(--ew-gray-mid)] text-[var(--ew-text)]";

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4"
      data-ocid="gallery.upload_form"
    >
      {!cloudinaryReady ? (
        <p
          className="text-sm rounded-lg px-4 py-3"
          style={{ background: "#fff3e0", color: "var(--ew-text)" }}
        >
          Photo upload is temporarily unavailable. You can still share from any
          trek page → Photos → Trekker Photos.
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={submitting || uploadItems.length >= 5}
        className="w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-8 transition-colors cursor-pointer disabled:opacity-60"
        style={{
          borderColor:
            uploadItems.length > 0 ? "var(--ew-green)" : "var(--ew-gray-mid)",
          backgroundColor: "var(--ew-gray-lt)",
        }}
        data-ocid="gallery.dropzone"
        aria-label="Upload photo"
      >
        <Upload
          size={32}
          className="mb-3"
          style={{ color: "var(--ew-gray-dark)" }}
        />
        <p
          className="font-semibold text-sm"
          style={{ color: "var(--ew-text)" }}
        >
          {uploadItems.length > 0
            ? `${uploadItems.length} photo(s) selected`
            : "Click to select photos"}
        </p>
        <p className="text-xs mt-1" style={{ color: "var(--ew-gray-dark)" }}>
          JPEG / PNG / WebP · Max 5 MB each · Up to 5
        </p>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFilePick}
        className="hidden"
        data-ocid="gallery.upload_button"
      />

      {uploadItems.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {uploadItems.map((item) => (
            <div key={item.id} className="relative">
              <img
                src={item.previewUrl}
                alt=""
                className="h-20 w-20 rounded-lg object-cover border border-[var(--ew-gray-mid)]"
              />
              {item.status === "uploading" ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                  <Loader2 className="animate-spin text-white" size={16} />
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => cancel(item.id)}
                disabled={submitting}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-xs font-bold border border-[var(--ew-gray-mid)] text-[var(--ew-red)]"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="min-w-0">
          <label
            htmlFor="upload-name"
            className="text-xs font-semibold block mb-1.5"
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
            disabled={submitting}
            className={inputCls}
            data-ocid="gallery.upload_name.input"
          />
        </div>
        <div className="min-w-0 sm:col-span-2 lg:col-span-1 relative z-[1]">
          <label
            htmlFor="upload-trek"
            className="text-xs font-semibold block mb-1.5"
            style={{ color: "var(--ew-text)" }}
          >
            Trek / Yatra name *
          </label>
          <ProductNameCombobox
            id="upload-trek"
            value={trek}
            onChange={setTrek}
            placeholder="Type to search — e.g. valley, kedarnath"
            required
            disabled={submitting}
            data-ocid="gallery.upload_trek.input"
          />
        </div>
        <div className="min-w-0">
          <label
            htmlFor="upload-when"
            className="text-xs font-semibold block mb-1.5"
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
            disabled={submitting}
            className={inputCls}
            data-ocid="gallery.upload_when.input"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={
          submitting ||
          !cloudinaryReady ||
          uploadItems.length === 0 ||
          !resolved
        }
        className={`${CTA_OUTLINE_RED} w-full disabled:opacity-60 inline-flex items-center justify-center gap-2`}
        data-ocid="gallery.upload.submit_button"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden />
            Uploading…
          </>
        ) : (
          <>
            <Upload size={16} aria-hidden /> Share Your Memory{" "}
            <ChevronRight size={14} aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}

export default function GalleryPage() {
  const gallerySeo = buildGalleryPageSEO();
  const { trekSlug: trekSlugRaw } = useSearch({ strict: false });
  const trekSlugFilter = useMemo(
    () =>
      (typeof trekSlugRaw === "string" ? trekSlugRaw : "").trim().toLowerCase(),
    [trekSlugRaw],
  );

  const trekFilterType = useMemo((): ProductKind | undefined => {
    if (!trekSlugFilter) return undefined;
    return YATRAS.some((y) => y.slug === trekSlugFilter) ? "yatra" : "trek";
  }, [trekSlugFilter]);

  const [activeFilter, setActiveFilter] =
    useState<CommunityGalleryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const {
    items: communityItems,
    loading: galleryLoading,
    refetch: refetchGallery,
  } = useDynamicGallery({
    trekSlug: trekSlugFilter || undefined,
    type: trekFilterType,
    communityOnly: true,
    limit: 200,
  });

  const trekFilterLabel = useMemo(() => {
    if (!trekSlugFilter) return null;
    const fromApi = communityItems.find((i) => i.trekSlug === trekSlugFilter);
    if (fromApi?.trekName) return fromApi.trekName;
    const trek = TREKS.find((t) => t.slug === trekSlugFilter);
    return trek?.name ?? trekSlugFilter.replace(/-/g, " ");
  }, [trekSlugFilter, communityItems]);

  const allItems = useMemo(
    () => communityItemsToGallery(communityItems),
    [communityItems],
  );

  const filtered = useMemo(
    () => filterGalleryByTab(allItems, activeFilter),
    [allItems, activeFilter],
  );

  const [visibleCount, setVisibleCount] = useState(GALLERY_RENDER_BATCH);

  useEffect(() => {
    setVisibleCount(GALLERY_RENDER_BATCH);
  }, [activeFilter, trekSlugFilter]);

  const handlePhotosPublished = useCallback(
    (items: GalleryApiItem[]) => {
      if (!items.length) return;
      const slug = items[0]?.trekSlug;
      const type = items[0]?.type;
      pushSiteGalleryToCache(
        queryClient,
        items,
        slug && type ? { trekSlug: slug, type } : undefined,
      );
      void refetchGallery(true);
    },
    [queryClient, refetchGallery],
  );

  const visibleItems = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );

  const hasMoreGallery = visibleCount < filtered.length;

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
        title={gallerySeo.title}
        description={gallerySeo.description}
        keywords={gallerySeo.keywords}
        canonical={gallerySeo.canonical}
      />

      <div
        className="pt-16 min-h-screen"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        {/* Hero — matches treks / packages listing */}
        <div
          className="relative overflow-hidden"
          data-travel-image-section
          style={{ backgroundColor: "var(--ew-red)" }}
        >
          <svg
            className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z"
              fill="white"
            />
            <path
              d="M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z"
              fill="white"
              opacity="0.5"
            />
          </svg>

          <div className="container mx-auto px-4 py-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-center text-white"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
                Trekker Gallery
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
                Community Photo Gallery
              </h1>
              <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto">
                {trekFilterLabel
                  ? `Real photos shared by trekkers on ${trekFilterLabel} — each tagged with trek/yatra and traveller name.`
                  : "Only photos uploaded by trekkers and pilgrims. Every image shows the trek or yatra name and who shared it."}
              </p>
              {trekSlugFilter ? (
                <Link
                  to="/gallery"
                  search={{ trekSlug: undefined }}
                  className="inline-block mt-3 text-xs font-semibold text-white/90 underline underline-offset-2 hover:text-white"
                >
                  View all gallery photos
                </Link>
              ) : null}
              <span
                className="inline-block mt-6 px-7 py-2.5 rounded-full text-sm font-semibold text-white shadow-md"
                style={{
                  backgroundColor: "var(--ew-red)",
                  border: "2px solid rgba(255,255,255,0.35)",
                }}
              >
                {filtered.length} trekker photo
                {filtered.length === 1 ? "" : "s"}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => openQueryModalFromLayout()}
                  className={CTA_OUTLINE_WHITE}
                  data-ocid="gallery.hero.plan_button"
                >
                  <MapPinned size={16} aria-hidden />
                  Plan My Trek <ChevronRight size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => openTrekQuizFromLayout()}
                  className={CTA_OUTLINE_WHITE}
                  data-ocid="gallery.hero.find_button"
                >
                  <Binoculars size={16} aria-hidden />
                  Find My Trek <ChevronRight size={14} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => openCallbackFromLayout()}
                  className={CTA_OUTLINE_WHITE}
                  data-ocid="gallery.hero.callback_button"
                >
                  <Phone size={16} aria-hidden />
                  Call Back <ChevronRight size={14} aria-hidden />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />

        <TravelSideActionRail variant="listing-gallery" />

        <ListingStickyToolbar className="bg-white shadow-sm border-b border-[var(--ew-gray-mid)]">
          <ListingToolbarRegions>
            <div
              className="listing-region-pills"
              role="tablist"
              aria-label="Filter gallery photos"
            >
              {COMMUNITY_GALLERY_FILTERS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                  className={filterPillClass(activeFilter === cat)}
                  data-ocid={`gallery.filter.${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ListingToolbarRegions>
        </ListingStickyToolbar>

        {/* Masonry grid */}
        <div className="container mx-auto px-4 py-10">
          {galleryLoading && filtered.length === 0 ? (
            <div
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 animate-pulse"
              aria-busy="true"
              aria-label="Loading gallery"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={`gal-skel-${i}`}
                  className="break-inside-avoid mb-4 h-48 rounded-xl"
                  style={{ background: "var(--ew-gray-mid)" }}
                />
              ))}
            </div>
          ) : null}
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
              hidden: {},
            }}
          >
            {visibleItems.map((item, i) => (
              <motion.div
                key={item.apiId ?? `${item.src}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid mb-4"
              >
                <GalleryPhotoCard
                  item={item}
                  index={i}
                  onOpen={() => openLightbox(i)}
                />
              </motion.div>
            ))}
          </motion.div>

          {hasMoreGallery && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((n) =>
                    Math.min(filtered.length, n + GALLERY_RENDER_BATCH),
                  )
                }
                className={CTA_OUTLINE_RED}
                data-ocid="gallery.load_more"
              >
                Load more photos ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {!galleryLoading && filtered.length === 0 && (
            <div className="text-center py-20" data-ocid="gallery.empty_state">
              <span className="text-5xl block mb-4">📷</span>
              <p
                className="font-bold text-lg"
                style={{ color: "var(--ew-text)" }}
              >
                {trekFilterLabel
                  ? `No trekker photos for ${trekFilterLabel} yet`
                  : "No trekker photos yet"}
              </p>
              <p
                className="text-sm mt-1 max-w-sm mx-auto"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Upload below or from any trek/yatra page. Only shared photos
                appear here — not official catalog images.
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
                Upload here — your name, trek or yatra name, and date appear on
                every photo. Official trek images are not shown in this gallery.
              </p>
            </motion.div>
            <div
              className="rounded-2xl p-5 sm:p-6 shadow-card overflow-visible relative"
              style={{
                background: "var(--ew-white)",
                border: "1px solid var(--ew-gray-mid)",
              }}
            >
              <UploadSection
                defaultTrekName={trekFilterLabel ?? undefined}
                onUploaded={() => refetchGallery(true)}
                onPhotosPublished={handlePhotosPublished}
              />
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
