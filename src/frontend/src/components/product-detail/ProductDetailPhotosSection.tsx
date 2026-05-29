import { Share2 } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { useTrekkerPhotos } from "@/hooks/useTrekkerPhotos";
import { mergeProductGalleryPhotos } from "@/lib/merge-gallery-photos";
import { parsePhotoCredit } from "@/lib/photo-credit";
import type { ProductKind } from "@/lib/reviews-api";
import OptimizedImage from "../media/OptimizedImage";
import ReelsShortsRow from "../ReelsShortsRow";
import TrekkerPhotoWall from "../TrekkerPhotoWall";
import type { TrekReel } from "@/data/trek-reels";

export default function ProductDetailPhotosSection({
  productName,
  productSlug,
  productType,
  galleryPhotos,
  coverImage,
  onPhotoClick,
  reels,
  ocidPrefix,
  extraBelowGallery,
}: {
  productName: string;
  productSlug: string;
  productType: ProductKind;
  galleryPhotos: string[];
  coverImage: string;
  onPhotoClick: (index: number) => void;
  reels?: TrekReel[];
  ocidPrefix: string;
  extraBelowGallery?: ReactNode;
}) {
  const productLabel = productType === "yatra" ? "Yatra" : "Trek";
  const normalizedSlug = productSlug.trim().toLowerCase();

  const {
    photos: communityItems,
    loading: communityLoading,
    error: communityError,
    prependPhotos,
    clearOptimistic,
    reload,
  } = useTrekkerPhotos(normalizedSlug, productType);

  const mergedGallery = useMemo(
    () =>
      mergeProductGalleryPhotos(
        communityItems,
        galleryPhotos,
        productName,
        productLabel,
      ),
    [communityItems, galleryPhotos, productName, productLabel],
  );

  return (
    <div>
      <h2 className="section-title mb-5">Photos & Videos</h2>

      {mergedGallery.length > 0 ? (
        <div className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {mergedGallery.map((photo, i) => {
            const isCommunity =
              photo.source === "product" || photo.source === "review";
            const creditMeta = isCommunity
              ? parsePhotoCredit(
                  communityItems.find((c) => c.src === photo.src)?.credit ?? "",
                )
              : null;

            return (
              <button
                key={`${photo.src}-${i}`}
                type="button"
                onClick={() => onPhotoClick(i)}
                className="group relative aspect-video overflow-hidden rounded-xl"
              >
                <OptimizedImage
                  src={photo.src}
                  alt={
                    creditMeta?.name
                      ? `${productName} — ${creditMeta.name}`
                      : `${productName} view ${i + 1}`
                  }
                  fill
                  variant="gallery-thumb"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {creditMeta?.name ? (
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                    <p className="text-white text-[10px] font-semibold truncate">
                      {creditMeta.name}
                    </p>
                    {creditMeta.when ? (
                      <p className="text-white/75 text-[9px] truncate">
                        {creditMeta.when}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/30">
                  <Share2
                    size={22}
                    className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : null}

      <TrekkerPhotoWall
        key={`${productType}-${normalizedSlug}`}
        trekSlug={normalizedSlug}
        trekName={productName}
        productType={productType}
        communityPhotos={communityItems}
        communityLoading={communityLoading}
        communityError={communityError}
        prependPhotos={prependPhotos}
        clearOptimistic={clearOptimistic}
        reloadGallery={reload}
      />

      {reels && reels.length > 0 ? (
        <div className="mb-8 mt-8">
          <h3
            className="mb-3 text-base font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Reels &amp; Shorts
          </h3>
          <ReelsShortsRow
            reels={reels}
            ocidPrefix={`${ocidPrefix}.photos`}
            currentProductSlug={productSlug}
          />
        </div>
      ) : null}

      <h3
        className="mb-3 text-base font-bold"
        style={{ color: "var(--ew-text)" }}
      >
        Trek Videos
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            id: "Rz5g2-_Gu1c",
            title: `${productName} — Full Experience`,
          },
          {
            id: "ypnRIHdlGE8",
            title: `${productName} — Highlights & Tips`,
          },
        ].map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-40 overflow-hidden rounded-xl"
            data-ocid={`${ocidPrefix}.video.${v.id}`}
          >
            <OptimizedImage
              src={coverImage}
              alt={v.title}
              fill
              variant="blog-card"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/45">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
                style={{ backgroundColor: "var(--ew-red)" }}
              >
                <div className="ml-1 h-0 w-0 border-b-[10px] border-b-transparent border-l-[16px] border-l-white border-t-[10px] border-t-transparent" />
              </div>
            </div>
            <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white text-shadow">
              {v.title}
            </p>
          </a>
        ))}
      </div>
      {extraBelowGallery}
    </div>
  );
}
