import type { BlogTocItem } from "@/lib/blog-content";
import { useEffect, useState } from "react";

const SCROLL_OFFSET = 96;

type Props = {
  items: BlogTocItem[];
  /** Compact horizontal chip list for mobile */
  variant?: "sidebar" | "mobile";
};

export default function BlogArticleToc({ items, variant = "sidebar" }: Props) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
          return;
        }
        // Fallback: last section above the offset line
        let current = items[0]?.id ?? "";
        for (const el of nodes) {
          if (el.getBoundingClientRect().top <= SCROLL_OFFSET + 8) {
            current = el.id;
          }
        }
        setActiveId(current);
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25],
      },
    );

    for (const el of nodes) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    // Keep hash in URL without jumping
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  }

  if (!items.length) return null;

  if (variant === "mobile") {
    return (
      <nav
        className="blog-toc blog-toc--mobile mb-8 lg:hidden"
        aria-label="On this page"
        data-ocid="blog.toc_mobile"
      >
        <p
          className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          On this page
        </p>
        <ol className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, i) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className="rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors"
                  style={{
                    borderColor: active ? "var(--ew-red)" : "var(--ew-gray-mid)",
                    background: active ? "var(--ew-red)" : "#fff",
                    color: active ? "#fff" : "var(--ew-text)",
                  }}
                  aria-current={active ? "location" : undefined}
                >
                  {i + 1}. {item.heading}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      className="blog-toc blog-toc--sidebar rounded-2xl border p-4"
      style={{
        borderColor: "var(--ew-gray-mid)",
        background: "var(--ew-gray-lt)",
      }}
      aria-label="On this page"
      data-ocid="blog.toc_sidebar"
    >
      <p
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{ color: "var(--ew-gray-dark)" }}
      >
        On this page
      </p>
      <ol className="m-0 space-y-0.5 p-0 list-none">
        {items.map((item, i) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToId(item.id)}
                className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] leading-snug transition-colors"
                style={{
                  color: active ? "var(--ew-red)" : "var(--ew-text)",
                  background: active ? "rgba(192,0,28,0.06)" : "transparent",
                  fontWeight: active ? 700 : 500,
                  borderLeft: active
                    ? "3px solid var(--ew-red)"
                    : "3px solid transparent",
                }}
                aria-current={active ? "location" : undefined}
              >
                <span
                  className="mt-px shrink-0 tabular-nums text-[11px] font-bold"
                  style={{
                    color: active ? "var(--ew-red)" : "var(--ew-gray-dark)",
                    minWidth: "1.1rem",
                  }}
                >
                  {i + 1}
                </span>
                <span>{item.heading}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
