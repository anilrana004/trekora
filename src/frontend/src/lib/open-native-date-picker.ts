/**
 * Chrome/Edge desktop only open `<input type="date">` from the tiny calendar
 * glyph — clicks on the rest of the field do nothing. `showPicker()` opens it
 * from any user activation (click / tap).
 */
export function openNativeDatePicker(input: HTMLInputElement | null) {
  if (!input || input.disabled || input.readOnly) return;
  input.focus({ preventScroll: true });
  const picker = input as HTMLInputElement & { showPicker?: () => void };
  if (typeof picker.showPicker !== "function") return;
  try {
    picker.showPicker();
  } catch {
    /* Already opening, or the browser blocked a non-gesture call. */
  }
}
