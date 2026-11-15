import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { labels } from "../../content/site";
import { craftCopy, serviceBySlug, services } from "../../content/services";
import { projects, projectsForCraft } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, SectionHead } from "../sections";
import { FilmReel, ProjectWall } from "../showcase";

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

/** The original page's three stages, Idea / Design / Development, as plain steps. */
function Process() {
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {craftCopy.process.map((step, i) => (
        <Reveal as="li" key={step} delay={i * 120} className="flex items-center gap-4 rounded-2xl bg-ink p-5 md:flex-col md:items-start md:gap-10 md:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-sm font-medium text-sage tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <span className="display text-2xl text-bone md:text-3xl">{step}</span>
        </Reveal>
      ))}
    </ol>
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
        <div className="container-site">
          <Reveal>
            <h2 className="display max-w-4xl text-display-lg text-bone">{craftCopy.experience}</h2>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <Process />
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
      {/* Hero: the craft and its description beside its image */}
      <section className="container-site pt-28 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="eyebrow mb-6 flex flex-wrap items-center gap-2">
              <Link to="/services" className="hover:text-bone">
                {labels.ourCraft}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="rounded-full border border-line px-2.5 py-0.5 text-bone/80 tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </nav>
            <h1 className="display text-display-xl text-bone">{s.title}</h1>
            <p className="mt-6 text-lg text-bone/80 md:text-xl md:leading-relaxed">{s.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Hola <Icon name="arrow" />
              </Link>
              <Link to="/contact#brief-builder" className="btn-ghost">
                Brief Builder
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-3 md:rounded-[2.5rem] lg:col-span-6 lg:aspect-[4/5] lg:max-h-[76svh] lg:w-full">
            <div className="absolute inset-0 animate-wipe-up">
              <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" priority className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>

        {/* switch between the six crafts */}
        <nav aria-label={labels.ourCraft} className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 md:mt-16">
          {services.map((x) => (
            <Link
              key={x.slug}
              to={`/services/${x.slug}`}
              aria-current={x.slug === s.slug ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${x.slug === s.slug ? "border-bone bg-bone text-ink" : "border-line text-bone/80 hover:border-bone hover:text-bone"}`}
            >
              {x.title}
            </Link>
          ))}
        </nav>
      </section>

      {s.slug === "film" && (
        <section className="container-site pt-16 md:pt-24">
          <FilmReel />
        </section>
      )}

      {related.length > 0 && (
        <section className="container-site py-16 md:py-24">
          <SectionHead title={labels.latestProjects} link={{ to: "/work", label: "Our Work" }} />
          <ProjectWall items={related.slice(0, 6)} />
        </section>
      )}

      {/* next craft */}
      <section className={`container-site pb-16 md:pb-24 ${related.length ? "" : "pt-16 md:pt-24"}`}>
        <Link to={`/services/${next.slug}`} className="theme-dark group relative isolate flex min-h-64 items-end overflow-hidden rounded-3xl bg-ink md:min-h-80 md:rounded-[2.5rem]">
          <Photo src={next.image} alt="" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover opacity-70 transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <span className="flex w-full items-end justify-between gap-6 p-6 md:p-10">
            <span>
              <span className="eyebrow mb-2 block">
                {String(((index + 1) % services.length) + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="display block text-display-lg text-bone">{next.title}</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-bone text-lg text-ink transition group-hover:-rotate-45 md:size-14">
              <Icon name="arrow" />
            </span>
          </span>
        </Link>
      </section>

      <section className="container-site pb-16 md:pb-24">
        <BriefTeaser />
      </section>
    </>
  );
}
