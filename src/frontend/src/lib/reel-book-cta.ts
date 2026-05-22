import type { TrekReel } from "@/data/trek-reels";
import { bookSearch } from "@/lib/book-search";

export type ReelBookCta = {
  to: string;
  label: string;
  search?: ReturnType<typeof bookSearch>;
};

/** Book / view CTA for a reel card or lightbox. */
export function reelBookCta(
  reel: TrekReel,
  currentProductSlug?: string,
): ReelBookCta | undefined {
  if (!reel.productSlug) return undefined;

  const type = reel.productType ?? "trek";
  const onSameProduct =
    currentProductSlug != null && currentProductSlug === reel.productSlug;

  if (onSameProduct) {
    return {
      to: "/book",
      label: "Book now",
      search:
        type === "yatra"
          ? bookSearch({ yatra: reel.productSlug })
          : bookSearch({ trek: reel.productSlug }),
    };
  }

  const path =
    type === "yatra"
      ? `/yatras/${reel.productSlug}`
      : `/treks/${reel.productSlug}`;

  return {
    to: path,
    label: type === "yatra" ? "Book yatra" : "Book trek",
  };
}
