import { AnimatePresence, motion } from "@/lib/motion";
import GalleryImage from "./GalleryImage";

interface FullscreenImageModalProps {
  open: boolean;
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export default function FullscreenImageModal({
  open,
  imageUrl,
  alt,
  onClose,
}: FullscreenImageModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-white/15 text-white text-xl"
            aria-label="Close fullscreen image"
          >
            ×
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <GalleryImage
                src={imageUrl}
                alt={alt}
                full
                className="max-h-[90vh] max-w-[92vw] object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
