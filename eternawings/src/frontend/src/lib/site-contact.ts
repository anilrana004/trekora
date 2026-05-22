/** Single source for phone / WhatsApp / email — replace placeholders for launch (see HANDOFF.md). */

/** E.164 without + for wa.me */
export const SITE_PHONE_WA_DIGITS = "919876543210";

/** Display format for UI */
export const SITE_PHONE_DISPLAY = "+91 98765 43210";

/** tel: href */
export const SITE_PHONE_TEL = "+919876543210";

export const SITE_EMAIL = "hello@trekora.com";

export const SITE_ADDRESS_LINE = "Dehradun, Uttarakhand";

const WA_TEXT = encodeURIComponent(
  "Hi, I'm interested in booking a trek with Trekora. Please share details.",
);

export const WHATSAPP_CHAT_URL = `https://wa.me/${SITE_PHONE_WA_DIGITS}?text=${WA_TEXT}`;
