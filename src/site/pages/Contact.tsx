import { useState, type FormEvent } from "react";
import { site } from "../../content/site";
import { services } from "../../content/services";
import { team } from "../../content/team";
import { Icon } from "../icons";
import { PageHero } from "../sections";

const FORM_NAME = "project-brief";
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Brief form, handled by Netlify Forms (detected from the prerendered HTML at
 * deploy; submissions appear in the Netlify dashboard and can be emailed).
 */
function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      e.currentTarget?.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-spot/40 bg-forest p-10">
        <p className="display text-4xl text-bone">Noma sana! Brief received.</p>
        <p className="mt-4 text-lg text-bone/80">A Morio will be in touch soon.</p>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-line bg-ink-2 px-4 py-3.5 text-bone placeholder:text-mute/70 transition focus:border-spot focus:outline-none";
  return (
    <form name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="company-website" onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Leave this empty: <input name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="grid gap-2">
        <span className="eyebrow">Your name</span>
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">Email</span>
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">Phone (optional)</span>
        <input type="tel" name="phone" autoComplete="tel" className={field} />
      </label>
      <label className="grid gap-2">
        <span className="eyebrow">What do you need?</span>
        <select name="service" className={field} defaultValue="">
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="eyebrow">Tell us about the project</span>
        <textarea required name="message" rows={6} className={field} placeholder="The brief, timeline and budget range if you have one." />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-spot disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send brief"} <Icon name="arrow" />
        </button>
        {status === "error" && (
          <p role="alert" className="text-bone/80">
            That didn’t go through. Email us at{" "}
            <a className="text-spot underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            instead.
          </p>
        )}
      </div>
    </form>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={<>Talk to a <span className="text-spot">Morio</span></>}>
        <p>Tell us what you’re making, and a Morio will get back to you.</p>
      </PageHero>

      <section className="container-site grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <h2 className="display mb-10 text-display-md text-bone">Send us a brief</h2>
          <BriefForm />
        </div>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="eyebrow mb-4 text-spot">Quickest</h2>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-spot">
              <Icon name="whatsapp" /> Chat on WhatsApp
            </a>
          </div>
          <div>
            <h2 className="eyebrow mb-4 text-spot">Call or email</h2>
            <ul className="space-y-2 text-lg">
              <li>
                <a className="link-underline text-bone" href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a className="link-underline text-bone" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              {team.map((m) => {
                const first = m.name.split(" ")[0].toLowerCase();
                return (
                  <li key={m.name}>
                    <a className="link-underline text-bone/80" href={`mailto:${first}@moriostudios.africa`}>
                      {first}@moriostudios.africa
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4 text-spot">Office hours</h2>
            <p className="text-lg text-bone">{site.hours.label}</p>
          </div>
          <div>
            <h2 className="eyebrow mb-4 text-spot">Post</h2>
            <p className="text-lg text-bone">{site.postal}</p>
          </div>
        </aside>
      </section>

      <section aria-label="Map" className="h-[26rem] border-t border-line md:h-[32rem]">
        <iframe
          title="Morio Studios on Google Maps"
          src={site.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full grayscale invert-[0.9] contrast-[0.9]"
        />
      </section>
    </>
  );
}
