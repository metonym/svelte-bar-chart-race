/// <reference types="@sveltejs/kit" />
import { sveltekit } from "@sveltejs/kit/vite";
import path from "node:path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      [pkg.name]: path.resolve("src"),
    },
  },
});
