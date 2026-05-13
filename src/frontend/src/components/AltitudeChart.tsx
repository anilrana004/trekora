/**
 * AltitudeChart — Recharts-based altitude profile for trek/yatra detail pages.
 * Shows area chart, AMS risk zone, acclimatization day markers, and interactive tooltip.
 */
import {
  Area,
  AreaChart,
  CartesianGrid,
  Dot,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AltitudePoint {
  day: number;
  altitude: number;
  label: string;
  activity?: string;
  amsRisk?: "low" | "medium" | "high";
}

export interface AltitudeChartProps {
  altitudeProfile: AltitudePoint[];
  trekName?: string;
}

interface TooltipEntry {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  data: AltitudePoint[];
}

const AMS_COLORS = {
  low: "#2E7D32",
  medium: "#E87722",
  high: "#C0001C",
} as const;
const AMS_LABELS = {
  low: "Low AMS Risk",
  medium: "Moderate AMS Risk",
  high: "High AMS Risk",
} as const;

function CustomTooltip({ active, payload, label, data }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const dayNum = Number(String(label ?? "").replace("Day ", ""));
  const point = data.find((d) => d.day === dayNum);
  if (!point) return null;
  return (
    <div
      style={{
        background: "#1A1A2E",
        color: "white",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 160,
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: "#E87722",
          margin: "0 0 4px",
        }}
      >
        Day {point.day}
      </p>
      <p style={{ fontWeight: 600, margin: "0 0 2px" }}>{point.label}</p>
      <p style={{ color: "rgba(255,255,255,0.75)", margin: 0 }}>
        {point.altitude.toLocaleString()}m altitude
      </p>
      {point.amsRisk && point.amsRisk !== "low" && (
        <p
          style={{
            marginTop: 4,
            fontWeight: 600,
            color: AMS_COLORS[point.amsRisk],
          }}
        >
          {point.amsRisk === "high" ? "⚠️" : "⚡"} {AMS_LABELS[point.amsRisk]}
        </p>
      )}
    </div>
  );
}

export default function AltitudeChart({
  altitudeProfile,
  trekName,
}: AltitudeChartProps) {
  if (!altitudeProfile || altitudeProfile.length < 2) return null;

  const maxAlt = Math.max(...altitudeProfile.map((p) => p.altitude));
  const minAlt = Math.min(...altitudeProfile.map((p) => p.altitude));
  const yMax = maxAlt + 300;
  const yMin = Math.max(0, minAlt - 200);
  const hasAmsZone = maxAlt >= 4000;

  // Acclimatization days: day where altitude doesn't gain much vs previous
  const acclimDays = altitudeProfile
    .filter(
      (p, i) => i > 0 && altitudeProfile[i - 1].altitude >= p.altitude - 50,
    )
    .map((p) => `Day ${p.day}`);

  const chartData = altitudeProfile.map((p) => ({
    ...p,
    name: `Day ${p.day}`,
  }));

  return (
    <div>
      {trekName && (
        <p
          className="text-xs font-semibold mb-3 tracking-wide"
          style={{ color: "#888", textTransform: "uppercase" }}
        >
          Altitude Profile — {trekName}
        </p>
      )}

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
          role="img"
          aria-label={
            trekName
              ? `Altitude profile chart for ${trekName}`
              : "Altitude profile chart"
          }
        >
          <defs>
            <linearGradient id="ewAltGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E87722" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#E87722" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#C0001C", fontWeight: 600 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />

          <YAxis
            domain={[yMin, yMax]}
            tick={{ fontSize: 10, fill: "#999" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(1)}k`}
            width={36}
          />

          <Tooltip content={<CustomTooltip data={altitudeProfile} />} />

          {/* AMS Risk Zone shading */}
          {hasAmsZone && (
            <ReferenceArea y1={4000} y2={yMax} fill="rgba(192,0,28,0.08)" />
          )}

          {/* AMS 4000m line */}
          {hasAmsZone && (
            <ReferenceLine
              y={4000}
              stroke="#C0001C"
              strokeDasharray="4 4"
              label={{
                value: "AMS Risk Zone ↑",
                fill: "#C0001C",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />
          )}

          {/* Acclimatization day markers */}
          {acclimDays.map((dayKey) => (
            <ReferenceLine
              key={`accl-${dayKey}`}
              x={dayKey}
              stroke="#2E7D32"
              strokeDasharray="3 3"
              strokeOpacity={0.55}
            />
          ))}

          <Area
            type="monotone"
            dataKey="altitude"
            stroke="#E87722"
            strokeWidth={3}
            fill="url(#ewAltGrad)"
            dot={(props: {
              cx: number;
              cy: number;
              payload: AltitudePoint;
              index: number;
            }) => (
              <Dot
                key={`dot-${props.index}`}
                cx={props.cx}
                cy={props.cy}
                r={4}
                fill="#E87722"
                stroke="white"
                strokeWidth={1.5}
              />
            )}
            activeDot={{
              r: 6,
              fill: "#E87722",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {(["low", "medium", "high"] as const).map((risk) => (
          <div key={risk} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: AMS_COLORS[risk] }}
            />
            <span className="text-[10px] font-medium" style={{ color: "#666" }}>
              {AMS_LABELS[risk]}
            </span>
          </div>
        ))}
        {hasAmsZone && (
          <div className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded flex-shrink-0"
              style={{ backgroundColor: "#C0001C", opacity: 0.3 }}
            />
            <span className="text-[10px] font-medium" style={{ color: "#666" }}>
              4000m+ AMS Zone
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
