import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { loadTrekoraEnv } from "../../backend/lib/load-env.js";
import { emailApiPlugin } from "./vite-plugin-email-api.mjs";

loadTrekoraEnv();

const ii_url =
  process.env.DFX_NETWORK === "local"
    ? `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:8081/`
    : `https://identity.internetcomputer.org/`;

process.env.II_URL = process.env.II_URL || ii_url;
if (process.env.STORAGE_GATEWAY_URL === undefined) {
  process.env.STORAGE_GATEWAY_URL = "";
}

export default defineConfig({
  logLevel: "info",
  envDir: "..",
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash][extname]",
        manualChunks: {
          core: ["react", "react-dom"],
          nav: ["@tanstack/react-router"],
          data: ["@tanstack/react-query"],
          motion: ["framer-motion"],
          icons: ["lucide-react"],
          charts: ["recharts"],
          maps: ["leaflet"],
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    // Prefer IPv4 so "localhost" matches what many Windows setups expect.
    host: "127.0.0.1",
    // If 5173 is busy (old Vite tabs), Vite tries the next port — `--open` uses the real URL.
    port: 5173,
    strictPort: false,
    open: true,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
    },
    fs: {
      deny: [".env", ".env.*", "env.json"],
    },
    proxy: {
      "^/api/v1/weather": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
      "^/api/weather": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
      // ICP canister API only — email routes handled by vite-plugin-email-api
      "^/api/(?!booking|callback|corporate-quote|query|vouchers|giftcards|reviews|gallery|product-photos|weather|blogs)": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    environment(["II_URL"]),
    environment(["STORAGE_GATEWAY_URL"]),
    emailApiPlugin(),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "@trekora/icp",
        replacement: fileURLToPath(
          new URL("./node_modules/@caffeineai/core-infrastructure", import.meta.url),
        ),
      },
      {
        find: "declarations",
        replacement: fileURLToPath(new URL("../declarations", import.meta.url)),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
    dedupe: ["@dfinity/agent"]
  },
});
