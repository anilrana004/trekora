import {
  ChevronDown,
  ChevronUp,
  Droplets,
  RefreshCw,
  Thermometer,
  Wind,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { isWeatherServiceConfigured } from "@/lib/weather-api";
import { useWeather } from "../hooks/useWeather";

import OptimizedImage from "./media/OptimizedImage";

export interface WeatherWidgetProps {
  trekName: string;
  /** Location string passed to OpenWeatherMap — e.g. "Lohajung, Uttarakhand" */
  location: string;
  /** Optional lat for future coordinate-based calls */
  lat?: number;
  /** Optional lng for future coordinate-based calls */
  lng?: number;
}

/* ── Mock data — shown when no API key is present ── */
const MOCK_WEATHER = {
  current: {
    temp: 12,
    feelsLike: 8,
    humidity: 65,
    windSpeed: 15,
    condition: "Partly Cloudy",
    description: "partly cloudy",
    icon: "02d" as string,
  },
  forecast: [
    {
      date: "1",
      dayLabel: "Mon",
      high: 14,
      low: 6,
      icon: "01d",
      condition: "Clear",
    },
    {
      date: "2",
      dayLabel: "Tue",
      high: 10,
      low: 4,
      icon: "10d",
      condition: "Rain",
    },
    {
      date: "3",
      dayLabel: "Wed",
      high: 16,
      low: 8,
      icon: "02d",
      condition: "Clouds",
    },
    {
      date: "4",
      dayLabel: "Thu",
      high: 18,
      low: 10,
      icon: "01d",
      condition: "Clear",
    },
    {
      date: "5",
      dayLabel: "Fri",
      high: 12,
      low: 5,
      icon: "11d",
      condition: "Thunderstorm",
    },
  ],
  fetchedAt: Date.now(),
};

/* Emoji fallbacks for mock mode or when OWM icon images fail */
const CONDITION_EMOJI: Record<string, string> = {
  Clear: "☀️",
  Clouds: "⛅",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "🌩️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
  "Partly Cloudy": "⛅",
};

const WEATHER_ENABLED = isWeatherServiceConfigured();

function WeatherIcon({
  icon,
  condition,
  size = 40,
}: {
  icon: string;
  condition: string;
  size?: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const emoji = CONDITION_EMOJI[condition] ?? "🌤️";
  if (imgFailed) {
    return (
      <span style={{ fontSize: size * 0.75 }} role="img" aria-label={condition}>
        {emoji}
      </span>
    );
  }
  return (
    <OptimizedImage
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={condition}
      variant="thumbnail"
      width={size}
      height={size}
      sizes={`${size}px`}
      className="object-contain"
      onError={() => setImgFailed(true)}
    />
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className ?? ""}`}
      style={{ background: "rgba(255,255,255,0.12)" }}
    />
  );
}

function SkeletonLoader() {
  return (
    <div
      className="rounded-2xl p-6 space-y-4"
      style={{ background: "#1A2340" }}
      data-ocid="weather_widget.loading_state"
      aria-busy="true"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex items-end gap-3">
        <Skeleton className="h-14 w-20" />
        <Skeleton className="h-5 w-28 mb-2" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
      <div className="flex gap-2 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-24 w-16 flex-shrink-0 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function WeatherWidget({
  trekName,
  location,
}: WeatherWidgetProps) {
  const { data: liveData, isLoading, error, refetch } = useWeather(location);
  const [expanded, setExpanded] = useState(false);
  const [lastUpdatedMin, setLastUpdatedMin] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Show skeleton for at least 1 second for visual polish
  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Auto-refresh every 30 minutes — update "last refreshed" counter
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setLastUpdatedMin((m) => m + 1);
    }, 60_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // When live data arrives, reset the counter
  useEffect(() => {
    if (liveData) setLastUpdatedMin(0);
  }, [liveData]);

  if (showSkeleton || isLoading) return <SkeletonLoader />;

  if (WEATHER_ENABLED && error && !liveData) {
    return (
      <div
        className="rounded-2xl p-6 text-center space-y-3"
        style={{ background: "#1A2340" }}
        data-ocid="weather_widget.error_state"
      >
        <p className="text-white/80 text-sm">
          Could not load live weather for {location}. Try again in a moment.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
          style={{
            backgroundColor: "var(--ew-red)",
            color: "#fff",
          }}
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  const data = liveData ?? MOCK_WEATHER;
  const isMock = !WEATHER_ENABLED || !liveData;

  const { current, forecast } = data;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const statsRow = [
    {
      icon: <Droplets size={15} className="text-blue-300" />,
      value: `${current.humidity}%`,
      label: "Humidity",
    },
    {
      icon: <Wind size={15} className="text-teal-300" />,
      value: `${current.windSpeed} km/h`,
      label: "Wind",
    },
    {
      icon: <Thermometer size={15} className="text-orange-300" />,
      value: `${current.feelsLike}°C`,
      label: "Feels Like",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#1A2340" }}
      data-ocid="weather_widget"
    >
      {/* Header */}
      <div
        className="px-5 pt-4 pb-3"
        style={{
          backgroundColor: "var(--ew-gray-lt)",
          borderBottom: "3px solid var(--ew-red)",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Base Camp Weather
            </p>
            <p
              className="font-bold text-sm truncate"
              style={{ color: "var(--ew-text)" }}
            >
              {trekName}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              📍 {location}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: isMock ? "var(--ew-orange-lt)" : "#e8f5e9",
                color: isMock ? "var(--ew-orange)" : "var(--ew-green)",
                border: `1px solid ${
                  isMock ? "var(--ew-orange)" : "var(--ew-green)"
                }`,
              }}
            >
              {isMock
                ? "Demo data"
                : lastUpdatedMin === 0
                  ? "Just updated"
                  : `Updated ${lastUpdatedMin}m ago`}
            </span>
            <RefreshCw size={11} style={{ color: "var(--ew-gray-dark)" }} />
          </div>
        </div>
      </div>

      {/* Current temp + condition */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-end gap-2">
            <span
              className="text-5xl font-bold leading-none"
              style={{ color: "var(--ew-red)" }}
            >
              {current.temp}°C
            </span>
          </div>
          <p className="text-white/80 text-sm mt-1 capitalize font-medium">
            {capitalize(current.description || current.condition)}
          </p>
        </div>
        <WeatherIcon
          icon={current.icon}
          condition={current.condition}
          size={56}
        />
      </div>

      {/* Stats row — desktop always, mobile behind toggle */}
      <div className="hidden md:grid grid-cols-3 gap-px bg-white/5 mx-5 rounded-xl overflow-hidden mb-4">
        {statsRow.map((s) => (
          <div
            key={s.label}
            className="px-4 py-3 flex flex-col items-center"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {s.icon}
            <span className="text-white font-semibold text-sm mt-1">
              {s.value}
            </span>
            <span className="text-white/50 text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="md:hidden w-full px-5 py-2.5 flex items-center justify-between transition-colors"
        style={{ color: "rgba(255,255,255,0.6)" }}
        aria-expanded={expanded}
        data-ocid="weather_widget.toggle"
      >
        <span className="text-xs font-medium">
          {expanded ? "Hide details" : "Humidity · Wind · Feels like"}
        </span>
        {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="mobile-stats"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden md:hidden"
          >
            <div className="grid grid-cols-3 gap-px bg-white/5 mx-5 rounded-xl overflow-hidden mb-4">
              {statsRow.map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-3 flex flex-col items-center"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {s.icon}
                  <span className="text-white font-semibold text-xs mt-1">
                    {s.value}
                  </span>
                  <span className="text-white/50 text-[10px]">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5-day forecast */}
      <div className="px-5 pb-4">
        <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-3">
          5-Day Forecast
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          data-ocid="weather_widget.forecast"
        >
          {forecast.map((day, i) => (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-3 min-w-[60px]"
              style={{ background: "rgba(255,255,255,0.07)" }}
              data-ocid={`weather_widget.forecast.item.${i + 1}`}
            >
              <span className="text-white/70 text-xs font-semibold">
                {day.dayLabel}
              </span>
              <WeatherIcon
                icon={day.icon}
                condition={day.condition}
                size={32}
              />
              <span className="text-white font-bold text-xs">{day.high}°</span>
              <span className="text-white/40 text-xs">{day.low}°</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-3">
        <span className="text-white/25 text-[10px]">
          {isMock
            ? "Sample forecast — live data loads when the weather service is configured on the server."
            : "Live trail conditions · Updates hourly"}
        </span>
      </div>
    </motion.div>
  );
}
