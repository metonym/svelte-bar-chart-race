import { svelte } from "@sveltejs/vite-plugin-svelte";
import config from "./vite.config.js";

/** @type {import('vite').UserConfig} */
export default {
  ...config,
  plugins: [svelte({ hot: false })],
  test: {
    deps: {
      registerNodeLoader: false,
    },
    globals: true,
    environment: "jsdom",
  },
};
