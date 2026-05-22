import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Trek } from "../data/treks";
import { bookSearch } from "../lib/book-search";
import { findBookableProduct } from "../lib/booking-product";
import { EnquiryButton } from "./ui/EnquiryButton";

type CompareTrekActionsProps = {
  trek: Trek;
  layout?: "row" | "stack";
  bookOcid: string;
  detailsOcid: string;
};

/** Trek listing–style CTAs: View Details + Book Now (deep-link to `/book`). */
export default function CompareTrekActions({
  trek,
  layout = "row",
  bookOcid,
  detailsOcid,
}: CompareTrekActionsProps) {
  const navigate = useNavigate();
  const bookable = findBookableProduct("trek", trek.slug);
  const flexClass =
    layout === "stack"
      ? "compare-page__actions--stack flex flex-col gap-2"
      : "flex flex-col gap-2 sm:flex-row sm:items-center";

  return (
    <div className={flexClass}>
      <Link
        to="/treks/$slug"
        params={{ slug: trek.slug }}
        className="btn-secondary text-xs inline-flex items-center justify-center gap-1 sm:flex-1"
        data-ocid={detailsOcid}
      >
        View Details <ChevronRight size={14} aria-hidden />
      </Link>
      {bookable ? (
        <button
          type="button"
          className="btn-primary text-xs inline-flex items-center justify-center sm:flex-1"
          aria-label={`Book ${trek.name}`}
          data-ocid={bookOcid}
          onClick={() =>
            navigate({ to: "/book", search: bookSearch({ trek: trek.slug }) })
          }
        >
          Book Now
        </button>
      ) : (
        <EnquiryButton
          type="button"
          trekName={trek.name}
          className="btn-primary text-xs sm:flex-1"
          data-ocid={bookOcid}
        >
          Enquire
        </EnquiryButton>
      )}
    </div>
  );
}
