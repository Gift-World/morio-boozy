import { useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { work, type Discipline } from "../../content/work";
import { CtaBand, WorkGrid } from "../sections";

const FILTERS: ("All" | Discipline)[] = ["All", "Branding", "Packaging", "Art direction", "Photography"];

/** Two rows of work drifting in opposite directions, like a contact sheet. */
function FilmStrip() {
  const rows = [work.slice(0, 6), work.slice(6)];
  return (
    <div aria-hidden="true" className="space-y-4 md:space-y-5">
      {rows.map((row, r) => (
        <div key={r} className="overflow-hidden">
          <div className={`flex w-max gap-4 md:gap-5 ${r ? "animate-marquee-rev" : "animate-marquee"}`}>
            {[...row, ...row].map((w, i) => (
              <div key={w.image + i} className="relative h-40 w-60 shrink-0 overflow-hidden rounded-xl sm:h-52 sm:w-80 md:h-64 md:w-[26rem]">
                <Photo src={w.image} alt="" sizes="(min-width: 768px) 416px, 320px" priority={i < 3 && r === 0} className="absolute inset-0 size-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = filter === "All" ? work : work.filter((w) => w.discipline === filter).map((w) => ({ ...w, span: undefined }));
  return (
    <>
      <section className="relative overflow-hidden bg-morio-deep pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="container-site relative z-10 mb-12 md:mb-16">
          <p className="eyebrow mb-5">Our Work</p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="display text-display-xl text-bone">
              Latest
              <br />
              <span className="text-outline">projects.</span>
            </h1>
            <p className="max-w-sm text-lg text-bone/80">Brand identities, packaging, art direction and photography from the Morio Studios team in Nairobi.</p>
          </div>
        </div>
        <FilmStrip />
      </section>

      <section className="container-site py-16 md:py-24">
        <div role="group" aria-label="Filter projects" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-5 py-2.5 font-display text-sm tracking-[0.12em] uppercase transition ${
                filter === f ? "border-bone bg-bone text-morio" : "border-line text-bone hover:border-bone"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <WorkGrid items={items} />
        <p className="mt-12 max-w-2xl text-sage">
          Full case studies are on the way. In the meantime, see each Morio’s portfolio on Behance from{" "}
          <Link to="/about" className="text-bone underline underline-offset-4">
            The Morios
          </Link>
          .
        </p>
      </section>
      <CtaBand title="Want work like this?" />
    </>
  );
}
