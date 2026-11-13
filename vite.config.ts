import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { PurgeCSS } from "purgecss";

/**
 * Strips selectors the site never uses from the final CSS bundle (the legacy
 * theme ships ~600 KB for a whole template). Class names are taken from the
 * React sources; the safelist covers classes added at runtime by our widgets
 * and by AOS.
 */
function purgeUnusedCss(): Plugin {
  return {
    name: "purge-unused-css",
    apply: "build",
    async generateBundle(_opts, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || !file.fileName.endsWith(".css")) continue;
        const [result] = await new PurgeCSS().purge({
          content: ["index.html", "src/**/*.{ts,tsx}", "node_modules/aos/dist/aos.js"],
          css: [{ raw: String(file.source) }],
          // keep Tailwind-style names intact: md:size-20, bg-[#4c4c4e], w-1/2
          // (plus the plain word split, which catches names used in selectors
          // such as querySelector(".secHeading"))
          defaultExtractor: (content) => [
            ...(content.match(/[\w\-/:.[\]#%]+(?<!:)/g) ?? []),
            ...(content.match(/[\w-]+/g) ?? []),
          ],
          safelist: {
            standard: ["html", "body", "active", "cloned", "disabled", "center", "fixedHeader", "animated", "slideInDown", "disable-cursor", "page-404"],
            greedy: [/^owl-/, /^aos-/, /data-aos/, /^tp-/, /^rev/, /firstLine/, /secondLine/, /svg-icon/],
          },
          // keep everything that isn't a selector (fonts, keyframes, vars)
          fontFace: false,
          keyframes: false,
          variables: false,
        });
        file.source = result.css;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), purgeUnusedCss()],
  server: { port: 5175, strictPort: true },
  preview: { port: 4175, strictPort: true },
  build: {
    // Hashed bundles go to /static so they never collide with the legacy
    // public URLs under /assets (images, og:image, sitemap).
    assetsDir: "static",
  },
});
