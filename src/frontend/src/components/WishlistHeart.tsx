import { Heart } from "lucide-react";
import { motion } from "@/lib/motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  name: string;
  type: "trek" | "yatra";
}

interface WishlistHeartProps {
  id: string;
  name: string;
  type: "trek" | "yatra";
  className?: string;
}

const STORAGE_KEY = "ew_wishlist";

function readWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

function writeWishlist(items: WishlistItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function WishlistHeart({
  id,
  name,
  type,
  className = "absolute top-2 right-2",
}: WishlistHeartProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list = readWishlist();
    setSaved(list.some((item) => item.id === id));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const list = readWishlist();
    if (saved) {
      const updated = list.filter((item) => item.id !== id);
      writeWishlist(updated);
      setSaved(false);
      toast.info("Removed from wishlist", { duration: 2000 });
    } else {
      writeWishlist([...list, { id, name, type }]);
      setSaved(true);
      toast.success("Added to wishlist!", { duration: 2000 });
    }
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      className={`${className} z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
      style={{
        backgroundColor: saved
          ? "rgba(192,0,28,0.15)"
          : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(4px)",
        border: saved ? "1.5px solid var(--ew-red)" : "1.5px solid transparent",
      }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      aria-label={
        saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`
      }
      data-ocid="wishlist.toggle"
    >
      <Heart
        size={15}
        style={{ color: "var(--ew-red)" }}
        className={saved ? "fill-[var(--ew-red)]" : "fill-none"}
      />
    </motion.button>
  );
}
