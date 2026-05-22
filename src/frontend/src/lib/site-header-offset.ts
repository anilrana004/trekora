/** Sync mobile navbar hide state → CSS var for listing sticky toolbars */
export function syncMobileNavHidden(hidden: boolean) {
  if (typeof document === "undefined") return;
  if (hidden) {
    document.documentElement.dataset.mobileNavHidden = "true";
  } else {
    delete document.documentElement.dataset.mobileNavHidden;
  }
}
