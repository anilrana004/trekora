import type { CloudinaryAsset } from "@/lib/images/upload-types";
import { galleryPagePhotoFolder } from "@/lib/gallery-upload-cloudinary";
import { submitProductPhotos } from "@/lib/product-photos-api";
import type { ProductKind } from "@/lib/reviews-api";

/** Saves photos uploaded from /gallery only — not shown on trek/yatra Photos tabs. */
export async function saveGalleryPagePhotosToApi(params: {
  trekSlug: string;
  trekName: string;
  productType: ProductKind;
  uploadedBy: string;
  assets: CloudinaryAsset[];
}): Promise<{ success: boolean; message?: string; count?: number }> {
  const slug = params.trekSlug.trim().toLowerCase();
  const trekName = params.trekName.trim();
  const folderPath = galleryPagePhotoFolder(params.productType, slug);

  const photoEntries = params.assets.map((asset) => ({
    url: asset.secureUrl,
    publicId: asset.publicId,
    cloudinaryFolder: folderPath,
    width: asset.width,
    height: asset.height,
  }));

  return submitProductPhotos({
    trekSlug: slug,
    trekName,
    type: params.productType,
    uploadedBy: params.uploadedBy,
    uploadSource: "gallery-page",
    tags: [trekName, slug, params.productType, "gallery-upload"],
    photos: photoEntries,
    photoUrls: photoEntries.map((p) => p.url),
  });
}
