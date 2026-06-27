import { Link, useParams } from "@tanstack/react-router";
import { motion } from "@/lib/motion";
import BreadcrumbNav from "../components/BreadcrumbNav";
import DestinationCard from "../components/DestinationCard";
import {
  DESTINATION_STATE_SLUGS,
  getDestinationsForStateSlug,
} from "../data/destinations";
import NotFoundPage from "./NotFoundPage";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

export default function DestinationsStatePage() {
  const { stateSlug } = useParams({ strict: false }) as { stateSlug: string };
  const destinations = getDestinationsForStateSlug(stateSlug);

  if (!destinations?.length) {
    return <NotFoundPage />;
  }

  const stateName = Object.entries(DESTINATION_STATE_SLUGS).find(
    ([, slug]) => slug === stateSlug,
  )?.[0];

  return (
    <motion.div
      id="main-content"
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <div className="container mx-auto px-4 py-6">
        <BreadcrumbNav
          items={[
            { label: "Destinations", href: "/destinations" },
            { label: stateName ?? stateSlug },
          ]}
        />
      </div>

      <div
        className="py-12"
        style={{
          background:
            "linear-gradient(135deg, var(--ew-red) 0%, #7a0010 60%, #3a0008 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {stateName} Destinations
          </h1>
          <p className="text-sm text-white/75 max-w-lg mx-auto">
            Trek bases, pilgrimage towns, and alpine gateways across {stateName}
            .
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} />
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Link to="/destinations" className="btn-secondary">
            All destinations
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
