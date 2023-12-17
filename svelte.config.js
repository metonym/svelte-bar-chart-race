import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter(),
    files: {
      lib: "src",
      routes: "demo",
      appTemplate: "demo/_app.html",
    },
    alias: {
      "svelte-bar-chart-race": "src",
      $lib: "src",
      "$lib/*": "src/*",
    },
  },
};

export default config;
