// Small, dependency-free replacements for the jQuery effects the original
// theme used (fadeOut, slideToggle, animate scrollTop). Timing and easing match
// jQuery defaults: 400ms with the "swing" curve.

export const swing = (p: number) => 0.5 - Math.cos(p * Math.PI) / 2;

export function tween(
  duration: number,
  step: (eased: number) => void,
  done?: () => void,
): () => void {
  let raf = 0;
  const start = performance.now();
  const frame = (now: number) => {
    const p = duration <= 0 ? 1 : Math.min(1, (now - start) / duration);
    step(swing(p));
    if (p < 1) raf = requestAnimationFrame(frame);
    else done?.();
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/** jQuery `.fadeOut(duration)` */
export function fadeOut(el: HTMLElement, duration = 400, done?: () => void) {
  const from = parseFloat(getComputedStyle(el).opacity) || 1;
  return tween(
    duration,
    (e) => {
      el.style.opacity = String(from * (1 - e));
    },
    () => {
      el.style.display = "none";
      el.style.opacity = "";
      done?.();
    },
  );
}

const SLIDE_PROPS = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"] as const;

/** jQuery `.slideToggle(duration)` */
export function slideToggle(el: HTMLElement, duration = 400) {
  const hidden = getComputedStyle(el).display === "none";
  const prevOverflow = el.style.overflow;
  if (hidden) el.style.display = "block";
  const cs = getComputedStyle(el);
  const full = Object.fromEntries(
    SLIDE_PROPS.map((p) => [p, p === "height" ? el.getBoundingClientRect().height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth) : parseFloat(cs[p])]),
  ) as Record<(typeof SLIDE_PROPS)[number], number>;
  el.style.overflow = "hidden";
  return tween(
    duration,
    (e) => {
      const k = hidden ? e : 1 - e;
      for (const p of SLIDE_PROPS) el.style[p] = `${full[p] * k}px`;
    },
    () => {
      for (const p of SLIDE_PROPS) el.style[p] = "";
      el.style.overflow = prevOverflow;
      el.style.display = hidden ? "block" : "none";
    },
  );
}

/** jQuery `$("html, body").animate({ scrollTop: 0 })` */
export function animateScrollTop(to: number, duration = 400) {
  const from = window.scrollY;
  return tween(duration, (e) => window.scrollTo(0, from + (to - from) * e));
}
