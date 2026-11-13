import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

/*
 * React port of the subset of Owl Carousel 2.3.4 the site uses: responsive
 * items, margin, loop (with clones), autoplay, prev/next nav, dots and
 * mouse/touch dragging. It renders the exact DOM Owl generates
 * (.owl-stage-outer > .owl-stage > .owl-item ...) so the theme's carousel
 * styles apply unchanged, and the maths below mirrors Owl's source so slide
 * widths, positions and timings match.
 */

export interface OwlOptions {
  items?: number;
  margin?: number;
  loop?: boolean;
  nav?: boolean;
  dots?: boolean;
  autoplay?: boolean;
  autoplayTimeout?: number;
  smartSpeed?: number;
  navText?: [ReactNode, ReactNode];
  responsive?: Record<number, Partial<OwlOptions>>;
}

type Settings = Required<Omit<OwlOptions, "responsive">>;

const DEFAULTS: Settings = {
  items: 3,
  margin: 0,
  loop: false,
  nav: false,
  dots: true,
  autoplay: false,
  autoplayTimeout: 5000,
  smartSpeed: 250,
  navText: [<span aria-label="Previous">‹</span>, <span aria-label="Next">›</span>],
};

function resolveSettings(options: OwlOptions, viewport: number): Settings {
  const { responsive, ...base } = options;
  let bp = -1;
  for (const key of Object.keys(responsive ?? {})) {
    const n = Number(key);
    if (n <= viewport && n > bp) bp = n;
  }
  return { ...DEFAULTS, ...base, ...(bp >= 0 ? responsive![bp] : {}) } as Settings;
}

/**
 * Owl's `.width()` as computed by jQuery 2.2.4: the integer `offsetWidth`
 * minus padding and border (so whole pixels, not fractional layout widths).
 */
function contentWidth(el: HTMLElement) {
  const cs = getComputedStyle(el);
  return (
    el.offsetWidth -
    parseFloat(cs.paddingLeft) -
    parseFloat(cs.paddingRight) -
    parseFloat(cs.borderLeftWidth) -
    parseFloat(cs.borderRightWidth)
  );
}

interface Layout {
  s: Settings;
  /** Owl's width(): element width + margin */
  width: number;
  n: number;
  /** clone source indexes, in Owl's interleaved order */
  clones: number[];
  /** stage children as original item indexes */
  order: { item: number; cloned: boolean }[];
  itemWidth: number;
  coords: number[];
  stageWidth: number;
  pages: { start: number; end: number }[];
}

function computeLayout(s: Settings, n: number, width: number): Layout {
  const normalizeRel = (a: number) => (a < 0 || a >= n ? ((a % n) + n) % n : a);
  // clones
  const clones: number[] = [];
  const view = Math.max(2 * s.items, 4);
  const size = 2 * Math.ceil(n / 2);
  let repeat = s.loop && n ? Math.max(view, size) / 2 : 0;
  const append: number[] = [];
  const prepend: number[] = [];
  while (repeat > 0) {
    clones.push(normalizeRel(clones.length / 2));
    append.push(clones[clones.length - 1]);
    clones.push(normalizeRel(n - 1 - (clones.length - 1) / 2));
    prepend.unshift(clones[clones.length - 1]);
    repeat -= 1;
  }
  const order = [
    ...prepend.map((item) => ({ item, cloned: true })),
    ...Array.from({ length: n }, (_, item) => ({ item, cloned: false })),
    ...append.map((item) => ({ item, cloned: true })),
  ];
  // widths & coordinates (stagePadding is always 0 here)
  const fullWidth = width + s.margin;
  const itemWidth = Number((fullWidth / s.items).toFixed(3)) - s.margin;
  const coords: number[] = [];
  for (let c = 0; c < order.length; c++) coords.push((coords[c - 1] || 0) - (itemWidth + s.margin));
  const stageWidth = Math.ceil(Math.abs(coords[coords.length - 1] ?? 0));
  // pages (navigation plugin)
  const lower = clones.length / 2;
  const upper = lower + n;
  const max = maximum(s, n, clones.length, coords.length, true);
  const pageSize = s.items;
  const pages: Layout["pages"] = [];
  for (let a = lower, b = 0; a < upper; a++) {
    if (b >= pageSize || b === 0) {
      pages.push({ start: Math.min(max, a - lower), end: a - lower + pageSize - 1 });
      if (Math.min(max, a - lower) === max) break;
      b = 0;
    }
    b += 1;
  }
  return { s, n, width: fullWidth, clones, order, itemWidth, coords, stageWidth, pages };
}

function maximum(s: Settings, n: number, clonesLen: number, coordsLen: number, relative = false) {
  let f = coordsLen;
  if (s.loop) f = clonesLen / 2 + n - 1;
  else f = n - s.items;
  if (relative) f -= clonesLen / 2;
  return Math.max(f, 0);
}

export function OwlCarousel({
  className,
  options,
  children,
}: {
  className: string;
  options: OwlOptions;
  children: ReactNode;
}) {
  const items = useMemo(() => Children.toArray(children).filter(isValidElement) as ReactElement[], [children]);
  const n = items.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Not initialised on the server / first paint: Owl's CSS hides
  // `.owl-carousel` until `.owl-loaded`, exactly like before the jQuery init.
  const [layout, setLayout] = useState<Layout | null>(null);
  const [current, setCurrent] = useState(0);
  const [speed, setSpeed] = useState(0);
  const animating = useRef(false);
  const [dragX, setDragX] = useState<number | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const state = useRef({ layout, current });
  state.current = { layout, current };

  const measure = useCallback(() => {
    const root = rootRef.current!;
    const s = resolveSettings(options, window.innerWidth);
    return computeLayout(s, n, contentWidth(root));
  }, [options, n]);

  // init + responsive refresh (Owl throttles resize by 200ms)
  useLayoutEffect(() => {
    const L = measure();
    setLayout(L);
    setCurrent(L.clones.length / 2);
    setSpeed(0);
    let timer = 0;
    let lastWidth = contentWidth(rootRef.current!);
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const w = contentWidth(rootRef.current!);
        if (w === lastWidth) return;
        lastWidth = w;
        const prev = state.current;
        const next = measure();
        // keep the same logical item in view, like Owl's refresh
        const rel = prev.layout ? relative(prev.layout, prev.current) : 0;
        setLayout(next);
        setSpeed(0);
        setCurrent(clamp(next, rel + next.clones.length / 2));
      }, 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, [measure]);

  const to = useCallback((target: number, speedOverride?: number) => {
    const { layout: L, current: c0 } = state.current;
    if (!L) return;
    const { s, n } = L;
    let c = c0;
    let a = target;
    let e = a - relative(L, c);
    const f = (e > 0 ? 1 : 0) - (e < 0 ? 1 : 0);
    const h = L.clones.length / 2;
    const i = maximum(s, n, L.clones.length, L.coords.length);
    if (s.loop) {
      if (Math.abs(e) > n / 2) e += -1 * f * n;
      a = c + e;
      const d = ((((a - h) % n) + n) % n) + h;
      if (d !== a && d - e <= i && d - e > 0) {
        c = d - e;
        a = d;
        // jump without animation to the equivalent position, then animate
        flushSync(() => {
          setSpeed(0);
          setCurrent(c);
        });
        void stageRef.current?.offsetWidth;
      }
    } else {
      a = Math.max(h, Math.min(i, a));
    }
    const duration = speedOverride === 0 ? 0 : Math.min(Math.max(Math.abs(a - c), 1), 6) * Math.abs(speedOverride || s.smartSpeed);
    animating.current = duration > 0;
    setSpeed(duration);
    setCurrent(a);
  }, []);

  const next = useCallback(() => {
    const { layout: L, current: c } = state.current;
    if (L) to(relative(L, c) + 1);
  }, [to]);
  const prev = useCallback(() => {
    const { layout: L, current: c } = state.current;
    if (L) to(relative(L, c) - 1);
  }, [to]);

  // autoplay (Owl's drift-corrected timer)
  const dragging = useRef(false);
  useEffect(() => {
    if (!layout?.s.autoplay) return;
    const timeout = layout.s.autoplayTimeout;
    const started = Date.now();
    let call = 0;
    const read = () => Date.now() - started;
    const tick = () => {
      call = window.setTimeout(tick, timeout * (Math.round(read() / timeout) + 1) - read());
      if (!dragging.current && !document.hidden) next();
    };
    call = window.setTimeout(tick, timeout);
    return () => window.clearTimeout(call);
  }, [layout?.s.autoplay, layout?.s.autoplayTimeout, next]);

  // mouse / touch drag
  const onDragStart = (ev: React.MouseEvent | React.TouchEvent) => {
    const L = state.current.layout;
    if (!L || ("button" in ev && ev.button === 2)) return;
    const stage = stageRef.current!;
    const m = getComputedStyle(stage).transform.replace(/.*\(|\)| /g, "").split(",");
    const startX = Number(m[m.length === 16 ? 12 : 4]) || 0;
    if (animating.current) {
      animating.current = false;
      setSpeed(0);
      setDragX(startX);
    }
    const isMouse = ev.type === "mousedown";
    if (isMouse) setGrabbing(true);
    const point = (e: MouseEvent | TouchEvent) => ("touches" in e ? (e.touches[0] ?? e.changedTouches[0]) : e);
    const p0 = point(ev.nativeEvent as MouseEvent | TouchEvent);
    const time = Date.now();
    let current = startX;
    let decided = false;
    let isDragging = false;
    const target = ev.target as HTMLElement;

    const move = (e: MouseEvent | TouchEvent) => {
      const p = point(e);
      const dx = p0.clientX - p.clientX;
      const dy = p0.clientY - p.clientY;
      if (!decided) {
        decided = true;
        if (!(Math.abs(dx) < Math.abs(dy))) {
          e.preventDefault();
          isDragging = true;
          dragging.current = true;
        }
      }
      if (!isDragging) return;
      e.preventDefault();
      let x = startX - dx;
      if (L.s.loop) {
        const b = coordinate(L, L.clones.length / 2);
        const c = coordinate(L, maximum(L.s, L.n, L.clones.length, L.coords.length) + 1) - b;
        x = ((((x - b) % c) + c) % c) + b;
      } else {
        const b = coordinate(L, L.clones.length / 2);
        const c = coordinate(L, maximum(L.s, L.n, L.clones.length, L.coords.length));
        const pull = (-1 * dx) / 5;
        x = Math.max(Math.min(x, b + pull), c + pull);
      }
      current = x;
      setSpeed(0);
      setDragX(x);
    };
    const end = (e: MouseEvent | TouchEvent) => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("touchmove", move);
      document.removeEventListener("mouseup", end);
      document.removeEventListener("touchend", end);
      setGrabbing(false);
      const p = point(e);
      const dx = p0.clientX - p.clientX;
      if (dx !== 0 && isDragging) {
        const dir = dx > 0 ? "left" : "right";
        setDragX(null);
        animating.current = true;
        setSpeed(L.s.smartSpeed);
        setCurrent(closest(L, current, dir));
        if (Math.abs(dx) > 3 || Date.now() - time > 300) {
          target.addEventListener("click", (c) => c.preventDefault(), { once: true, capture: true });
        }
      } else {
        setDragX(null);
      }
      dragging.current = false;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("mouseup", end);
    document.addEventListener("touchend", end);
  };

  if (!layout) {
    return (
      <div className={className} ref={rootRef}>
        {items}
      </div>
    );
  }

  const L = layout;
  const x = dragX ?? coordinate(L, current);
  const actives = activeIndexes(L, current);
  const rel = relative(L, current);
  const tooFew = L.n <= L.s.items;
  const loopish = L.s.loop;
  const activePage = L.pages.reduce((acc, p, i) => (p.start <= rel && p.end >= rel ? i : acc), -1);

  return (
    <div className={`${className} owl-loaded owl-drag${grabbing ? " owl-grab" : ""}`} ref={rootRef}>
      <div className="owl-stage-outer">
        <div
          className="owl-stage"
          ref={stageRef}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          onDragStart={(e) => e.preventDefault()}
          style={{
            transform: `translate3d(${x}px, 0px, 0px)`,
            transition: `all ${speed / 1000}s ease 0s`,
            width: `${L.stageWidth}px`,
          }}
          onTransitionEnd={(e) => {
            if (e.target === stageRef.current) animating.current = false;
          }}
        >
          {L.order.map(({ item, cloned }, idx) => (
            <div
              key={`${cloned ? "c" : "o"}${idx}`}
              className={`owl-item${cloned ? " cloned" : ""}${actives.has(idx) ? " active" : ""}`}
              style={{ width: `${L.itemWidth}px`, marginRight: L.s.margin ? `${L.s.margin}px` : undefined }}
            >
              {cloned ? cloneElement(items[item], { key: undefined }) : items[item]}
            </div>
          ))}
        </div>
      </div>
      <div className={`owl-nav${!L.s.nav || tooFew ? " disabled" : ""}`}>
        <button
          type="button"
          role="presentation"
          className={`owl-prev${L.s.nav && !loopish && rel <= 0 ? " disabled" : ""}`}
          onClick={prev}
        >
          {L.s.navText[0]}
        </button>
        <button
          type="button"
          role="presentation"
          className={`owl-next${L.s.nav && !loopish && rel >= maximum(L.s, L.n, L.clones.length, L.coords.length, true) ? " disabled" : ""}`}
          onClick={next}
        >
          {L.s.navText[1]}
        </button>
      </div>
      <div className={`owl-dots${!L.s.dots || tooFew ? " disabled" : ""}`}>
        {L.s.dots &&
          L.pages.map((p, i) => (
            <button key={i} role="button" className={`owl-dot${i === activePage ? " active" : ""}`} onClick={() => to(p.start)}>
              <span />
            </button>
          ))}
      </div>
    </div>
  );
}

function relative(L: Layout, i: number) {
  const a = i - L.clones.length / 2;
  return L.n ? ((a % L.n) + L.n) % L.n : 0;
}
function clamp(L: Layout, i: number) {
  return Math.max(L.clones.length / 2, Math.min(maximum(L.s, L.n, L.clones.length, L.coords.length), i));
}
function coordinate(L: Layout, i: number) {
  return Math.ceil(L.coords[i - 1] || 0);
}
function activeIndexes(L: Layout, current: number) {
  const g = coordinate(L, current);
  const h = g - L.width;
  const set = new Set<number>();
  for (let c = 0; c < L.coords.length; c++) {
    const a = L.coords[c - 1] || 0;
    const b = Math.abs(L.coords[c]);
    if ((a <= g && a > h) || (-b < g && -b > h)) set.add(c);
  }
  return set;
}
function closest(L: Layout, x: number, dir: "left" | "right") {
  const pull = 30;
  const view = L.width;
  const coords = L.coords.map((_, i) => coordinate(L, i));
  let e = -1;
  for (let a = 0; a < coords.length; a++) {
    const i = coords[a];
    if (dir === "left" && x > i - pull && x < i + pull) e = a;
    else if (dir === "right" && x > i - view - pull && x < i - view + pull) e = a + 1;
    else if (x < i && x > (coords[a + 1] !== undefined ? coords[a + 1] : i - view)) e = dir === "left" ? a + 1 : a;
    if (e !== -1) break;
  }
  if (!L.s.loop) {
    const min = L.clones.length / 2;
    const max = maximum(L.s, L.n, L.clones.length, L.coords.length);
    if (x > coords[min]) e = min;
    else if (x < coords[max]) e = max;
  }
  return e === -1 ? L.clones.length / 2 : e;
}
