import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

/** Resolves OpenWeather API key from Vite env (handles pasted URLs or subdomain mistakes). */
export function getOpenWeatherApiKey(): string | undefined {
  const raw =
    import.meta.env.VITE_OPENWEATHER_API_KEY ??
    import.meta.env.VITE_OPENWEATHERMAP_KEY;
  if (!raw || typeof raw !== "string") return undefined;

  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  // Key mistakenly pasted as subdomain: https://{key}.openweathermap.org/...
  const subdomainMatch = trimmed.match(
    /https?:\/\/([a-f0-9]{32})\.openweathermap\.org/i,
  );
  if (subdomainMatch) return subdomainMatch[1];

  // Full URL with appid= query param
  if (trimmed.includes("openweathermap.org")) {
    try {
      const url = new URL(
        trimmed.startsWith("http") ? trimmed : `https://${trimmed}`,
      );
      const appid = url.searchParams.get("appid");
      if (appid && appid !== "YOUR_API_KEY" && /^[a-f0-9]{32}$/i.test(appid)) {
        return appid;
      }
    } catch {
      // fall through
    }
    const appidMatch = trimmed.match(/appid=([a-f0-9]{32})/i);
    if (appidMatch) return appidMatch[1];
  }

  // Plain 32-char hex key
  if (/^[a-f0-9]{32}$/i.test(trimmed)) return trimmed;

  return trimmed.length <= 64 ? trimmed : undefined;
}

export function hasOpenWeatherApiKey(): boolean {
  return !!getOpenWeatherApiKey();
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
