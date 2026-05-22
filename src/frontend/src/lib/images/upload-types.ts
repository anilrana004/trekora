/**
 * Cloudinary folder layout for Trekora production media.
 * Upload presets should allow these paths (or map freely in Cloudinary dashboard).
 */
export const CLOUDINARY_FOLDERS = {
  hero: "trekora/hero",
  /** Wordmark, favicons, email assets — e.g. `trekora/brand/logo`. */
  brandLogo: "trekora/brand/logo",
  destinations: "trekora/destinations",
  treks: "trekora/treks",
  gallery: "trekora/gallery",
  blogs: "trekora/blogs",
  videos: "trekora/videos",
  reels: "trekora/reels",
  team: "trekora/team",
  users: "trekora/users",
  reviews: "trekora/reviews",
} as const;

export type CloudinaryFolderKey = keyof typeof CLOUDINARY_FOLDERS;

export type CloudinaryResourceKind = "image" | "video";

export interface CloudinaryAsset {
  assetId: string;
  publicId: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resourceType: string;
  createdAt: string;
  tags: string[];
  bytes: number;
  type: string;
  etag?: string;
  placeholder?: boolean;
  url: string;
  secureUrl: string;
  originalFilename: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadRequest {
  file: File;
  folder?: CloudinaryFolderKey;
  /** Overrides `folder` — e.g. `trekora/reviews/treks/kedarkantha-trek`. */
  folderPath?: string;
  /** When omitted, inferred from `file.type`. */
  resourceType?: CloudinaryResourceKind;
  tags?: string[];
  context?: Record<string, string>;
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
}
