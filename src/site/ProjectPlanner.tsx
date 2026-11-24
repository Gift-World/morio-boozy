import { useEffect, useId, useMemo, useState } from "react";
import { site } from "../content/site";
import { serviceBySlug, services } from "../content/services";
import { Icon } from "./icons";

const TIMELINES = ["As soon as possible", "This month", "In 1–3 months", "Just exploring"] as const;

/** The message the visitor will send, built from their choices. */
function compose(crafts: string[], about: string, when: string, name: string, company: string) {
  const who = [name.trim(), company.trim() && `from ${company.trim()}`].filter(Boolean).join(" ");
  const lines = ["Hola Morio Studios,", ""];
  if (who) lines.push(`I'm ${who.replace(/[.\s]+$/, "")}.`);
  if (crafts.length) lines.push(`I'd like help with ${listOf(crafts.map((c) => serviceBySlug[c]?.title.toLowerCase() ?? c))}.`);
  if (about.trim()) lines.push("", about.trim());
  if (when) lines.push("", `Timeline: ${when}`);
  return lines.join("\n");
}

function listOf(items: string[]) {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * "Start a project": pick the crafts, add a line or two, and send the message
 * straight to the studio on WhatsApp or by email (or into the form below).
 * Nothing is sent from the website itself, so it works on any host, costs
 * nothing to run and reaches the team where they already reply.
 */
export function ProjectPlanner({ onUseForm }: { onUseForm: (message: string, service: string) => void }) {
  const id = useId();
  const [crafts, setCrafts] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [when, setWhen] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  // /contact?craft=film preselects that craft (links from the craft pages)
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("craft");
    if (c && serviceBySlug[c]) setCrafts([c]);
  }, []);

  const message = useMemo(() => compose(crafts, about, when, name, company), [crafts, about, when, name, company]);
  const ready = name.trim().length > 1 && (crafts.length > 0 || about.trim().length > 5);
  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const subject = `Project enquiry${name.trim() ? ` from ${name.trim()}` : ""}`;
  const email = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  const toggle = (slug: string) => setCrafts((cs) => (cs.includes(slug) ? cs.filter((c) => c !== slug) : [...cs, slug]));
  const chip = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${on ? "border-bone bg-bone text-ink" : "border-line text-bone/85 hover:border-bone hover:text-bone"}`;
  const field = "w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone placeholder:text-sage/70 transition focus:border-mist focus:outline-none";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* choices */}
      <div className="space-y-8 lg:col-span-7">
        <fieldset>
          <legend className="eyebrow mb-3">1 · What do you need?</legend>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button key={s.slug} type="button" aria-pressed={crafts.includes(s.slug)} onClick={() => toggle(s.slug)} className={chip(crafts.includes(s.slug))}>
                {s.title}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-about`} className="eyebrow mb-3 block">
            2 · Tell us about it
          </label>
          <textarea
            id={`${id}-about`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            maxLength={600}
            rows={4}
            placeholder="What are you making, and who is it for?"
            className={field}
          />
        </div>

        <fieldset>
          <legend className="eyebrow mb-3">3 · When do you need it?</legend>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button key={t} type="button" aria-pressed={when === t} onClick={() => setWhen((w) => (w === t ? "" : t))} className={chip(when === t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="eyebrow mb-3 block">
              4 · Your name
            </label>
            <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
          </div>
          <div>
            <label htmlFor={`${id}-company`} className="eyebrow mb-3 block">
              Company (optional)
            </label>
            <input id={`${id}-company`} value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" className={field} />
          </div>
        </div>
      </div>

      {/* live preview of the message, then the ways to send it */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <div className="theme-dark rounded-3xl bg-[#0b141a] p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
              <img src="/assets/brand/morio-logo-white.svg" alt="" width={1421} height={1263} className="h-9 w-auto" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">Morio Studios</p>
                <p className="text-xs text-white/55">{site.phone.display}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <p aria-live="polite" className="max-w-[92%] rounded-2xl rounded-tr-md bg-[#005c4b] px-4 py-3 text-[0.95rem] leading-relaxed whitespace-pre-wrap text-white shadow-sm [overflow-wrap:anywhere]">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <a
              href={ready ? whatsapp : undefined}
              target="_blank"
              rel="noopener"
              aria-disabled={!ready}
              onClick={(e) => !ready && e.preventDefault()}
              className={`btn-primary sm:col-span-2 ${ready ? "" : "pointer-events-none opacity-45"}`}
            >
              <Icon name="whatsapp" /> Send on WhatsApp
            </a>
            <a href={ready ? email : undefined} aria-disabled={!ready} onClick={(e) => !ready && e.preventDefault()} className={`btn-ghost ${ready ? "" : "pointer-events-none opacity-45"}`}>
              <Icon name="mail" /> Send by email
            </a>
            <button type="button" disabled={!ready} onClick={() => onUseForm(message, crafts[0] ? serviceBySlug[crafts[0]].title : "")} className="btn-ghost disabled:opacity-45">
              Use the form
            </button>
          </div>
          <p className="mt-3 text-sm text-sage">
            {ready ? "Nothing is sent until you choose how to send it." : "Add your name and what you need to send it."}
          </p>
        </div>
      </div>
    </div>
  );
}
