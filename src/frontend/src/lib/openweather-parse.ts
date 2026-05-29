import type { ForecastDay } from "@/lib/weather-types";

export type OpenWeatherCurrentJson = {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: { speed: number };
  weather: Array<{ main: string; description: string; icon: string }>;
};

type ForecastListItem = {
  dt: number;
  main: { temp_max: number; temp_min: number };
  weather: Array<{ main: string; icon: string }>;
};

export function parseForecast(list: ForecastListItem[]): ForecastDay[] {
  const dayMap = new Map<
    string,
    { highs: number[]; lows: number[]; icon: string; condition: string }
  >();
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().slice(0, 10);
    const existing = dayMap.get(dateStr) ?? {
      highs: [],
      lows: [],
      icon: item.weather[0]?.icon ?? "01d",
      condition: item.weather[0]?.main ?? "Clear",
    };
    existing.highs.push(item.main.temp_max);
    existing.lows.push(item.main.temp_min);
    dayMap.set(dateStr, existing);
  }

  return Array.from(dayMap.entries())
    .slice(0, 5)
    .map(([dateStr, val]) => {
      const d = new Date(dateStr);
      return {
        date: dateStr,
        dayLabel: dayLabels[d.getUTCDay()],
        high: Math.round(Math.max(...val.highs)),
        low: Math.round(Math.min(...val.lows)),
        icon: val.icon,
        condition: val.condition,
      };
    });
}
