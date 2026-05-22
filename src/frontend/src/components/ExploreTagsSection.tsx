import {
  type ExploreTag,
  EXPLORE_TAG_COUNT,
  exploreSectionTitle,
  orderExploreTagsForPath,
} from "@/lib/explore-tags";
import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";

const INITIAL_VISIBLE = 18;

function ExploreTagLink({ tag }: { tag: ExploreTag }) {
  const className =
    "inline-block text-[11px] px-[10px] py-[4px] rounded-full no-underline transition-colors duration-150 border border-[var(--ew-red)] text-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ew-red)]";

  if (tag.search && tag.to === "/treks") {
    return (
      <Link
        to="/treks"
        search={tag.search}
        className={className}
        data-ocid={`explore_tags.${tag.id}`}
      >
        {tag.label}
      </Link>
    );
  }

  if (tag.search && tag.to === "/yatras") {
    return (
      <Link
        to="/yatras"
        search={tag.search}
        className={className}
        data-ocid={`explore_tags.${tag.id}`}
      >
        {tag.label}
      </Link>
    );
  }

  return (
    <Link
      to={tag.to as "/"}
      className={className}
      data-ocid={`explore_tags.${tag.id}`}
    >
      {tag.label}
    </Link>
  );
}

export default function ExploreTagsSection() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const orderedTags = useMemo(
    () => orderExploreTagsForPath(pathname),
    [pathname],
  );

  const [expanded, setExpanded] = useState(false);
  const visible = expanded
    ? orderedTags
    : orderedTags.slice(0, INITIAL_VISIBLE);
  const hiddenCount = orderedTags.length - INITIAL_VISIBLE;

  if (orderedTags.length === 0) return null;

  return (
    <section
      className="border-t border-[var(--ew-gray-mid)]"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
      aria-label="Explore treks and yatras"
      data-ocid="explore_tags.section"
    >
      <div className="container mx-auto px-4 py-8 sm:px-6">
        <p
          className="mb-4 text-[11px] font-semibold uppercase tracking-wider sm:text-[13px]"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          {exploreSectionTitle(pathname)}
        </p>
        <div className="flex flex-wrap gap-2">
          {visible.map((tag) => (
            <ExploreTagLink key={tag.id} tag={tag} />
          ))}
          {!expanded && hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-block cursor-pointer rounded-full border border-[var(--ew-gray-dark)] px-[10px] py-[4px] text-[11px] text-[var(--ew-gray-dark)] transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]"
              data-ocid="explore_tags.expand_button"
              aria-expanded={false}
            >
              +{hiddenCount} more
            </button>
          )}
          {expanded && orderedTags.length > INITIAL_VISIBLE && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-block cursor-pointer rounded-full border border-[var(--ew-gray-dark)] px-[10px] py-[4px] text-[11px] text-[var(--ew-gray-dark)] transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]"
              data-ocid="explore_tags.collapse_button"
              aria-expanded
            >
              Show less
            </button>
          )}
        </div>
        <p className="mt-3 text-[10px]" style={{ color: "var(--ew-gray-dark)" }}>
          {EXPLORE_TAG_COUNT} curated links across treks, yatras, destinations &
          guides
        </p>
      </div>
    </section>
  );
}
