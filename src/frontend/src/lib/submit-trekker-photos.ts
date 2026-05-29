import type { CloudinaryAsset } from "@/lib/images/upload-types";
import {
  productPhotoFolder,
} from "@/lib/product-cloudinary";
import { submitProductPhotos } from "@/lib/product-photos-api";
import type { ProductKind } from "@/lib/reviews-api";

export async function saveTrekkerPhotosToApi(params: {
  trekSlug: string;
  trekName: string;
  productType: ProductKind;
  uploadedBy: string;
  assets: CloudinaryAsset[];
}): Promise<{ success: boolean; message?: string; count?: number }> {
  const slug = params.trekSlug.trim().toLowerCase();
  const trekName = params.trekName.trim();
  const folderPath = productPhotoFolder(params.productType, slug);

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
    uploadSource: "product-page",
    tags: [trekName, slug, params.productType],
    photos: photoEntries,
    photoUrls: photoEntries.map((p) => p.url),
  });
}
