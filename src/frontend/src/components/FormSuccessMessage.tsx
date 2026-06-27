import { motion } from "@/lib/motion";

export interface FormSuccessMessageProps {
  title: string;
  description: string;
  className?: string;
  "data-ocid"?: string;
}

/** Instant post-submit confirmation (optimistic UI). */
export default function FormSuccessMessage({
  title,
  description,
  className = "",
  "data-ocid": dataOcid,
}: FormSuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={`form-success-message text-center py-10 px-4 ${className}`}
      role="status"
      aria-live="polite"
      data-ocid={dataOcid}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
        style={{ background: "#E8F5E9" }}
        aria-hidden
      >
        ✅
      </div>
      <h3
        className="font-bold text-lg mb-2"
        style={{ color: "var(--ew-text)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm max-w-md mx-auto leading-relaxed"
        style={{ color: "var(--ew-text-lt)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}
