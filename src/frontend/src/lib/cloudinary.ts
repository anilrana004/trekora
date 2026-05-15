/**
 * Trekora Cloudinary — single entry re-exports for app code.
 * Implementation lives in `lib/images/*` and `utils/mediaTransform.ts`.
 */
export {
  getCloudinaryCloudName,
  CLOUDINARY_IMAGE_HOST,
} from "./images/cloudinary-config";
export {
  buildBlurPlaceholderUrl,
  buildOptimizedImageUrl,
  buildResponsiveSrcSet,
  buildSeoImageUrl,
  type ImageDeliveryOptions,
} from "./images/cloudinary-url";
export {
  CLOUDINARY_FOLDERS,
  type CloudinaryAsset,
  type CloudinaryFolderKey,
  type CloudinaryResourceKind,
  type UploadRequest,
  type UploadProgress,
} from "./images/upload-types";
export { uploadToCloudinary } from "./images/cloudinary-upload";
export {
  cmsImageAlt,
  cmsImageUrl,
  type CmsImageField,
} from "./images/types";
export {
  buildOptimizedVideoUrl,
  isRemoteHttpUrl,
} from "../utils/mediaTransform";
