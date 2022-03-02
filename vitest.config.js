import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import config from "./svelte.config.js";

export default defineConfig({
  ...config.kit.vite,
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
