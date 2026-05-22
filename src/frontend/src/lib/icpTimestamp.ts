/**
 * Converts Internet Computer / Candid `nat64` timestamps stored as **nanoseconds**
 * since the Unix epoch into JavaScript **milliseconds**.
 *
 * Do not use `Number(ts) / 1_000_000`: nanosecond values exceed `Number.MAX_SAFE_INTEGER`,
 * so they round to the wrong instant (breaks calendars, sorting, and filters).
 *
 * INVARIANT: `batchDate` on trek batches / bookings is epoch **milliseconds** from the canister.
 * For batchDate use `new Date(Number(batchDate))` — never call `icpTimestampNsToMs` on batchDate.
 */
export function icpTimestampNsToMs(ts: bigint): number {
  return Number(ts / 1_000_000n);
}
