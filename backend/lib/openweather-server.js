/**
 * Server-only OpenWeather key — never send to the browser.
 */
import { getEnv } from "./env-config.js";

export function getOpenWeatherServerKey() {
  return (
    getEnv("OPENWEATHER_API_KEY") ||
    getEnv("OPENWEATHERMAP_API_KEY") ||
    getEnv("VITE_OPENWEATHER_API_KEY") ||
    getEnv("VITE_OPENWEATHERMAP_KEY")
  );
}
