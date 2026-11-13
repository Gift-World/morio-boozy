import { useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { applyHead } from "../seo/applyHead";
import { site } from "../content/site";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Icon } from "./icons";

type DocWithVT = Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };

/**
 * Smooth page transitions: internal link clicks are wrapped in the View
 * Transitions API (cross-fade, plus shared-element morphs where two pages
 * name the same element). Browsers without it, and reduced-motion users,
 * navigate normally.
 */
function useViewTransitions() {
  const navigate = useNavigate();
  useEffect(() => {
    const doc = document as DocWithVT;
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname.startsWith("/assets/") || url.pathname.startsWith("/api/")) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same-page anchors
      e.preventDefault();
      doc.startViewTransition!(() => flushSync(() => navigate(url.pathname + url.search + url.hash)));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);
}

/** Header, footer and per-route side effects (head tags, scroll position). */
export function Layout() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useViewTransitions();

  useLayoutEffect(() => {
    applyHead(pathname);
    // First load: the browser handles scroll/anchors natively on the
    // prerendered HTML. After in-app navigation, start at the top or anchor.
    if (first.current) {
      first.current = false;
      return;
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-morio">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Morio Studios on WhatsApp"
        className="fixed right-5 bottom-5 z-40 grid size-13 place-items-center rounded-full bg-bone text-2xl text-morio shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)] transition hover:scale-105 md:right-8 md:bottom-8 md:size-14"
      >
        <Icon name="whatsapp" />
      </a>
    </>
  );
}
