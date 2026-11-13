import { useEffect, useRef } from "react";
import { Photo } from "../../components/Photo";
import { aboutCopy } from "../../content/site";
import { team } from "../../content/team";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { CtaBand, Morioisms } from "../sections";

/**
 * "Lights on": the four spotlight silhouettes; a beam of light (cursor, finger,
 * or a slow automatic sweep) reveals the real portraits underneath.
 */
function LightsOn() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.5, y: 0.45 };
    const pos = { x: 0.5, y: 0.45 };
    let last = -1e9;
    let raf = 0;
    let visible = true;
    const set = (x: number, y: number) => {
      el.style.setProperty("--lx", `${x * 100}%`);
      el.style.setProperty("--ly", `${y * 100}%`);
    };
    const tick = (t: number) => {
      if (t - last > 2600) {
        // idle sweep across the four Morios
        target.x = 0.5 + Math.sin(t / 2400) * 0.42;
        target.y = 0.48 + Math.cos(t / 3100) * 0.12;
      }
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      set(pos.x, pos.y);
      if (visible) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      last = performance.now();
    };
    if (reduce) {
      set(0.5, 0.45);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
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
    <div ref={stage} className="relative touch-pan-y select-none" style={{ ["--lx" as string]: "50%", ["--ly" as string]: "45%" }}>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {team.map((m) => (
          <div key={m.name} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ink-3 md:rounded-2xl">
            <Photo src={m.spotlight} alt="" sizes="(min-width: 768px) 25vw, 50vw" priority className="absolute inset-0 size-full object-cover" />
          </div>
        ))}
      </div>
      {/* the same grid, real portraits, visible only inside the beam */}
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

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">About us</p>
              <h1 className="display text-display-2xl text-bone">
                The <span className="text-outline">Morios</span>
              </h1>
            </div>
            <p className="max-w-xs text-lg text-bone/80">
              <strong className="font-medium text-bone">Morio</strong> {aboutCopy.definition}
            </p>
          </div>
          <LightsOn />
          <p className="mt-4 text-sm text-sage">
            <span className="hidden md:inline">Move your cursor to light them up.</span>
            <span className="md:hidden">Drag across to light them up.</span>
          </p>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Photo src="/assets/images/service/m2.jpeg" alt="The four Morios working together" sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
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
        <p className="eyebrow mb-4">The team</p>
        <h2 className="display mb-14 text-display-md text-bone md:mb-20">Our Experienced Team</h2>
        <div className="space-y-20 md:space-y-28">
          {team.map((m, i) => (
            <Reveal key={m.name} as="article" className="grid items-center gap-10 md:grid-cols-12">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3 md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <Photo src={m.spotlight} alt={`${m.name}, ${m.role}`} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
              </div>
              <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                <p className="eyebrow mb-4">{m.role}</p>
                <h3 className="display text-display-md text-bone">{m.name}</h3>
                <p className="mt-6 text-lg text-bone/80">{m.bio}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={m.portfolio} target="_blank" rel="noopener" className="btn-ghost">
                    <Icon name="behance" /> Portfolio
                  </a>
                  <a href={`mailto:${m.email}`} className="btn-ghost">
                    <Icon name="mail" /> Email
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Morioisms />
      <CtaBand />
    </>
  );
}
