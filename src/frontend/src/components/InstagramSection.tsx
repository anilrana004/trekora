import { motion } from "@/lib/motion";
import { useState } from "react";

import OptimizedImage from "./media/OptimizedImage";

const POSTS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    likes: "3.2K",
    caption: "Valley of Flowers in full bloom 🌸",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    likes: "2.1K",
    caption: "Above the clouds at Kedarkantha ❄️",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    likes: "4.5K",
    caption: "Summit vibes — Kedarkantha 3,810m 🏔️",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    likes: "1.8K",
    caption: "Starry nights at Brahmatal ⛺",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
    likes: "2.9K",
    caption: "Hampta Pass — two worlds in one 🌄",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
    likes: "3.7K",
    caption: "Mountain town magic 🏘️",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
    likes: "2.3K",
    caption: "Trek trails through deodar forests 🌲",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80",
    likes: "5.1K",
    caption: "First light on Chandratal 🌅",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1587182531610-3d2c7a7d3ece?w=400&q=80",
    likes: "1.6K",
    caption: "Campfire stories under the Milky Way 🌌",
  },
];

function InstaTile({
  post,
  index,
}: { post: (typeof POSTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="relative overflow-hidden rounded cursor-pointer"
      style={{ aspectRatio: "1 / 1" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`instagram.post.${index + 1}`}
    >
      <OptimizedImage
        src={post.src}
        alt={post.caption}
        fill
        variant="destination"
        className="transition-transform duration-500"
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200"
        style={{
          background: "rgba(192,0,28,0.78)",
          opacity: hovered ? 1 : 0,
        }}
      >
        <span className="text-white text-xl mb-1">❤️</span>
        <span className="text-white font-bold text-sm">{post.likes}</span>
        <span className="text-white/80 text-[11px] mt-1 px-2 text-center leading-tight">
          {post.caption}
        </span>
      </div>
    </motion.div>
  );
}

export default function InstagramSection() {
  return (
    <section className="py-12 bg-white" data-ocid="instagram2.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-7"
        >
          <h2 className="section-heading" style={{ color: "var(--ew-text)" }}>
            Follow @trekora — Live from the Mountains
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
            Real moments from real trekkers
          </p>
        </motion.div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-3 gap-1.5 max-w-2xl mx-auto mb-5">
          {POSTS.map((p, i) => (
            <InstaTile key={p.id} post={p} index={i} />
          ))}
        </div>

        {/* Footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
            <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
              4.2K followers
            </span>{" "}
            &bull;{" "}
            <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
              850 posts
            </span>
          </p>
          <a
            href="https://instagram.com/trekora"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 text-sm"
            data-ocid="instagram2.follow_button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            🌿 Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
