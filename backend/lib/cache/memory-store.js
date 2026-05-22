/**
 * In-process TTL cache — drop-in stand-in until Redis is configured.
 */

const store = new Map();

function pruneExpired() {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.expiresAt <= now) store.delete(key);
  }
}

/**
 * @param {string} key
 * @param {() => Promise<unknown>} factory
 * @param {{ ttlSeconds?: number }} [opts]
 */
export async function getOrSetMemory(key, factory, { ttlSeconds = 60 } = {}) {
  pruneExpired();
  const hit = store.get(key);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value;
  }
  const value = await factory();
  const ttl = Math.max(5, Math.min(3600, Number(ttlSeconds) || 60));
  store.set(key, { value, expiresAt: Date.now() + ttl * 1000 });
  return value;
}

export function invalidateMemoryPrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
}

export function memoryCacheStats() {
  pruneExpired();
  return { entries: store.size, backend: "memory" };
}
