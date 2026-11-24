import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { labels } from "../../content/site";
import { serviceBySlug } from "../../content/services";
import { projectBySlug, projectLabel, projects, type Discipline } from "../../content/work";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser } from "../sections";
import { AiReel, FilmReel, ProjectWall } from "../showcase";
import { Flipbook } from "../three/Flipbook";

const DISCIPLINES: Discipline[] = ["Branding", "Publication design", "Photography", "Packaging", "Art direction"];
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
  // a mix of everything: the cover and one inside image from each project
  const all = [...new Set([...projects.map((p) => p.cover), ...projects.map((p) => p.images[Math.min(2, p.images.length - 1)].src)])];
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
      <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl bg-morio-deep pt-32 pb-14 sm:mx-5 sm:mt-5 md:rounded-[2.5rem] md:pt-44 md:pb-20">
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
          <p className="display text-[clamp(1.7rem,4vw,3rem)] leading-[1.15] text-bone">
            We do <Blank label="Type of work" value={discipline} options={[ANY_WORK, ...DISCIPLINES]} onChange={setDiscipline} />
            {industries.length > 0 && (
              <>
                {" "}
                for <Blank label="Who it's for" value={industry} options={[ANYONE, ...industries]} onChange={setIndustry} />
              </>
            )}
            .
          </p>
          <p className="shrink-0 font-medium text-sage">
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setDiscipline(ANY_WORK);
                  setIndustry(ANYONE);
                }}
                className="text-bone underline underline-offset-4 hover:text-mist"
              >
                Show all
              </button>
            )}
          </p>
        </div>
        <ProjectWall items={items} priority={2} />
      </section>

      <section className="container-site pb-20 md:pb-28">
        <h2 className="display mb-10 text-display-md text-bone md:mb-14">Films and Documentaries</h2>
        <FilmReel />
      </section>

      <section className="mx-3 mb-20 rounded-3xl bg-ink-2 py-16 sm:mx-5 md:mb-28 md:rounded-[2.5rem] md:py-24">
        <div className="container-site">
          <AiReel />
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <BriefTeaser />
      </section>
    </>
  );
}

/** Full-screen viewer for the gallery: arrows, swipe, Escape. */
function Viewer({ images, index, onChange, onClose }: { images: { src: string; alt: string }[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const touch = useRef<number | null>(null);
  const n = images.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % n);
      if (e.key === "ArrowLeft") onChange((index - 1 + n) % n);
    };
    const root = document.documentElement;
    document.addEventListener("keydown", onKey);
    root.style.overflow = "hidden";
    // sideways swipes change the picture; stop the browser treating them as "go back"
    root.style.overscrollBehaviorX = "none";
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      root.style.overscrollBehaviorX = "";
    };
  }, [index, n, onChange, onClose]);
  const im = images[index];
  const btn = "grid size-12 shrink-0 place-items-center rounded-full border border-line text-bone transition hover:border-bone";
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={im.alt}
      data-lenis-prevent
      className="theme-dark fixed inset-0 z-[70] flex touch-pan-y touch-pinch-zoom flex-col overscroll-contain bg-ink/95 p-4 backdrop-blur-md sm:p-6"
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) onChange((index + (dx < 0 ? 1 : -1) + n) % n);
      }}
    >
      <div className="flex items-center justify-between gap-4 pb-3">
        <p className="text-sm font-medium text-bone tabular-nums">
          {String(index + 1).padStart(2, "0")} <span className="text-sage">/ {String(n).padStart(2, "0")}</span>
        </p>
        <button type="button" autoFocus onClick={onClose} aria-label="Close" className={btn}>
          <Icon name="close" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => onChange((index - 1 + n) % n)} aria-label="Previous picture" className={`${btn} hidden sm:grid`}>
          <Icon name="arrow" className="rotate-180" />
        </button>
        <div className="relative h-full min-w-0 flex-1" onClick={onClose}>
          <Photo key={im.src} src={im.src} alt={im.alt} sizes="100vw" className="absolute inset-0 size-full animate-rise object-contain" />
        </div>
        <button type="button" onClick={() => onChange((index + 1) % n)} aria-label="Next picture" className={`${btn} hidden sm:grid`}>
          <Icon name="arrow" />
        </button>
      </div>
    </div>
  );
}

/**
 * The project's pictures laid out as a board: rows of three, three, then two
 * larger ones, repeating (single column on phones). Any picture opens the
 * full-screen viewer.
 */
function GalleryBoard({ images }: { images: { src: string; alt: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  // row sizes: 3, 3, 2, 3, 3, 2 … with the last row stretched to fill
  const rows: number[] = [];
  for (let left = images.length, k = 0; left > 0; k++) {
    const want = k % 3 === 2 ? 2 : 3;
    const take = left - want === 1 ? want + 1 : Math.min(want, left);
    rows.push(take);
    left -= take;
  }
  const spans: string[] = [];
  rows.forEach((count) => {
    const cls = count === 1 ? "lg:col-span-12" : count === 2 ? "lg:col-span-6" : count === 4 ? "lg:col-span-3" : "lg:col-span-4";
    for (let i = 0; i < count; i++) spans.push(cls);
  });
  return (
    <div className="container-site">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-12">
        {images.map((im, i) => (
          <Reveal as="li" key={im.src} delay={(i % 3) * 70} className={`${spans[i]} ${images.length % 2 === 1 && i === images.length - 1 ? "sm:max-lg:col-span-2" : ""}`}>
            <button type="button" onClick={() => setOpen(i)} data-cursor="View" aria-label={`Open picture ${i + 1}: ${im.alt}`} className="group relative block aspect-[3/2] w-full overflow-hidden rounded-2xl bg-ink-3 md:rounded-3xl">
              <Photo
                src={im.src}
                alt={im.alt}
                sizes={spans[i] === "lg:col-span-4" ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : spans[i] === "lg:col-span-3" ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                priority={i < 2}
                className="absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </ul>
      {open !== null && <Viewer images={images} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
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
      <section className="theme-dark relative isolate mx-3 mt-3 flex min-h-[88svh] flex-col justify-end overflow-hidden rounded-3xl sm:mx-5 sm:mt-5 md:rounded-[2.5rem]">
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

      {p.book && (
        <section className={`container-site ${story.length ? "pb-16 md:pb-24" : "pt-16 md:pt-24"}`}>
          <Flipbook pages={p.book} title={projectLabel(p)} />
        </section>
      )}

      <section className={story.length ? "pb-20 md:pb-28" : "py-20 md:py-28"}>
        <GalleryBoard images={p.images} />
      </section>

      <Link
        to={`/work/${next.slug}`}
        className="theme-dark group relative mx-3 block overflow-hidden rounded-3xl bg-ink sm:mx-5 md:rounded-[2.5rem]"
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
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-bone text-2xl text-ink transition group-hover:-rotate-45 md:size-20">
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
