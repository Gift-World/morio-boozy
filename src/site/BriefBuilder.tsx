import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../components/Photo";
import { serviceBySlug, services } from "../content/services";
import { projects } from "../content/work";
import { Icon } from "./icons";

/** Shape returned by /api/brief (netlify/functions/brief.mts). */
export interface Brief {
  fit: boolean;
  title: string;
  summary: string;
  objective: string;
  audience: string;
  deliverables: string[];
  crafts: string[];
  timeline: string;
  directions: { name: string; idea: string }[];
  questions: string[];
}

const EXAMPLES = [
  "We’re launching a fresh juice brand in Nairobi and need a name, a look and a launch video for Instagram.",
  "Our NGO needs a short documentary about women farmers in Kisumu for a donor event in March.",
  "Tunafungua café Westlands, tunataka branding na photos za menu 🙏",
];

const STAGES = ["Reading your idea…", "Matching Morio crafts…", "Sparking directions…", "Writing your brief…"];

/** Simple keyword brief so the feature can be previewed before the API key is set. */
function previewBrief(idea: string): Brief {
  const t = idea.toLowerCase();
  const pick: string[] = [];
  const has = (...w: string[]) => w.some((x) => t.includes(x));
  if (has("brand", "logo", "identity", "name", "packag", "branding")) pick.push("branding");
  if (has("film", "video", "documentar", "reel", "ad ", "advert")) pick.push("film");
  if (has("photo", "picha", "shoot", "menu", "product")) pick.push("photography");
  if (has("anim", "motion", "explainer", "2d", "3d")) pick.push("animation");
  if (has("live", "stream", "event", "launch")) pick.push("livestreaming");
  if (has("campaign", "concept", "idea", "direction")) pick.push("creative-direction");
  const crafts = [...new Set(pick.length ? pick : ["creative-direction"])].slice(0, 3);
  return {
    fit: true,
    title: "Your project, in brief",
    summary: idea.length > 220 ? `${idea.slice(0, 217)}…` : idea,
    objective: "Turn the idea into creative work that people notice, remember and act on.",
    audience: "To be defined together: who you most want to reach.",
    deliverables: crafts.flatMap((c) => serviceBySlug[c].includes.slice(0, 2)),
    crafts,
    timeline: "Depends on scope; we’ll estimate it once we know a bit more.",
    directions: [
      { name: "Say it simply", idea: "One clear, bold message carried consistently across every touchpoint." },
      { name: "Show real people", idea: "Honest faces and places from the community you’re speaking to." },
      { name: "Make it a moment", idea: "A launch built around one shareable moment people want to pass on." },
    ],
    questions: ["Who is the main audience?", "When do you need it live?", "Is there a budget range we should design for?"],
  };
}

export function briefToText(b: Brief) {
  return [
    `Project: ${b.title}`,
    b.summary,
    `Objective: ${b.objective}`,
    `Audience: ${b.audience}`,
    `Deliverables: ${b.deliverables.join("; ")}`,
    `Crafts: ${b.crafts.map((c) => serviceBySlug[c]?.title ?? c).join(", ")}`,
    `Timeline (estimate): ${b.timeline}`,
    `Directions: ${b.directions.map((d) => `${d.name}: ${d.idea}`).join(" | ")}`,
  ].join("\n");
}

type State = { status: "idle" } | { status: "loading" } | { status: "done"; brief: Brief; preview: boolean } | { status: "error"; message: string };

export function BriefBuilder({ onUse }: { onUse: (brief: Brief) => void }) {
  const [idea, setIdea] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (state.status !== "loading") return;
    setStage(0);
    const id = window.setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 1600);
    return () => window.clearInterval(id);
  }, [state.status]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("website") as string) || "";
    if (idea.trim().length < 12) {
      setState({ status: "error", message: "Tell us a little more about the idea (a sentence or two)." });
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { brief?: Brief; preview?: boolean; error?: string };
      if (res.ok && data.brief) return setState({ status: "done", brief: data.brief, preview: false });
      if (res.status === 503 || res.status === 404 || data.preview) return setState({ status: "done", brief: previewBrief(idea), preview: true });
      setState({ status: "error", message: data.error ?? "Something went wrong. Please send your idea directly below." });
    } catch {
      setState({ status: "done", brief: previewBrief(idea), preview: true });
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <form onSubmit={submit} className="lg:col-span-5">
        <label htmlFor="idea" className="eyebrow mb-3 block">
          Describe your idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          maxLength={1500}
          rows={6}
          placeholder="What are you making, who is it for, and when do you need it? Any language, Sheng welcome."
          className="w-full rounded-2xl border border-line bg-ink/60 px-5 py-4 text-lg text-bone placeholder:text-sage/70 focus:border-mist focus:outline-none"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((x) => (
            <button key={x} type="button" onClick={() => setIdea(x)} className="rounded-full border border-line px-3.5 py-1.5 text-left text-sm text-sage transition hover:border-mist hover:text-bone">
              {x.length > 46 ? `${x.slice(0, 44)}…` : x}
            </button>
          ))}
        </div>
        <button type="submit" disabled={state.status === "loading"} className="btn-primary mt-6 w-full sm:w-auto disabled:opacity-60">
          {state.status === "loading" ? "Building…" : "Build my brief"} <Icon name="arrow" />
        </button>
        <p className="mt-4 text-xs text-sage">Your text is sent to an AI model to draft the brief. It isn’t sent to the Morios until you choose to.</p>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {state.status === "idle" && (
          <div className="grid h-full min-h-72 place-items-center rounded-3xl border border-dashed border-line p-8 text-center">
            <div>
              <p className="display text-3xl text-bone/80">Your brief appears here</p>
              <p className="mt-3 text-sage">Objective, audience, deliverables, the right crafts and three creative directions.</p>
            </div>
          </div>
        )}
        {state.status === "loading" && (
          <div className="grid h-full min-h-72 place-items-center rounded-3xl border border-line bg-ink-2 p-8">
            <div className="w-full max-w-sm space-y-4">
              {STAGES.map((s, i) => (
                <p key={s} className={`flex items-center gap-3 transition duration-500 ${i <= stage ? "text-bone" : "text-sage/40"}`}>
                  <span className={`size-2 rounded-full ${i < stage ? "bg-mist" : i === stage ? "animate-pulse bg-bone" : "bg-sage/30"}`} />
                  {s}
                </p>
              ))}
            </div>
          </div>
        )}
        {state.status === "error" && (
          <div role="alert" className="rounded-3xl border border-line bg-ink-2 p-8">
            <p className="text-lg text-bone">{state.message}</p>
          </div>
        )}
        {state.status === "done" && <BriefCard brief={state.brief} preview={state.preview} onUse={onUse} onReset={() => setState({ status: "idle" })} />}
      </div>
    </div>
  );
}

function BriefCard({ brief, preview, onUse, onReset }: { brief: Brief; preview: boolean; onUse: (b: Brief) => void; onReset: () => void }) {
  if (!brief.fit) {
    return (
      <div className="rounded-3xl border border-line bg-ink-2 p-8">
        <p className="text-lg text-bone">{brief.summary}</p>
        <button type="button" onClick={onReset} className="btn-ghost mt-6">
          Try another idea
        </button>
      </div>
    );
  }
  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-ink-2">
      <header className="border-b border-line bg-morio/60 p-6 md:p-8">
        {preview && (
          <p className="mb-4 inline-block rounded-full border border-mist/40 px-3 py-1 text-xs tracking-wide text-mist uppercase">
            Preview · the full AI version switches on soon
          </p>
        )}
        <p className="eyebrow mb-2">Your brief</p>
        <h3 className="display text-4xl text-bone">{brief.title}</h3>
        <p className="mt-3 text-bone/85">{brief.summary}</p>
      </header>
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
        <div>
          <h4 className="eyebrow mb-2">Objective</h4>
          <p className="text-bone/90">{brief.objective}</p>
        </div>
        <div>
          <h4 className="eyebrow mb-2">Audience</h4>
          <p className="text-bone/90">{brief.audience}</p>
        </div>
        <div>
          <h4 className="eyebrow mb-2">Deliverables</h4>
          <ul className="space-y-1.5 text-bone/90">
            {brief.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mist" />
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-2">Morio crafts</h4>
          <ul className="flex flex-wrap gap-2">
            {brief.crafts
              .filter((c) => serviceBySlug[c])
              .map((c) => (
                <li key={c}>
                  <Link to={`/services/${c}`} className="inline-block rounded-full border border-line px-3 py-1.5 text-sm text-bone hover:border-mist">
                    {serviceBySlug[c].title}
                  </Link>
                </li>
              ))}
          </ul>
          <h4 className="eyebrow mt-5 mb-2">Timeline (estimate)</h4>
          <p className="text-bone/90">{brief.timeline}</p>
        </div>
      </div>
      <div className="border-t border-line p-6 md:p-8">
        <h4 className="eyebrow mb-4">Three directions</h4>
        <ol className="grid gap-3 md:grid-cols-3">
          {brief.directions.slice(0, 3).map((d, i) => (
            <li key={d.name} className="rounded-2xl bg-ink/60 p-5">
              <p className="font-display text-sm text-sage">0{i + 1}</p>
              <p className="display mt-2 text-2xl text-bone">{d.name}</p>
              <p className="mt-2 text-sm text-bone/80">{d.idea}</p>
            </li>
          ))}
        </ol>
        {brief.questions.length > 0 && (
          <>
            <h4 className="eyebrow mt-6 mb-2">The Morios would ask</h4>
            <ul className="space-y-1 text-sm text-sage">
              {brief.questions.map((q) => (
                <li key={q}>· {q}</li>
              ))}
            </ul>
          </>
        )}
        <RelatedWork crafts={brief.crafts} />
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => onUse(brief)} className="btn-primary">
            Send this brief to the Morios <Icon name="arrow" />
          </button>
          <button type="button" onClick={onReset} className="btn-ghost">
            Start over
          </button>
        </div>
      </div>
    </article>
  );
}

/** Studio projects that share a craft with the brief, best matches first. */
function RelatedWork({ crafts }: { crafts: string[] }) {
  const related = projects
    .map((p) => ({ p, score: p.crafts.filter((c) => crafts.includes(c)).length }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.p);
  if (!related.length) return null;
  return (
    <>
      <h4 className="eyebrow mt-8 mb-4">Related work</h4>
      <ul className="grid grid-cols-3 gap-3">
        {related.map((p) => (
          <li key={p.slug}>
            <Link to={`/work/${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-3">
                <Photo src={p.cover} alt={p.coverAlt} sizes="(min-width: 768px) 20vw, 30vw" className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-2 text-sm text-bone/90 group-hover:text-bone">{p.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const serviceTitleFor = (b: Brief) => serviceBySlug[b.crafts[0]]?.title ?? services[0].title;
