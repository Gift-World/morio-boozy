import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5175, strictPort: true },
  preview: { port: 4175, strictPort: true },
  build: {
    // Hashed bundles go to /static so they never collide with the public
    // URLs under /assets (images, og:image, video).
    assetsDir: "static",
  },
});
