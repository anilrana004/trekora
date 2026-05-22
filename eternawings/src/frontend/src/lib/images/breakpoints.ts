/** Canonical widths for responsive `srcset` generation (aligned with common breakpoints). */
export const RESPONSIVE_IMAGE_WIDTHS = [
  384, 480, 640, 750, 828, 960, 1080, 1200, 1440, 1920,
] as const;

export type ResponsiveWidth = (typeof RESPONSIVE_IMAGE_WIDTHS)[number];
