import { ChevronLeft, ChevronRight, X } from "lucide-react";
import OptimizedImage from "../media/OptimizedImage";

export default function ProductDetailLightbox({
  productName,
  photos,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  ocidPrefix,
}: {
  productName: string;
  photos: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  ocidPrefix: string;
}) {
  if (activeIndex < 0 || activeIndex >= photos.length) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} photo gallery`}
      data-ocid={`${ocidPrefix}.lightbox`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Close lightbox"
        data-ocid={`${ocidPrefix}.lightbox.close_button`}
      >
        <X size={22} />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
        aria-label="Previous photo"
        data-ocid={`${ocidPrefix}.lightbox.prev`}
      >
        <ChevronLeft size={24} />
      </button>
      <div className="relative h-[min(80vh,720px)] w-full max-w-4xl">
        <OptimizedImage
          src={photos[activeIndex]}
          alt={`${productName} — ${activeIndex + 1}`}
          fill
          variant="hero"
          className="object-contain"
        />
      </div>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
        aria-label="Next photo"
        data-ocid={`${ocidPrefix}.lightbox.next`}
      >
        <ChevronRight size={24} />
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
        {activeIndex + 1} / {photos.length}
      </p>
    </div>
  );
}
