import { Photo } from "../../components/Photo";
import { team } from "../../content/team";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";
import { CtaBand, Morioisms, PageHero } from "../sections";

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>The <span className="text-spot">Morios</span></>}>
        <p>
          <strong className="font-medium text-bone">Morio</strong> is Kiswahili slang for a friend: someone you can count
          on.
        </p>
      </PageHero>

      <section className="container-site grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Photo src="/assets/images/service/m2.jpeg" alt="The four Morios in a meeting" sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={120} className="space-y-6 text-lg text-bone/85 md:col-span-7 md:text-xl">
          <p>
            <strong className="font-medium text-bone">Morio Studios</strong> is a collective of four creative minds
            bringing unique flavour to the creative soup. Founded in 2024, a light-bulb moment sparked a studio blending
            talents across ideation, concept development, creative direction, graphic design, animation, photography and
            film.
          </p>
          <p>
            We deliver end-to-end creative output, from concept to final production, bringing brand and human stories to
            life through a fusion of talent, skill and experience. With new-age thinking, our workflows integrate AI
            creative tools to accelerate conceptualisation and visualisation, giving us the edge to deliver high-quality
            creativity in record time.
          </p>
          <p className="display pt-4 text-3xl text-spot md:text-4xl">Where vision meets innovation, Morio creates.</p>
        </Reveal>
      </section>

      <Morioisms />

      <section className="container-site py-20 md:py-28">
        <h2 className="display mb-14 text-display-md text-bone">Meet the team</h2>
        <div className="space-y-20 md:space-y-28">
          {team.map((m, i) => (
            <Reveal key={m.name} className="grid items-center gap-10 md:grid-cols-12">
              <div className={`relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-3 md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
                <Photo src={m.spotlight} alt={`${m.name}, ${m.role}`} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0 size-full object-cover" />
              </div>
              <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
                <p className="eyebrow mb-4 text-spot">{m.role}</p>
                <h3 className="display text-display-md text-bone">{m.name}</h3>
                <p className="mt-6 text-lg text-bone/80">{m.bio}</p>
                <a href={m.portfolio} target="_blank" rel="noopener" className="btn-ghost mt-8">
                  <Icon name="behance" /> Portfolio
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
