import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/three/examples/")) return "three-effects";
          if (id.includes("/three/build/three.core.js"))
            return "three-foundation";
          if (id.includes("/node_modules/three/")) return "three-core";
        },
      },
    },
  },
});
