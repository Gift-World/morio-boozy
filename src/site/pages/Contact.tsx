import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Photo } from "../../components/Photo";
import { site } from "../../content/site";
import { services } from "../../content/services";
import { Icon } from "../icons";
import { scrollToTarget } from "../motion";
import { ProjectPlanner } from "../ProjectPlanner";
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
    <div aria-hidden="true" className="absolute inset-0">
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

  const useForm = (message: string, service: string) => {
    setPrefill((p) => ({ id: p.id + 1, message, service }));
    requestAnimationFrame(() => formRef.current && scrollToTarget(formRef.current, true));
  };

  return (
    <>
      {/* Hero: the title beside the original banner images, then every way to reach the studio */}
      <section className="container-site pt-28 md:pt-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-6">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <nav aria-label="Breadcrumb" className="eyebrow mb-5 flex gap-2">
                <Link to="/" className="hover:text-bone">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-bone/80">Contact</span>
              </nav>
              <h1 className="display text-display-2xl text-bone">
                Contact <span className="text-outline">Us</span>
              </h1>
            </div>
            <div className="flex w-fit items-center gap-3 rounded-full border border-line px-4 py-2.5 text-sm text-bone/90" aria-live="polite">
              <span className={`size-2.5 rounded-full ${clock?.open ? "bg-emerald-500 shadow-[0_0_10px_2px_rgb(16_185_129/0.45)]" : "bg-sage/50"}`} />
              <span>
                Nairobi <span className="font-medium tabular-nums">{clock?.time ?? "--:--"}</span>
                <span className="text-sage"> · {clock ? (clock.open ? "Studio open" : "Studio closed") : "EAT"}</span>
              </span>
            </div>
          </div>
          <div className="theme-dark relative isolate min-h-64 overflow-hidden rounded-3xl bg-ink-3 md:min-h-80 md:rounded-[2.5rem] lg:col-span-7">
            <Banner />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:gap-6">
          <div className="theme-dark flex flex-col justify-between gap-6 rounded-3xl bg-morio p-6">
            <h2 className="eyebrow">Quickest</h2>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener" className="btn-primary self-start">
              <Icon name="whatsapp" /> Chat on WhatsApp
            </a>
          </div>
          <div className="rounded-3xl bg-ink-2 p-6">
            <h2 className="eyebrow mb-4">For Inquiries</h2>
            <ul className="space-y-1.5">
              <li>
                <a className="link-underline font-medium text-bone" href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>
              </li>
              {site.teamEmails.map((e) => (
                <li key={e}>
                  <a className="link-underline text-[0.95rem] break-all text-bone/85" href={`mailto:${e}`}>
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink-2 p-6">
            <h2 className="eyebrow mb-4">Office Hours</h2>
            <p className="text-lg text-bone">
              Monday - Friday
              <br />6 am to 8 pm EAT
            </p>
          </div>
          <div className="rounded-3xl bg-ink-2 p-6">
            <h2 className="eyebrow mb-4">Post address</h2>
            <p className="text-bone">
              Morio Studios
              <br />
              22707-00505
              <br />
              Ngong Road
              <br />
              Nairobi, Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Start a project: compose a message and send it on WhatsApp or by email */}
      <section id="start-a-project" className="mx-3 mt-16 scroll-mt-24 rounded-3xl bg-ink-2 py-14 sm:mx-5 md:mt-24 md:rounded-[2.5rem] md:py-20">
        <div className="container-site">
          <Reveal className="mb-10 max-w-3xl">
            <p className="eyebrow mb-4">Start a project</p>
            <h2 className="display text-display-md text-bone">Tell us what you’re making.</h2>
            <p className="mt-4 text-bone/80 md:text-lg">Pick what you need, add a line or two, and send it straight to the studio on WhatsApp or by email.</p>
          </Reveal>
          <ProjectPlanner onUseForm={useForm} />
        </div>
      </section>

      {/* The form beside the map */}
      <section className="container-site grid gap-6 py-16 md:py-24 lg:grid-cols-12">
        <div ref={formRef} className="scroll-mt-28 lg:col-span-7 lg:pr-8">
          <h2 className="display mb-8 text-display-md text-bone">Send us a brief</h2>
          <BriefForm key={prefill.id} message={prefill.message} service={prefill.service} />
        </div>
        <div aria-label="Map" role="region" className="h-80 overflow-hidden rounded-3xl bg-ink-3 md:rounded-[2.5rem] lg:col-span-5 lg:h-auto lg:min-h-[32rem]">
          <iframe title="Morio Studios on Google Maps" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full grayscale" />
        </div>
      </section>
    </>
  );
}
