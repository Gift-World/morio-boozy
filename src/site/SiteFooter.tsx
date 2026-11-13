import { Link } from "react-router-dom";
import { labels, mantra, site } from "../content/site";
import { team } from "../content/team";
import { Icon } from "./icons";

/**
 * Footer with the original site's content (Talk to a Morio, The Morios,
 * Contact us, the mantra and copyright), redesigned: a big contact moment
 * first, then a calm information row.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-morio-deep text-bone">
      {/* Talk to a Morio */}
      <div className="container-site border-b border-line pt-24 pb-16 md:pt-32 md:pb-24">
        <p className="eyebrow mb-6">Hola</p>
        <h2 className="display text-display-xl">{labels.talkToAMorio}</h2>
        <ul className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 md:mt-16">
          {team.map((m) => (
            <li key={m.email}>
              <a href={`mailto:${m.email}`} className="group block border-b border-line pb-5">
                <span className="block text-sm text-sage">{m.shortName}</span>
                <span className="mt-1 flex items-center justify-between gap-4 font-display text-xl tracking-wide text-bone [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl">
                  {m.email}
                  <Icon name="arrow" className="shrink-0 -rotate-45 text-base text-sage transition group-hover:rotate-0 group-hover:text-bone" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`tel:${site.phone.tel}`} className="btn-ghost">
            <Icon name="phone" /> {site.phone.display}
          </a>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-ghost">
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </div>
      </div>

      {/* information row */}
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <Link to="/" aria-label="Morio Studios, home" className="inline-block">
            <img src="/assets/brand/morio-logo-white.svg" alt="" width={1421} height={1263} loading="lazy" className="h-20 w-auto md:h-24" />
          </Link>
          <p className="mt-5 font-display text-lg tracking-[0.12em] text-sage">“{mantra}”</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="eyebrow mb-5">The Morios</h2>
          <ul className="space-y-3 text-lg">
            {[
              { to: "/services", label: "Our Craft" },
              { to: "/about", label: labels.aboutUs },
              { to: "/", label: "Home" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-underline text-bone/90 hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <h2 className="eyebrow mb-5">{labels.contactUs}</h2>
          <address className="space-y-3 text-lg not-italic">
            <p className="text-bone/90">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.countryName}
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="link-underline text-bone/90 hover:text-bone">
                {site.email}
              </a>
            </p>
            <p>
              <a href={`tel:${site.phone.tel}`} className="link-underline text-bone/90 hover:text-bone">
                {site.phone.display}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Copyrights {new Date().getFullYear()}{" "}
            <Link to="/" className="text-bone/90 hover:text-bone">
              Morio Studios
            </Link>{" "}
            All rights reserved.
          </p>
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-bone">
                  <Icon name="instagram" /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
