import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { morioisms, site } from "../content/site";
import { services } from "../content/services";
import { team } from "../content/team";
import type { WorkItem } from "../content/work";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";

/** Title block for inner pages. */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep pt-36 pb-16 md:pt-48 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-spot/10 blur-3xl"
      />
      <div className="container-site relative">
        <p className="eyebrow mb-6 text-spot">{eyebrow}</p>
        <h1 className="display max-w-5xl text-display-lg text-bone">{title}</h1>
        {children && <div className="mt-8 max-w-2xl text-lg text-bone/80 md:text-xl">{children}</div>}
      </div>
    </section>
  );
}

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

export function ServiceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 40} className="border-b border-line">
          <Link
            to={`/services/${s.slug}`}
            className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8 md:py-9"
          >
            <span className="font-display text-lg text-mute">{String(i + 1).padStart(2, "0")}</span>
            <H className="display text-3xl text-bone transition-colors duration-300 group-hover:text-spot md:text-5xl">
              {s.title}
            </H>
            <p className="hidden max-w-md text-mute md:block">{s.summary}</p>
            <span className="grid size-11 place-items-center rounded-full border border-line text-bone transition duration-300 group-hover:-rotate-45 group-hover:border-spot group-hover:bg-spot group-hover:text-ink md:size-14">
              <Icon name="arrow" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}

const SPAN = { wide: "md:col-span-2", tall: "md:row-span-2" } as const;

export function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <ul className="grid grid-flow-dense auto-rows-[17rem] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[19rem] md:grid-cols-3 md:gap-5">
      {items.map((w, i) => (
        <Reveal as="li" key={w.image} delay={(i % 3) * 80} className={`group relative overflow-hidden rounded-2xl bg-ink-3 ${w.span ? SPAN[w.span] : ""}`}>
          <Photo
            src={w.image}
            alt={w.alt}
            sizes={w.span === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="absolute inset-0 size-full object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
            <div>
              <p className="eyebrow text-spot">{w.discipline}</p>
              <p className="display mt-1 text-2xl text-bone">{w.title}</p>
              {w.client && <p className="text-sm text-bone/70">{[w.client, w.year].filter(Boolean).join(" · ")}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function TeamGrid() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m, i) => (
        <Reveal as="li" key={m.name} delay={i * 80}>
          <a href={m.portfolio} target="_blank" rel="noopener" className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-3">
              <Photo
                src={m.spotlight}
                alt={`${m.name}, ${m.role}`}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover transition duration-700 group-hover:opacity-0"
              />
              <Photo
                src={m.portrait}
                alt=""
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 size-full object-cover opacity-0 grayscale transition duration-700 group-hover:opacity-100"
              />
              <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-ink/70 text-bone opacity-0 transition group-hover:opacity-100">
                <Icon name="behance" />
              </span>
            </div>
            <p className="display mt-5 text-2xl text-bone">{m.name}</p>
            <p className="text-mute">{m.role}</p>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}

/** Endless strip of Morio slang. */
export function Morioisms() {
  const row = morioisms.map((m) => (
    <Fragment key={m.phrase}>
      <span className="display text-5xl text-bone md:text-7xl">{m.phrase}</span>
      <span className="max-w-[12rem] text-sm leading-snug text-mute">{m.meaning}</span>
      <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-spot" />
    </Fragment>
  ));
  return (
    <section aria-label="Morio slang" className="overflow-hidden border-y border-line bg-ink-2 py-10 md:py-14">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8 hover:[animation-play-state:paused] md:gap-12 md:pr-12">
        {row}
        <span aria-hidden="true" className="contents">
          {row}
        </span>
      </div>
    </section>
  );
}

export function CtaBand({ title = "Got a brief? Let’s talk." }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-24 size-[34rem] rounded-full bg-spot/15 blur-3xl" />
      <div className="container-site relative flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-bone/70">Start a project</p>
          <h2 className="display max-w-3xl text-display-lg text-bone">{title}</h2>
        </Reveal>
        <Reveal delay={120} className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-spot">
            Send a brief <Icon name="arrow" />
          </Link>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-ghost">
            <Icon name="whatsapp" /> WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
