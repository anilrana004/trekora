import {
  fetchWeatherForLocation,
  isWeatherServiceConfigured,
} from "@/lib/weather-api";
import type {
  CurrentWeather,
  ForecastDay,
  WeatherData,
} from "@/lib/weather-types";
import { useCallback, useEffect, useState } from "react";

export type { CurrentWeather, ForecastDay, WeatherData };

export interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const CACHE_TTL_MS = 60 * 60 * 1000;

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
    /* quota */
  }
}

export function useWeather(location: string): UseWeatherResult {
  const weatherEnabled = isWeatherServiceConfigured();
  const [data, setData] = useState<WeatherData | null>(() =>
    loadFromCache(location),
  );
  const [isLoading, setIsLoading] = useState<boolean>(
    !data && weatherEnabled && !!location,
  );
  const [error, setError] = useState<string | null>(
    !weatherEnabled ? "no_api_key" : null,
  );

  const fetchWeather = useCallback(async () => {
    if (!location || !weatherEnabled) return;
    setIsLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherForLocation(location);
      if (!weatherData) {
        setError("fetch_failed");
        return;
      }
      saveToCache(location, weatherData);
      setData(weatherData);
    } catch {
      setError("fetch_failed");
    } finally {
      setIsLoading(false);
    }
  }, [location, weatherEnabled]);

  useEffect(() => {
    const cached = loadFromCache(location);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }
    if (!weatherEnabled) {
      setData(null);
      setIsLoading(false);
      setError("no_api_key");
      return;
    }
    setData(null);
    void fetchWeather();
  }, [location, fetchWeather, weatherEnabled]);

  return { data, isLoading, error, refetch: () => void fetchWeather() };
}
