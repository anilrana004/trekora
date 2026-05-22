import type { bookSearch as bookSearchFn } from "@/lib/book-search";
import { Link } from "@tanstack/react-router";

export interface MobileStickyBookBarProps {
  price: number;
  productName: string;
  bookTo: "/book";
  bookSearch: ReturnType<typeof bookSearchFn>;
  bookButtonOcid: string;
  onBookClick?: () => void;
}

/** Standard mobile sticky footer: price block + full-width primary CTA (lg:hidden). */
export default function MobileStickyBookBar({
  price,
  productName,
  bookTo,
  bookSearch,
  bookButtonOcid,
  onBookClick,
}: MobileStickyBookBarProps) {
  const formattedPrice = price.toLocaleString("en-IN");

  return (
    <div
      className="mobile-sticky-book-bar lg:hidden"
      role="region"
      aria-label="Book this package"
    >
      <div className="mobile-sticky-book-bar__price">
        <span className="mobile-sticky-book-bar__label">Starting from</span>
        <span className="mobile-sticky-book-bar__amount">₹{formattedPrice}</span>
        <span className="mobile-sticky-book-bar__per">per person</span>
      </div>
      <Link
        to={bookTo}
        search={bookSearch}
        onClick={onBookClick}
        className="mobile-sticky-book-bar__cta btn-primary"
        aria-label={`Book ${productName}`}
        data-ocid={bookButtonOcid}
      >
        Book now
      </Link>
    </div>
  );
}
