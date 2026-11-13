import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { applyHead } from "../seo/applyHead";
import { site } from "../content/site";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Icon } from "./icons";

/** Header, footer and per-route side effects (head tags, scroll position). */
export function Layout() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useLayoutEffect(() => {
    applyHead(pathname);
    // First load: the browser handles scroll/anchors natively on the
    // prerendered HTML. After in-app navigation, start at the top or anchor.
    if (first.current) {
      first.current = false;
      return;
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    // jump, don't smooth-scroll, to the new page's start
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
        className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-bone text-2xl text-morio shadow-[0_10px_40px_-12px_rgb(0_0_0/0.6)] transition hover:scale-105 md:right-8 md:bottom-8"
      >
        <Icon name="whatsapp" />
      </a>
    </>
  );
}
