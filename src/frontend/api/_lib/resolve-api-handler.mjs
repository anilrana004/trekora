import galleryHandler from "../gallery.mjs";
import productPhotosHandler from "../product-photos.mjs";
import reviewsHandler from "../reviews.mjs";
import bookingHandler from "../booking.mjs";
import callbackHandler from "../callback.mjs";
import corporateQuoteHandler from "../corporate-quote.mjs";
import queryHandler from "../query.mjs";
import voucherValidateHandler from "../vouchers/validate.mjs";
import voucherMarkUsedHandler from "../vouchers/mark-used.mjs";
import giftCardValidateHandler from "../giftcards/validate.mjs";
import giftCardRedeemHandler from "../giftcards/redeem.mjs";

const EXACT = {
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
  return null;
}
