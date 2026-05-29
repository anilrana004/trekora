/**
 * OpenWeather proxy — keeps API keys off the client bundle.
 */
import { Router } from "express";
import { ApiError } from "../lib/api-error.js";
import { getOpenWeatherServerKey } from "../lib/openweather-server.js";
import { sanitizeText } from "../lib/http-security.js";

const router = Router();
const UPSTREAM = "https://api.openweathermap.org/data/2.5";

function buildQuery(req) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  if (lat != null && lon != null) {
    const latN = Number(lat);
    const lonN = Number(lon);
    if (!Number.isFinite(latN) || !Number.isFinite(lonN)) {
      throw new ApiError(400, "Invalid coordinates");
    }
    if (latN < -90 || latN > 90 || lonN < -180 || lonN > 180) {
      throw new ApiError(400, "Invalid coordinates");
    }
    return `lat=${latN}&lon=${lonN}`;
  }
  const q = sanitizeText(req.query.q ?? req.query.location, 120);
  if (!q) throw new ApiError(400, "Missing location");
  return `q=${encodeURIComponent(q)}`;
}

async function upstream(path, query, key) {
  const url = `${UPSTREAM}${path}?${query}&appid=${encodeURIComponent(key)}&units=metric`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) {
    throw new ApiError(res.status === 404 ? 404 : 502, "Weather unavailable");
  }
  return res.json();
}

router.get("/", async (req, res, next) => {
  try {
    const key = getOpenWeatherServerKey();
    if (!key) {
      return res.status(503).json({
        success: false,
        message: "Weather service not configured",
      });
    }
    const query = buildQuery(req);
    const [current, forecast] = await Promise.all([
      upstream("/weather", query, key),
      upstream("/forecast", `${query}&cnt=40`, key),
    ]);
    return res.json({ success: true, current, forecast });
  } catch (err) {
    return next(err);
  }
});

export default router;
