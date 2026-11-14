import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, site } from "../content/site";
import { Icon } from "./icons";

/**
 * Floating pill navigation: one light capsule that sits above every page
 * (light or dark sections alike), with the logo, the five original links and
 * the "Start a brief" action.
 */
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

  return (
    <header className="vt-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`pointer-events-auto relative z-10 mx-auto flex h-15 max-w-5xl items-center justify-between gap-4 rounded-full border border-line bg-ink/85 pr-2 pl-5 backdrop-blur-xl transition-shadow duration-500 md:h-16 md:pl-6 ${
          scrolled && !open ? "shadow-[0_12px_40px_-18px_rgb(18_48_44/0.45)]" : ""
        }`}
      >
        <Link to="/" className="block shrink-0" aria-label="Morio Studios, home">
          <img src="/assets/brand/morio-logo-green.svg" alt="" width={1421} height={1263} className="h-10 w-auto md:h-11" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${isActive ? "bg-bone/8 text-bone" : "text-bone/70 hover:text-bone"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact#brief-builder"
            onClick={(e) => {
              // already on Hola: just glide to the Brief Builder
              if (pathname !== "/contact") return;
              e.preventDefault();
              setOpen(false);
              document.getElementById("brief-builder")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-[0.95rem] font-medium text-ink transition hover:bg-mist"
          >
            Start a brief <Icon name="arrow" className="hidden sm:inline" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line text-lg text-bone transition hover:border-bone lg:hidden"
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
      <div id="mobile-menu" className={`pointer-events-auto fixed inset-0 bg-ink transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="container-site flex h-full flex-col justify-between overflow-y-auto pt-28 pb-10">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `display text-[3.4rem] leading-[1.05] transition-all duration-700 sm:text-7xl ${isActive ? "text-bone" : "text-bone/45"} ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`
                }
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 space-y-3 text-sage">
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
