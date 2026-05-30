/**
 * GET JSON without throwing on 4xx/5xx — for read APIs that encode errors in `{ success: false }`.
 */
export async function fetchJsonLenient<T>(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 25_000;
  const { timeoutMs: _t, ...rest } = init ?? {};
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    try {
      return (await res.json()) as T;
    } catch {
      if (!res.ok) {
        throw new ApiFetchError(`Request failed (${res.status})`, res.status);
      }
      throw new ApiFetchError("Invalid JSON response", res.status);
    }
  } catch (err) {
    if (err instanceof ApiFetchError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiFetchError("Request timed out", 408);
    }
    throw err;
  } finally {
    window.clearTimeout(timer);
  }
}

/** JSON fetch with timeout, deduplication, and consistent error handling. */

export class ApiFetchError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiFetchError";
    this.status = status;
  }
}

type DedupeEntry = {
  promise: Promise<unknown>;
  expiresAt: number;
};

const inflightGet = new Map<string, DedupeEntry>();
const DEDUPE_TTL_MS = 800;

function dedupeKey(
  input: RequestInfo | URL,
  init?: RequestInit,
): string | null {
  const method = (init?.method ?? "GET").toUpperCase();
  if (method !== "GET") return null;
  const url = typeof input === "string" ? input : input.toString();
  return `${method}:${url}`;
}

function pruneDedupe(): void {
  const now = Date.now();
  for (const [k, v] of inflightGet) {
    if (v.expiresAt < now) inflightGet.delete(k);
  }
}

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 25_000;
  const { timeoutMs: _t, ...rest } = init ?? {};
  const key = dedupeKey(input, rest);

  if (key) {
    pruneDedupe();
    const existing = inflightGet.get(key);
    if (existing && existing.expiresAt > Date.now()) {
      return existing.promise as Promise<T>;
    }
  }

  const run = async (attempt = 0): Promise<T> => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(input, { ...rest, signal: controller.signal });
      const data = (await res.json()) as T;
      if (!res.ok) {
        const msg =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof (data as { message: unknown }).message === "string"
            ? (data as { message: string }).message
            : `Request failed (${res.status})`;
        const retryable =
          attempt === 0 &&
          (res.status === 408 || res.status === 429 || res.status >= 500);
        if (retryable) {
          await new Promise((r) => globalThis.setTimeout(r, 350));
          return run(attempt + 1);
        }
        throw new ApiFetchError(msg, res.status);
      }
      return data;
    } catch (err) {
      if (err instanceof ApiFetchError) throw err;
      if (err instanceof DOMException && err.name === "AbortError") {
        if (attempt === 0) {
          await new Promise((r) => globalThis.setTimeout(r, 350));
          return run(attempt + 1);
        }
        throw new ApiFetchError("Request timed out", 408);
      }
      if (attempt === 0) {
        await new Promise((r) => globalThis.setTimeout(r, 350));
        return run(attempt + 1);
      }
      throw err;
    } finally {
      window.clearTimeout(timer);
    }
  };

  const promise = run();
  if (key) {
    inflightGet.set(key, {
      promise,
      expiresAt: Date.now() + DEDUPE_TTL_MS,
    });
    promise.finally(() => {
      const entry = inflightGet.get(key);
      if (entry?.promise === promise) inflightGet.delete(key);
    });
  }
  return promise;
}

/** POST/PUT JSON helper — no deduplication. */
export async function postJson<T>(
  input: RequestInfo | URL,
  body: Record<string, unknown>,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  return fetchJson<T>(input, {
    ...init,
    method: init?.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: JSON.stringify(body),
  });
}

/**
 * POST JSON without throwing on 4xx — for APIs that encode errors in `{ success: false }`.
 */
export async function postJsonLenient<T>(
  input: RequestInfo | URL,
  body: Record<string, unknown>,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const timeoutMs = init?.timeoutMs ?? 25_000;
  const { timeoutMs: _t, ...rest } = init ?? {};
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, {
      ...rest,
      method: rest.method ?? "POST",
      headers: {
        "Content-Type": "application/json",
        ...rest.headers,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}
