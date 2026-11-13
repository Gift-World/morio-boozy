// Prerender every route to static HTML so each URL ships its own <head>
// (title, meta, analytics) and visible markup, exactly like the old static
// pages, then hydrates into the React app.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, ROUTES, SITE, indexable } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const mark = (head) => head.replace(/<(meta|link|script)\b/g, "<$1 data-route-head");

for (const route of ROUTES) {
  const { html, title, head } = render(route);
  const page = template
    .replace("<!--app-head-->", `<title>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</title>\n${mark(head)}`)
    .replace("<!--app-html-->", html);
  const out = route === "/" ? "index.html" : route === "/404" ? "404.html" : `${route.slice(1)}/index.html`;
  fs.mkdirSync(path.dirname(path.join(dist, out)), { recursive: true });
  fs.writeFileSync(path.join(dist, out), page);
  console.log(`prerendered ${route} -> dist/${out}`);
}
// sitemap.xml + robots.txt from the same route list
const today = new Date().toISOString().slice(0, 10);
const urls = indexable
  .map((r) => `  <url>\n    <loc>${SITE}${r === "/" ? "/" : r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r === "/" ? "1.0" : "0.8"}</priority>\n  </url>`)
  .join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap.xml (${indexable.length} urls) + robots.txt`);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
