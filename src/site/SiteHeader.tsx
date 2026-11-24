import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, site } from "../content/site";
import { Icon } from "./icons";
import { scrollToTarget } from "./motion";

/**
 * Floating pill navigation: one light capsule that sits above every page
 * (light or dark sections alike), with the logo, the five original links and
 * the "Start a project" action.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [dark, setDark] = useState(false);

  // the saved look is applied before paint by a tiny script in index.html
  useEffect(() => setDark(document.documentElement.dataset.theme === "dark"), []);
  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0a1210" : "#fbf9f4");
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) doc.startViewTransition(apply);
    else apply();
    setDark(!dark);
    try {
      localStorage.setItem("morio-theme", next);
    } catch {
      /* private mode: the choice just lasts for this visit */
    }
  };

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
    <header className="vt-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-3.5">
      <div
        className={`pointer-events-auto relative z-10 mx-auto flex h-12 max-w-4xl items-center justify-between gap-3 rounded-full border border-line bg-ink/95 pr-1.5 pl-4 shadow-[0_6px_24px_-14px_rgb(0_0_0/0.35)] backdrop-blur-xl transition-shadow duration-500 md:h-[3.25rem] md:pl-5 ${
          scrolled && !open ? "shadow-[0_12px_40px_-18px_rgb(18_48_44/0.45)]" : ""
        }`}
      >
        <Link to="/" className="block shrink-0" aria-label="Morio Studios, home">
          <img src="/assets/brand/morio-logo-green.svg" alt="" width={1421} height={1263} className="only-light h-8 w-auto md:h-9" />
          <img src="/assets/brand/morio-logo-white.svg" alt="" width={1421} height={1263} className="only-dark h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${isActive ? "bg-bone/8 text-bone" : "text-bone/70 hover:text-bone"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light look" : "Switch to dark look"}
            title={dark ? "Light look" : "Dark look"}
            className="grid size-9 place-items-center rounded-full text-bone/70 transition hover:bg-bone/8 hover:text-bone"
          >
            <Icon name={dark ? "sun" : "moon"} />
          </button>
          <Link
            to="/contact#start-a-project"
            onClick={(e) => {
              // already on Hola: just glide to "Start a project"
              if (pathname !== "/contact") return;
              e.preventDefault();
              setOpen(false);
              const el = document.getElementById("start-a-project");
              if (el) scrollToTarget(el, true);
            }}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-bone px-4 text-sm font-medium text-ink transition hover:bg-mist"
          >
            Start a project <Icon name="arrow" className="hidden sm:inline" />
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line text-bone transition hover:border-bone md:hidden"
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
      <div id="mobile-menu" className={`pointer-events-auto fixed inset-0 bg-ink transition-[opacity,visibility] duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="container-site flex h-full flex-col justify-between overflow-y-auto pt-28 pb-10">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `display text-4xl leading-[1.25] transition-all duration-700 sm:text-5xl ${isActive ? "text-bone" : "text-bone/45"} ${
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
