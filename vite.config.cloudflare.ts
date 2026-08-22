import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * Static Cloudflare Pages build. This excludes Manus runtime plugins and
 * bundles the Cloudflare-specific public assets into cloudflare-dist.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "cloudflare-public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "cloudflare-dist"),
    emptyOutDir: true,
  },
});
