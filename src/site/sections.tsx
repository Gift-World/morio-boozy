import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { homeCopy, labels, mantra, morioisms } from "../content/site";
import { homeTeam } from "../content/team";
import type { Project } from "../content/work";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";
import { LitStage } from "./three/HeroStage";

/** Section heading with optional eyebrow and link (labels from the original site). */
export function SectionHead({ eyebrow, title, link }: { eyebrow?: string; title: ReactNode; link?: { to: string; label: string } }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="display max-w-4xl text-display-md text-bone">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="btn-ghost self-start md:self-auto">
          {link.label} <Icon name="arrow" />
        </Link>
      )}
    </Reveal>
  );
}

/** The five crafts as listed on the original home page, with the original icons. */
export function HomeCraftList() {
  return (
    <ul className="border-t border-line">
      {homeCopy.crafts.map((c, i) => (
        <Reveal as="li" key={c.slug} delay={i * 50} className="border-b border-line">
          <Link to={`/services/${c.slug}`} className="group flex items-center gap-5 py-6 md:gap-8 md:py-8">
            <Photo src={c.icon} alt="" sizes="intrinsic" className="size-10 shrink-0 object-contain opacity-80 transition group-hover:opacity-100 md:size-12" />
            <span className="display text-[1.9rem] leading-none text-bone transition duration-500 group-hover:translate-x-2 sm:text-4xl md:text-6xl">{c.label}</span>
            <span className="ml-auto grid size-11 shrink-0 place-items-center rounded-full border border-line text-bone transition duration-300 group-hover:rotate-45 group-hover:border-bone group-hover:bg-bone group-hover:text-morio md:size-14">
              <Icon name="arrow" className="rotate-90" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

const SPAN = { wide: "sm:col-span-2", tall: "sm:row-span-2" } as const;

/** Project tiles; the cover morphs into the project page hero on navigation. */
export function ProjectGrid({ items, shapes = true, cols = 3 }: { items: Project[]; shapes?: boolean; cols?: 2 | 3 }) {
  return (
    <ul className={`grid grid-flow-dense auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[18rem] lg:gap-5 ${cols === 3 ? "lg:grid-cols-3 lg:auto-rows-[21rem]" : "sm:auto-rows-[22rem] lg:auto-rows-[30rem]"}`}>
      {items.map((p, i) => (
        <Reveal as="li" key={p.slug} delay={(i % 3) * 80} className={`${shapes && p.span ? SPAN[p.span] : ""}`}>
          <Link to={`/work/${p.slug}`} className="group relative block size-full overflow-hidden rounded-2xl bg-ink-3">
            <Photo
              src={p.cover}
              alt={p.coverAlt}
              sizes={cols === 2 ? "(min-width: 640px) 50vw, 100vw" : shapes && p.span === "wide" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              className="absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              style={{ viewTransitionName: `project-${p.slug}` }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
              <span>
                <span className="eyebrow block text-mist">{p.discipline}</span>
                <span className="display mt-1 block text-2xl text-bone md:text-3xl">{p.title}</span>
              </span>
              <span className="grid size-11 shrink-0 translate-y-2 place-items-center rounded-full bg-bone text-morio opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Icon name="arrow" />
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** "Meet the Morios": spotlight portraits; the light switches on as each card scrolls into the centre (or on hover / tap). */
export function TeamGrid() {
  const [lit, setLit] = useState<string | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // on touch screens, light the card nearest the middle of the screen
    if (window.matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setLit((e.target as HTMLElement).dataset.name ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {homeTeam.map((m, i) => {
        const on = lit === m.name;
        return (
          <li key={m.name} data-name={m.name} ref={(el) => void (refs.current[i] = el)}>
            <Reveal delay={i * 80}>
              <Link
                to="/about"
                onMouseEnter={() => setLit(m.name)}
                onMouseLeave={() => setLit(null)}
                onFocus={() => setLit(m.name)}
                className="group block"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-3">
                  <Photo src={m.spotlight} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={`absolute inset-0 size-full object-cover transition duration-700 ${on ? "opacity-0" : "opacity-100"}`} />
                  <Photo src={m.portrait} alt={`${m.shortName}, ${m.title}`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={`absolute inset-0 size-full object-cover grayscale transition duration-700 ${on ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
                </span>
                <span className="display mt-5 block text-2xl text-bone">{m.shortName}</span>
                <span className="block text-sage">{m.title}</span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

/** The original testimonial slider (Morio slang), one quote at a time. */
export function Morioisms() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const n = morioisms.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Morio slang"
      className="grain relative overflow-hidden bg-morio-deep py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="container-site relative text-center">
        <span aria-hidden="true" className="display block text-8xl leading-none text-sage/40 md:text-9xl">
          “
        </span>
        <div className="relative mx-auto grid max-w-5xl" aria-live="polite">
          {morioisms.map((m, k) => (
            <figure key={m.phrase} aria-hidden={k !== i} className={`col-start-1 row-start-1 transition duration-700 ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
              <blockquote className="display text-display-xl text-bone">{m.phrase}</blockquote>
              <figcaption className="mt-6 text-lg text-sage md:text-xl">{m.meaning}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 flex items-center justify-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid size-12 place-items-center rounded-full border border-line text-bone transition hover:border-bone">
            <Icon name="arrow" className="rotate-180" />
          </button>
          <div className="flex gap-2">
            {morioisms.map((m, k) => (
              <button key={m.phrase} type="button" onClick={() => setI(k)} aria-label={`Show “${m.phrase}”`} aria-current={k === i} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-bone" : "w-1.5 bg-sage/40"}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="grid size-12 place-items-center rounded-full border border-line text-bone transition hover:border-bone">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}

/** "The studio is lit": the 3D logo, with the studio's mantra. */
export function StudioLit() {
  return (
    <section aria-label={mantra} className="relative isolate h-[78svh] min-h-[30rem] overflow-hidden md:h-[92svh]">
      <LitStage />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent pt-40 pb-12 text-center">
        <p className="font-display text-xl tracking-[0.2em] text-sage uppercase md:text-2xl">“{mantra}”</p>
      </div>
    </section>
  );
}

/** Small entry point to the AI brief builder on the Hola page. */
export function BriefTeaser() {
  return (
    <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-morio to-morio-deep p-8 md:p-12">
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow mb-3 text-mist">Brief Builder · AI</p>
          <p className="display max-w-2xl text-3xl text-bone md:text-5xl">Turn your idea into a brief for the Morios.</p>
        </div>
        <Link to="/contact#brief-builder" className="btn-primary shrink-0 self-start md:self-auto">
          Brief Builder <Icon name="arrow" />
        </Link>
      </div>
    </Reveal>
  );
}

export { labels };
