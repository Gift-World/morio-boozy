import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

/** Can this device comfortably run the WebGL scene? */
function canRun3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Backdrop for the 3D lit logo. A still render paints first (fast, works
 * without JS). On capable devices three.js is fetched only when the section
 * comes within a screen of the viewport, then cross-fades in.
 */
export function LitStage() {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || !canRun3D()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEnabled(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <picture>
        <source media="(max-width: 767px)" srcSet="/assets/images/lit-3d-mobile.webp" />
        <img
          src="/assets/images/lit-3d.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </picture>
      {enabled && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Suspense fallback={null}>
            <HeroScene onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
