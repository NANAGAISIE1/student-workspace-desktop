import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config.js";
import viteReact from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? "";

  return {
    root: resolve(__dirname, "src", "renderer"),
    mode,
    base: "./",
    build: {
      outDir: `../../.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), viteReact()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@main": resolve("src/main/"),
        "@renderer": resolve("src/renderer/"),
        "@shared": resolve("src/shared/"),
        "@amplify_outputs": resolve("src/amplify_outputs.json"),
        "@preload": resolve("src/preload/"),
      },
    },
    clearScreen: false,
  } as UserConfig;
});
