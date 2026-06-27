import { motion } from "@/lib/motion";
import GalleryImage from "./GalleryImage";

interface MasonryImage {
  id: string;
  src: string;
  alt: string;
}

interface MasonryGalleryProps {
  images: MasonryImage[];
  onImageClick?: (index: number) => void;
}

export default function MasonryGallery({
  images,
  onImageClick,
}: MasonryGalleryProps) {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
      {images.map((image, idx) => (
        <motion.button
          key={image.id}
          type="button"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "80px" }}
          transition={{ duration: 0.45, delay: Math.min(idx * 0.04, 0.4) }}
          className="group relative block w-full overflow-hidden rounded-xl break-inside-avoid"
          onClick={() => onImageClick?.(idx)}
        >
          <GalleryImage
            src={image.src}
            alt={image.alt}
            className="w-full transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </motion.button>
      ))}
    </div>
  );
}
