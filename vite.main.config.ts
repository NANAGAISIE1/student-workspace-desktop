import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vite";
import { resolve } from 'node:path';
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
} from "./vite.base.config.js";

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"build">;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => "[name].js",
        formats: ["es"],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [pluginHotRestart("restart")],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ["module", "jsnext:main", "jsnext"],
      alias: {
        "@main": resolve("src/main/"),
        "@renderer": resolve("src/renderer/"),
        "@shared": resolve("src/shared/"),
        "@amplify_outputs": resolve("amplify_outputs.json"),
        "@preload": resolve("src/preload/"),
      },
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});
