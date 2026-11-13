import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { work } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { CtaBand, Morioisms, SectionHead, ServiceList, TeamGrid, WorkGrid } from "../sections";

const VIDEO = "/assets/images/slider/Black-And-White-Video.mp4";
const POSTER = "/assets/images/slider/hero-poster.webp";

/**
 * Background video. The poster paints immediately; the 3 MB video is only
 * attached after hydration, and skipped for Data Saver, 2G connections and
 * reduced-motion users.
 */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || /2g$/.test(conn?.effectiveType ?? "");
    if (slow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.muted = true;
    v.src = VIDEO;
    void v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 size-full object-cover"
      muted
      loop
      playsInline
      preload="none"
      poster={POSTER}
      aria-hidden="true"
    />
  );
}

const DISCIPLINES =["Creative direction", "Branding", "Film", "Photography", "Animation", "Livestreaming"];

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-forest-deep">
        <HeroVideo />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest/70 mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/50" />

        <div className="container-site pt-36 pb-14 md:pb-20">
          <p className="eyebrow mb-6 text-spot">Creative studio · Nairobi, Kenya</p>
          <h1 className="display text-display-xl text-bone">
            Small agency,
            <br />
            <span className="text-spot">big ideas.</span>
          </h1>
          <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-lg text-bone/85 md:text-xl">
              Built on passion and love for creativity and storytelling. Morio Studios is the brainchild of four Kenyan
              friends with a common goal: an agency that is nimble, versatile and smart.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-spot">
                Start a project <Icon name="arrow" />
              </Link>
              <Link to="/work" className="btn-ghost">
                See our work
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <ul className="container-site flex flex-wrap gap-x-8 gap-y-2 py-5 font-display text-sm tracking-[0.16em] text-bone/70 uppercase">
            {DISCIPLINES.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Statement */}
      <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-6">Why Morio</p>
          <h2 className="display text-display-lg text-bone">
            If the big idea is good, <span className="text-spot">execution is academic.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg text-bone/80 md:col-span-5 md:pt-14">
          <p>
            Great work rarely happens in isolation. We embed ourselves in your world as a thinking partner, a creative
            collaborator and a full execution team, bringing ideas from concept to completion with precision, care and no
            unnecessary complexity.
          </p>
          <p>
            With each Morio bringing a unique skill set, we put human thinking and technological efficiency together to
            create workflows that solve any brief. Small doesn’t mean limited. It means focused.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 font-display tracking-[0.14em] text-spot uppercase">
            Meet the Morios <Icon name="arrow" />
          </Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="bg-ink-2 py-24 md:py-32">
        <div className="container-site">
          <SectionHead eyebrow="Our craft" title="Six disciplines. One shared obsession." link={{ to: "/services", label: "All services" }} />
          <ServiceList />
        </div>
      </section>

      {/* Work */}
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="Selected work" title="Ideas, made real." link={{ to: "/work", label: "View all work" }} />
        <WorkGrid items={work.slice(0, 7)} />
      </section>

      <Morioisms />

      {/* Team */}
      <section className="container-site py-24 md:py-32">
        <SectionHead eyebrow="The Morios" title="Four friends. One studio." link={{ to: "/about", label: "Our story" }} />
        <TeamGrid />
      </section>

      {/* Studio photo */}
      <section className="container-site pb-24 md:pb-32">
        <Reveal className="relative aspect-[16/7] overflow-hidden rounded-3xl">
          <Photo src="/assets/images/service/m1.jpeg" alt="The Morio Studios team working together around a table" sizes="100vw" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
          <p className="display absolute bottom-6 left-6 max-w-md text-3xl text-bone md:bottom-10 md:left-10 md:text-5xl">
            Thinking partner. Creative collaborator. Execution team.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
