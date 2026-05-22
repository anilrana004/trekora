import { motion } from "motion/react";
import type { ReactNode } from "react";

/** White card shell used on trek/yatra detail tabs (Valley of Flowers pattern). */
export default function DetailTabPanel({
  tabKey,
  children,
  className = "",
}: {
  tabKey: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      key={tabKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-card ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
