import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import config from "./vite.config.js";

export default defineConfig({
  ...config,
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
