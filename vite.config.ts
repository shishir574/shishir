import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages base path.
 *
 * - User site (repo named `shishir574.github.io`): base is `/`.
 * - Project site (e.g. repo `shishir`): base is `/shishir/`.
 *
 * The workflow passes the value reported by actions/configure-pages, so the
 * same build works for both layouts without hardcoding the repository name.
 */
function resolveBase(): string {
  const raw = process.env.PAGES_BASE_PATH?.trim();
  if (!raw || raw === "/") return "/";
  const trimmed = raw.replace(/^\/+|\/+$/g, "");
  return `/${trimmed}/`;
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    restoreMocks: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
