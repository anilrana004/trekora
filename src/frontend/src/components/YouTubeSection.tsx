import { Play } from "lucide-react";
import { motion } from "motion/react";

const YOUTUBE_VIDEOS = [
  {
    id: "mxXE-mW7bKo",
    title: "Roopkund Trek — The Skeleton Lake",
    channel: "Trekora Official",
    views: "1.2M views",
    thumb:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80",
  },
  {
    id: "2Gj4Dsp3hOM",
    title: "Valley of Flowers — UNESCO Paradise",
    channel: "Uttarakhand Tourism",
    views: "980K views",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80",
  },
  {
    id: "LfYFrYdPkF0",
    title: "Kedarnath Yatra 2024",
    channel: "Dev Bhoomi Stories",
    views: "2.1M views",
    thumb:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=640&q=80",
  },
];

const REELS = [
  {
    id: 1,
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    title: "5 Days at 5000m Roopkund",
    duration: "0:58",
  },
  {
    id: 2,
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
    title: "Valley of Flowers Time-lapse",
    duration: "1:12",
  },
  {
    id: 3,
    thumb:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80",
    title: "Kedarnath Trek Guide",
    duration: "2:30",
  },
  {
    id: 4,
    thumb:
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=300&q=80",
    title: "Hampta Pass Day 3",
    duration: "1:45",
  },
  {
    id: 5,
    thumb:
      "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=300&q=80",
    title: "Triund Sunrise",
    duration: "0:45",
  },
  {
    id: 6,
    thumb:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=300&q=80",
    title: "Chandratal Lake Drone",
    duration: "1:20",
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

        {/* 3-column YouTube grid */}
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

        {/* Reels & Shorts */}
        <div className="mb-5">
          <h3
            className="font-bold text-[17px] mb-4"
            style={{ color: "var(--ew-text)" }}
          >
            Reels &amp; Shorts
          </h3>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {REELS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex-none relative rounded-xl overflow-hidden group cursor-pointer"
                style={{ width: 110, aspectRatio: "9/16" }}
                data-ocid={`youtube.reel.${i + 1}`}
              >
                <img
                  src={r.thumb}
                  alt={r.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                    style={{ background: "rgba(255,255,255,0.9)" }}
                  >
                    <Play
                      size={14}
                      className="ml-0.5"
                      style={{ color: "#C0001C" }}
                      fill="#C0001C"
                    />
                  </div>
                </div>
                {/* Duration badge */}
                <span
                  className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                >
                  {r.duration}
                </span>
                {/* Title overlay */}
                <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[9px] font-bold px-1 leading-tight">
                  {r.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subscribe button */}
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
