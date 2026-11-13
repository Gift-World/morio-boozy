import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { serviceBySlug, services } from "../../content/services";
import { work } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { CtaBand, PageHero, ServiceList, WorkGrid } from "../sections";

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our craft" title={<>Small agency. <span className="text-spot">Big ideas.</span></>}>
        <p>
          Morio Studios exists at the intersection of strategy, creativity and craft. We work with agencies, brands and
          independent clients to bring ideas from concept to completion. Six disciplines, one shared obsession: turning a
          brief into something that moves people, changes behaviour and shifts mindsets.
        </p>
      </PageHero>
      <section className="container-site py-20 md:py-28">
        <ServiceList headingLevel="h2" />
      </section>
      <section className="container-site grid gap-5 pb-24 md:grid-cols-3 md:pb-32">
        {["/assets/images/service/m1.jpeg", "/assets/images/service/m2.jpeg", "/assets/images/service/m3.jpeg"].map((src, i) => (
          <Reveal key={src} delay={i * 80} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Photo src={src} alt="The Morio Studios team at work" sizes="(min-width: 768px) 33vw, 100vw" className="absolute inset-0 size-full object-cover" />
          </Reveal>
        ))}
      </section>
      <CtaBand />
    </>
  );
}

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const s = serviceBySlug[slug];
  if (!s) return <Navigate to="/services" replace />;
  const others = services.filter((o) => o.slug !== s.slug);
  const related = work.filter((w) =>
    s.slug === "photography" || s.slug === "film"
      ? w.discipline === "Photography"
      : s.slug === "branding"
        ? w.discipline === "Branding" || w.discipline === "Packaging"
        : w.discipline === "Art direction" || w.discipline === "Branding",
  );

  return (
    <>
      <PageHero eyebrow={`Services / ${s.short}`} title={s.h1}>
        <p>{s.summary}</p>
      </PageHero>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-7">
          <p className="text-xl leading-relaxed text-bone/85 md:text-2xl">{s.body}</p>
          <Link to="/contact" className="btn-spot mt-10">
            Talk to us about {s.short.toLowerCase()} <Icon name="arrow" />
          </Link>
        </Reveal>
        <Reveal delay={120} className="md:col-span-5">
          <div className="rounded-2xl border border-line bg-ink-2 p-8">
            <h2 className="eyebrow mb-6 text-spot">What we do</h2>
            <ul className="space-y-4">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-lg text-bone">
                  <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-spot" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
            <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="container-site pb-20 md:pb-28">
          <h2 className="display mb-10 text-display-md text-bone">Related work</h2>
          <WorkGrid items={related.slice(0, 3).map((w) => ({ ...w, span: undefined }))} />
        </section>
      )}

      <section className="bg-ink-2 py-20 md:py-28">
        <div className="container-site">
          <h2 className="eyebrow mb-8">More from the studio</h2>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <li key={o.slug} className="bg-ink-2">
                <Link to={`/services/${o.slug}`} className="group flex h-full flex-col justify-between gap-8 p-6 transition hover:bg-forest">
                  <span className="display text-2xl text-bone group-hover:text-spot">{o.title}</span>
                  <Icon name="arrow" className="text-mute group-hover:text-spot" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
