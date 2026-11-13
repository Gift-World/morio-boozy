import { useEffect, useRef, useState } from "react";
import { Photo } from "../../components/Photo";
import { aboutCopy, labels } from "../../content/site";
import { team, type Morio } from "../../content/team";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { BriefTeaser } from "../sections";

/**
 * "Lights on": the four spotlight silhouettes; a beam of light (cursor, finger,
 * or a slow automatic sweep) reveals the real portraits underneath.
 */
function LightsOn() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0.5, y: 0.45 };
    const pos = { x: 0.5, y: 0.45 };
    let last = -1e9;
    let raf = 0;
    let visible = true;
    const tick = (t: number) => {
      if (t - last > 2600) {
        target.x = 0.5 + Math.sin(t / 2400) * 0.42;
        target.y = 0.48 + Math.cos(t / 3100) * 0.12;
      }
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.setProperty("--lx", `${pos.x * 100}%`);
      el.style.setProperty("--ly", `${pos.y * 100}%`);
      if (visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      last = performance.now();
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  const mask = "radial-gradient(circle at var(--lx, 50%) var(--ly, 45%), black 0, black 9%, transparent 22%)";
  return (
    <div ref={stage} className="relative touch-pan-y select-none">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {team.map((m) => (
          <div key={m.name} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ink-3 md:rounded-2xl">
            <Photo src={m.spotlight} alt={`${m.name}, ${m.role}`} sizes="(min-width: 768px) 25vw, 50vw" priority className="absolute inset-0 size-full object-cover" />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        {team.map((m) => (
          <div key={m.name} className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl">
            <Photo src={m.portrait} alt="" sizes="(min-width: 768px) 25vw, 50vw" className="absolute inset-0 size-full object-cover grayscale" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** One founder; the light switches on as their portrait reaches the middle of the screen. */
function Founder({ m, flip }: { m: Morio; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLit(e.isIntersecting), { rootMargin: "-35% 0px -35% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} className="grid items-center gap-10 md:grid-cols-12">
      <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3 md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
        <Photo src={m.spotlight} alt="" sizes="(min-width: 768px) 40vw, 100vw" className={`absolute inset-0 size-full object-cover transition duration-[1200ms] ${lit ? "opacity-0" : "opacity-100"}`} />
        <Photo src={m.portrait} alt={`${m.name}, ${m.role}`} sizes="(min-width: 768px) 40vw, 100vw" className={`absolute inset-0 size-full object-cover grayscale transition duration-[1200ms] ${lit ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
      </div>
      <div className={`md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
        <p className="eyebrow mb-4">{m.role}</p>
        <h3 className="display text-display-md text-bone">{m.name}</h3>
        <p className="mt-6 text-lg text-bone/80">{m.bio}</p>
        <a href={m.portfolio} target="_blank" rel="noopener" className="btn-ghost mt-8">
          <Icon name="behance" /> {labels.portfolio}
        </a>
      </div>
    </article>
  );
}

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h1 className="display text-display-2xl text-bone">
              The <span className="text-outline">Morios</span>
            </h1>
            <p className="max-w-xs text-lg text-bone/85">
              <strong className="font-medium text-bone">Morio</strong> {aboutCopy.definition}
            </p>
          </div>
          <LightsOn />
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Photo src="/assets/images/service/m2.jpeg" alt="The Morios at work" sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg text-bone/85 md:col-span-7 md:text-xl">
          <p>
            <strong className="font-medium text-bone">Morio Studios</strong> {aboutCopy.collective}
          </p>
          <p>{aboutCopy.delivery}</p>
          <p className="display pt-4 text-3xl text-bone md:text-4xl">{aboutCopy.closer}</p>
        </Reveal>
      </section>

      <section className="container-site py-20 md:py-28">
        <h2 className="display mb-14 text-display-md text-bone md:mb-20">{labels.experiencedTeam}</h2>
        <div className="space-y-20 md:space-y-28">
          {team.map((m, i) => (
            <Founder key={m.name} m={m} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <BriefTeaser />
      </section>
    </>
  );
}
