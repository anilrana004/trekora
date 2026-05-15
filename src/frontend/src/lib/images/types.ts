/**
 * CMS / Payload / Mongo-friendly image fields.
 * Start with URL-only; extend per CMS schema (focal point, crops) without changing consumers.
 */
export type CmsImageField =
  | string
  | {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };

export function cmsImageUrl(field: CmsImageField | null | undefined): string {
  if (field == null) return "";
  return typeof field === "string" ? field : field.url;
}

export function cmsImageAlt(
  field: CmsImageField | null | undefined,
  fallback: string,
): string {
  if (field == null || typeof field === "string") return fallback;
  const a = field.alt?.trim();
  return a && a.length > 0 ? a : fallback;
}
