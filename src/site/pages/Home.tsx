import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { homeCopy, labels, mantra } from "../../content/site";
import { homeProjects } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, HomeCraftList, Morioisms, SectionHead, StudioLit, TeamGrid } from "../sections";
import { FilmReel, ProjectWall } from "../showcase";

// The hero carries the intro's first sentence; the rest follows the work, unchanged.
const cut = homeCopy.intro.indexOf(". ") + 1;
const introLead = homeCopy.intro.slice(0, cut);
const introRest = homeCopy.intro.slice(cut).trim();

const VIDEO = { desktop: "/assets/images/slider/hero-1280.mp4", mobile: "/assets/images/slider/hero-720.mp4" };

/**
 * The original hero video. The poster frame paints immediately; the
 * (re-encoded, 0.4–1 MB) video is attached once the page has loaded, and
 * skipped for Data Saver, 2G and reduced-motion users.
 */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      v.muted = true;
      v.src = window.matchMedia("(max-width: 767px)").matches ? VIDEO.mobile : VIDEO.desktop;
      void v.play().catch(() => {});
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    // pause when scrolled away
    const io = new IntersectionObserver(([e]) => {
      if (!v.src) return;
      if (e.isIntersecting) void v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => {
      window.removeEventListener("load", start);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet="/assets/images/slider/hero-poster-720.webp" />
        <img src="/assets/images/slider/hero-poster.webp" alt="" fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover" />
      </picture>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
      />
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
  return (
    <>
      {/* Hero: headline first, then the original video in its own frame */}
      <section className="container-site pt-32 md:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <MantraPill />
          <h1 className="display text-display-xl text-bone">
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
        <div className="theme-dark relative mt-12 aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3 sm:aspect-video md:mt-16 md:rounded-[2.5rem]">
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
            <p className="text-2xl leading-snug font-medium text-bone md:text-[2.3rem] md:leading-[1.3]">{introRest}</p>
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
