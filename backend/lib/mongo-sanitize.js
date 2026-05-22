/**
 * Strips MongoDB operator keys from req body/query to reduce NoSQL injection surface.
 * Lightweight alternative to express-mongo-sanitize (no extra dependency).
 */

const OPERATOR_RE = /^\$/;
const DOT_RE = /\./;

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function sanitizeValue(value, inArray = false) {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, true));
  }
  if (!isPlainObject(value)) return value;

  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (OPERATOR_RE.test(key)) continue;
    if (!inArray && DOT_RE.test(key)) continue;
    out[key] = sanitizeValue(child, false);
  }
  return out;
}

export function mongoSanitizeMiddleware(req, _res, next) {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  if (req.query && typeof req.query === "object") {
    req.query = sanitizeValue(req.query);
  }
  if (req.params && typeof req.params === "object") {
    req.params = sanitizeValue(req.params);
  }
  next();
}
