import { useState } from "react";
import { work, type Discipline } from "../../content/work";
import { CtaBand, PageHero, WorkGrid } from "../sections";

const FILTERS: ("All" | Discipline)[] = ["All", "Branding", "Packaging", "Art direction", "Photography"];

export function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = filter === "All" ? work : work.filter((w) => w.discipline === filter);
  return (
    <>
      <PageHero eyebrow="Selected work" title={<>Ideas, <span className="text-spot">made real.</span></>}>
        <p>Brand identities, packaging, art direction and photography from the Morio Studios team in Nairobi.</p>
      </PageHero>
      <section className="container-site py-16 md:py-24">
        <div role="group" aria-label="Filter work" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2 font-display text-sm tracking-[0.12em] uppercase transition ${
                filter === f ? "border-spot bg-spot text-ink" : "border-line text-bone hover:border-spot hover:text-spot"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <WorkGrid items={filter === "All" ? items : items.map((w) => ({ ...w, span: undefined }))} />
      </section>
      <CtaBand title="Want work like this?" />
    </>
  );
}
