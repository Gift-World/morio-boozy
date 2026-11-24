// schema.org structured data (JSON-LD) for local + service SEO.
import { site } from "../content/site";
import { services, type Service } from "../content/services";
import { team } from "../content/team";

const ORG_ID = `${site.url}/#organization`;
const LOGO = `${site.url}/assets/images/moriologo.jpeg`;

/** The studio as a local business (ProfessionalService ⊂ LocalBusiness). */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    slogan: site.tagline,
    url: `${site.url}/`,
    logo: LOGO,
    image: LOGO,
    email: site.email,
    telephone: site.phone.tel,
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Nairobi" },
      { "@type": "Country", name: "Kenya" },
      { "@type": "Place", name: "East Africa" },
    ],
    openingHours: site.hours.schema,
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
      })),
    },
    founder: team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, sameAs: [m.portfolio] })),
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.url}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Nairobi" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export const jsonLd = (...blocks: object[]) =>
  blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`).join("\n");
