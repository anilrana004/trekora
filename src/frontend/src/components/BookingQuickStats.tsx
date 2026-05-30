import type { ReactNode } from "react";

export type BookingQuickStat = {
  label: string;
  value: string;
  icon: ReactNode;
};

type BookingQuickStatsProps = {
  stats: BookingQuickStat[];
};

/** Duration / difficulty / altitude row in trek & yatra booking sidebars. */
export default function BookingQuickStats({ stats }: BookingQuickStatsProps) {
  return (
    <div className="grid min-w-0 grid-cols-3 gap-2 text-center">
      {stats.map(({ label, value, icon }) => (
        <div
          key={label}
          className="min-w-0 rounded-lg border py-2 px-1"
          style={{
            backgroundColor: "var(--ew-gray-lt)",
            borderColor: "var(--ew-gray-mid)",
          }}
        >
          <span
            className="mb-0.5 flex justify-center"
            style={{ color: "var(--ew-red)" }}
          >
            {icon}
          </span>
          <p className="text-[10px]" style={{ color: "var(--ew-gray-dark)" }}>
            {label}
          </p>
          <p className="text-xs font-bold" style={{ color: "var(--ew-text)" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
