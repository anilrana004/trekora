import { type DormantFeature, isFeatureLive } from "@/lib/dormant-features";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  feature: DormantFeature;
  children: ReactNode;
};

/** Renders children only when the feature flag is live; otherwise redirects home. */
export default function DormantFeatureRoute({ feature, children }: Props) {
  if (!isFeatureLive(feature)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
