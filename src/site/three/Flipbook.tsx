import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons";
import type { BookHandle } from "./BookScene";

/** Can this device show the WebGL book? (Everyone else gets a flat page viewer.) */
function canRun3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * A real publication you can page through. `pages` are the page images in
 * reading order (front cover first, back cover last, an even count). The 3D
 * scene and its images are only fetched when the book nears the screen.
 * Turn pages by clicking either half, dragging, the buttons or arrow keys.
 */
export function Flipbook({ pages, title }: { pages: string[]; title: string }) {
  const leaves = Math.ceil(pages.length / 2);
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const handle = useRef<BookHandle | null>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<"idle" | "3d" | "flat">("idle");
  const [ready, setReady] = useState(false);

  // start when the book is about a screen away
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setMode(canRun3D() ? "3d" : "flat");
      },
      { rootMargin: "80% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (mode !== "3d" || !canvas.current) return;
    let dead = false;
    void import("./BookScene")
      .then(({ createBook }) => {
        if (dead || !canvas.current) return;
        handle.current = createBook(canvas.current, pages, () => setReady(true));
      })
      .catch(() => setMode("flat"));
    return () => {
      dead = true;
      handle.current?.dispose();
      handle.current = null;
    };
  }, [mode, pages]);

  useEffect(() => handle.current?.setPage(page), [page]);

  const go = (d: number) => setPage((p) => Math.max(0, Math.min(leaves, p + d)));
  const label = page === 0 ? "Cover" : page === leaves ? "Back cover" : `Spread ${page} of ${leaves - 1}`;

  return (
    <div
      ref={host}
      role="group"
      aria-roledescription="publication"
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="theme-dark relative overflow-hidden rounded-3xl bg-gradient-to-b from-morio to-morio-deep outline-offset-4 md:rounded-[2.5rem]"
    >
      <div
        className="relative h-[58svh] min-h-[22rem] cursor-pointer touch-pan-y select-none md:h-[78svh]"
        data-cursor={mode === "3d" ? "Flip" : undefined}
        onPointerDown={(e) => (drag.current = { x: e.clientX, moved: false })}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 30) return go(dx < 0 ? 1 : -1); // swipe / drag
          const r = e.currentTarget.getBoundingClientRect();
          go(e.clientX - r.left > r.width / 2 ? 1 : -1); // click a side
        }}
      >
        {mode === "3d" && <canvas ref={canvas} aria-hidden="true" className={`absolute inset-0 size-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />}
        {mode === "flat" && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 p-5 md:p-10">
            {page > 0 && <img src={pages[page * 2 - 1]} alt="" loading="lazy" className="max-h-full min-w-0 shrink rounded-sm shadow-2xl" />}
            {page < leaves && <img src={pages[page * 2]} alt="" loading="lazy" className="max-h-full min-w-0 shrink rounded-sm shadow-2xl" />}
          </div>
        )}
        {mode === "3d" && !ready && <p className="absolute inset-0 grid place-items-center text-sm text-sage">Opening…</p>}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 pb-5 md:px-8 md:pb-7">
        <p aria-live="polite" className="text-sm font-medium text-bone tabular-nums">
          {label}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={page === 0} aria-label="Previous pages" className="grid size-11 place-items-center rounded-full border border-line text-bone transition hover:border-bone disabled:opacity-30">
            <Icon name="arrow" className="rotate-180" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={page === leaves} aria-label="Next pages" className="grid size-11 place-items-center rounded-full bg-bone text-ink transition hover:bg-mist disabled:opacity-30">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
