import { lazy } from "react";

export { BookingStepFallback } from "./BookingStepFallback";

export const LazyDateSelectionStep = lazy(
  () => import("./steps/DateSelectionStep"),
);

export const LazyTravelerDetailsStep = lazy(
  () => import("./steps/TravelerDetailsStep"),
);

export const LazyHealthInfoStep = lazy(() => import("./steps/HealthInfoStep"));

export const LazyDocumentsStep = lazy(() => import("./steps/DocumentsStep"));

export const LazyPreferencesStep = lazy(
  () => import("./steps/PreferencesStep"),
);

export const LazyReviewPaymentStep = lazy(
  () => import("./steps/ReviewPaymentStep"),
);
