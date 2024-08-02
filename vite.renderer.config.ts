import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";
import viteReact from "@vitejs/plugin-react";

import { resolve } from "path";

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
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), viteReact()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@renderer": resolve("src/renderer/"),
        "@renderer/components/ui": resolve("src/renderer/components/ui/"),
      },
    },
    clearScreen: false,
  } as UserConfig;
});
