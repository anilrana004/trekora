import OptimizedImage from "../media/OptimizedImage";

export default function ProductDetailThumbnailStrip({
  images,
  activeIndex,
  onSelect,
  productName,
  ocidPrefix,
}: {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  productName: string;
  ocidPrefix: string;
}) {
  if (images.length < 2) return null;

  return (
    <div className="flex gap-1 overflow-x-auto bg-black px-2 py-1">
      {images.map((img, i) => (
        <button
          key={img}
          type="button"
          onClick={() => onSelect(i)}
          className="flex-shrink-0 overflow-hidden rounded transition-all"
          style={{
            outline:
              i === activeIndex
                ? "2px solid var(--ew-red)"
                : "2px solid transparent",
            outlineOffset: 1,
          }}
          aria-label={`View image ${i + 1}`}
          data-ocid={`${ocidPrefix}.thumb.${i + 1}`}
        >
          <OptimizedImage
            src={img}
            alt={`${productName} thumbnail ${i + 1}`}
            width={64}
            height={40}
            variant="thumbnail"
            className="h-10 w-16 object-cover"
          />
        </button>
      ))}
    </div>
  );
}
