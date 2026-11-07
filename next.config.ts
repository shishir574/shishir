import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/shishir"). Keep it empty locally.
const basePath = process.env.PAGES_BASE_PATH?.replace(/\/+$/, "") || undefined;

const nextConfig: NextConfig = {
  // GitHub Pages serves the app as static files.
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
