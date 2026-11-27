import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { homeCopy, labels, mantra } from "../../content/site";
import { homeProjects } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, HomeCraftList, Morioisms, SectionHead, StudioLit, TeamGrid } from "../sections";
import { useGrowOnScroll } from "../motion";
import { AiReel, FilmReel, ProjectWall } from "../showcase";

// The hero carries the intro's first sentence; the rest follows the work, unchanged.
const cut = homeCopy.intro.indexOf(". ") + 1;
const introLead = homeCopy.intro.slice(0, cut);
const introRest = homeCopy.intro.slice(cut).trim();

/** The hero film: "Xceed Set Up: Behind the Scenes", played from Vimeo in background mode. */
const HERO_FILM = { vimeo: "1131237701", poster: "/assets/images/work/film-xceed.jpg" };
const VIMEO = "https://player.vimeo.com";

/**
 * Home page hero film. The film's still frame paints immediately; once the
 * page has loaded, the Vimeo player is added in background mode (muted, looping,
 * no controls) and fades in only after it reports that it is actually playing.
 * If it never plays (blocked, offline, Vimeo down), the still frame simply stays.
 * Skipped for Data Saver, 2G and reduced-motion visitors.
 */
function HeroVideo() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // attach the player after the page has loaded
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => setSrc(`${VIMEO}/video/${HERO_FILM.vimeo}?background=1&dnt=1`);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // talk to the player: show it once it plays, pause it when scrolled away
  useEffect(() => {
    const el = frame.current;
    if (!src || !el) return;
    // only talk to the player once it has said it is ready (before that the frame may not be Vimeo yet)
    let ready = false;
    let onScreen = true;
    const send = (method: string, value?: string) => {
      if (ready) el.contentWindow?.postMessage(JSON.stringify(value ? { method, value } : { method }), VIMEO);
    };
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO || e.source !== el.contentWindow) return;
      let msg: { event?: string; data?: { seconds?: number } };
      try {
        msg = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (msg.event === "ready") {
        ready = true;
        ["play", "timeupdate", "playProgress"].forEach((ev) => send("addEventListener", ev));
        if (!onScreen) send("pause");
      }
      else if (msg.event === "play" || (msg.data?.seconds ?? 0) > 0) setPlaying(true);
    };
    window.addEventListener("message", onMessage);
    // give up quietly if it hasn't started within 15 seconds
    const timer = window.setTimeout(() => setPlaying((p) => (p ? p : (setSrc(null), false))), 15000);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      send(onScreen ? "play" : "pause");
    });
    io.observe(el);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [src]);

  return (
    <>
      <Photo src={HERO_FILM.poster} alt="" sizes="(min-width: 1440px) 1344px, 100vw" priority className="absolute inset-0 size-full object-cover" />
      {src && (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 [container-type:size] ${playing ? "opacity-100" : "opacity-0"}`}>
          {/* cover the frame like object-fit: cover (the film is 16:9) */}
          <iframe
            ref={frame}
            src={src}
            title="Xceed Set Up: Behind the Scenes"
            tabIndex={-1}
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{ width: "max(100cqw, calc(100cqh * 16 / 9))", height: "max(100cqh, calc(100cqw * 9 / 16))" }}
          />
        </div>
      )}
    </>
  );
}

/** A slow line of the studio's mantra, like a title card. */
function MantraPill() {
  const words = Array.from({ length: 6 }, (_, i) => (
    <span key={i} className="px-4">
      {mantra}
    </span>
  ));
  return (
    <div aria-hidden="true" className="mx-auto mb-7 w-64 overflow-hidden rounded-full bg-mist/12 py-2 text-sm font-medium text-mist [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]">
      <div className="flex w-max animate-marquee whitespace-nowrap [animation-duration:28s]">
        {words}
        {words}
      </div>
    </div>
  );
}

export function HomePage() {
  const frame = useGrowOnScroll<HTMLDivElement>();
  return (
    <>
      {/* Hero: headline first, then the original video in its own frame */}
      <section className="container-site pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <MantraPill />
          <h1 className="display text-display-2xl text-bone">
            Small Agency,
            <br />
            <span className="text-outline">Big Ideas.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-bone/80 md:text-xl">{introLead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/work" className="btn-primary">
              Our Work <Icon name="arrow" />
            </Link>
            <Link to="/services" className="btn-ghost">
              {labels.ourCraft}
            </Link>
          </div>
        </div>
        <div
          ref={frame}
          style={{ transform: "scale(calc(0.9 + 0.1 * var(--grow, 1)))" }}
          className="theme-dark relative mt-12 aspect-[4/5] origin-top overflow-hidden rounded-3xl bg-ink-3 will-change-transform sm:aspect-video md:mt-16 md:rounded-[2.5rem]"
        >
          <HeroVideo />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <p className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 text-sm font-medium text-bone md:p-8 md:text-base">
            <span className="size-2 rounded-full bg-bone" /> Morio Studios, Nairobi
          </p>
        </div>
      </section>

      {/* Latest projects: the work comes first */}
      <section className="container-site py-20 md:py-28">
        <SectionHead title={labels.latestProjects} link={{ to: "/work", label: "Our Work" }} />
        <ProjectWall items={homeProjects} />
      </section>

      {/* Who we are: the original introduction, word for word */}
      <section className="bg-ink-2">
        <div className="container-site grid gap-8 py-20 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-8">
            <p className="display text-2xl leading-snug text-bone md:text-[2rem] md:leading-[1.3]">{introRest}</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-7 md:col-start-6">
            <p className="text-lg text-bone/75">{homeCopy.introMore}</p>
          </Reveal>
        </div>
      </section>

      {/* Films */}
      <section className="container-site py-20 md:py-28">
        <SectionHead title="Films and Documentaries" link={{ to: "/services/film", label: labels.ourCraft }} />
        <FilmReel />
      </section>

      {/* AI video production */}
      <section className="mx-3 mb-20 rounded-3xl bg-ink-2 py-16 sm:mx-5 md:mb-28 md:rounded-[2.5rem] md:py-24">
        <div className="container-site">
          <AiReel />
        </div>
      </section>

      {/* Our Craft */}
      <section className="container-site pb-20 md:pb-28">
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="eyebrow mb-6">{labels.ourCraft}</p>
            <h2 className="display text-display-lg text-bone">
              {homeCopy.tagline[0]}
              <br />
              <span className="text-outline">{homeCopy.tagline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:text-right">
            <Link to="/services" className="btn-ghost">
              {labels.moreCraft} <Icon name="arrow" />
            </Link>
          </Reveal>
        </div>
        <HomeCraftList />
      </section>

      <StudioLit />

      {/* Meet the Morios */}
      <section className="container-site py-20 md:py-28">
        <SectionHead title={labels.meetTheMorios} link={{ to: "/about", label: labels.knowTheMorios }} />
        <TeamGrid />
      </section>

      <Morioisms />

      <section className="container-site py-20 md:py-28">
        <BriefTeaser />
      </section>
    </>
  );
}
