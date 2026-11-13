import { Link } from "react-router-dom";
import { mantra, nav, site } from "../content/site";
import { services } from "../content/services";
import { Icon } from "./icons";

const linkCls = "link-underline text-bone/90 hover:text-bone";

/** Footer with the original site's columns: mantra, The Morios, Talk to a Morio, Contact us. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="container-site grid gap-12 py-20 sm:grid-cols-2 md:py-24 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-3">
          <Link to="/" aria-label="Morio Studios, home" className="inline-block">
            <img src="/assets/brand/morio-logo-white.svg" alt="" width={1421} height={1263} loading="lazy" className="h-24 w-auto" />
          </Link>
          <p className="mt-6 font-display text-xl tracking-[0.08em] text-sage">“{mantra}”</p>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow mb-5">The Morios</h2>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow mb-5">Our Craft</h2>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={linkCls}>
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-5">Talk to a Morio</h2>
          <ul className="space-y-3 [overflow-wrap:anywhere]">
            {site.teamEmails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className={linkCls}>
                  {e}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow mb-5">Contact us</h2>
          <ul className="space-y-3">
            <li className="text-bone/90">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.countryName}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkCls} [overflow-wrap:anywhere]`}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.tel}`} className={linkCls}>
                {site.phone.display}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {site.socials.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="grid size-11 place-items-center rounded-full border border-line text-lg text-bone transition hover:border-bone">
                <Icon name="instagram" />
              </a>
            ))}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-line text-lg text-bone transition hover:border-bone">
              <Icon name="whatsapp" />
            </a>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <p aria-hidden="true" className="display pointer-events-none -mb-[0.18em] text-center text-[19vw] leading-none text-bone/[0.04] select-none">
        Morio Studios
      </p>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© Copyrights {new Date().getFullYear()} Morio Studios. All rights reserved.</p>
          <p>Nairobi, Kenya · Est. {site.founded}</p>
        </div>
      </div>
    </footer>
  );
}
