import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "./Preloader";
import { Header, type HeaderConfig } from "./Header";
import { BackToTop } from "./BackToTop";
import { MagicCursor } from "./MagicCursor";
import { applyHead } from "../../seo/applyHead";

gsap.defaults({ overwrite: "auto" });
gsap.registerPlugin(ScrollTrigger);

let aosStarted = false;
let initialLoad = typeof window !== "undefined";

export interface PageShellProps {
  header: HeaderConfig;
  /** data-border-color of the back-to-top button (differed per page). */
  backToTopColor: string;
  bodyClass?: string;
  children: ReactNode;
}

/**
 * Everything the original pages re-ran on every full page load: preloader,
 * header, AOS, GSAP scroll effects, back-to-top and the custom cursor.
 * Rendered once per route (keyed by pathname) so behaviour per page matches.
 */
export function PageShell({ header, backToTopColor, bodyClass, children }: PageShellProps) {
  const { pathname, hash } = useLocation();

  // Head tags + body class
  useLayoutEffect(() => {
    applyHead(pathname);
    if (bodyClass) document.body.classList.add(bodyClass);
    return () => {
      if (bodyClass) document.body.classList.remove(bodyClass);
    };
  }, [pathname, bodyClass]);

  // A fresh page starts at the top, or at its #anchor. On the very first load
  // the browser does this natively on the prerendered HTML, exactly as it did
  // for the static pages; after in-app navigation we do it ourselves and keep
  // the anchor aligned while images above it load (until the user scrolls).
  useLayoutEffect(() => {
    const first = initialLoad;
    initialLoad = false;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!target) {
      if (!first) window.scrollTo(0, 0);
      return;
    }
    let userScrolled = false;
    const align = () => {
      if (!userScrolled) target.scrollIntoView();
    };
    const onUser = () => (userScrolled = true);
    const onLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) align();
    };
    const opts = { passive: true } as const;
    window.addEventListener("wheel", onUser, opts);
    window.addEventListener("touchmove", onUser, opts);
    window.addEventListener("keydown", onUser);
    if (first) {
      // Browser already jumped natively; settle on the anchor once the page
      // has fully loaded, as the static pages ended up doing.
      if (document.readyState === "complete") align();
      else window.addEventListener("load", align, { once: true });
    } else {
      align();
      document.addEventListener("load", onLoad, true);
    }
    const cleanup = () => {
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchmove", onUser);
      window.removeEventListener("keydown", onUser);
      window.removeEventListener("load", align);
      document.removeEventListener("load", onLoad, true);
    };
    const stop = window.setTimeout(cleanup, 15000);
    return () => {
      window.clearTimeout(stop);
      cleanup();
    };
  }, [pathname, hash]);

  // AOS (disabled on mobile, as before)
  useEffect(() => {
    if (!aosStarted) {
      AOS.init({ disable: "mobile" });
      aosStarted = true;
    } else {
      AOS.refreshHard();
    }
  }, [pathname]);

  // GSAP ScrollTrigger effects from common.js
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".secHeading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 30%", scrub: 1 },
          stagger: 0.4,
          opacity: 1,
          scale: 1,
          y: 80,
          duration: 0.2,
        });
      });
      if (document.querySelector(".testimonial01Wrapper")) {
        gsap.from(".testimonial01Wrapper", {
          scrollTrigger: { trigger: ".testimonial01Wrapper", start: "top 90%", end: "bottom 30%", scrub: 1 },
          opacity: 0.5,
          scale: 1.1,
          duration: 0.2,
        });
      }
    });
    // Positions change as images load; the multi-page site got this refresh
    // from the window load event.
    let t = 0;
    const onAssetLoad = (e: Event) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        ScrollTrigger.refresh();
        AOS.refresh();
      }, 100);
    };
    document.addEventListener("load", onAssetLoad, true);
    return () => {
      document.removeEventListener("load", onAssetLoad, true);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <>
      <Preloader />
      <div className="main myScroller">
        <Header config={header} />
        {children}
      </div>
      <BackToTop borderColor={backToTopColor} />
      <MagicCursor />
    </>
  );
}
