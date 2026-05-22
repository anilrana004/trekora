import { Star } from "lucide-react";

export default function StarRow({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          style={{ color: "var(--ew-gold)" }}
          className={
            s <= Math.round(rating) ? "fill-[var(--ew-gold)]" : "fill-none"
          }
        />
      ))}
    </span>
  );
}
