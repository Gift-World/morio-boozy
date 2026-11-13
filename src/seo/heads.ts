// Per-route <head> content. Injected at build time by scripts/prerender.mjs
// and kept in sync on client-side navigation (seo/applyHead.ts).

export const SITE = "https://moriostudios.africa";
const OG_IMAGE = `${SITE}/assets/images/moriologo.jpeg`;
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
  /** Extra tags for this page only. */
  extra?: string;
}

/** Search-facing copy for each route. */
export const pages: Record<string, PageSeo> = {
  "/": {
    title: "Morio Studios | Creative Agency in Nairobi, Kenya – Branding, Film & Design",
    description:
      "Morio Studios is a Nairobi creative agency for branding, graphic design, film and documentaries, photography and animation. Small agency, big ideas.",
    extra:
      `<meta name="google-site-verification" content="jpTZ4wZbu8ALP-KbwI-2h_ZAu84MXVdyNiK4Dbs_Cvs">\n` +
      `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Morio Studios",
        url: SITE,
        logo: OG_IMAGE,
        sameAs: ["https://www.instagram.com/moriostudios/"],
      })}</script>`,
  },
  "/service": {
    title: "Our Craft – Branding, Film, Photography & Animation | Morio Studios",
    description:
      "Creative and art direction, graphic design and branding, films and documentaries, photography and illustration, animation and livestreaming from Morio Studios in Nairobi.",
  },
  "/about": {
    title: "About the Morios – Creative Agency in Nairobi | Morio Studios",
    description:
      "Meet the four Morios behind Morio Studios: a Nairobi creative collective blending ideation, creative direction, design, animation, photography and film.",
  },
  "/team": {
    title: "Team | Morio Studios",
    description: "The team behind Morio Studios, a creative agency in Nairobi, Kenya.",
    // Still template content (placeholder roles and client logos).
    noindex: true,
  },
  "/contact": {
    title: "Contact Morio Studios – Creative Agency in Nairobi, Kenya",
    description:
      "Talk to a Morio. Call +254 718 704 926 or email the team to start your next branding, film, photography or animation project in Nairobi.",
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
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${esc(p.title)}">`,
    `<meta name="twitter:description" content="${esc(p.description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
    `<link rel="icon" type="image/jpeg" href="/assets/images/moriologo.jpeg">`,
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
