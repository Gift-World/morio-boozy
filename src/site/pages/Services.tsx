import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { craftCopy, serviceBySlug, services } from "../../content/services";
import { work } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { CtaBand, SectionHead, WorkGrid } from "../sections";

/**
 * Hero index of the six crafts. On desktop, hovering a craft floats its image
 * after the cursor; on touch it shows a thumbnail inline.
 */
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
            <Link
              to={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-center gap-4 py-4 md:gap-8 md:py-5"
              style={{ animationDelay: `${200 + i * 70}ms` }}
            >
              <span className="w-8 shrink-0 font-display text-sm text-sage md:w-12 md:text-base">{String(i + 1).padStart(2, "0")}</span>
              <Photo src={s.image} alt="" sizes="96px" priority={i < 2} className="size-14 shrink-0 rounded-lg object-cover md:hidden" />
              <span
                className={`display animate-rise text-[2.1rem] leading-none transition duration-500 sm:text-5xl lg:text-[5.2rem] ${
                  active === null || active === i ? "text-bone" : "text-bone/25"
                } ${active === i ? "md:translate-x-4" : ""}`}
                style={{ animationDelay: `${200 + i * 70}ms` }}
              >
                {s.title}
              </span>
              <Icon name="arrow" className="ml-auto shrink-0 text-xl text-sage transition group-hover:-rotate-45 group-hover:text-bone" />
            </Link>
          </li>
        ))}
      </ol>
      {/* floating preview (desktop pointer only) */}
      <div
        ref={card}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[4/5] w-64 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300 [@media(hover:hover)]:md:block ${
          active === null ? "opacity-0" : "opacity-100"
        }`}
      >
        {services.map((s, i) => (
          <Photo key={s.slug} src={s.image} alt="" sizes="256px" className={`absolute inset-0 size-full object-cover transition duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        ))}
      </div>
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
            <p className="max-w-sm text-lg text-bone/80">{craftCopy.obsession}</p>
          </div>
          <CraftIndex />
        </div>
      </section>

      {/* intro + experience */}
      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-7">
          <p className="text-xl leading-relaxed text-bone/85 md:text-2xl">{craftCopy.intro}</p>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9">
          <div className="rounded-3xl border border-line bg-ink-2 p-8">
            <p className="display text-display-lg text-bone">20+</p>
            <p className="mt-3 text-lg text-bone/80">{craftCopy.experience}</p>
          </div>
        </Reveal>
      </section>

      {/* every craft, in full */}
      <section className="container-site space-y-20 pb-20 md:space-y-32 md:pb-32">
        {services.map((s, i) => (
          <Reveal key={s.slug} className="grid items-center gap-10 md:grid-cols-12" as="article">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
              <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0 size-full object-cover" />
            </div>
            <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
              <p className="display text-outline text-6xl text-sage">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={s.slug} className="display mt-3 scroll-mt-28 text-display-md text-bone">
                {s.title}
              </h2>
              <p className="mt-6 text-lg text-bone/80">{s.body}</p>
              <Link to={`/services/${s.slug}`} className="mt-8 inline-flex items-center gap-2 font-display tracking-[0.14em] text-bone uppercase hover:text-mist">
                More on {s.short.toLowerCase()} <Icon name="arrow" />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>

      {/* process */}
      <section className="bg-ink-2 py-20 md:py-28">
        <div className="container-site">
          <SectionHead eyebrow="How we work" title="From concept to execution." />
          <ol className="grid gap-5 md:grid-cols-3">
            {craftCopy.process.map((p, i) => (
              <Reveal as="li" key={p.step} delay={i * 100} className="rounded-3xl border border-line p-8">
                <p className="font-display text-sage">0{i + 1}</p>
                <h3 className="display mt-6 text-4xl text-bone">{p.step}</h3>
                <p className="mt-4 text-bone/75">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-site py-20 md:py-28">
        <SectionHead eyebrow="Our Work" title="Latest projects" link={{ to: "/work", label: "All projects" }} />
        <WorkGrid items={work.slice(0, 6).map((w) => ({ ...w, span: undefined }))} />
      </section>

      <CtaBand />
    </>
  );
}

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const s = serviceBySlug[slug];
  if (!s) return <Navigate to="/services" replace />;
  const index = services.indexOf(s);
  const others = services.filter((o) => o.slug !== s.slug);
  const next = services[(index + 1) % services.length];
  const related = work.filter((w) =>
    s.slug === "photography" || s.slug === "film"
      ? w.discipline === "Photography"
      : s.slug === "branding"
        ? w.discipline === "Branding" || w.discipline === "Packaging"
        : w.discipline === "Art direction" || w.discipline === "Branding",
  );

  return (
    <>
      <section className="relative overflow-hidden bg-morio-deep pt-28 md:pt-36">
        <div className="container-site grid gap-10 pb-14 lg:grid-cols-12 lg:items-end lg:pb-20">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 flex gap-2">
              <Link to="/services" className="hover:text-bone">
                Our Craft
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-bone/80">{s.short}</span>
            </nav>
            <p aria-hidden="true" className="display text-outline animate-rise text-[clamp(6rem,18vw,15rem)] leading-[0.8] text-sage/60">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h1 className="display mt-6 text-display-lg text-bone">{s.h1}</h1>
            <p className="mt-6 max-w-lg text-lg text-bone/80">{s.summary}</p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/10] lg:col-span-6 lg:aspect-[4/5]">
            <div className="absolute inset-0 animate-wipe-up">
              <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" priority className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-7">
          <p className="text-xl leading-relaxed text-bone/85 md:text-2xl">{s.body}</p>
          <Link to="/contact" className="btn-primary mt-10">
            Talk to us about {s.short.toLowerCase()} <Icon name="arrow" />
          </Link>
        </Reveal>
        <Reveal delay={120} className="md:col-span-4 md:col-start-9">
          <div className="rounded-3xl border border-line bg-ink-2 p-8">
            <h2 className="eyebrow mb-6">What we do</h2>
            <ul className="space-y-4">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-lg text-bone">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-mist" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="container-site pb-20 md:pb-28">
          <h2 className="display mb-10 text-display-md text-bone">Related work</h2>
          <WorkGrid items={related.slice(0, 3).map((w) => ({ ...w, span: undefined }))} />
        </section>
      )}

      {/* next craft */}
      <Link to={`/services/${next.slug}`} className="group relative block overflow-hidden border-y border-line bg-ink-2">
        <div className="container-site flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="eyebrow mb-3">Next craft</p>
            <p className="display text-display-md text-bone transition group-hover:translate-x-2">{next.title}</p>
          </div>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line text-2xl text-bone transition group-hover:-rotate-45 group-hover:bg-bone group-hover:text-morio md:size-20">
            <Icon name="arrow" />
          </span>
        </div>
      </Link>

      <section className="container-site py-16 md:py-20">
        <h2 className="eyebrow mb-6">More from the studio</h2>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/services/${o.slug}`} className="inline-block rounded-full border border-line px-5 py-2.5 text-bone/85 transition hover:border-bone hover:text-bone">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
