import TrekkerPhotoWall from "@/components/TrekkerPhotoWall";
import type { GalleryApiItem, ProductKind } from "@/lib/reviews-api";

/** Reviews-tab photo block — same upload/display flow as the Photos tab. */
export default function ReviewSectionPhotos({
  productName,
  productSlug,
  productType,
  communityPhotos,
  communityLoading,
  communityError,
  prependPhotos,
  clearOptimistic,
  reloadGallery,
}: {
  productName: string;
  productSlug: string;
  productType: ProductKind;
  communityPhotos: GalleryApiItem[];
  communityLoading: boolean;
  communityError: string | null;
  prependPhotos: (items: GalleryApiItem[]) => void;
  clearOptimistic: () => void;
  reloadGallery: (silent?: boolean) => Promise<void>;
}) {
  return (
    <TrekkerPhotoWall
      key={`review-section-photos-${productType}-${productSlug}`}
      variant="reviews"
      trekSlug={productSlug}
      trekName={productName}
      productType={productType}
      communityPhotos={communityPhotos}
      communityLoading={communityLoading}
      communityError={communityError}
      prependPhotos={prependPhotos}
      clearOptimistic={clearOptimistic}
      reloadGallery={reloadGallery}
    />
  );
}
