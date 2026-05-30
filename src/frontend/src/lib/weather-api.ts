import { fetchJson } from "@/lib/api-fetch";
import type { WeatherData } from "@/lib/weather-types";
import { parseForecast, type OpenWeatherCurrentJson } from "@/lib/openweather-parse";

const PROXY_BASE = "/api/v1/weather";

type ProxyWeatherResponse = {
  success: boolean;
  message?: string;
  current?: OpenWeatherCurrentJson;
  forecast?: {
    list: Array<{
      dt: number;
      main: { temp_max: number; temp_min: number };
      weather: Array<{ main: string; icon: string }>;
    }>;
  };
};

function mapProxyToWeatherData(
  current: OpenWeatherCurrentJson,
  forecastList: NonNullable<ProxyWeatherResponse["forecast"]>["list"],
): WeatherData {
  return {
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6),
      condition: current.weather[0]?.main ?? "Clear",
      description: current.weather[0]?.description ?? "",
      icon: current.weather[0]?.icon ?? "01d",
    },
    forecast: parseForecast(forecastList),
    fetchedAt: Date.now(),
  };
}

/** Prefer server proxy so API keys stay off the client bundle. */
export async function fetchWeatherForLocation(
  location: string,
): Promise<WeatherData | null> {
  const q = encodeURIComponent(location);
  try {
    const res = await fetchJson<ProxyWeatherResponse>(
      `${PROXY_BASE}?q=${q}`,
      { timeoutMs: 14_000 },
    );
    if (!res.success || !res.current || !res.forecast?.list) return null;
    return mapProxyToWeatherData(res.current, res.forecast.list);
  } catch {
    if (!import.meta.env.DEV) return null;
    return fetchWeatherDirectDev(location);
  }
}

/** Dev-only fallback when discount API is not running. */
async function fetchWeatherDirectDev(
  location: string,
): Promise<WeatherData | null> {
  if (!import.meta.env.DEV) return null;
  const { getOpenWeatherApiKey } = await import("@/lib/openweather-dev-key");
  const key = getOpenWeatherApiKey();
  if (!key) return null;
  const base = "https://api.openweathermap.org/data/2.5";
  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${base}/weather?q=${encodeURIComponent(location)}&appid=${key}&units=metric`,
    ),
    fetch(
      `${base}/forecast?q=${encodeURIComponent(location)}&appid=${key}&units=metric&cnt=40`,
    ),
  ]);
  if (!currentRes.ok || !forecastRes.ok) return null;
  const current = (await currentRes.json()) as OpenWeatherCurrentJson;
  const forecast = (await forecastRes.json()) as {
    list: NonNullable<ProxyWeatherResponse["forecast"]>["list"];
  };
  return mapProxyToWeatherData(current, forecast.list);
}

/** Weather via server proxy in production; dev may fall back to direct API. */
export function isWeatherServiceConfigured(): boolean {
  return true;
}
