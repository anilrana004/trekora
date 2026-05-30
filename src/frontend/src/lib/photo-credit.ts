/** Parse gallery credit strings (API returns `Photo by Name · Mon YYYY`). */
export function parsePhotoCredit(credit: string): {
  name: string;
  when: string;
} {
  const raw = String(credit ?? "")
    .replace(/^Photo by\s+/i, "")
    .trim();
  const sep = raw.indexOf(" · ");
  if (sep >= 0) {
    return {
      name: raw.slice(0, sep).trim(),
      when: raw.slice(sep + 3).trim(),
    };
  }
  return { name: raw, when: "" };
}

/** Build stored/API credit from trekker form fields. */
export function buildPhotoCredit(
  name: string,
  month: string,
  year: string,
): string {
  const trimmed = name.trim();
  const when = [month, year].filter(Boolean).join(" ").trim();
  return when ? `${trimmed} · ${when}` : trimmed;
}
