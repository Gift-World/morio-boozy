import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { homeCopy } from "../../content/site";
import { work } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, CtaBand, Morioisms, SectionHead, ServiceList, TeamGrid, WorkGrid } from "../sections";
import { HeroStage } from "../three/HeroStage";

const VIDEO = "/assets/images/slider/Black-And-White-Video.mp4";
const POSTER = "/assets/images/slider/hero-poster.webp";

/**
 * Showreel video. The poster paints immediately; the 3 MB video is attached
 * only when the section nears the viewport, and skipped for Data Saver, 2G
 * connections and reduced-motion users.
 */
function Showreel() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || /2g$/.test(conn?.effectiveType ?? "")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) {
            v.muted = true;
            v.src = VIDEO;
          }
          void v.play().catch(() => {});
        } else if (v.src) v.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section aria-label="Showreel" className="relative isolate overflow-hidden">
      <video ref={ref} className="h-[70svh] w-full object-cover md:h-[88svh]" muted loop playsInline preload="none" poster={POSTER} aria-hidden="true" />
      <div aria-hidden="true" className="absolute inset-0 bg-morio/55 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
      <div className="absolute inset-0 grid place-items-center px-5 text-center">
        <Reveal>
          <p className="eyebrow mb-5">Nairobi, in motion</p>
          <p className="display text-display-xl text-bone">
            Stories told well
            <br />
            <span className="text-outline">move people.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      {/* Hero: the studio is lit */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
        <HeroStage />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div className="container-site relative pt-[52svh] pb-12 md:pt-[46svh] md:pb-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">Creative studio · Nairobi, Kenya</p>
              <h1 className="display text-display-xl text-bone">
                Small Agency,
                <br />
                <span className="text-outline">Big Ideas.</span>
              </h1>
            </div>
            <div className="space-y-6 lg:col-span-5">
              <p className="text-lg text-bone/85">{homeCopy.intro}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Start a project <Icon name="arrow" />
                </Link>
                <Link to="/work" className="btn-ghost">
                  Latest projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + tagline */}
      <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6">Our Craft</p>
          <h2 className="display text-display-lg text-bone">
            {homeCopy.tagline[0]}
            <br />
            <span className="text-outline">{homeCopy.tagline[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg text-bone/80 md:col-span-5 md:pt-14">
          <p>{homeCopy.introMore}</p>
          <Link to="/services" className="inline-flex items-center gap-2 font-display tracking-[0.14em] text-bone uppercase hover:text-mist">
            More Craft <Icon name="arrow" />
          </Link>
        </Reveal>
      </section>

      {/* Crafts */}
      <section className="bg-ink-2 py-24 md:py-32">
        <div className="container-site">
          <SectionHead eyebrow="What we do" title="Six disciplines. One shared obsession." link={{ to: "/services", label: "More Craft" }} />
          <ServiceList />
        </div>
      </section>

      <Showreel />

      {/* Latest projects */}
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="Our Work" title="Latest projects" link={{ to: "/work", label: "All projects" }} />
        <WorkGrid items={work.slice(0, 8)} />
      </section>

      <BriefTeaser />

      {/* Team */}
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="The Morios" title="Meet the Morios" link={{ to: "/about", label: "Know the Morios" }} />
        <TeamGrid />
      </section>

      <Morioisms />

      <CtaBand />
    </>
  );
}
