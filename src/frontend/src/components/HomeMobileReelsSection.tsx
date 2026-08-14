import { HOMEPAGE_REELS } from "@/data/trek-reels";
import { useIsMobile } from "@/hooks/use-mobile";

import MobileReelsFeed from "./MobileReelsFeed";

/**
 * Phone landing screen: full-bleed feed — one trek video per screen, auto-advances
 * when the clip ends, loops, with Book overlaid on each slide.
 */
export default function HomeMobileReelsSection() {
  const isPhone = useIsMobile(1024);

  // Never mount on desktop: the video elements would preload behind `display: none`.
  if (!isPhone) return null;

  return (
    <section
      className="home-reels-section lg:hidden"
      data-ocid="home.reels"
      aria-label="Trek video reels"
    >
      <h2 className="sr-only">Trek reels</h2>
      <MobileReelsFeed reels={HOMEPAGE_REELS} ocidPrefix="home" />
    </section>
  );
}
