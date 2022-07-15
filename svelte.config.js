import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter(),
    files: {
      lib: "src",
      routes: "demo",
      template: "demo/_app.html",
    },
    prerender: {
      default: true,
    },
  },
};

export default config;
