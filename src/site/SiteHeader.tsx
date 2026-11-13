import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Photo } from "../components/Photo";
import { nav, site } from "../content/site";
import { Icon } from "./icons";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on navigation / Escape, lock scroll while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-18 items-center justify-between gap-6 md:h-22">
        <Link to="/" className="relative z-10 flex items-center gap-3" aria-label="Morio Studios, home">
          <Photo src="/assets/images/mr-logo2.png" alt="" sizes="64px" priority className="size-12 md:size-14" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-display text-[0.95rem] font-medium tracking-[0.14em] uppercase transition-colors hover:text-spot ${
                  isActive ? "text-spot" : "text-bone"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link to="/contact" className="btn-spot hidden px-5 py-2.5 text-sm sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-bone/25 text-lg text-bone transition hover:border-spot hover:text-spot lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-site flex h-full flex-col justify-between pt-28 pb-10">
          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {[{ label: "Home", to: "/" }, ...nav].map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `display text-6xl transition-all duration-700 sm:text-7xl ${isActive ? "text-spot" : "text-bone"} ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`
                }
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="space-y-4 text-mute">
            <a className="block text-xl text-bone" href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
              {site.email}
            </a>
            <a className="block text-xl text-bone" href={`tel:${site.phone.tel}`} tabIndex={open ? 0 : -1}>
              {site.phone.display}
            </a>
            <p className="eyebrow">Nairobi, Kenya</p>
          </div>
        </div>
      </div>
    </header>
  );
}
