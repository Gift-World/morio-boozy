import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { labels } from "../../content/site";
import { serviceBySlug } from "../../content/services";
import { projectBySlug, projects, type Discipline } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser, ProjectGrid } from "../sections";

const DISCIPLINES: Discipline[] = ["Branding", "Packaging", "Art direction", "Photography"];
const ANY_WORK = "all kinds of work";
const ANYONE = "everyone";

/**
 * One blank in the filter sentence: reads as a word in the headline, but is a
 * native <select> underneath (keyboard, screen reader and phone pickers work).
 */
function Blank({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <span className="relative inline-flex items-baseline gap-2 border-b-2 border-mist/60 text-mist transition hover:border-bone hover:text-bone focus-within:border-bone focus-within:text-bone">
      <span aria-hidden="true">{value}</span>
      <Icon name="arrow" className="rotate-90 self-center text-[0.45em]" />
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer appearance-none opacity-0">
        {options.map((o) => (
          <option key={o} value={o} className="bg-ink text-base text-bone">
            {o}
          </option>
        ))}
      </select>
    </span>
  );
}

/** Two rows of the studio's images drifting in opposite directions. */
function FilmStrip() {
  const all = [...new Set(projects.flatMap((p) => p.images.map((im) => im.src)))].slice(0, 10);
  const rows = [
    all.filter((_, i) => i % 2 === 0),
    all.filter((_, i) => i % 2 === 1),
  ];
  return (
    <div aria-hidden="true" className="space-y-4 md:space-y-5">
      {rows.map((row, r) => (
        <div key={r} className="overflow-hidden">
          <div
            className={`flex w-max gap-4 md:gap-5 ${r ? "animate-marquee-rev" : "animate-marquee"}`}
          >
            {[...row, ...row].map((src, i) => (
              <div
                key={src + i}
                className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-72 md:h-60 md:w-96"
              >
                <Photo
                  src={src}
                  alt=""
                  sizes="(min-width: 768px) 384px, 208px"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkPage() {
  const [discipline, setDiscipline] = useState(ANY_WORK);
  const [industry, setIndustry] = useState(ANYONE);
  // the second blank appears once projects have a client sector filled in
  const industries = [...new Set(projects.map((p) => p.industry).filter((x): x is string => !!x))];
  const items = projects.filter(
    (p) => (discipline === ANY_WORK || p.discipline === discipline) && (industry === ANYONE || p.industry === industry),
  );
  const filtered = discipline !== ANY_WORK || industry !== ANYONE;
  return (
    <>
      <section className="relative overflow-hidden bg-morio-deep pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="container-site relative z-10 mb-12 md:mb-16">
          <p className="eyebrow mb-5">Our Work</p>
          <h1 className="display text-display-xl text-bone">
            {labels.latestProjects}
          </h1>
        </div>
        <FilmStrip />
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <p className="display text-[clamp(2.2rem,6vw,4.75rem)] leading-[1.05] text-bone">
            We do <Blank label="Type of work" value={discipline} options={[ANY_WORK, ...DISCIPLINES]} onChange={setDiscipline} />
            {industries.length > 0 && (
              <>
                {" "}
                for <Blank label="Who it's for" value={industry} options={[ANYONE, ...industries]} onChange={setIndustry} />
              </>
            )}
            .
          </p>
          <p aria-live="polite" className="shrink-0 font-display tracking-[0.14em] text-sage uppercase">
            {String(items.length).padStart(2, "0")} {items.length === 1 ? "project" : "projects"}
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setDiscipline(ANY_WORK);
                  setIndustry(ANYONE);
                }}
                className="ml-4 text-bone underline underline-offset-4 hover:text-mist"
              >
                Show all
              </button>
            )}
          </p>
        </div>
        <ProjectGrid items={items} shapes={!filtered} />
      </section>
    </>
  );
}

/**
 * Pinned gallery: each image takes the stage in turn as you scroll (the
 * stage stays fixed while the section scrolls past). One image = a single
 * large frame.
 */
function PinnedGallery({ images }: { images: { src: string; alt: string }[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / Math.max(total, 1), 0), 0.9999);
      setActive(Math.floor(p * images.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [images.length]);

  if (images.length < 2) {
    return (
      <div className="container-site">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Photo
            src={images[0].src}
            alt={images[0].alt}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrap}
      style={{ height: `${images.length * 90}svh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-svh items-center">
        <div className="container-site w-full">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/10]">
            {images.map(
              (im, i) =>
                // only the frames around the current one are mounted, so the gallery loads as you scroll
                Math.abs(i - active) <= 1 && (
                  <Photo
                    key={im.src}
                    src={im.src}
                    alt={im.alt}
                    sizes="100vw"
                    className={`absolute inset-0 size-full object-cover transition duration-[900ms] ease-[var(--ease-out-expo)] ${i === active ? "scale-100 opacity-100" : i < active ? "scale-95 opacity-0" : "scale-110 opacity-0"}`}
                  />
                ),
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/70 to-transparent p-5 md:p-7">
              <p className="font-display text-lg tracking-wider text-bone">
                {String(active + 1).padStart(2, "0")}{" "}
                <span className="text-sage">
                  / {String(images.length).padStart(2, "0")}
                </span>
              </p>
              <div className="flex gap-1.5">
                {images.map((im, i) => (
                  <span
                    key={im.src}
                    className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-bone" : "w-3 bg-bone/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectPage() {
  const { slug = "" } = useParams();
  const p = projectBySlug[slug];
  if (!p) return <Navigate to="/work" replace />;
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const story = [
    { label: "The brief", text: p.brief },
    { label: "The idea", text: p.idea },
    { label: "The outcome", text: p.outcome },
  ].filter((s) => s.text);

  return (
    <>
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
        <Photo
          src={p.cover}
          alt={p.coverAlt}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-20 size-full object-cover"
          style={{ viewTransitionName: `project-${p.slug}` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/20"
        />
        <div className="container-site pt-36 pb-12 md:pb-16">
          <nav aria-label="Breadcrumb" className="eyebrow mb-6 flex gap-2">
            <Link to="/work" className="hover:text-bone">
              Our Work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-bone/80">{p.discipline}</span>
          </nav>
          <h1 className="display text-display-xl text-bone">{p.title}</h1>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-bone/85">
            {p.client && (
              <div>
                <dt className="eyebrow">Client</dt>
                <dd>{p.client}</dd>
              </div>
            )}
            {p.year && (
              <div>
                <dt className="eyebrow">Year</dt>
                <dd>{p.year}</dd>
              </div>
            )}
            <div>
              <dt className="eyebrow">{labels.ourCraft}</dt>
              <dd className="flex flex-wrap gap-x-3">
                {p.crafts.map((c) => (
                  <Link
                    key={c}
                    to={`/services/${c}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {serviceBySlug[c]?.title}
                  </Link>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {story.length > 0 && (
        <section className="container-site grid gap-10 py-20 md:grid-cols-3 md:py-28">
          {story.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <h2 className="eyebrow mb-4">{s.label}</h2>
              <p className="text-lg text-bone/85">{s.text}</p>
            </Reveal>
          ))}
        </section>
      )}

      <section className={story.length ? "pb-20 md:pb-28" : "py-20 md:py-28"}>
        <PinnedGallery images={p.images} />
      </section>

      <Link
        to={`/work/${next.slug}`}
        className="group relative block overflow-hidden border-t border-line"
      >
        <div className="relative h-[46svh] min-h-72 overflow-hidden">
          <Photo
            src={next.cover}
            alt={next.coverAlt}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover opacity-50 transition duration-1000 group-hover:scale-105 group-hover:opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />
          <div className="container-site relative flex h-full items-end justify-between gap-6 pb-12">
            <div>
              <p className="eyebrow mb-3">{next.discipline}</p>
              <p className="display text-display-lg text-bone transition group-hover:translate-x-2">
                {next.title}
              </p>
            </div>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-bone text-2xl text-morio transition group-hover:-rotate-45 md:size-20">
              <Icon name="arrow" />
            </span>
          </div>
        </div>
      </Link>

      <section className="container-site py-20 md:py-28">
        <BriefTeaser />
      </section>
    </>
  );
}
