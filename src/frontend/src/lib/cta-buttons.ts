/** Shared pill CTA classes — Contact, Gallery, Booking, and listing pages */

const CTA_PILL =
  "inline-flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full transition-colors [-webkit-tap-highlight-color:transparent]";

export const CTA_OUTLINE_RED = `${CTA_PILL} py-2.5 px-5 border-2 border-[var(--ew-red)] text-[var(--ew-red)] bg-transparent hover:bg-[var(--ew-red)] hover:text-white disabled:opacity-50 disabled:pointer-events-none`;

export const CTA_OUTLINE_WHATSAPP = `${CTA_PILL} py-2.5 px-5 border-2 border-[#25D366] text-[#25D366] bg-transparent hover:bg-[#25D366] hover:text-white`;

export const CTA_OUTLINE_WHATSAPP_FLEX = `${CTA_OUTLINE_WHATSAPP} flex-1`;

export const CTA_OUTLINE_ORANGE = `${CTA_PILL} py-2.5 px-5 border-2 border-[var(--ew-orange)] text-[var(--ew-orange)] bg-transparent hover:bg-[var(--ew-orange)] hover:text-white`;

export const CTA_OUTLINE_ORANGE_FLEX = `${CTA_OUTLINE_ORANGE} flex-1`;

export const CTA_OUTLINE_WHITE = `${CTA_PILL} py-2.5 px-5 border-2 border-white text-white bg-transparent hover:bg-white hover:text-[var(--ew-red)]`;

export const CTA_OUTLINE_DASHED = `${CTA_PILL} w-full min-h-12 py-2.5 px-4 border-2 border-dashed border-[var(--ew-red)] text-[var(--ew-red)] bg-white hover:bg-[var(--ew-red-lt)]`;

/** Full-width block CTAs (booking success, drawers) */
export const CTA_BLOCK = "flex w-full min-h-12";

export const CTA_OUTLINE_WHATSAPP_BLOCK = `${CTA_OUTLINE_WHATSAPP} ${CTA_BLOCK}`;

export const CTA_OUTLINE_RED_BLOCK = `${CTA_OUTLINE_RED} ${CTA_BLOCK}`;

/** Booking / form step navigation — matches btn-primary / btn-secondary + touch height */
export const CTA_NAV_PRIMARY =
  "btn-primary ew-cta-touch font-bold disabled:bg-[var(--ew-gray-mid)] disabled:text-[var(--ew-text-lt)] disabled:shadow-none disabled:transform-none disabled:cursor-not-allowed";

export const CTA_NAV_SECONDARY = "btn-secondary ew-cta-touch";

export const CTA_NAV_PRIMARY_GROW = `${CTA_NAV_PRIMARY} ew-cta-touch--grow`;

export const CTA_NAV_SECONDARY_FLEX = `${CTA_NAV_SECONDARY} ew-cta-touch--flex`;

export const CTA_NAV_PRIMARY_SOLO = `${CTA_NAV_PRIMARY} ew-cta-touch--solo`;

/** Compact pill for copy / apply actions */
export const CTA_COMPACT_GREEN = `${CTA_PILL} py-1.5 px-3 text-xs border-0 bg-[var(--ew-green)] text-white hover:brightness-95`;

export function ctaMerge(...classes: (string | false | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
