import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

import { UserConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      vueDevTools(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 相对路径别名，使用@代替是src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        },
      },
    },
    // 服务器代理
    server: {
      proxy: {
        // 主 API 代理
        [env.VITE_APP_BASEURL]: {
          target: env.VITE_SERVER,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_APP_BASEURL}`), ""),
        },

        // Shanbay 每日一句
        "/api/dailysentence": {
          target: "https://apiv3.shanbay.com",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/dailysentence/, "/weapps/dailyquote/quote"),
        },
      },
    },
  };
});
