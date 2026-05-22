/**
 * Cache abstraction — memory today; Redis when CACHE_BACKEND=redis and REDIS_URL is set.
 */

import { getOrSetMemory, invalidateMemoryPrefix, memoryCacheStats } from "./memory-store.js";

export { galleryCacheKey, reviewsCacheKey, seoMetaCacheKey, homepageSectionCacheKey } from "./cache-keys.js";

/** @typedef {{ ttlSeconds?: number }} CacheOptions */

/**
 * @param {string} key
 * @param {() => Promise<T>} factory
 * @param {CacheOptions} [opts]
 * @returns {Promise<T>}
 * @template T
 */
export async function cacheGetOrSet(key, factory, opts = {}) {
  const backend = (process.env.CACHE_BACKEND || "memory").toLowerCase();
  if (backend === "redis" && process.env.REDIS_URL) {
    // Future: wire ioredis / @redis/client here; fall back to memory on miss/errors.
    return getOrSetMemory(key, factory, opts);
  }
  return getOrSetMemory(key, factory, opts);
}

/**
 * @param {string} prefix
 */
export function cacheInvalidatePrefix(prefix) {
  invalidateMemoryPrefix(prefix);
}

export function cacheStats() {
  return memoryCacheStats();
}

/**
 * Express-style wrapper for GET handlers that return JSON bodies.
 * @param {(req: import('express').Request) => string} keyFn
 * @param {(req: import('express').Request) => Promise<object>} handler
 * @param {CacheOptions} [opts]
 */
export function withResponseCache(keyFn, handler, opts = {}) {
  return async function cachedHandler(req, res, next) {
    try {
      const key = keyFn(req);
      const payload = await cacheGetOrSet(key, () => handler(req), opts);
      if (payload && typeof payload === "object" && "success" in payload) {
        res.setHeader("X-Cache", "HIT");
      }
      return res.json(payload);
    } catch (err) {
      return next(err);
    }
  };
}
