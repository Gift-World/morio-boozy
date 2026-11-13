import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { site } from "../../content/site";
import { services } from "../../content/services";
import { BriefBuilder, briefToText, serviceTitleFor, type Brief } from "../BriefBuilder";
import { Icon } from "../icons";
import { Reveal } from "../Reveal";

const FORM_NAME = "project-brief";
type Status = "idle" | "sending" | "sent" | "error";
const BANNER = ["/assets/images/projects/ab7.jpeg", "/assets/images/projects/ab8.jpeg", "/assets/images/projects/ab1.jpeg"];

/** Live Nairobi time and whether the studio is in (Mon–Fri, 6 am – 8 pm EAT). */
function useNairobiClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return null;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const hour = Number(parts.hour);
  const open = !["Sat", "Sun"].includes(parts.weekday) && hour >= 6 && hour < 20;
  return { time: `${parts.hour}:${parts.minute}`, open };
}

/** The original contact banner's three images, cross-fading with a slow push-in. */
function Banner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % BANNER.length), 5000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20">
      {BANNER.map((src, n) => (
        <Photo
          key={src}
          src={src}
          alt=""
          sizes="100vw"
          priority={n === 0}
          className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1800ms,7000ms] ease-out ${n === i ? "scale-110 opacity-100" : "scale-100 opacity-0"}`}
        />
      ))}
    </div>
  );
}

/**
 * Brief form, handled by Netlify Forms (detected from the prerendered HTML at
 * deploy; submissions appear in the Netlify dashboard and can be emailed).
 */
function BriefForm({ message, service }: { message: string; service: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-3xl border border-mist/30 bg-morio p-10">
        <p className="display text-4xl text-bone">Noma, sana! Brief received.</p>
        <p className="mt-4 text-lg text-bone/80">A Morio will be in touch soon.</p>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-line bg-ink-2 px-4 py-3.5 text-bone placeholder:text-sage/70 transition focus:border-mist focus:outline-none";
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
        <select name="service" className={field} defaultValue={service}>
          <option value="" disabled>
            Choose a craft
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="grid gap-2 sm:col-span-2">
        <span className="eyebrow">Tell us about the project</span>
        <textarea required name="message" rows={message ? 10 : 6} defaultValue={message} className={field} placeholder="The brief, timeline and budget range if you have one." />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send brief"} <Icon name="arrow" />
        </button>
        {status === "error" && (
          <p role="alert" className="text-bone/80">
            That didn’t go through. Email us at{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
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
  const clock = useNairobiClock();
  const [prefill, setPrefill] = useState({ id: 0, message: "", service: "" });
  const formRef = useRef<HTMLDivElement>(null);

  const useBrief = (b: Brief) => {
    setPrefill((p) => ({ id: p.id + 1, message: briefToText(b), service: serviceTitleFor(b) }));
    requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden">
        <Banner />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-morio/40 mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="container-site pt-36 pb-14 md:pb-20">
          <nav aria-label="Breadcrumb" className="eyebrow mb-6 flex gap-2">
            <Link to="/" className="hover:text-bone">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-bone/80">Contact</span>
          </nav>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h1 className="display text-display-2xl text-bone">
              Contact <span className="text-outline">Us</span>
            </h1>
            <div className="flex w-fit items-center gap-4 rounded-full border border-bone/20 bg-ink/40 px-5 py-3 text-bone/90 backdrop-blur" aria-live="polite">
              <span className={`size-2.5 rounded-full ${clock?.open ? "bg-mist shadow-[0_0_12px_2px_rgb(212_224_218/0.6)]" : "bg-sage/50"}`} />
              <span>
                Nairobi <span className="font-display tracking-wider">{clock?.time ?? "--:--"}</span>
                <span className="text-sage"> · {clock ? (clock.open ? "Studio open" : "Studio closed") : "EAT"}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AI brief builder */}
      <section id="brief-builder" className="scroll-mt-24 border-b border-line bg-ink-2 py-20 md:py-28">
        <div className="container-site">
          <Reveal className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">Brief Builder · AI</p>
            <h2 className="display text-display-md text-bone">Got a rough idea? Shape it into a brief.</h2>
            <p className="mt-5 text-lg text-bone/80">
              Write it the way you’d say it. Brief Builder drafts a clear creative brief, suggests the right Morio crafts and sparks three
              directions. Edit it, then send it to us in one tap.
            </p>
          </Reveal>
          <BriefBuilder onUse={useBrief} />
        </div>
      </section>

      <section className="container-site grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <div ref={formRef} className="scroll-mt-28 md:col-span-7">
          <h2 className="display mb-10 text-display-md text-bone">Send us a brief</h2>
          <BriefForm key={prefill.id} message={prefill.message} service={prefill.service} />
        </div>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="eyebrow mb-4">Quickest</h2>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-primary">
              <Icon name="whatsapp" /> Chat on WhatsApp
            </a>
          </div>
          <div>
            <h2 className="eyebrow mb-4">For Inquiries</h2>
            <ul className="space-y-2 text-lg">
              <li>
                <a className="link-underline text-bone" href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>
              </li>
              {site.teamEmails.map((e) => (
                <li key={e}>
                  <a className="link-underline break-all text-bone/85" href={`mailto:${e}`}>
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Office Hours</h2>
            <p className="text-lg text-bone">
              Monday - Friday
              <br />6 am to 8 pm EAT
            </p>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Post address</h2>
            <p className="text-lg text-bone">
              Morio Studios
              <br />
              22707-00505
              <br />
              Ngong Road
              <br />
              Nairobi, Kenya
            </p>
          </div>
        </aside>
      </section>

      <section aria-label="Map" className="h-[26rem] border-t border-line md:h-[32rem]">
        <iframe title="Morio Studios on Google Maps" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full grayscale invert-[0.9] contrast-[0.9]" />
      </section>
    </>
  );
}
