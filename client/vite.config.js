import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ["src/components"],
      dts: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      vueTemplate: true,
    }),
  ],
});
