import { sentryVitePlugin } from "@sentry/vite-plugin";
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    sentryVitePlugin({
      org: "sp3rzo",
      project: "javascript-react",
    }),
  ],

  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: ["./src/setup-tests"],
  // },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    sourcemap: true,
  },
});
