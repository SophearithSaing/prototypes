import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/three/")) {
            if (id.includes("/examples/")) return "three-addons";
            return id.includes("/build/three.core.js")
              ? "three-core"
              : "three-renderer";
          }
        },
      },
    },
  },
});
