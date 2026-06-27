/**
 * Vercel's serverless TypeScript pass may resolve `motion/react` without tsconfig paths.
 * Re-export framer-motion types so motion.* props (initial, animate, etc.) type-check everywhere.
 */
declare module "motion/react" {
  export * from "framer-motion";
}
