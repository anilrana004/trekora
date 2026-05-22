import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { MapPin, Mountain } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import BreadcrumbNav from "../components/BreadcrumbNav";
import ListingRegionFilterPills, {
  type ListingRegionTab,
} from "../components/ListingRegionFilterPills";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import TrekCard from "../components/TrekCard";
import OptimizedImage from "../components/media/OptimizedImage";
import { TREKS, type TrekDifficulty } from "../data/treks";

interface StateConfig {
  title: string;
  state: string;
  filterKey: string;
  heroImage: string;
  description: string;
  seasonGuide: { season: string; months: string; desc: string }[];
}

const STATES: Record<string, StateConfig> = {
  "himachal-pradesh": {
    title: "Himachal Pradesh",
    state: "himachal",
    filterKey: "himachal",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    description:
      "Himachal Pradesh is the adventure capital of India, home to some of the most dramatic and varied trekking terrain on earth. From the pine-forested ridges of Dharamshala to the stark moonscapes of Spiti Valley, Himachal offers treks for every skill level. The Great Himalayan National Park, UNESCO listed, shelters snow leopards, musk deer, and Himalayan brown bears. Trails like the Hampta Pass cross the geological boundary between the lush Kullu Valley and the arid Lahaul plateau — giving trekkers two completely different worlds in a single trek. The Parvati Valley draws spiritual seekers and adventure trekkers alike to Kheerganga and Pin Parvati Pass. Whether you're looking for a weekend escape from Manali or a 15-day expedition into remote Kinnaur, Himachal Pradesh has an unmatched trekking experience waiting for you.",
    seasonGuide: [
      {
        season: "Spring",
        months: "Apr–Jun",
        desc: "Snow melting, wildflowers blooming, best for high passes",
      },
      {
        season: "Monsoon",
        months: "Jul–Aug",
        desc: "Lush valleys, lighter rain than Uttarakhand, rivers full",
      },
      {
        season: "Autumn",
        months: "Sep–Oct",
        desc: "Crystal clear skies, golden meadows, peak season",
      },
      {
        season: "Winter",
        months: "Nov–Mar",
        desc: "Snow treks in Manali area; high passes closed",
      },
    ],
  },
  uttarakhand: {
    title: "Uttarakhand",
    state: "uttarakhand",
    filterKey: "uttarakhand",
    heroImage:
      "https://images.unsplash.com/photo-1547515959-7ba5d5fdefd6?w=1400&q=80",
    description:
      "Uttarakhand — Devbhoomi, the Land of the Gods — is the spiritual and trekking heartland of India. Its trails wind through UNESCO-listed biosphere reserves, past ancient temples, and up to soaring Himalayan peaks. The Garhwal and Kumaon divisions together host more than 20 world-class treks including the legendary Roopkund, the valley of Flowers, and the towering Rupin Pass. The region receives excellent snowfall making Kedarkantha and Brahmatal among India's finest winter treks. Sacred rivers originate here — the Alaknanda, Mandakini, and Bhagirathi create breathtaking gorges and valley floors. The Char Dham Yatra circuit and Panch Kedar pilgrimage add a spiritual dimension unique to Uttarakhand trekking. Infrastructure is excellent with well-maintained base camps, local guide networks, and rescue services covering all major routes.",
    seasonGuide: [
      {
        season: "Spring",
        months: "Apr–Jun",
        desc: "Rhododendron forests in bloom, clear mountain views",
      },
      {
        season: "Monsoon",
        months: "Jul–Aug",
        desc: "Valley of Flowers peak — world-class wildflowers",
      },
      {
        season: "Autumn",
        months: "Sep–Oct",
        desc: "Best overall conditions, post-monsoon clarity",
      },
      {
        season: "Winter",
        months: "Nov–Mar",
        desc: "Kedarkantha, Brahmatal — snow treks in their glory",
      },
    ],
  },
  "jammu-kashmir": {
    title: "Jammu & Kashmir",
    state: "jk",
    filterKey: "jk",
    heroImage:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1400&q=80",
    description:
      "Jammu & Kashmir offers some of the most remote and spectacular trekking in all of Asia. The Great Lakes Trek, Kashmir Alpine Lakes, and routes through the Pir Panjal range are legendary among seasoned trekkers. Srinagar and its houseboat culture provide an unforgettable base. The Warwan Valley and Kishtwar offer wilderness trekking away from crowds with dramatic canyon and glacier terrain.",
    seasonGuide: [
      {
        season: "Spring",
        months: "May–Jun",
        desc: "Tulip gardens in bloom, snow-capped peaks pristine",
      },
      {
        season: "Summer",
        months: "Jul–Aug",
        desc: "Best weather for high-altitude treks and lakes",
      },
      {
        season: "Autumn",
        months: "Sep–Oct",
        desc: "Chinar forests turn golden, crisp trekking weather",
      },
      {
        season: "Winter",
        months: "Nov–Apr",
        desc: "Gulmarg skiing; most trek routes closed",
      },
    ],
  },
  sikkim: {
    title: "Sikkim",
    state: "sikkim",
    filterKey: "sikkim",
    heroImage:
      "https://images.unsplash.com/photo-1571401835393-8c5f35328320?w=1400&q=80",
    description:
      "Sikkim's Himalayan trails offer pristine rhododendron forests, views of Kanchenjunga (the world's third highest peak), and a unique Buddhist cultural landscape unlike any other state in India. Trekora is expanding to Sikkim — treks coming soon.",
    seasonGuide: [
      {
        season: "Spring",
        months: "Mar–May",
        desc: "Rhododendron bloom, best Kanchenjunga views",
      },
      {
        season: "Autumn",
        months: "Oct–Nov",
        desc: "Clear skies, ideal trekking weather",
      },
    ],
  },
  "west-bengal": {
    title: "West Bengal",
    state: "wb",
    filterKey: "wb",
    heroImage:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1400&q=80",
    description:
      "West Bengal's Himalayan foothills — the Singalila Ridge, Sandakphu, and Phalut — offer dramatic Himalayan panoramas including Everest and Kanchenjunga from a single viewpoint. Trekora is expanding to West Bengal — treks coming soon.",
    seasonGuide: [
      {
        season: "Autumn",
        months: "Oct–Dec",
        desc: "Best visibility, post-monsoon clarity",
      },
      {
        season: "Spring",
        months: "Mar–May",
        desc: "Rhododendron bloom along Singalila Ridge",
      },
    ],
  },
  maharashtra: {
    title: "Maharashtra",
    state: "maharashtra",
    filterKey: "maharashtra",
    heroImage:
      "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=1400&q=80",
    description:
      "Maharashtra's Sahyadri range (Western Ghats) offers dramatic fort treks, waterfall trails, and misty monsoon hikes with a unique flavour distinct from Himalayan trekking. Kalsubai, Harishchandragad, and Rajmachi are iconic routes. Trekora is expanding to Maharashtra — treks coming soon.",
    seasonGuide: [
      {
        season: "Monsoon",
        months: "Jun–Sep",
        desc: "Waterfalls, lush greenery, fort trails at their dramatic best",
      },
      {
        season: "Winter",
        months: "Oct–Feb",
        desc: "Clear visibility, comfortable temperatures for fort treks",
      },
    ],
  },
  karnataka: {
    title: "Karnataka",
    state: "karnataka",
    filterKey: "karnataka",
    heroImage:
      "https://images.unsplash.com/photo-1529008922463-fd89f025f468?w=1400&q=80",
    description:
      "Karnataka's Western Ghats are a UNESCO World Heritage biodiversity hotspot. Kumara Parvatha, Brahmagiri, and Kudremukh offer pristine forest trails and wildlife encounters. Trekora is expanding to Karnataka — treks coming soon.",
    seasonGuide: [
      {
        season: "Winter",
        months: "Oct–Feb",
        desc: "Ideal weather for forest treks, excellent wildlife sightings",
      },
      {
        season: "Monsoon",
        months: "Jun–Sep",
        desc: "Lush canopy, waterfalls, misty valleys",
      },
    ],
  },
};

const DIFF_ORDER: TrekDifficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme",
];

const DIFF_COLORS: Record<string, string> = {
  Easy: "var(--ew-green)",
  "Easy-Moderate": "var(--ew-green)",
  Moderate: "var(--ew-orange)",
  "Moderate-Difficult": "var(--ew-orange)",
  Difficult: "var(--ew-red)",
  "Difficult-Extreme": "var(--ew-red)",
  Extreme: "#7b1fa2",
};

function ComingSoonSection({ config }: { config: StateConfig }) {
  return (
    <div className="text-center py-16" data-ocid="state_hub.empty_state">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Mountain
          size={48}
          className="mx-auto mb-4"
          style={{ color: "var(--ew-gray-mid)" }}
        />
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--ew-text)" }}
        >
          {config.title} — Treks Coming Soon
        </h2>
        <p
          className="max-w-md mx-auto mb-6"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {config.description}
        </p>
        <Link
          to="/treks"
          className="btn-primary"
          data-ocid="state_hub.browse_all_link"
        >
          Browse Available Treks
        </Link>
      </motion.div>
    </div>
  );
}

const STATE_HUB_PATHS: Record<ListingRegionTab, string> = {
  all: "/treks",
  uttarakhand: "/treks/state/uttarakhand",
  himachal: "/treks/state/himachal-pradesh",
};

export default function StateHubPage() {
  const navigate = useNavigate();
  const { state: stateParam } = useParams({
    from: "/layout/treks/state/$state",
  });
  const config = STATES[stateParam];

  const stateTreks = useMemo(() => {
    if (!config) return [];
    return TREKS.filter((t) => t.state === config.state);
  }, [config]);

  const diffDistribution = useMemo(() => {
    const counts: Partial<Record<TrekDifficulty, number>> = {};
    for (const t of stateTreks) {
      counts[t.difficulty] = (counts[t.difficulty] ?? 0) + 1;
    }
    return DIFF_ORDER.filter((d) => counts[d]).map((d) => ({
      diff: d,
      count: counts[d] ?? 0,
    }));
  }, [stateTreks]);

  useEffect(() => {
    const name = config?.title ?? stateParam;
    document.title = `${name} Treks 2025 | Trekora`;
  }, [stateParam, config]);

  if (!config) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--ew-text)" }}
          >
            State not found
          </h1>
          <Link to="/treks" className="btn-primary">
            Browse Treks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div
        className="relative h-64 md:h-80 overflow-hidden"
        data-travel-image-section
      >
        <OptimizedImage
          src={config.heroImage}
          alt={config.title}
          fill
          priority
          blurUp
          variant="hero"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-white/80" aria-hidden="true" />
            <span className="text-white/80 text-sm">India</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow">
            {config.title} Treks
          </h1>
          {stateTreks.length > 0 && (
            <p className="text-white/90 text-sm mt-1">
              {stateTreks.length} trek{stateTreks.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          )}
        </div>
      </div>

      <div
        id={TRAVEL_HERO_SENTINEL_ID}
        className="h-0 w-full"
        aria-hidden
      />
      <TravelSideActionRail
        variant="listing-treks"
        productName={`${config.title} treks`}
      />

      <div
        className="listing-sticky-toolbar bg-white shadow-sm py-2.5 border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4">
          <ListingRegionFilterPills
            kind="treks"
            active={config.filterKey as ListingRegionTab}
            highlightTab={config.filterKey as ListingRegionTab}
            onChange={(tab) => navigate({ to: STATE_HUB_PATHS[tab] })}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <BreadcrumbNav
          items={[{ label: "Treks", href: "/treks" }, { label: config.title }]}
        />

        {stateTreks.length === 0 ? (
          <ComingSoonSection config={config} />
        ) : (
          <>
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-card mb-6"
            >
              <h2 className="section-title mb-4">
                About {config.title} Trekking
              </h2>
              <p style={{ color: "var(--ew-text-lt)", lineHeight: 1.8 }}>
                {config.description}
              </p>
            </motion.div>

            {/* Difficulty distribution */}
            {diffDistribution.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-card mb-6">
                <h2
                  className="font-bold text-base mb-4"
                  style={{ color: "var(--ew-text)" }}
                >
                  Difficulty Distribution
                </h2>
                <div className="space-y-2">
                  {diffDistribution.map(({ diff, count }) => (
                    <div key={diff} className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold w-32 shrink-0"
                        style={{ color: DIFF_COLORS[diff] ?? "var(--ew-text)" }}
                      >
                        {diff}
                      </span>
                      <div
                        className="flex-1 h-3 rounded-full overflow-hidden"
                        style={{ background: "var(--ew-gray-lt)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${(count / stateTreks.length) * 100}%`,
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{
                            background: DIFF_COLORS[diff] ?? "var(--ew-orange)",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-bold w-8 text-right shrink-0"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seasonal guide */}
            <div className="mb-6">
              <h2 className="section-title mb-4">Seasonal Trekking Guide</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {config.seasonGuide.map((s, i) => (
                  <motion.div
                    key={s.season}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-xl p-4 shadow-card"
                    data-ocid={`state_hub.season.${i + 1}`}
                  >
                    <p
                      className="font-bold text-sm mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {s.season}
                      <span
                        className="ml-1 text-xs font-normal"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        ({s.months})
                      </span>
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {s.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trek grid */}
            <h2 className="section-title mb-5">All {config.title} Treks</h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
              data-ocid="state_hub.trek_list"
            >
              {stateTreks.map((trek, i) => (
                <motion.div
                  key={trek.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  style={{ pointerEvents: "auto" }}
                  data-ocid={`state_hub.trek_card.${i + 1}`}
                >
                  <TrekCard trek={trek} />
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center py-8">
              <Link
                to="/treks"
                className="btn-secondary"
                data-ocid="state_hub.view_all_link"
              >
                View All India Treks →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
