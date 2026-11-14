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

  const mask = "radial-gradient(circle at var(--lx, 50%) var(--ly, 45%), black 0, black 16%, transparent 34%)";
  return (
    <div ref={stage} className="relative touch-pan-y select-none">
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {team.map((m) => (
          <div key={m.name} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-3 md:rounded-2xl">
            <Photo src={m.spotlight} alt={`${m.name}, ${m.role}`} sizes="(min-width: 768px) 22vw, 45vw" priority className="absolute inset-0 size-full object-cover" />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-2 md:gap-3" style={{ WebkitMaskImage: mask, maskImage: mask }}>
        {team.map((m) => (
          <div key={m.name} className="relative aspect-[4/5] overflow-hidden rounded-xl md:rounded-2xl">
            <Photo src={m.portrait} alt="" sizes="(min-width: 768px) 25vw, 50vw" className="absolute inset-0 size-full object-cover grayscale" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** One founder; the light switches on as their portrait reaches the middle of the screen. */
function Founder({ m, index }: { m: Morio; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLit(e.isIntersecting), { rootMargin: "-30% 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} onMouseEnter={() => setLit(true)} className="grid gap-5 rounded-3xl bg-ink-2 p-4 sm:grid-cols-5 sm:gap-7 sm:p-5 md:rounded-[2rem]">
      <div className="theme-dark relative aspect-[5/4] overflow-hidden rounded-2xl bg-ink-3 sm:col-span-2 sm:aspect-[4/5]">
        <Photo src={m.spotlight} alt="" sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw" className={`absolute inset-0 size-full object-cover object-top transition duration-[1200ms] ${lit ? "opacity-0" : "opacity-100"}`} />
        <Photo src={m.portrait} alt={`${m.name}, ${m.role}`} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw" className={`absolute inset-0 size-full object-cover object-top grayscale transition duration-[1200ms] ${lit ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
        <span className="absolute top-3 left-3 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-bone backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="flex flex-col px-1 pb-2 sm:col-span-3 sm:py-3 sm:pr-3">
        <p className="eyebrow mb-3">{m.role}</p>
        <h3 className="display text-2xl text-bone md:text-[1.7rem]">{m.name}</h3>
        <p className="mt-4 text-[0.95rem] text-bone/80">{m.bio}</p>
        <a href={m.portfolio} target="_blank" rel="noopener" className="btn-ghost mt-6 self-start sm:mt-auto">
          <Icon name="behance" /> {labels.portfolio}
        </a>
      </div>
    </article>
  );
}

export function AboutPage() {
  return (
    <>
      {/* Hero: who the Morios are, beside the "lights on" stage */}
      <section className="container-site pt-28 md:pt-36">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4">{labels.aboutUs}</p>
            <h1 className="display text-display-2xl text-bone">
              The <span className="text-outline">Morios</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-bone/85 md:text-xl">
              <strong className="font-medium text-bone">Morio</strong> {aboutCopy.definition}
            </p>
            <div className="mt-8 max-w-xl space-y-4 border-t border-line pt-8 text-bone/80">
              <p>
                <strong className="font-medium text-bone">Morio Studios</strong> {aboutCopy.collective}
              </p>
              <p>{aboutCopy.delivery}</p>
            </div>
          </div>
          <div className="theme-dark rounded-3xl bg-morio-deep p-3 md:rounded-[2rem] md:p-4 lg:col-span-5 lg:col-start-8">
            <LightsOn />
          </div>
        </div>
      </section>

      {/* The studio at work, with the original closing line */}
      <section className="container-site py-16 md:py-24">
        <Reveal className="theme-dark relative isolate flex min-h-[22rem] items-end overflow-hidden rounded-3xl md:min-h-[30rem] md:rounded-[2.5rem]">
          <Photo src="/assets/images/service/m2.jpeg" alt="The Morios at work" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <p className="display max-w-3xl p-6 text-2xl text-bone md:p-12 md:text-4xl">{aboutCopy.closer}</p>
        </Reveal>
      </section>

      <section className="container-site pb-16 md:pb-24">
        <h2 className="display mb-8 text-display-md text-bone md:mb-12">{labels.experiencedTeam}</h2>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {team.map((m, i) => (
            <Founder key={m.name} m={m} index={i} />
          ))}
        </div>
      </section>

      <section className="container-site pb-20 md:pb-28">
        <BriefTeaser />
      </section>
    </>
  );
}
