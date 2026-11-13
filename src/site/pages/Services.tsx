import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { labels } from "../../content/site";
import { craftCopy, serviceBySlug, services } from "../../content/services";
import { projects, projectsForCraft } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, ProjectGrid, SectionHead } from "../sections";

/** Hero index of the six crafts; on hover-capable screens the craft's image follows the cursor. */
function CraftIndex() {
  const [active, setActive] = useState<number | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return;
    let raf = 0;
    const pos = { x: 0, y: 0 };
    const tick = () => {
      pos.x += (target.current.x - pos.x) * 0.14;
      pos.y += (target.current.y - pos.y) * 0.14;
      if (card.current) card.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onMove = (e: PointerEvent) => (target.current = { x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="relative" onMouseLeave={() => setActive(null)}>
      <ol className="border-t border-line">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link to={`/services/${s.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group flex items-center gap-4 py-4 md:gap-8 md:py-5">
              <span className="w-8 shrink-0 font-display text-sm text-sage md:w-12 md:text-base">{String(i + 1).padStart(2, "0")}</span>
              <Photo src={s.image} alt="" sizes="96px" className="size-14 shrink-0 rounded-lg object-cover md:hidden" />
              <span
                className={`display animate-rise text-[2rem] leading-none transition duration-500 sm:text-5xl lg:text-[5.2rem] ${active === null || active === i ? "text-bone" : "text-bone/25"} ${active === i ? "md:translate-x-4" : ""}`}
                style={{ animationDelay: `${200 + i * 70}ms` }}
              >
                {s.title}
              </span>
              <Icon name="arrow" className="ml-auto shrink-0 text-xl text-sage transition group-hover:-rotate-45 group-hover:text-bone" />
            </Link>
          </li>
        ))}
      </ol>
      <div
        ref={card}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[4/5] w-64 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300 [@media(hover:hover)]:md:block ${active === null ? "opacity-0" : "opacity-100"}`}
      >
        {services.map((s, i) => (
          <Photo key={s.slug} src={s.image} alt="" sizes="256px" className={`absolute inset-0 size-full object-cover transition duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        ))}
      </div>
    </div>
  );
}

/**
 * Pinned storytelling: on desktop the image column stays fixed while each
 * craft's description scrolls past, and the image changes with it.
 */
function CraftStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3">
          {services.map((s, i) => (
            <Photo key={s.slug} src={s.image} alt="" sizes="50vw" className={`absolute inset-0 size-full object-cover transition duration-[900ms] ease-[var(--ease-out-expo)] ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
          ))}
          <div className="absolute bottom-0 left-0 flex gap-1.5 p-6">
            {services.map((s, i) => (
              <span key={s.slug} className={`h-1 rounded-full transition-all duration-500 ${active === i ? "w-8 bg-bone" : "w-3 bg-bone/30"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            data-index={i}
            ref={(el) => void (refs.current[i] = el)}
            className={`scroll-mt-28 border-t border-line py-14 transition-opacity duration-500 first:border-t-0 first:pt-0 lg:flex lg:min-h-[78svh] lg:flex-col lg:justify-center lg:py-20 ${active === i ? "lg:opacity-100" : "lg:opacity-35"}`}
          >
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
              <Photo src={s.image} alt={s.imageAlt} sizes="100vw" className="absolute inset-0 size-full object-cover" />
            </div>
            <h3 className="display text-display-md text-bone">
              {i + 1}. {s.title}
            </h3>
            <p className="mt-6 text-lg text-bone/80">{s.body}</p>
            <Link to={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-2 font-display tracking-[0.14em] text-bone uppercase hover:text-mist">
              {s.title} <Icon name="arrow" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

/** The original page's Idea / Design / Development bars, animated in when seen. */
function SkillBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const values = [60, 80, 60];
  return (
    <div ref={ref} className="space-y-8">
      {craftCopy.process.map((step, i) => (
        <div key={step}>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="display text-3xl text-bone">{step}</span>
            <span className="font-display text-xl text-sage">{values[i]}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-bone/10">
            <div className="h-full rounded-full bg-mist transition-[width] duration-[1600ms] ease-[var(--ease-out-expo)]" style={{ width: on ? `${values[i]}%` : "0%", transitionDelay: `${i * 150}ms` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-morio-deep pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container-site relative">
          <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">{craftCopy.eyebrow}</p>
              <h1 className="display text-display-xl text-bone">
                {craftCopy.title[0]}
                <br />
                <span className="text-outline">{craftCopy.title[1]}</span>
              </h1>
            </div>
            <p className="max-w-sm text-lg text-bone/80 italic">{craftCopy.obsession}</p>
          </div>
          <CraftIndex />
        </div>
      </section>

      <section className="container-site py-20 md:py-32">
        <Reveal>
          <p className="max-w-5xl text-2xl leading-snug text-bone/90 md:text-[2.1rem] md:leading-[1.35]">{craftCopy.intro}</p>
        </Reveal>
      </section>

      <section className="container-site pb-20 md:pb-32">
        <CraftStory />
      </section>

      <section className="border-y border-line bg-ink-2 py-20 md:py-28">
        <div className="container-site grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-7">
            <h2 className="display text-display-md text-bone">{craftCopy.experience}</h2>
          </Reveal>
          <div className="md:col-span-4 md:col-start-9">
            <SkillBars />
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <SectionHead title={labels.latestProjects} link={{ to: "/work", label: "Our Work" }} />
        <ProjectGrid items={projects} />
      </section>

      <section className="container-site pb-20 md:pb-28">
        <BriefTeaser />
      </section>
    </>
  );
}

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const s = serviceBySlug[slug];
  if (!s) return <Navigate to="/services" replace />;
  const index = services.indexOf(s);
  const next = services[(index + 1) % services.length];
  const related = projectsForCraft(s.slug);

  return (
    <>
      <section className="relative overflow-hidden bg-morio-deep pt-28 md:pt-36">
        <div className="container-site grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex gap-2">
              <Link to="/services" className="hover:text-bone">
                {labels.ourCraft}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone/80">{s.title}</span>
            </nav>
            <p aria-hidden="true" className="display text-outline animate-rise text-[clamp(6rem,18vw,15rem)] leading-[0.8] text-sage/60">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h1 className="display mt-6 text-display-lg text-bone">{s.title}</h1>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/10] lg:col-span-6 lg:aspect-[4/5]">
            <div className="absolute inset-0 animate-wipe-up">
              <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" priority className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <Reveal>
          <p className="max-w-4xl text-2xl leading-snug text-bone/90 md:text-[2rem] md:leading-[1.35]">{s.body}</p>
        </Reveal>
        <Reveal delay={100} className="mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Hola <Icon name="arrow" />
          </Link>
          <Link to="/contact#brief-builder" className="btn-ghost">
            Brief Builder
          </Link>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="container-site pb-20 md:pb-28">
          <SectionHead title={labels.latestProjects} />
          <ProjectGrid items={related} shapes={false} cols={related.length % 2 === 0 ? 2 : 3} />
        </section>
      )}

      <Link to={`/services/${next.slug}`} className="group relative block overflow-hidden border-y border-line bg-ink-2">
        <div className="container-site flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="eyebrow mb-3">{String(((index + 1) % services.length) + 1).padStart(2, "0")}</p>
            <p className="display text-display-md text-bone transition group-hover:translate-x-2">{next.title}</p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line text-2xl text-bone transition group-hover:-rotate-45 group-hover:bg-bone group-hover:text-morio md:size-20">
            <Icon name="arrow" />
          </span>
        </div>
      </Link>
    </>
  );
}
