import agentMarkdownHandler, {
  wantsMarkdown,
} from "../_handlers/agent-markdown.mjs";
import galleryHandler from "../_handlers/gallery.mjs";
import productPhotosHandler from "../_handlers/product-photos.mjs";
import reviewsHandler from "../_handlers/reviews.mjs";
import bookingHandler from "../_handlers/booking.mjs";
import callbackHandler from "../_handlers/callback.mjs";
import corporateQuoteHandler from "../_handlers/corporate-quote.mjs";
import queryHandler from "../_handlers/query.mjs";
import voucherValidateHandler from "../_handlers/vouchers/validate.mjs";
import voucherMarkUsedHandler from "../_handlers/vouchers/mark-used.mjs";
import giftCardValidateHandler from "../_handlers/giftcards/validate.mjs";
import giftCardRedeemHandler from "../_handlers/giftcards/redeem.mjs";
import blogsHandler from "../_handlers/blogs.mjs";

const EXACT = {
  "/api/agent-markdown": agentMarkdownHandler,
  "/api/booking": bookingHandler,
  "/api/callback": callbackHandler,
  "/api/corporate-quote": corporateQuoteHandler,
  "/api/query": queryHandler,
  "/api/vouchers/validate": voucherValidateHandler,
  "/api/vouchers/mark-used": voucherMarkUsedHandler,
  "/api/giftcards/validate": giftCardValidateHandler,
  "/api/giftcards/redeem": giftCardRedeemHandler,
};

/** Resolve Vite/Vercel API handler for pathname + method. */
export function resolveApiHandler(pathname, _method) {
  if (EXACT[pathname]) return EXACT[pathname];
  if (pathname === "/api/gallery") return galleryHandler;
  if (pathname === "/api/product-photos") return productPhotosHandler;
  if (pathname.startsWith("/api/reviews")) return reviewsHandler;
  if (pathname === "/api/blogs" || pathname.startsWith("/api/blogs/")) {
    return blogsHandler;
  }
  return null;
}

export { wantsMarkdown, agentMarkdownHandler };
