import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "svelte-bar-chart-race": path.resolve("src"),
    },
  },
};

export default config;
