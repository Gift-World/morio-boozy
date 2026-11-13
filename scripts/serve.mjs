// Serve dist/ the way Netlify does: pretty URLs (/about -> about/index.html),
// the .html redirects from netlify.toml, and 404.html with a 404 status.
// Usage: npm run serve  (after npm run build)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4175);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif",
  ".mp4": "video/mp4", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".eot": "application/vnd.ms-fontobject",
  ".xml": "application/xml", ".php": "text/plain", ".json": "application/json",
};
const REDIRECTS = { "/index.html": "/", "/service.html": "/service", "/about.html": "/about", "/team.html": "/team", "/contact.html": "/contact" };

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://x");
    const p = decodeURIComponent(url.pathname);
    if (REDIRECTS[p]) {
      res.writeHead(301, { Location: REDIRECTS[p] });
      return res.end();
    }
    const candidates = [p, path.join(p, "index.html"), p + ".html"];
    for (const c of candidates) {
      const f = path.join(dist, c);
      if (f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile()) {
        res.writeHead(200, { "Content-Type": TYPES[path.extname(f).toLowerCase()] || "application/octet-stream" });
        return fs.createReadStream(f).pipe(res);
      }
    }
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    fs.createReadStream(path.join(dist, "404.html")).pipe(res);
  })
  .listen(port, () => console.log(`serving dist on http://localhost:${port}`));
