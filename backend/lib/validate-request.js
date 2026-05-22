import { ApiError } from "./api-error.js";

/**
 * @param {Record<string, (value: unknown) => string | null>} rules
 * field → error message or null if valid
 */
export function validateBody(rules) {
  return (req, _res, next) => {
    const body = req.body ?? {};
    const errors = [];
    for (const [field, validate] of Object.entries(rules)) {
      const msg = validate(body[field]);
      if (msg) errors.push(`${field}: ${msg}`);
    }
    if (errors.length > 0) {
      return next(new ApiError(400, errors.join("; ")));
    }
    next();
  };
}

export function requireFields(...fields) {
  const rules = Object.fromEntries(
    fields.map((f) => [
      f,
      (v) => (v == null || String(v).trim() === "" ? "required" : null),
    ]),
  );
  return validateBody(rules);
}
