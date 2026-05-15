import { Navigate, useParams } from "@tanstack/react-router";
import { resolveDestinationNavigation } from "../data/destination-treks";
import { getDestinationBySlug } from "../data/destinations";
import NotFoundPage from "./NotFoundPage";

/** Legacy district URLs redirect straight to treks (or a single trek). */
export default function DestinationsDistrictPage() {
  const { districtSlug } = useParams({ strict: false }) as {
    districtSlug: string;
  };

  const dest = getDestinationBySlug(districtSlug);
  if (!dest) {
    return <NotFoundPage />;
  }

  const nav = resolveDestinationNavigation(dest);

  if (nav.type === "trek") {
    return <Navigate to="/treks/$slug" params={{ slug: nav.slug }} replace />;
  }

  if (nav.type === "treks") {
    return (
      <Navigate
        to="/treks"
        search={{ destination: nav.destinationSlug }}
        replace
      />
    );
  }

  if (nav.type === "yatras") {
    return <Navigate to="/yatras" replace />;
  }

  return (
    <Navigate
      to="/treks/state/$state"
      params={{ state: nav.stateSlug }}
      replace
    />
  );
}
