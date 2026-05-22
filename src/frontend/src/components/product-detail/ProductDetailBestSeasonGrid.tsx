import { ALL_MONTHS } from "./constants";

export default function ProductDetailBestSeasonGrid({
  bestSeasonLabel,
  activeMonths,
}: {
  bestSeasonLabel: string;
  activeMonths: string[];
}) {
  return (
    <div>
      <h3
        className="mb-3 text-base font-bold"
        style={{ color: "var(--ew-text)" }}
      >
        Best Season to Visit
      </h3>
      <div className="mb-2 grid grid-cols-6 gap-1 sm:grid-cols-12">
        {ALL_MONTHS.map((m) => {
          const active = activeMonths.some((am) =>
            am.toLowerCase().startsWith(m.toLowerCase()),
          );
          return (
            <div
              key={m}
              className="rounded py-1.5 text-center text-[11px] font-semibold transition-colors"
              style={
                active
                  ? { backgroundColor: "var(--ew-green)", color: "#fff" }
                  : {
                      backgroundColor: "var(--ew-gray-lt)",
                      color: "var(--ew-gray-dark)",
                      border: "1px solid var(--ew-gray-mid)",
                    }
              }
            >
              {m}
            </div>
          );
        })}
      </div>
      <p className="text-[11px]" style={{ color: "var(--ew-gray-dark)" }}>
        Best season:{" "}
        <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
          {bestSeasonLabel}
        </span>
      </p>
    </div>
  );
}

/** Parse "May-Jun, Sep-Oct" or "Jul-Aug" into month abbreviations for the grid. */
export function monthsFromSeasonLabel(season: string): string[] {
  const map: Record<string, string> = {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  };
  const out = new Set<string>();
  for (const part of season.split(/[,;]/)) {
    const range = part.trim().toLowerCase();
    const m = range.match(
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s*[-–]\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/,
    );
    if (m) {
      const keys = Object.keys(map);
      const start = keys.indexOf(m[1]);
      const end = keys.indexOf(m[2]);
      if (start >= 0 && end >= 0) {
        if (start <= end) {
          for (let i = start; i <= end; i++) out.add(map[keys[i]]);
        } else {
          for (let i = start; i < keys.length; i++) out.add(map[keys[i]]);
          for (let i = 0; i <= end; i++) out.add(map[keys[i]]);
        }
      }
    } else {
      const single = range.match(
        /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/,
      );
      if (single) out.add(map[single[1]]);
    }
  }
  return [...out];
}
