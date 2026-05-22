import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export type FaqItem = { question: string; answer: string };

export default function ProductDetailFaqList({
  faqs,
  openIndex,
  onToggle,
  ocidPrefix,
  emptyMessage = "Contact us for any questions about this trip.",
}: {
  faqs: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
  ocidPrefix: string;
  emptyMessage?: string;
}) {
  if (faqs.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div
          key={faq.question}
          className="overflow-hidden rounded-xl"
          style={{ border: "1px solid var(--ew-gray-mid)" }}
          data-ocid={`${ocidPrefix}.faq.${i + 1}`}
        >
          <button
            type="button"
            onClick={() => onToggle(i)}
            className="flex w-full items-center justify-between p-4 text-left"
            style={{
              backgroundColor: openIndex === i ? "var(--ew-red-lt)" : "#fff",
            }}
          >
            <span
              className="pr-4 text-sm font-semibold"
              style={{
                color: openIndex === i ? "var(--ew-red)" : "var(--ew-text)",
              }}
            >
              {faq.question}
            </span>
            <ChevronRight
              size={18}
              style={{
                color: "var(--ew-gray-dark)",
                transform: openIndex === i ? "rotate(90deg)" : "none",
                transition: "transform 0.2s",
                flexShrink: 0,
              }}
            />
          </button>
          <AnimatePresence>
            {openIndex === i ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p
                  className="border-t px-4 pb-4 text-sm leading-relaxed"
                  style={{
                    color: "var(--ew-text-lt)",
                    borderColor: "var(--ew-gray-mid)",
                  }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
