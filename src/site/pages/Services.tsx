import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { labels } from "../../content/site";
import { craftCopy, serviceBySlug, services } from "../../content/services";
import { projects, projectsForCraft } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, ProjectGrid, SectionHead } from "../sections";
import { ProjectWall } from "../showcase";

/**
 * The six crafts as a strip of image panels. On desktop the panel under the
 * pointer opens wide and the others step back; on phones it is a simple
 * two-column grid. Each panel leads to that craft's page.
 */
function CraftStrip() {
  const [active, setActive] = useState(0);
  return (
    <ul className="theme-dark grid grid-cols-2 gap-3 md:flex md:h-[30rem] md:gap-3 lg:h-[34rem]" onMouseLeave={() => setActive(0)}>
      {services.map((s, i) => {
        const open = active === i;
        return (
          <li
            key={s.slug}
            className={`relative min-w-0 overflow-hidden rounded-2xl bg-ink-3 transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)] md:rounded-3xl md:basis-0 ${open ? "md:grow-[3.2]" : "md:grow"}`}
          >
            <Link to={`/services/${s.slug}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="group relative block aspect-[3/4] size-full md:aspect-auto">
              <Photo
                src={s.image}
                alt=""
                sizes="(min-width: 768px) 40vw, 50vw"
                priority={i < 2}
                className={`absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] ${open ? "md:scale-100" : "md:scale-110 md:grayscale"}`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-bone backdrop-blur md:top-4 md:left-4">{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-5">
                <span className={`display text-base leading-tight text-bone md:text-xl md:whitespace-nowrap md:transition-opacity md:duration-500 ${open ? "md:opacity-100" : "md:opacity-0"}`}>{s.title}</span>
                <span className={`hidden size-10 shrink-0 place-items-center rounded-full bg-bone text-ink transition duration-500 md:grid ${open ? "opacity-100" : "opacity-0"}`}>
                  <Icon name="arrow" className="-rotate-45" />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
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
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-24 aspect-[5/6] max-h-[78svh] overflow-hidden rounded-3xl bg-ink-3 md:rounded-[2rem]">
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
      <div className="lg:col-span-6 lg:col-start-7">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            data-index={i}
            ref={(el) => void (refs.current[i] = el)}
            className={`scroll-mt-28 border-t border-line py-14 transition-opacity duration-500 first:border-t-0 first:pt-0 lg:flex lg:min-h-[64svh] lg:flex-col lg:justify-center lg:py-16 ${active === i ? "lg:opacity-100" : "lg:opacity-35"}`}
          >
            <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
              <Photo src={s.image} alt={s.imageAlt} sizes="100vw" className="absolute inset-0 size-full object-cover" />
            </div>
            <h3 className="display text-display-md text-bone">
              {i + 1}. {s.title}
            </h3>
            <p className="mt-5 text-bone/80 md:text-lg">{s.body}</p>
            <Link to={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-2 font-medium text-bone hover:text-mist">
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
      <section className="container-site pt-28 md:pt-36">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-6">
            <p className="eyebrow mb-4">{craftCopy.eyebrow}</p>
            <h1 className="display text-display-xl text-bone">
              {craftCopy.title[0]}
              <br />
              <span className="text-outline">{craftCopy.title[1]}</span>
            </h1>
          </div>
          <p className="text-lg text-bone/75 italic md:col-span-5 md:col-start-8">{craftCopy.obsession}</p>
        </div>
        <div className="mt-10 md:mt-14">
          <CraftStrip />
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <Reveal className="grid gap-6 md:grid-cols-12">
          <p className="eyebrow md:col-span-3 md:pt-2">{labels.ourCraft}</p>
          <p className="text-xl leading-snug text-bone/90 md:col-span-9 md:text-[1.6rem] md:leading-[1.45]">{craftCopy.intro}</p>
        </Reveal>
      </section>

      <section className="container-site pb-20 md:pb-32">
        <CraftStory />
      </section>

      <section className="mx-3 rounded-3xl bg-ink-2 py-16 sm:mx-5 md:rounded-[2.5rem] md:py-24">
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
        <ProjectWall items={projects.slice(0, 6)} />
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
      <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl bg-morio-deep pt-28 sm:mx-5 sm:mt-5 md:rounded-[2.5rem] md:pt-36">
        <div className="container-site grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex gap-2">
              <Link to="/services" className="hover:text-bone">
                {labels.ourCraft}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone/80">{s.title}</span>
            </nav>
            <p aria-hidden="true" className="display text-outline animate-rise text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-sage/50">
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
          <p className="max-w-4xl text-xl leading-snug text-bone/90 md:text-[1.7rem] md:leading-[1.4]">{s.body}</p>
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
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line text-2xl text-bone transition group-hover:-rotate-45 group-hover:bg-bone group-hover:text-ink md:size-20">
            <Icon name="arrow" />
          </span>
        </div>
      </Link>
    </>
  );
}
