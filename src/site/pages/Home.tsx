import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { homeCopy, labels } from "../../content/site";
import { homeProjects } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, HomeCraftList, Morioisms, ProjectGrid, SectionHead, StudioLit, TeamGrid } from "../sections";

const VIDEO = { desktop: "/assets/images/slider/hero-1280.mp4", mobile: "/assets/images/slider/hero-720.mp4" };

/**
 * The original hero video, as the home page background. The poster frame
 * paints immediately; the (re-encoded, 0.4–1 MB) video is attached once the
 * page has loaded, and skipped for Data Saver, 2G and reduced-motion users.
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
    <div aria-hidden="true" className="absolute inset-0 -z-20">
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
    </div>
  );
}

export function HomePage() {
  return (
    <>
      {/* Hero: the original video, headline and introduction */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
        <HeroVideo />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-morio/45 mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
        <div className="container-site pt-36 pb-14 md:pb-20">
          <h1 className="display text-display-2xl text-bone">
            Small Agency,
            <br />
            <span className="text-outline">Big Ideas.</span>
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="space-y-4 text-bone/85 md:col-span-7 lg:col-span-6">
              <p className="text-lg md:text-xl">{homeCopy.intro}</p>
              <p className="hidden md:block">{homeCopy.introMore}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-6">
              <Link to="/services" className="btn-primary">
                {labels.ourCraft} <Icon name="arrow" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Hola
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Craft */}
      <section className="container-site py-24 md:py-36">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
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

      {/* Latest projects */}
      <section className="container-site pb-24 md:pb-36">
        <SectionHead title={labels.latestProjects} link={{ to: "/work", label: "Our Work" }} />
        <ProjectGrid items={homeProjects} shapes={false} cols={2} />
      </section>

      <StudioLit />

      {/* Meet the Morios */}
      <section className="container-site py-24 md:py-36">
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
