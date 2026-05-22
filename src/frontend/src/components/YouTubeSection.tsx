import { motion } from "motion/react";

import { HOMEPAGE_REELS } from "@/data/trek-reels";
import ReelsShortsRow from "./ReelsShortsRow";

const YOUTUBE_VIDEOS = [
  {
    id: "mxXE-mW7bKo",
    title: "Roopkund Trek — The Skeleton Lake",
    channel: "Trekora Official",
    views: "1.2M views",
    thumb:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824303/alkvjnkapfjh5fywqzqf.jpg",
  },
  {
    id: "2Gj4Dsp3hOM",
    title: "Valley of Flowers — UNESCO Paradise",
    channel: "Uttarakhand Tourism",
    views: "980K views",
    thumb:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824252/osxg6q6dria3uvp5awfj.webp",
  },
  {
    id: "LfYFrYdPkF0",
    title: "Kedarnath Yatra 2024",
    channel: "Dev Bhoomi Stories",
    views: "2.1M views",
    thumb:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824242/y3zhv11abvtf0hdevura.webp",
  },
];

export default function YouTubeSection() {
  return (
    <section
      className="py-14"
      style={{ background: "#F5F5F5" }}
      data-ocid="youtube.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="section-title">Experience the Himalayas</h2>
          <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
            Real trek footage from our guides and trekkers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {YOUTUBE_VIDEOS.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden shadow-card"
              data-ocid={`youtube.embed.${i + 1}`}
            >
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    border: 0,
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="bg-white p-3">
                <p
                  className="font-semibold text-[14px] line-clamp-1 mb-0.5"
                  style={{ color: "var(--ew-text)" }}
                >
                  {v.title}
                </p>
                <p
                  className="text-[12px]"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {v.channel} · {v.views}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-5">
          <h3
            className="font-bold text-[17px] mb-4"
            style={{ color: "var(--ew-text)" }}
          >
            Reels &amp; Shorts
          </h3>
          <ReelsShortsRow reels={HOMEPAGE_REELS} ocidPrefix="youtube" />
        </div>

        <div className="flex justify-end">
          <a
            href="https://www.youtube.com/@trekora"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
            style={{ background: "#C0001C", borderColor: "#C0001C" }}
            data-ocid="youtube.subscribe_button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe to Trekora
          </a>
        </div>
      </div>
    </section>
  );
}
