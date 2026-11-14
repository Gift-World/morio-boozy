import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { films, projectLabel, type Film, type Project } from "../content/work";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";

/**
 * The wall of work: a masonry of project covers at their natural shapes
 * (posters stay tall, spreads stay wide), each with its name underneath.
 * The cover morphs into the project page hero on navigation.
 */
export function ProjectWall({ items, priority = 0 }: { items: Project[]; priority?: number }) {
  return (
    <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5 [&>li]:mb-3 sm:[&>li]:mb-4 lg:[&>li]:mb-5">
      {items.map((p, i) => (
        <li key={p.slug} className="break-inside-avoid">
          <Reveal delay={(i % 3) * 70}>
            <Link to={`/work/${p.slug}`} className="group block">
              <span className="relative block overflow-hidden rounded-2xl bg-ink-3 md:rounded-3xl">
                <Photo
                  src={p.cover}
                  alt={p.coverAlt}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  priority={i < priority}
                  className="h-auto w-full transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  style={{ viewTransitionName: `project-${p.slug}` }}
                />
                <span className="theme-dark absolute right-3 bottom-3 grid size-10 translate-y-2 place-items-center rounded-full bg-bone text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:size-12">
                  <Icon name="arrow" className="-rotate-45" />
                </span>
              </span>
              <span className="mt-3 block px-1 pb-2">
                <span className="block text-[0.95rem] leading-snug font-medium text-bone md:text-lg">{projectLabel(p)}</span>
                <span className="block text-sm text-sage">{p.discipline}</span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Full-screen player; the video is only requested once a film is opened. */
function FilmLightbox({ film, onClose }: { film: Film; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={film.title} className="theme-dark fixed inset-0 z-[70] flex flex-col bg-ink/95 p-4 backdrop-blur-md sm:p-8" onClick={onClose}>
      <div className="flex items-center justify-between gap-4 pb-4">
        <p className="display text-xl text-bone md:text-2xl">{film.title}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close film" className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-xl text-bone transition hover:border-bone">
          <Icon name="close" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={film.embed}
          title={film.title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          className="aspect-video max-h-full w-full max-w-6xl rounded-2xl bg-black"
        />
      </div>
    </div>
  );
}

/** The studio's films: a featured film and a row of posters, each opening the player. */
export function FilmReel() {
  const [playing, setPlaying] = useState<Film | null>(null);
  const [featured, ...rest] = films;

  const card = (f: Film, big: boolean) => (
    <button type="button" onClick={() => setPlaying(f)} className="group block w-full text-left" aria-label={`Play film: ${f.title}`}>
      <span className={`theme-dark relative block overflow-hidden bg-ink-3 ${big ? "aspect-[4/3] rounded-3xl sm:aspect-video md:rounded-[2rem]" : "aspect-video rounded-2xl"}`}>
        <Photo src={f.poster} alt="" sizes={big ? "100vw" : "(min-width: 1024px) 33vw, 80vw"} className="absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <span className={`absolute grid place-items-center rounded-full bg-bone text-ink transition duration-500 group-hover:scale-110 ${big ? "top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 md:size-28" : "bottom-4 left-4 size-12"}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={big ? "size-7 md:size-9" : "size-4"} fill="currentColor">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        {big && <span className="display absolute inset-x-0 bottom-0 p-5 text-2xl text-bone md:p-8 md:text-4xl">{f.title}</span>}
      </span>
      {!big && <span className="mt-3 block px-1 leading-snug font-medium text-bone">{f.title}</span>}
    </button>
  );

  return (
    <>
      <Reveal>{card(featured, true)}</Reveal>
      <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
        {rest.map((f) => (
          <li key={f.slug} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
            {card(f, false)}
          </li>
        ))}
      </ul>
      {playing && <FilmLightbox film={playing} onClose={() => setPlaying(null)} />}
    </>
  );
}
