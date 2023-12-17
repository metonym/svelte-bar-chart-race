import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      [pkg.name]: path.resolve("src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
