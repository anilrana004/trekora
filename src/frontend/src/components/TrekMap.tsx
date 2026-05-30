// IMPORTANT: Must import 'leaflet/dist/leaflet.css' in the main entry file (main.tsx)
// leaflet CSS is injected dynamically below via useEffect as a fallback.

import {
  ArrowUpDown,
  Bus,
  Car,
  Clock,
  Maximize2,
  Minimize2,
  Mountain,
  Plane,
  Route,
  Train,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import type { Trek, TrekCoordinates } from "../data/treks";
import type { Yatra } from "../data/yatras";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type WaypointType =
  | "camp"
  | "summit"
  | "village"
  | "pass"
  | "lake"
  | "temple"
  | "start"
  | "end";

interface WaypointMeta {
  lat: number;
  lng: number;
  name: string;
  altitude: number;
  type: WaypointType;
  day?: number;
  activity?: string;
}

interface RichCoordinates {
  start: WaypointMeta;
  waypoints: WaypointMeta[];
  end: WaypointMeta;
}

interface HowToReachData {
  airport?: { name: string; distance: string; time: string; cost?: string };
  railway?: { name: string; distance: string; time: string; trains?: string };
  road?: { description: string };
  bus?: { description: string };
  byAir?: string;
  byTrain?: string;
  byRoad?: string;
  localTransport?: string;
}

interface RouteStatData {
  distance?: number;
  elevationGain?: number;
  highestPoint?: number;
  lowestPoint?: number;
  walkingHours?: number;
}

interface AltitudePoint {
  day: number;
  altitude: number;
  label: string;
  activity?: string;
  amsRisk?: "low" | "medium" | "high";
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function buildRichCoords(coords: TrekCoordinates, trek: Trek): RichCoordinates {
  const profile = coords.altitudeProfile ?? [];
  const getAlt = (idx: number) => profile[idx]?.altitude ?? 0;

  const start: WaypointMeta = {
    lat: coords.start[0],
    lng: coords.start[1],
    name: trek.startPoint ?? "Start",
    altitude: getAlt(0),
    type: "start",
    day: 1,
    activity: profile[0]?.label ?? "Trek starts here",
  };

  const waypoints: WaypointMeta[] = coords.waypoints.map((wp, i) => {
    const profIdx = Math.min(i + 1, Math.max(0, profile.length - 2));
    return {
      lat: wp[0],
      lng: wp[1],
      name: profile[profIdx]?.label ?? `Stop ${i + 1}`,
      altitude: profile[profIdx]?.altitude ?? 0,
      type: "camp" as WaypointType,
      day: profIdx + 1,
      activity: profile[profIdx]?.label ?? undefined,
    };
  });

  const end: WaypointMeta = {
    lat: coords.end[0],
    lng: coords.end[1],
    name: trek.endPoint ?? "End",
    altitude: getAlt(Math.max(0, profile.length - 1)),
    type: "end",
    day: profile.length,
    activity: profile[profile.length - 1]?.label ?? "Trek ends here",
  };

  return { start, waypoints, end };
}

function buildYatraRichCoords(yatra: Yatra): RichCoordinates | null {
  if (!yatra.coordinates) return null;
  const { start, waypoints, end } = yatra.coordinates;
  return {
    start: {
      lat: start[0],
      lng: start[1],
      name: yatra.startPoint ?? "Start",
      altitude: 1000,
      type: "start",
    },
    waypoints: waypoints.map((wp, i) => ({
      lat: wp[0],
      lng: wp[1],
      name: `Stop ${i + 1}`,
      altitude: 2000,
      type: "temple" as WaypointType,
    })),
    end: {
      lat: end[0],
      lng: end[1],
      name: "Destination",
      altitude: 1000,
      type: "end",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Marker icon HTML
// ─────────────────────────────────────────────────────────────────────────────
const MARKER_CONFIG: Record<string, { bg: string; emoji: string }> = {
  start: { bg: "#2E7D32", emoji: "🚩" },
  end: { bg: "#C0001C", emoji: "🏁" },
  camp: { bg: "#E87722", emoji: "🏕️" },
  summit: { bg: "#7B1FA2", emoji: "⛰️" },
  village: { bg: "#1565C0", emoji: "🏘️" },
  pass: { bg: "#6A1B9A", emoji: "🗻" },
  lake: { bg: "#0277BD", emoji: "🏞️" },
  temple: { bg: "#C0001C", emoji: "🛕" },
};

function markerHtml(type: string, label?: string): string {
  const cfg = MARKER_CONFIG[type] ?? MARKER_CONFIG.camp;
  return `<div style="display:flex;flex-direction:column;align-items:center;">
    <div style="background:${cfg.bg};border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2.5px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-size:16px;cursor:pointer;">${cfg.emoji}</div>
    ${label ? `<div style="background:${cfg.bg};color:white;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600;margin-top:2px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.25);">${label}</div>` : ""}
  </div>`;
}

function pulsingMarkerHtml(): string {
  return `<div style="position:relative;width:40px;height:40px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:#C0001C;opacity:0.3;animation:ew-pulse-ring 1.5s ease-out infinite;"></div>
    <div style="position:absolute;inset:6px;border-radius:50%;background:#C0001C;border:2px solid white;box-shadow:0 2px 8px rgba(192,0,28,0.5);"></div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section A — State Overview Map
// ─────────────────────────────────────────────────────────────────────────────
interface StateOverviewMapProps {
  state: string;
  trekLat: number;
  trekLng: number;
  trekName: string;
}

function StateOverviewMap({
  state,
  trekLat,
  trekLng,
  trekName,
}: StateOverviewMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const stateCenter: [number, number] =
    state === "himachal" ? [31.9165, 77.5723] : [30.0668, 79.0193];
  const stateName = state === "himachal" ? "Himachal Pradesh" : "Uttarakhand";

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((mod) => {
      const L = mod.default;

      const map = L.map(mapRef.current!, {
        center: stateCenter,
        zoom: 7,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const pulseIcon = L.divIcon({
        html: pulsingMarkerHtml(),
        className: "ew-pulse-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22],
      });

      L.marker([trekLat, trekLng], { icon: pulseIcon })
        .addTo(map)
        .bindPopup(`<strong>${trekName}</strong>`, { closeButton: false });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [trekLat, trekLng, trekName, state]);

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{ border: "1px solid #e5e7eb", borderTop: "3px solid #C0001C" }}
    >
      <div
        className="absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        style={{
          background: "white",
          color: "#1A1A2E",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full inline-block"
          style={{ background: "#C0001C" }}
        />
        {stateName} Overview
      </div>
      <div ref={mapRef} style={{ height: 300, width: "100%" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section B — Detailed Trail Map
// ─────────────────────────────────────────────────────────────────────────────
interface TrailMapProps {
  richCoords: RichCoordinates;
  trekName: string;
}

function TrailMap({ richCoords, trekName }: TrailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const allPoints: WaypointMeta[] = [
      richCoords.start,
      ...richCoords.waypoints,
      richCoords.end,
    ];

    import("leaflet").then((mod) => {
      const L = mod.default;

      const lats = allPoints.map((p) => p.lat);
      const lngs = allPoints.map((p) => p.lng);
      const bounds: [[number, number], [number, number]] = [
        [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
        [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02],
      ];

      const map = L.map(mapRef.current!, {
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: false,
      });

      map.fitBounds(bounds, { padding: [40, 40] });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Trail polyline
      const latLngs: [number, number][] = allPoints.map((p) => [p.lat, p.lng]);
      L.polyline(latLngs, {
        color: "#C0001C",
        weight: 4,
        opacity: 0.85,
        lineJoin: "round",
      }).addTo(map);

      // Markers
      for (const wp of allPoints) {
        const isStartPt = wp.type === "start";
        const isEndPt = wp.type === "end";
        const labelText = isStartPt ? "START" : isEndPt ? "END" : undefined;
        const icon = L.divIcon({
          html: markerHtml(wp.type, labelText),
          className: "ew-trail-marker",
          iconSize: [34, isStartPt || isEndPt ? 52 : 34],
          iconAnchor: [17, isStartPt || isEndPt ? 52 : 17],
          popupAnchor: [0, -34],
        });

        const popupContent = `
          <div style="font-family:system-ui,sans-serif;min-width:160px;">
            <p style="font-size:14px;font-weight:700;color:#1A1A2E;margin:0 0 4px;">${wp.name}</p>
            ${wp.altitude ? `<p style="font-size:12px;color:#E87722;margin:0 0 2px;">🗻 ${wp.altitude.toLocaleString()}m above sea level</p>` : ""}
            ${wp.day ? `<p style="font-size:11px;color:#666;margin:0 0 2px;">Day ${wp.day}</p>` : ""}
            ${wp.activity ? `<p style="font-size:11px;color:#888;margin:0;">${wp.activity}</p>` : ""}
          </div>`;

        L.marker([wp.lat, wp.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent, { maxWidth: 220 });
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [richCoords]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  }, [isFullscreen]);

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        border: "1px solid #e5e7eb",
        borderTop: "3px solid #C0001C",
        height: isFullscreen ? "100vh" : 450,
        ...(isFullscreen
          ? { position: "fixed", inset: 0, zIndex: 9999, borderRadius: 0 }
          : {}),
      }}
    >
      <div
        className="absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        style={{
          background: "white",
          color: "#1A1A2E",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        <Route size={12} style={{ color: "#C0001C" }} />
        Trail Map — {trekName}
      </div>
      <button
        type="button"
        onClick={() => setIsFullscreen((v) => !v)}
        className="absolute top-3 right-3 z-[1000] p-2 rounded-lg hover:bg-gray-100 transition-colors"
        style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
        aria-label={isFullscreen ? "Exit fullscreen" : "Expand map"}
        data-ocid="trek_map.fullscreen_toggle"
      >
        {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
      </button>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section C — Altitude Profile (Recharts)
// ─────────────────────────────────────────────────────────────────────────────
interface TooltipPayload {
  value: number;
  name: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  data: AltitudePoint[];
}

function CustomAltTooltip({
  active,
  payload,
  label,
  data,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const dayNum = Number(String(label ?? "").replace("Day ", ""));
  const point = data.find((d) => d.day === dayNum);
  if (!point) return null;
  return (
    <div
      className="rounded-xl px-3 py-2.5 text-xs shadow-xl"
      style={{
        background: "#1A1A2E",
        color: "white",
        minWidth: 150,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p className="font-bold text-sm mb-1" style={{ color: "#E87722" }}>
        Day {point.day}
      </p>
      <p className="font-semibold">{point.label}</p>
      <p style={{ color: "rgba(255,255,255,0.75)" }}>
        {point.altitude.toLocaleString()}m altitude
      </p>
      {point.amsRisk === "high" && (
        <p className="mt-1 font-semibold" style={{ color: "#ff6b6b" }}>
          ⚠️ High AMS Risk
        </p>
      )}
      {point.amsRisk === "medium" && (
        <p className="mt-1" style={{ color: "#E87722" }}>
          ⚡ Moderate AMS Risk
        </p>
      )}
    </div>
  );
}

interface AltitudeProfileProps {
  altitudeProfile: AltitudePoint[];
}

function AltitudeProfile({ altitudeProfile }: AltitudeProfileProps) {
  if (!altitudeProfile || altitudeProfile.length < 2) return null;
  const maxAlt = Math.max(...altitudeProfile.map((p) => p.altitude));
  const minAlt = Math.min(...altitudeProfile.map((p) => p.altitude));
  const yMax = maxAlt + 300;
  const yMin = Math.max(0, minAlt - 200);
  const hasAmsZone = maxAlt >= 4000;

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
      <p
        className="text-xs font-semibold mb-3 tracking-wide"
        style={{ color: "#888" }}
      >
        ALTITUDE PROFILE
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="altGradEw" x1="0" y1="0" x2="0" y2="1">
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
          <Tooltip content={<CustomAltTooltip data={altitudeProfile} />} />
          {hasAmsZone && (
            <ReferenceArea y1={4000} y2={yMax} fill="rgba(192,0,28,0.08)" />
          )}
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
          {acclimDays.map((dayKey) => (
            <ReferenceLine
              key={`accl-${dayKey}`}
              x={dayKey}
              stroke="#2E7D32"
              strokeDasharray="3 3"
              strokeOpacity={0.6}
            />
          ))}
          <Area
            type="monotone"
            dataKey="altitude"
            stroke="#E87722"
            strokeWidth={3}
            fill="url(#altGradEw)"
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
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section D — Route Stats Row
// ─────────────────────────────────────────────────────────────────────────────
function RouteStats({ stats }: { stats: RouteStatData }) {
  const tiles = [
    {
      icon: <Route size={18} style={{ color: "#C0001C" }} />,
      value: stats.distance ? `${stats.distance} km` : "—",
      label: "Total Distance",
    },
    {
      icon: <ArrowUpDown size={18} style={{ color: "#E87722" }} />,
      value: stats.elevationGain
        ? `+${stats.elevationGain.toLocaleString()}m`
        : "—",
      label: "Elevation Gain",
    },
    {
      icon: <Mountain size={18} style={{ color: "#7B1FA2" }} />,
      value: stats.highestPoint
        ? `${stats.highestPoint.toLocaleString()}m`
        : "—",
      label: "Highest Point",
    },
    {
      icon: <Mountain size={18} style={{ color: "#1565C0" }} />,
      value: stats.lowestPoint ? `${stats.lowestPoint.toLocaleString()}m` : "—",
      label: "Lowest Point",
    },
    {
      icon: <Clock size={18} style={{ color: "#2E7D32" }} />,
      value: stats.walkingHours ? `~${stats.walkingHours} hrs` : "—",
      label: "Walking Hours",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {tiles.map((t) => (
        <div
          key={t.label}
          className="rounded-xl p-4 text-center flex flex-col items-center gap-1.5"
          style={{ background: "#F5F5F5", border: "1px solid #e5e7eb" }}
        >
          {t.icon}
          <p className="text-base font-bold" style={{ color: "#1A1A2E" }}>
            {t.value}
          </p>
          <p className="text-[11px]" style={{ color: "#888" }}>
            {t.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section E — How to Reach
// ─────────────────────────────────────────────────────────────────────────────
function HowToReach({ data }: { data: HowToReachData | string | undefined }) {
  if (!data) return null;

  if (typeof data === "string") {
    return (
      <div
        className="rounded-xl p-4"
        style={{ background: "#F5F5F5", border: "1px solid #e5e7eb" }}
      >
        <p className="text-sm" style={{ color: "#444", lineHeight: 1.7 }}>
          {data}
        </p>
      </div>
    );
  }

  const structured = data as HowToReachData;
  const airport = structured.airport
    ? `${structured.airport.name} — ${structured.airport.distance} away, ~${structured.airport.time}${structured.airport.cost ? `, taxi ~${structured.airport.cost}` : ""}`
    : structured.byAir;
  const railway = structured.railway
    ? `${structured.railway.name} — ${structured.railway.distance} away${structured.railway.trains ? `. ${structured.railway.trains}` : ""}`
    : structured.byTrain;
  const road = structured.road?.description ?? structured.byRoad;
  const bus = structured.bus?.description ?? structured.localTransport;

  const items = [
    {
      icon: <Plane size={16} style={{ color: "#C0001C" }} />,
      label: "By Air",
      text: airport,
    },
    {
      icon: <Train size={16} style={{ color: "#E87722" }} />,
      label: "By Train",
      text: railway,
    },
    {
      icon: <Car size={16} style={{ color: "#2E7D32" }} />,
      label: "By Road",
      text: road,
    },
    {
      icon: <Bus size={16} style={{ color: "#1565C0" }} />,
      label: "Local Transport",
      text: bus,
    },
  ].filter((item) => !!item.text);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl p-4 flex gap-3"
          style={{ background: "white", border: "1px solid #e5e7eb" }}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#F5F5F5" }}
          >
            {item.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold mb-1" style={{ color: "#1A1A2E" }}>
              {item.label}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main TrekMap component
// ─────────────────────────────────────────────────────────────────────────────
interface TrekMapProps {
  trek?: Trek;
  yatra?: Yatra;
  // Legacy props from old API (kept for backward compat)
  trekName?: string;
  coordinates?: TrekCoordinates;
  distance?: string;
  elevationGain?: string;
  highestPoint?: string;
}

export default function TrekMap({
  trek,
  yatra,
  trekName,
  coordinates,
  distance,
  elevationGain,
  highestPoint,
}: TrekMapProps) {
  // Inject Leaflet CSS + animation keyframes
  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("ew-map-styles")) {
      const style = document.createElement("style");
      style.id = "ew-map-styles";
      style.textContent = `
        @keyframes ew-pulse-ring {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .ew-pulse-marker, .ew-trail-marker { background: transparent !important; border: none !important; }
        .leaflet-popup-content-wrapper { border-radius: 10px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.18) !important; padding: 0 !important; }
        .leaflet-popup-content { margin: 12px 14px !important; }
        .leaflet-popup-tip-container { display: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Support legacy API: if no trek/yatra prop but legacy props given, synthesize a minimal Trek
  const effectiveTrek: Trek | undefined =
    trek ??
    (trekName && coordinates
      ? ({
          id: 0,
          name: trekName,
          slug: "",
          state: "uttarakhand",
          duration: 1,
          altitude: highestPoint ? Number.parseInt(highestPoint) : 0,
          difficulty: "Moderate",
          price: 0,
          rating: 5,
          reviewCount: 0,
          description: "",
          shortDesc: "",
          image: "",
          images: [],
          category: "",
          bestSeason: "",
          distance: distance ? Number.parseFloat(distance) : 0,
          startPoint: "Start",
          endPoint: "End",
          trekType: "",
          isActive: true,
          isFeatured: false,
          coordinates,
        } as Trek)
      : undefined);

  const entityName = effectiveTrek?.name ?? yatra?.name ?? "";
  const state = effectiveTrek?.state ?? yatra?.state ?? "uttarakhand";

  let richCoords: RichCoordinates | null = null;
  let startLat = state === "himachal" ? 31.9165 : 30.0668;
  let startLng = state === "himachal" ? 77.5723 : 79.0193;
  let altProfile: AltitudePoint[] | null = null;
  let routeStats: RouteStatData = {};
  let howToReach: HowToReachData | string | undefined;

  if (effectiveTrek) {
    if (effectiveTrek.coordinates) {
      richCoords = buildRichCoords(effectiveTrek.coordinates, effectiveTrek);
      startLat = effectiveTrek.coordinates.start[0];
      startLng = effectiveTrek.coordinates.start[1];
      altProfile = effectiveTrek.coordinates.altitudeProfile ?? null;
      const alts = altProfile?.map((p) => p.altitude) ?? [];
      routeStats = {
        distance:
          effectiveTrek.distance ||
          (distance ? Number.parseFloat(distance) : undefined),
        highestPoint: alts.length
          ? Math.max(...alts)
          : highestPoint
            ? Number.parseInt(highestPoint)
            : effectiveTrek.altitude,
        lowestPoint: alts.length ? Math.min(...alts) : undefined,
        elevationGain: alts.length
          ? Math.max(...alts) - Math.min(...alts)
          : elevationGain
            ? Number.parseInt(elevationGain)
            : undefined,
        walkingHours: Math.round(
          (effectiveTrek.duration * 6 + (effectiveTrek.distance ?? 0) / 3) / 2,
        ),
      };
    } else {
      routeStats = {
        distance: effectiveTrek.distance,
        highestPoint: highestPoint
          ? Number.parseInt(highestPoint)
          : effectiveTrek.altitude,
        elevationGain: elevationGain
          ? Number.parseInt(elevationGain)
          : undefined,
      };
    }
  } else if (yatra) {
    howToReach = yatra.howToReach as HowToReachData | string | undefined;
    richCoords = buildYatraRichCoords(yatra);
    if (yatra.coordinates) {
      startLat = yatra.coordinates.start[0];
      startLng = yatra.coordinates.start[1];
    }
    routeStats = {
      distance: yatra.distance,
      highestPoint: yatra.maxAltitude
        ? Number.parseInt(yatra.maxAltitude)
        : undefined,
    };
  }

  const hasMap = richCoords !== null;

  return (
    <div className="flex flex-col gap-6" data-ocid="trek_map.section">
      {/* Section A: State Overview */}
      <div>
        <h3
          className="text-sm font-bold mb-3 flex items-center gap-2"
          style={{ color: "#1A1A2E" }}
        >
          <span
            className="w-1 h-4 rounded-full"
            style={{ background: "#C0001C" }}
          />
          State Location
        </h3>
        <StateOverviewMap
          state={state}
          trekLat={startLat}
          trekLng={startLng}
          trekName={entityName}
        />
      </div>

      {/* Section B: Trail Route Map */}
      {hasMap && (
        <div>
          <h3
            className="text-sm font-bold mb-3 flex items-center gap-2"
            style={{ color: "#1A1A2E" }}
          >
            <span
              className="w-1 h-4 rounded-full"
              style={{ background: "#C0001C" }}
            />
            Trail Route Map
          </h3>
          <TrailMap richCoords={richCoords!} trekName={entityName} />
        </div>
      )}

      {/* Section C: Altitude Profile */}
      {altProfile && altProfile.length >= 2 && (
        <div
          className="rounded-xl p-5"
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            borderTop: "3px solid #E87722",
          }}
        >
          <AltitudeProfile altitudeProfile={altProfile} />
        </div>
      )}

      {/* Section D: Route Stats */}
      <div>
        <h3
          className="text-sm font-bold mb-3 flex items-center gap-2"
          style={{ color: "#1A1A2E" }}
        >
          <span
            className="w-1 h-4 rounded-full"
            style={{ background: "#E87722" }}
          />
          Route Statistics
        </h3>
        <RouteStats stats={routeStats} />
      </div>

      {/* Section E: How to Reach */}
      {howToReach && (
        <div>
          <h3
            className="text-sm font-bold mb-3 flex items-center gap-2"
            style={{ color: "#1A1A2E" }}
          >
            <span
              className="w-1 h-4 rounded-full"
              style={{ background: "#2E7D32" }}
            />
            How to Reach
          </h3>
          <HowToReach data={howToReach} />
        </div>
      )}
    </div>
  );
}
