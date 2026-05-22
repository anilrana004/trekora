import { useListingScrollChromeContext } from "@/contexts/ListingScrollChromeContext";
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface ListingStickyToolbarProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Sticky listing header (region pills + filters). On mobile listing pages,
 * pins flush to the top while the user is scrolling past the hero; hides
 * when scroll stops so the main navbar returns.
 */
export default function ListingStickyToolbar({
  children,
  className = "",
  style,
}: ListingStickyToolbarProps) {
  const { chromeActive } = useListingScrollChromeContext();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useLayoutEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;

    const measure = () => setSpacerHeight(el.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [chromeActive, children]);

  const toolbarClass = [
    "listing-sticky-toolbar",
    chromeActive ? "listing-sticky-toolbar--chrome-pinned" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {chromeActive && spacerHeight > 0 ? (
        <div
          className="listing-chrome-spacer"
          style={{ height: spacerHeight }}
          aria-hidden
        />
      ) : null}
      <div ref={toolbarRef} className={toolbarClass} style={style}>
        {children}
      </div>
    </>
  );
}
