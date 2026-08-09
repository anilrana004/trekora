import { uploadToCloudinary } from "@/lib/images/cloudinary-upload";
import { renderBlogContentToHtml } from "@/lib/blog-content";
import { useRef } from "react";
import { toast } from "sonner";

type Props = {
  value: string;
  onChange: (html: string) => void;
  mode: "write" | "preview";
};

function wrapSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  placeholder = "",
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;
  const selected = value.slice(start, end) || placeholder;
  const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
  const cursor = start + before.length + selected.length + after.length;
  return { next, cursor };
}

export default function BlogHtmlEditor({ value, onChange, mode }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function apply(before: string, after: string, placeholder?: string) {
    const el = ref.current;
    if (!el) return;
    const { next, cursor } = wrapSelection(el, before, after, placeholder);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  }

  async function onInsertImage(file: File | null) {
    if (!file) return;
    try {
      toast.message("Uploading image…");
      const asset = await uploadToCloudinary({
        file,
        folder: "blogs",
      });
      const img = `\n<p><img src="${asset.secureUrl}" alt="" /></p>\n`;
      const el = ref.current;
      if (!el) {
        onChange(`${value}${img}`);
        return;
      }
      const start = el.selectionStart;
      const next = `${value.slice(0, start)}${img}${value.slice(start)}`;
      onChange(next);
      toast.success("Image inserted");
    } catch {
      toast.error("Image upload failed");
    }
  }

  const tools: { label: string; action: () => void }[] = [
    { label: "Bold", action: () => apply("<strong>", "</strong>", "bold text") },
    { label: "Italic", action: () => apply("<em>", "</em>", "italic text") },
    { label: "H2", action: () => apply("\n<h2>", "</h2>\n", "Heading") },
    { label: "H3", action: () => apply("\n<h3>", "</h3>\n", "Heading") },
    {
      label: "List",
      action: () => apply("\n<ul>\n<li>", "</li>\n</ul>\n", "Item"),
    },
    {
      label: "Quote",
      action: () => apply("\n<blockquote><p>", "</p></blockquote>\n", "Quote"),
    },
  ];

  if (mode === "preview") {
    const previewHtml =
      renderBlogContentToHtml(value) ||
      "<p><em>Nothing to preview</em></p>";
    return (
      <div
        className="prose prose-sm max-w-none min-h-[320px] rounded-xl border p-4 bg-white blog-article-body"
        style={{ borderColor: "var(--ew-gray-mid)", color: "var(--ew-text)" }}
        dangerouslySetInnerHTML={{ __html: previewHtml }}
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={t.action}
            className="rounded-md px-2.5 py-1 text-xs font-semibold border bg-white"
            style={{
              borderColor: "var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-md px-2.5 py-1 text-xs font-semibold text-white"
          style={{ background: "var(--ew-orange)" }}
        >
          + Insert Image
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            void onInsertImage(e.target.files?.[0] ?? null);
            e.target.value = "";
          }}
        />
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        placeholder='Write HTML content here. Use “Insert Image” to add photos between paragraphs.'
        className="w-full rounded-xl border px-4 py-3 text-sm font-mono leading-relaxed"
        style={{
          borderColor: "var(--ew-gray-mid)",
          color: "var(--ew-text)",
          background: "#fff",
        }}
      />
    </div>
  );
}
