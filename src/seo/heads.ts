// Per-route <head> content. Injected at build time by scripts/prerender.mjs
// and kept in sync on client-side navigation (seo/applyHead.ts).
import { site } from "../content/site";
import { services } from "../content/services";
import { breadcrumbSchema, businessSchema, jsonLd, serviceSchema, websiteSchema } from "./schema";

export const SITE = site.url;
const OG_IMAGE = `${SITE}/assets/images/og-image.jpg`;
const GA_ID = "G-TK8NVW26K5";

export interface RouteHead {
  title: string;
  head: string;
}

interface PageSeo {
  title: string;
  description: string;
  /** Keep out of search results (and the sitemap). */
  noindex?: boolean;
  /** Extra tags for this page only (structured data, verification). */
  extra?: string;
}

const crumbs = (...items: [string, string][]) =>
  breadcrumbSchema([["Home", "/"], ...items].map(([name, path]) => ({ name, path })));

/** Search-facing copy for each route. */
export const pages: Record<string, PageSeo> = {
  "/": {
    title: "Morio Studios | Creative Agency in Nairobi, Kenya – Branding, Film & Design",
    description:
      "Morio Studios is a Nairobi creative agency for branding, graphic design, film and documentaries, photography and animation. Small agency, big ideas.",
    extra:
      `<meta name="google-site-verification" content="jpTZ4wZbu8ALP-KbwI-2h_ZAu84MXVdyNiK4Dbs_Cvs">\n` +
      jsonLd(businessSchema(), websiteSchema()),
  },
  "/services": {
    title: "Creative Services in Nairobi – Branding, Film, Photography & Animation | Morio Studios",
    description:
      "Creative and art direction, branding and graphic design, films and documentaries, photography, animation and livestreaming from Morio Studios in Nairobi.",
    extra: jsonLd(crumbs(["Services", "/services"])),
  },
  ...Object.fromEntries(
    services.map((s) => [
      `/services/${s.slug}`,
      {
        title: s.seoTitle,
        description: s.metaDescription,
        extra: jsonLd(serviceSchema(s), crumbs(["Services", "/services"], [s.title, `/services/${s.slug}`])),
      },
    ]),
  ),
  "/work": {
    title: "Work – Branding, Packaging & Photography | Morio Studios Nairobi",
    description: "Selected brand identities, packaging, art direction and photography by Morio Studios, a creative agency in Nairobi, Kenya.",
    extra: jsonLd(crumbs(["Work", "/work"])),
  },
  "/about": {
    title: "About the Morios – Creative Agency in Nairobi | Morio Studios",
    description:
      "Meet the four Morios behind Morio Studios: a Nairobi creative collective blending ideation, creative direction, design, animation, photography and film.",
    extra: jsonLd(crumbs(["About", "/about"])),
  },
  "/contact": {
    title: "Contact Morio Studios – Creative Agency in Nairobi, Kenya",
    description:
      "Send a brief, call +254 718 704 926 or chat on WhatsApp to start your next branding, film, photography or animation project with Morio Studios in Nairobi.",
    extra: jsonLd(businessSchema(), crumbs(["Contact", "/contact"])),
  },
  "/404": {
    title: "Page not found | Morio Studios",
    description: "The page you are looking for doesn't exist. It may have been moved or removed.",
    noindex: true,
  },
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function build(path: string, p: PageSeo): RouteHead {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const tags = [
    `<meta name="description" content="${esc(p.description)}">`,
    `<meta name="author" content="Morio Studios">`,
    p.noindex ? `<meta name="robots" content="noindex, follow">` : `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Morio Studios">`,
    `<meta property="og:locale" content="en_KE">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Morio Studios – Small agency, big ideas.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32">`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
    p.extra ?? "",
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>`,
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>`,
  ];
  return { title: p.title, head: tags.filter(Boolean).join("\n") };
}

export const heads: Record<string, RouteHead> = Object.fromEntries(Object.entries(pages).map(([path, p]) => [path, build(path, p)]));

/** Routes that belong in sitemap.xml. */
export const indexable = Object.entries(pages)
  .filter(([, p]) => !p.noindex)
  .map(([path]) => path);
