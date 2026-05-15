/**
 * Converts Internet Computer / Candid `nat64` timestamps stored as **nanoseconds**
 * since the Unix epoch into JavaScript **milliseconds**.
 *
 * Do not use `Number(ts) / 1_000_000`: nanosecond values exceed `Number.MAX_SAFE_INTEGER`,
 * so they round to the wrong instant (breaks calendars, sorting, and filters).
 */
export function icpTimestampNsToMs(ts: bigint): number {
  return Number(ts / 1_000_000n);
}
