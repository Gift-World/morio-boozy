import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

/** Can this device comfortably run the WebGL hero? */
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
 * Home hero backdrop: a still render of the 3D scene paints immediately (fast,
 * works without JS); on capable devices the live scene loads after hydration
 * and cross-fades in once its first frame is drawn.
 */
export function HeroStage() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // let the page finish its first paint before pulling in three.js
    const id = window.setTimeout(() => setEnabled(canRun3D()), 150);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      <picture>
        <source media="(max-width: 767px)" srcSet="/assets/images/hero-3d-mobile.webp" />
        <img
          src="/assets/images/hero-3d.webp"
          alt=""
          fetchPriority="high"
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
