/**
 * Render blog body: CMS HTML (fragment or full document) or legacy markdown.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** True for HTML fragments, full documents, or content with common tags. */
export function looksLikeHtml(content: string): boolean {
  const t = content.trim();
  if (!t) return false;
  if (/^<!DOCTYPE\b/i.test(t)) return true;
  if (/^<(?:html|head|body|meta|link|style|script|div|p|section|article|h[1-6]|ul|ol|figure|header|main|nav)\b/i.test(t)) {
    return true;
  }
  if (/^<[a-z][\s\S]*>/i.test(t)) return true;
  // Mixed content that includes HTML tags mid-document
  return /<\/?(?:p|div|h[1-6]|ul|ol|li|section|article|figure|img|strong|em|blockquote|table|header|nav|details|span|a)\b/i.test(
    t,
  );
}

/** Pull usable article markup out of a pasted full HTML page. */
export function extractArticleBody(html: string): string {
  let out = html.trim();

  const bodyMatch = out.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) out = bodyMatch[1];

  // Drop document chrome that should not nest inside Trekora layout
  out = out.replace(/<!DOCTYPE[^>]*>/gi, "");
  out = out.replace(/<\/?(?:html|head|body)[^>]*>/gi, "");
  out = out.replace(/<meta\b[^>]*\/?>/gi, "");
  out = out.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "");
  out = out.replace(/<link\b[^>]*\/?>/gi, "");
  out = out.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  out = out.replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );

  return out.trim();
}

/** Minimal markdown → HTML for legacy file posts. */
function markdownToHtml(src: string): string {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let inList = false;
  let inQuote = false;
  let para: string[] = [];

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(" ").trim();
    if (text) out.push(`<p>${inline(text)}</p>`);
    para = [];
  };

  const closeList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  const closeQuote = () => {
    if (inQuote) {
      out.push("</blockquote>");
      inQuote = false;
    }
  };

  const inline = (text: string) =>
    escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      closeList();
      closeQuote();
      continue;
    }

    if (/^###\s+/.test(line)) {
      flushPara();
      closeList();
      closeQuote();
      out.push(`<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`);
      continue;
    }
    if (/^##\s+/.test(line)) {
      flushPara();
      closeList();
      closeQuote();
      out.push(`<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`);
      continue;
    }
    if (/^#\s+/.test(line)) {
      flushPara();
      closeList();
      closeQuote();
      out.push(`<h2>${inline(line.replace(/^#\s+/, ""))}</h2>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      closeQuote();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      closeQuote();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }
    if (/^>\s?/.test(line)) {
      flushPara();
      closeList();
      if (!inQuote) {
        out.push("<blockquote>");
        inQuote = true;
      }
      out.push(`<p>${inline(line.replace(/^>\s?/, ""))}</p>`);
      continue;
    }

    closeList();
    closeQuote();
    para.push(line.trim());
  }

  flushPara();
  closeList();
  closeQuote();
  return out.join("\n");
}

/** Sanitize CMS HTML for safe storefront rendering. */
export function sanitizeBlogHtml(html: string): string {
  let out = extractArticleBody(html);

  // Strip dangerous / non-content tags
  out = out.replace(/<\/(?:script|style|iframe|object|embed|form)[^>]*>/gi, "");
  out = out.replace(
    /<(?:script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\/(?:script|style|iframe|object|embed|form)>/gi,
    "",
  );
  out = out.replace(/<(?:script|style|iframe|object|embed|form)[^>]*\/?>/gi, "");
  out = out.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, "");
  out = out.replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
  out = out.replace(/javascript:/gi, "");

  // Normalize images to safe attrs (keep Cloudinary / http(s) / relative)
  out = out.replace(/<img\b([^>]*)>/gi, (_m, attrs: string) => {
    const srcMatch = attrs.match(
      /\bsrc\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i,
    );
    const altMatch = attrs.match(
      /\balt\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i,
    );
    const src = (srcMatch?.[2] ?? srcMatch?.[3] ?? srcMatch?.[4] ?? "").trim();
    const alt = (altMatch?.[2] ?? altMatch?.[3] ?? altMatch?.[4] ?? "").trim();
    if (!src || !/^(https?:\/\/|\/)/i.test(src)) return "";
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  });

  // Soft-clean empty document leftovers
  out = out.replace(/^\s*(?:&nbsp;|\u00a0)+/g, "").trim();
  return out;
}

export type BlogFaqItem = { question: string; answer: string };

export type BlogTocItem = { id: string; heading: string };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

/** Pull "On this page" nav into structured TOC and remove it from the body. */
export function extractTocFromHtml(html: string): {
  bodyHtml: string;
  toc: BlogTocItem[];
} {
  let body = html;
  let toc: BlogTocItem[] = [];

  const navRe =
    /<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi;
  body = body.replace(navRe, (full, attrs: string, inner: string) => {
    const looksLikeToc =
      /contents|toc|on-this-page/i.test(attrs) ||
      /on this page|table of contents|contents/i.test(stripTags(inner));
    if (!looksLikeToc) return full;

    const linkRe = /<a\b[^>]*href\s*=\s*["']#([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match: RegExpExecArray | null;
    const items: BlogTocItem[] = [];
    const seen = new Set<string>();
    while ((match = linkRe.exec(inner)) !== null) {
      const id = match[1].trim();
      const heading = decodeBasicEntities(stripTags(match[2]));
      if (!id || !heading || seen.has(id)) continue;
      seen.add(id);
      items.push({ id, heading });
    }
    if (items.length) toc = items;
    return "";
  });

  // Ensure h2/h3 have ids (for scroll targets + fallback TOC)
  const usedIds = new Set(toc.map((t) => t.id));
  body = body.replace(
    /<(h[23])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs: string, inner: string) => {
      const existing = /\bid\s*=\s*["']([^"']+)["']/i.exec(attrs);
      const text = decodeBasicEntities(stripTags(inner));
      if (!text) return full;
      let id = existing?.[1]?.trim() ?? "";
      if (!id) {
        let base = slugifyHeading(text) || "section";
        id = base;
        let n = 2;
        while (usedIds.has(id)) {
          id = `${base}-${n++}`;
        }
        usedIds.add(id);
        return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
      }
      usedIds.add(id);
      return full;
    },
  );

  // Also keep section[id] targets available for fallback when no nav TOC
  if (!toc.length) {
    const fromHeadings: BlogTocItem[] = [];
    const seen = new Set<string>();
    const h2Re = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;
    let m: RegExpExecArray | null;
    while ((m = h2Re.exec(body)) !== null) {
      const idMatch = /\bid\s*=\s*["']([^"']+)["']/i.exec(m[1]);
      const heading = decodeBasicEntities(stripTags(m[2]));
      const id = idMatch?.[1]?.trim() ?? slugifyHeading(heading);
      if (!id || !heading || seen.has(id)) continue;
      if (/frequently asked|faqs?/i.test(heading)) continue;
      seen.add(id);
      fromHeadings.push({ id, heading });
    }
    toc = fromHeadings;
  }

  body = body
    .replace(/<nav[^>]*>\s*<\/nav>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { bodyHtml: body, toc };
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .trim();
}

/** Pull FAQ Q/A pairs from HTML and remove those blocks from the body. */
export function splitBodyAndFaqs(html: string): {
  bodyHtml: string;
  faqs: BlogFaqItem[];
} {
  const faqs: BlogFaqItem[] = [];
  let body = html;

  // Dedicated FAQ sections (id/class containing faq)
  body = body.replace(
    /<section\b[^>]*(?:id|class)\s*=\s*["'][^"']*faq[^"']*["'][^>]*>([\s\S]*?)<\/section>/gi,
    (_m, inner: string) => {
      const detailRe =
        /<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
      let match: RegExpExecArray | null;
      while ((match = detailRe.exec(inner)) !== null) {
        const question = decodeBasicEntities(stripTags(match[1]));
        const answer = decodeBasicEntities(stripTags(match[2]));
        if (question && answer) faqs.push({ question, answer });
      }
      return "";
    },
  );

  // Remaining standalone FAQ-style details
  body = body.replace(
    /<details\b([^>]*)>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi,
    (full, attrs: string, summary: string, answerHtml: string) => {
      const isFaq =
        /faq/i.test(attrs) ||
        /faq|frequently asked/i.test(stripTags(summary));
      if (!isFaq && faqs.length === 0 && !/class\s*=\s*["'][^"']*faq/i.test(attrs)) {
        // Keep non-FAQ details in body unless clearly FAQ-marked
        if (!/faq-item/i.test(attrs)) return full;
      }
      const question = decodeBasicEntities(stripTags(summary));
      const answer = decodeBasicEntities(stripTags(answerHtml));
      if (question && answer) faqs.push({ question, answer });
      return "";
    },
  );

  // Heading "FAQ" / "Frequently Asked Questions" + following sibling block until next h2
  body = body.replace(
    /<h2\b[^>]*>\s*(?:Frequently Asked Questions|FAQs?)\s*<\/h2>([\s\S]*?)(?=<h2\b|$)/gi,
    (_m, rest: string) => {
      const detailRe =
        /<details\b[^>]*>\s*<summary\b[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
      let match: RegExpExecArray | null;
      let found = false;
      while ((match = detailRe.exec(rest)) !== null) {
        found = true;
        const question = decodeBasicEntities(stripTags(match[1]));
        const answer = decodeBasicEntities(stripTags(match[2]));
        if (question && answer) faqs.push({ question, answer });
      }
      return found ? "" : _m;
    },
  );

  // Dedupe by question
  const seen = new Set<string>();
  const unique = faqs.filter((f) => {
    const key = f.question.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Normalize structural wrappers for reliable storefront CSS
  let normalized = body
    .replace(/<\/?(?:header|footer)\b[^>]*>/gi, "")
    .replace(/\sstyle\s*=\s*("([^"]*)"|'([^']*)')/gi, "")
    .replace(/<ul\b([^>]*)>/gi, (_m, attrs: string) => {
      const cls = /class\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
      const existing = (cls?.[2] ?? cls?.[3] ?? "").trim();
      const next = ["blog-list", existing].filter(Boolean).join(" ");
      return `<ul class="${next}">`;
    })
    .replace(/<ol\b([^>]*)>/gi, (_m, attrs: string) => {
      const cls = /class\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
      const existing = (cls?.[2] ?? cls?.[3] ?? "").trim();
      const next = ["blog-list", existing].filter(Boolean).join(" ");
      return `<ol class="${next}">`;
    })
    .replace(/<table\b([^>]*)>/gi, (_m, attrs: string) => {
      const cls = /class\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs);
      const existing = (cls?.[2] ?? cls?.[3] ?? "").trim();
      const next = ["blog-table", existing].filter(Boolean).join(" ");
      return `<div class="blog-table-wrap"><table class="${next}">`;
    })
    .replace(/<\/table>/gi, "</table></div>");

  // Drop empty leftover wrappers
  normalized = normalized
    .replace(/<div[^>]*>\s*<\/div>/gi, "")
    .replace(/<section[^>]*>\s*<\/section>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { bodyHtml: normalized, faqs: unique };
}

export function renderBlogContentToHtml(content: string): string {
  if (!content?.trim()) return "";
  if (looksLikeHtml(content)) return sanitizeBlogHtml(content);
  return sanitizeBlogHtml(markdownToHtml(content));
}

/** Full pipeline for storefront: sanitized body + FAQs + TOC for sticky rail. */
export function prepareBlogArticle(content: string): {
  bodyHtml: string;
  faqs: BlogFaqItem[];
  toc: BlogTocItem[];
} {
  const html = renderBlogContentToHtml(content);
  const { bodyHtml: withoutFaqs, faqs } = splitBodyAndFaqs(html);
  const { bodyHtml, toc } = extractTocFromHtml(withoutFaqs);
  return { bodyHtml, faqs, toc };
}
