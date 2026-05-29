import { ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { galleryUploaderLabel } from "@/lib/gallery-community";
import type { GalleryItem } from "@/data/gallery";
import OptimizedImage from "../media/OptimizedImage";

/** Trekker community photo tile — trek/yatra name + uploader on every image. */
export default function GalleryPhotoCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: () => void;
}) {
  const trekLabel = item.trekName ?? item.title;
  const typeLabel = item.productLabel ?? (item.productType === "yatra" ? "Yatra" : "Trek");
  const { name: uploader, when } = galleryUploaderLabel(item.credit);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="w-full text-left group relative rounded-xl overflow-hidden shadow-card"
      onClick={onOpen}
      data-ocid={`gallery.item.${index + 1}`}
      aria-label={`${trekLabel} — photo by ${uploader}`}
    >
      <OptimizedImage
        src={item.src}
        alt={`${trekLabel} — ${uploader}`}
        variant="gallery-thumb"
        width={1200}
        height={900}
        className="w-full h-auto group-hover:scale-[1.06] transition-transform duration-500"
      />

      <span
        className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white shadow-sm pointer-events-none"
        style={{ background: "rgba(192,0,28,0.92)" }}
      >
        {typeLabel}
      </span>

      <div
        className="absolute bottom-0 left-0 right-0 px-2.5 py-2 pointer-events-none"
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.82))",
        }}
      >
        <p className="text-white font-bold text-xs leading-tight truncate">
          {trekLabel}
        </p>
        <p className="text-white/85 text-[10px] truncate">
          {uploader}
          {when ? ` · ${when}` : ""}
        </p>
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250"
        style={{ background: "rgba(192,0,28,0.62)" }}
      >
        <ZoomIn size={28} className="text-white mb-2" />
        <p className="text-white font-bold text-sm px-3 text-center leading-tight">
          {trekLabel}
        </p>
        <p className="text-white/80 text-xs mt-0.5 px-3 text-center">
          {typeLabel} · {uploader}
        </p>
      </div>
    </motion.button>
  );
}
