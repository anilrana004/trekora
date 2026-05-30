import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

/** @deprecated Use isWeatherServiceConfigured from @/lib/weather-api */
export function hasOpenWeatherApiKey(): boolean {
  return import.meta.env.DEV;
}

/** Build a query string OpenWeather accepts for city or coordinates. */
export function openWeatherLocationQuery(
  location: string,
  coords?: { lat: number; lng: number },
): string {
  if (coords) {
    return `lat=${coords.lat}&lon=${coords.lng}`;
  }
  return `q=${encodeURIComponent(location)}`;
}

/** Improve hit rate for Himalayan base towns (OpenWeather needs country/region). */
export function formatWeatherLocation(
  startPoint: string,
  state?: "uttarakhand" | "himachal",
): string {
  let point = startPoint.trim();
  if (point.includes("/")) {
    point = point.split("/")[0]?.trim() || point;
  }
  if (/,\s*(IN|India)/i.test(point)) return point;
  const town = point.split(",")[0]?.trim() ?? point;
  const region =
    state === "uttarakhand"
      ? "Uttarakhand, IN"
      : state === "himachal"
        ? "Himachal Pradesh, IN"
        : "IN";
  return `${town}, ${region}`;
}

export type ProductWeatherContext = {
  productName: string;
  location: string;
};

/** Resolve live-weather query for a trek or yatra slug. */
export function resolveProductWeather(
  kind: "trek" | "yatra",
  slug: string,
): ProductWeatherContext | null {
  if (kind === "trek") {
    const trek = TREKS.find((t) => t.slug === slug);
    if (!trek) return null;
    return {
      productName: trek.name,
      location: formatWeatherLocation(trek.startPoint, trek.state),
    };
  }
  const yatra = YATRAS.find((y) => y.slug === slug);
  if (!yatra) return null;
  return {
    productName: yatra.name,
    location: formatWeatherLocation(yatra.startPoint, yatra.state),
  };
}
