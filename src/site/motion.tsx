import { useEffect, useRef, useState } from "react";

/**
 * Motion layer. Everything here is an enhancement for people who haven't
 * asked for reduced motion; the pages work the same without it.
 */

type LenisLike = { scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean; force?: boolean; offset?: number }) => void; raf: (t: number) => void; destroy: () => void };
let lenis: LenisLike | null = null;

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Jump or glide to a position/element, through the smooth scroller when it is running. */
export function scrollToTarget(target: number | HTMLElement, smooth = false) {
  // the offset keeps anchored sections clear of the floating menu
  if (lenis) lenis.scrollTo(target, { immediate: !smooth, force: true, offset: typeof target === "number" ? 0 : -88 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: smooth ? "smooth" : "instant" });
  else target.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
}

/**
 * Smooth, weighted wheel scrolling on desktop (mouse / trackpad). Phones keep
 * their native scrolling, which is already smooth and must not be overridden.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (calm() || !finePointer()) return;
    let raf = 0;
    let dead = false;
    void import("lenis").then(({ default: Lenis }) => {
      if (dead) return;
      const l = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: true });
      lenis = l as unknown as LenisLike;
      const loop = (t: number) => {
        l.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/**
 * Headings rise into place the first time they are seen. Only an attribute
 * is toggled (no DOM is rewritten); the hidden state is armed by the `motion`
 * class that index.html sets before first paint.
 */
export function useHeadingReveals(key: string) {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    const els = [...document.querySelectorAll<HTMLElement>("main :is(h1, h2).display:not([data-rise])")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.rise = "in";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/**
 * A small label that follows the pointer over anything marked
 * `data-cursor="View"` (projects) or `data-cursor="Play"` (films).
 */
export function CursorLabel() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (calm() || !finePointer()) return;
    const el = ref.current;
    if (!el) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let running = false;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(hit ? (hit.dataset.cursor ?? null) : null);
      if (hit && !running) {
        running = true;
        pos.x = target.x;
        pos.y = target.y;
        raf = requestAnimationFrame(tick);
      } else if (!hit && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const hide = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", hide, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", hide);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`theme-dark pointer-events-none fixed top-0 left-0 z-[65] grid size-20 place-items-center rounded-full bg-bone text-sm font-medium text-ink transition-[opacity,scale] duration-300 ${label ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
    >
      {label}
    </div>
  );
}

/**
 * Sets `--grow` (0 → 1) on an element as it travels up the screen; used to
 * let the hero video widen into its frame while you scroll.
 */
export function useGrowOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || calm()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - r.top) / (vh * 0.75), 0), 1);
      el.style.setProperty("--grow", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return ref;
}
