import { getOpenWeatherApiKey } from "@/lib/openweather";
import { useCallback, useEffect, useState } from "react";

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  dayLabel: string;
  high: number;
  low: number;
  icon: string;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  fetchedAt: number;
}

export interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes
const API_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = getOpenWeatherApiKey();

function getCacheKey(location: string) {
  return `himalayan_weather_${location.toLowerCase().replace(/\s+/g, "_")}`;
}

function loadFromCache(location: string): WeatherData | null {
  try {
    const raw = localStorage.getItem(getCacheKey(location));
    if (!raw) return null;
    const parsed: WeatherData = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      localStorage.removeItem(getCacheKey(location));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveToCache(location: string, data: WeatherData) {
  try {
    localStorage.setItem(getCacheKey(location), JSON.stringify(data));
  } catch {
    // Storage may be full — silent fail
  }
}

function parseForecast(
  list: Array<{
    dt: number;
    main: { temp_max: number; temp_min: number };
    weather: Array<{ main: string; icon: string }>;
  }>,
): ForecastDay[] {
  const dayMap = new Map<
    string,
    { highs: number[]; lows: number[]; icon: string; condition: string }
  >();
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (const item of list) {
    const d = new Date(item.dt * 1000);
    const dateStr = d.toISOString().split("T")[0];
    if (!dayMap.has(dateStr)) {
      dayMap.set(dateStr, {
        highs: [],
        lows: [],
        icon: item.weather[0]?.icon ?? "01d",
        condition: item.weather[0]?.main ?? "Clear",
      });
    }
    const entry = dayMap.get(dateStr)!;
    entry.highs.push(item.main.temp_max);
    entry.lows.push(item.main.temp_min);
    // Prefer midday icon (12:00 UTC)
    if (d.getUTCHours() === 12) {
      entry.icon = item.weather[0]?.icon ?? entry.icon;
      entry.condition = item.weather[0]?.main ?? entry.condition;
    }
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

export function useWeather(location: string): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(() =>
    loadFromCache(location),
  );
  const [isLoading, setIsLoading] = useState<boolean>(!data && !!API_KEY);
  const [error, setError] = useState<string | null>(
    !API_KEY ? "no_api_key" : null,
  );

  const fetchWeather = useCallback(async () => {
    if (!API_KEY || !location) return;
    setIsLoading(true);
    setError(null);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        fetch(
          `${API_BASE}/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`,
        ),
        fetch(
          `${API_BASE}/forecast?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric&cnt=40`,
        ),
      ]);

      if (!currentRes.ok || !forecastRes.ok) {
        throw new Error("Weather API request failed");
      }

      const [currentJson, forecastJson] = await Promise.all([
        currentRes.json() as Promise<{
          main: {
            temp: number;
            feels_like: number;
            humidity: number;
          };
          wind: { speed: number };
          weather: Array<{ main: string; description: string; icon: string }>;
        }>,
        forecastRes.json() as Promise<{
          list: Array<{
            dt: number;
            main: { temp_max: number; temp_min: number };
            weather: Array<{ main: string; icon: string }>;
          }>;
        }>,
      ]);

      const weatherData: WeatherData = {
        current: {
          temp: Math.round(currentJson.main.temp),
          feelsLike: Math.round(currentJson.main.feels_like),
          humidity: currentJson.main.humidity,
          windSpeed: Math.round(currentJson.wind.speed * 3.6), // m/s → km/h
          condition: currentJson.weather[0]?.main ?? "Clear",
          description: currentJson.weather[0]?.description ?? "",
          icon: currentJson.weather[0]?.icon ?? "01d",
        },
        forecast: parseForecast(forecastJson.list),
        fetchedAt: Date.now(),
      };

      saveToCache(location, weatherData);
      setData(weatherData);
    } catch {
      setError("fetch_failed");
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    // Reset on location change
    const cached = loadFromCache(location);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }
    if (!API_KEY) {
      setData(null);
      setIsLoading(false);
      setError("no_api_key");
      return;
    }
    setData(null);
    void fetchWeather();
  }, [location, fetchWeather]);

  return { data, isLoading, error, refetch: () => void fetchWeather() };
}
