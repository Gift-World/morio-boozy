import { Link } from "react-router-dom";
import { nav, site } from "../content/site";
import { services } from "../content/services";
import { Icon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-site grid gap-14 py-20 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="display text-display-md text-bone">
            Small agency,
            <br />
            <span className="text-spot">big ideas.</span>
          </p>
          <p className="mt-6 max-w-sm text-mute">
            A Nairobi creative collective of four Morios: ideas, design, film, photography and animation, from concept to
            execution.
          </p>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow mb-5">Studio</h2>
          <ul className="space-y-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-underline text-bone hover:text-spot">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow mb-5">Services</h2>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="link-underline text-bone hover:text-spot">
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow mb-5">Talk to a Morio</h2>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-bone hover:text-spot">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.tel}`} className="link-underline text-bone hover:text-spot">
                {site.phone.display}
              </a>
            </li>
            <li className="text-mute">
              {site.address.street}, {site.address.city}
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
                className="grid size-11 place-items-center rounded-full border border-line text-lg text-bone transition hover:border-spot hover:text-spot"
              >
                <Icon name="instagram" />
              </a>
            ))}
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="grid size-11 place-items-center rounded-full border border-line text-lg text-bone transition hover:border-spot hover:text-spot"
            >
              <Icon name="whatsapp" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Morio Studios. All rights reserved.</p>
          <p>Nairobi, Kenya · Est. {site.founded}</p>
        </div>
      </div>
    </footer>
  );
}
