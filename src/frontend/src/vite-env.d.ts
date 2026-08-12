/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ORIGIN?: string;
  readonly VITE_ADMIN_ORIGIN?: string;
  readonly VITE_ADMIN_ENABLED?: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET?: string;
  readonly VITE_GOOGLE_MAP_EMBED_SRC?: string;
  readonly VITE_GOOGLE_MAP_EMBED_PB?: string;
  readonly NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
  readonly NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
