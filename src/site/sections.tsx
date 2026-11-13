import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { mantra, morioisms, site } from "../content/site";
import { services } from "../content/services";
import { team } from "../content/team";
import type { WorkItem } from "../content/work";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";

/** Section heading with eyebrow and optional link. */
export function SectionHead({ eyebrow, title, link }: { eyebrow: string; title: ReactNode; link?: { to: string; label: string } }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="display max-w-3xl text-display-md text-bone">{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="btn-ghost self-start md:self-auto">
          {link.label} <Icon name="arrow" />
        </Link>
      )}
    </Reveal>
  );
}

/** The six crafts; the summary opens on hover (desktop) and is always shown on touch. */
export function ServiceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 40} className="border-b border-line">
          <Link to={`/services/${s.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 md:grid-cols-[5rem_1.1fr_1fr_auto] md:gap-8 md:py-9">
            <span className="font-display text-lg text-sage">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <H className="display text-[1.85rem] leading-none text-bone transition-colors duration-300 group-hover:text-mist sm:text-4xl md:text-5xl">{s.title}</H>
              <p className="mt-3 text-sm text-sage md:hidden">{s.summary}</p>
            </div>
            <p className="hidden max-w-md text-sage transition duration-500 md:block md:translate-x-2 md:opacity-60 md:group-hover:translate-x-0 md:group-hover:opacity-100">{s.summary}</p>
            <span className="grid size-11 place-items-center rounded-full border border-line text-bone transition duration-300 group-hover:-rotate-45 group-hover:border-bone group-hover:bg-bone group-hover:text-morio md:size-14">
              <Icon name="arrow" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}

const SPAN = { wide: "sm:col-span-2", tall: "sm:row-span-2" } as const;

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <ul className="grid grid-flow-dense auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[17rem] lg:grid-cols-3 lg:auto-rows-[19rem] lg:gap-5">
      {items.map((w, i) => (
        <Reveal as="li" key={w.image} delay={(i % 3) * 80} className={`group relative overflow-hidden rounded-2xl bg-ink-3 ${w.span ? SPAN[w.span] : ""}`}>
          <Photo
            src={w.image}
            alt={w.alt}
            sizes={w.span === "wide" ? "(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="eyebrow text-mist">{w.discipline}</p>
            <p className="display mt-1 text-2xl text-bone">{w.title}</p>
            {w.client && <p className="text-sm text-bone/70">{[w.client, w.year].filter(Boolean).join(" · ")}</p>}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Spotlight portraits; the light "switches on" to the real portrait on hover / tap. */
export function TeamGrid() {
  const [lit, setLit] = useState<string | null>(null);
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m, i) => {
        const on = lit === m.name;
        return (
          <Reveal as="li" key={m.name} delay={i * 80}>
            <button
              type="button"
              onClick={() => setLit(on ? null : m.name)}
              onMouseEnter={() => setLit(m.name)}
              onMouseLeave={() => setLit(null)}
              aria-pressed={on}
              aria-label={`${m.shortName}, ${m.title}. Show portrait`}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink-3">
                <Photo src={m.spotlight} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={`absolute inset-0 size-full object-cover transition duration-700 ${on ? "opacity-0" : "opacity-100"}`} />
                <Photo src={m.portrait} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={`absolute inset-0 size-full object-cover grayscale transition duration-700 ${on ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
              </span>
              <span className="display mt-5 block text-2xl text-bone">{m.shortName}</span>
              <span className="block text-sage">{m.title}</span>
            </button>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** "Speak Morio": the studio's slang, from the original testimonial slider. */
export function Morioisms() {
  return (
    <section aria-labelledby="speak-morio" className="relative overflow-hidden border-y border-line bg-morio-deep py-20 md:py-28">
      <div className="container-site">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Speak Morio</p>
            <h2 id="speak-morio" className="display text-display-md text-bone">
              A little phrasebook
            </h2>
          </div>
          <p className="max-w-sm text-sage">How the Morios talk in the studio. You’ll hear these in meetings.</p>
        </div>
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {morioisms.map((m, i) => (
            <Reveal as="li" key={m.phrase} delay={i * 60} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <figure className="flex h-full min-h-56 flex-col justify-between rounded-2xl border border-line bg-ink/40 p-6 transition duration-500 hover:-translate-y-1 hover:border-mist/40">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-sage/50">
                  “
                </span>
                <blockquote className="display text-4xl text-bone">{m.phrase}</blockquote>
                <figcaption className="mt-4 text-sm text-sage">{m.meaning}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Teaser for the AI brief builder on the Hola page. */
export function BriefTeaser() {
  return (
    <section className="container-site pb-24 md:pb-32">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-morio to-morio-deep p-8 md:p-14">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-mist/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4 text-mist">New · Brief Builder</p>
            <h2 className="display text-display-md text-bone">Got a rough idea? Our AI will shape it into a brief.</h2>
            <p className="mt-5 max-w-xl text-bone/80">
              Describe what you’re making in your own words, Sheng welcome. Brief Builder turns it into a clear creative brief, suggests
              the right Morio crafts and sparks a few directions, ready to send.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link to="/contact#brief-builder" className="btn-primary">
              Try Brief Builder <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaBand({ title = "Got a brief? Let’s talk." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-morio">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-24 size-[34rem] rounded-full bg-mist/10 blur-3xl" />
      <div className="container-site relative flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-mist">“{mantra}”</p>
          <h2 className="display max-w-3xl text-display-lg text-bone">{title}</h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Say Hola <Icon name="arrow" />
          </Link>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-ghost">
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
