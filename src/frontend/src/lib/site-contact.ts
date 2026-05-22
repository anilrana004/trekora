/** Single source for phone / WhatsApp / email — replace placeholders for launch (see HANDOFF.md). */

/** E.164 without + for wa.me */
export const SITE_PHONE_WA_DIGITS = "919997713364";

/** Display format for UI */
export const SITE_PHONE_DISPLAY = "+91 99977 13364";

/** tel: href */
export const SITE_PHONE_TEL = "+919997713364";

export const SITE_EMAIL = "query@trekora.in";

/** Full office address (matches HomePage JSON-LD geo: Dehradun). */
export const SITE_OFFICE_ADDRESS =
  "15 Rajpur Road, Dehradun, Uttarakhand 248001";

/** Short line for footers / chips */
export const SITE_ADDRESS_LINE = "Dehradun, Uttarakhand";

/** Office coordinates — align with schema.org on HomePage */
export const SITE_GEO = {
  lat: 30.3165,
  lng: 78.0322,
} as const;

const DEFAULT_WA_MESSAGE =
  "Hi, I'm interested in booking a trek with Trekora. Please share details.";

/** Build https://wa.me/<number>?text=… for any CTA or share link. */
export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? DEFAULT_WA_MESSAGE);
  return `https://wa.me/${SITE_PHONE_WA_DIGITS}?text=${text}`;
}

export const WHATSAPP_CHAT_URL = buildWhatsAppUrl();

/**
 * Google Maps iframe `src` for the contact page.
 * Set `VITE_GOOGLE_MAP_EMBED_SRC` (full URL from Share → Embed a map) or
 * `VITE_GOOGLE_MAP_EMBED_PB` (only the `pb=…` value / place embed id).
 */
export function getSiteMapEmbedSrc(): string {
  const full = import.meta.env.VITE_GOOGLE_MAP_EMBED_SRC?.trim();
  if (full) return full;

  const pb = import.meta.env.VITE_GOOGLE_MAP_EMBED_PB?.trim();
  if (pb) {
    const param = pb.startsWith("!") ? pb : `!${pb}`;
    return `https://www.google.com/maps/embed?pb=${param}`;
  }

  const q = encodeURIComponent(SITE_OFFICE_ADDRESS);
  return `https://maps.google.com/maps?q=${q}&hl=en&z=15&output=embed`;
}

/** Open in Google Maps app / browser */
export function getSiteMapOpenUrl(): string {
  const q = encodeURIComponent(SITE_OFFICE_ADDRESS);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
