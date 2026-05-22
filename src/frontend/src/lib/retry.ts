/** Small retry helper for network calls (uploads, bookings, reviews). */

export type RetryOptions = {
  attempts?: number;
  delayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
};

const DEFAULT_SHOULD_RETRY = (error: unknown) => {
  if (error instanceof Error && error.name === "AbortError") return false;
  return true;
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const attempts = Math.max(1, options.attempts ?? 2);
  const delayMs = options.delayMs ?? 400;
  const shouldRetry = options.shouldRetry ?? DEFAULT_SHOULD_RETRY;

  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i >= attempts - 1 || !shouldRetry(err, i)) break;
      await new Promise((r) => globalThis.setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw lastError;
}
