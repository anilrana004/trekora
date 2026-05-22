/**
 * Centralized API error responses — consistent shape for frontend handling.
 */
import { isProduction } from "./env-config.js";

export class ApiError extends Error {
  /** @param {number} status HTTP status */
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function sendApiError(res, status, message, extra = {}) {
  return res.status(status).json({ success: false, message, ...extra });
}

export function notFoundHandler(_req, res) {
  return sendApiError(res, 404, "Not found");
}

function safeClientMessage(status, err) {
  if (status === 500 || isProduction()) {
    return status === 500
      ? "Service temporarily unavailable"
      : "Request could not be completed";
  }
  const msg = err instanceof Error ? err.message : "";
  if (!msg || /secret|password|mongodb|smtp|cloudinary|token/i.test(msg)) {
    return "Request could not be completed";
  }
  return msg.slice(0, 200);
}

export function errorHandler(err, req, res, _next) {
  const status =
    err instanceof ApiError
      ? err.status
      : Number(err?.status) >= 400 && Number(err?.status) < 600
        ? Number(err.status)
        : 500;
  const logRef = req?.requestId ?? `req-${Date.now().toString(36)}`;
  if (isProduction()) {
    process.stderr.write(
      `[api-error] ${logRef} status=${status} type=${err?.name ?? "Error"}\n`,
    );
  } else {
    const message = err instanceof Error ? err.message : "Internal server error";
    process.stderr.write(
      `[api-error] ${logRef} ${message}${err?.stack ? `\n${err.stack}` : ""}\n`,
    );
  }
  return sendApiError(res, status, safeClientMessage(status, err));
}
