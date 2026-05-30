/**
 * Dev-only OpenWeather key — imported dynamically from weather-api in DEV only
 * so Vite production builds never embed VITE_OPENWEATHER_* in client bundles.
 */
export function getOpenWeatherApiKey(): string | undefined {
  const raw =
    import.meta.env.VITE_OPENWEATHER_API_KEY ??
    import.meta.env.VITE_OPENWEATHERMAP_KEY;
  if (!raw || typeof raw !== "string") return undefined;

  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  const subdomainMatch = trimmed.match(
    /https?:\/\/([a-f0-9]{32})\.openweathermap\.org/i,
  );
  if (subdomainMatch) return subdomainMatch[1];

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

  if (/^[a-f0-9]{32}$/i.test(trimmed)) return trimmed;

  return trimmed.length <= 64 ? trimmed : undefined;
}
