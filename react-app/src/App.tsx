import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

const nav = [
  ["Home", "/"],
  ["Our craft", "/services"],
  ["The Morios", "/about"],
  ["Hola", "/contact"],
] as const;
const craft = [
  ["Creative direction & art direction", "icon_creative", "creative-direction"],
  ["Graphic design & branding", "icon_graphic", "graphic-design"],
  ["Films & documentaries", "icon_film", "films-docs"],
  ["Photography & illustration", "icon_photo", "photography"],
  ["Animation & AI-mation", "icon_anim", "animation"],
] as const;
const serviceIds = [
  "creative-direction",
  "graphic-design",
  "films-docs",
  "photography",
  "animation",
  "livestreaming",
] as const;
const people = [
  [
    "Sydney Ang’ila",
    "Director of Film and Photography",
    "/images/team/Images-02.webp",
  ],
  [
    "Feysal Anthony",
    "Director Creative and Strategy",
    "/images/team/feysal3.jpeg",
  ],
  ["Brian Macharia", "Director Art and UX", "/images/team/Images-01.webp"],
  [
    "Vincent Karani",
    "Director of Content and Animation",
    "/images/team/Vincent.webp",
  ],
] as const;
const projects = [
  ["Maize Flour", "", "/images/projects/maizeflour.jpg"],
  ["LT", "", "/images/projects/lt2.jpeg"],
  ["Branding", "", "/images/projects/branding.jpg"],
  ["Morio", "", "/images/projects/morio4.jpg"],
] as const;

function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
      return () => window.cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const updateStickyState = () => setIsSticky(window.scrollY > 30);
    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });
    return () => window.removeEventListener("scroll", updateStickyState);
  }, []);
  const stickyBackground = pathname === "/team" ? "bg-[#070707]" : pathname === "/" ? "bg-morio-green" : "bg-[#111]";
  return (
    <header className={`${isSticky ? `fixed ${stickyBackground} border-transparent` : "absolute border-white/60"} inset-x-0 top-0 z-30 border-b transition-colors duration-300`}>
      <div className="mx-auto flex h-24 max-w-[1200px] items-center justify-between px-5 lg:h-[149px]">
        <Link to="/" aria-label="Morio home">
          <img
            src="/images/mr-logo2.png"
            alt="Morio"
            className="h-12 w-12 rounded-full object-contain md:h-20 md:w-20"
          />
        </Link>
        <nav className="hidden items-center gap-[49px] pt-[38px] text-[14px] font-bold uppercase lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} to={href} className="hover:text-morio-orange">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/moriostudios/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid h-5 w-5 place-items-center"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
            </svg>
          </a>
          <button
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center border border-white/30 text-xl lg:hidden"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/15 bg-morio-ink px-6 py-6 lg:hidden">
          {nav.map(([label, href]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              to={href}
              className="block py-3 text-lg font-bold uppercase"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-morio-green text-2xl shadow-lg transition hover:bg-morio-orange"
    >
      ↑
    </button>
  );
}
function Footer() {
  return (
    <>
      <footer className="border-b border-white/[.05] bg-[#070707] px-5 pb-[60px] pt-20 md:px-10">
        <div className="mx-auto grid max-w-[1200px] gap-y-[30px] sm:grid-cols-2 lg:grid-cols-[25fr_18fr_18fr_18fr] lg:gap-x-[5%]">
          <div>
            <img
              src="/images/moriologo.jpeg"
              alt="Morio Studios"
              className="h-20 w-20 rounded-full border-2 border-white/20 object-cover"
            />
            <p className="mt-[5px] max-w-52 border-b border-white/20 pb-[10px] text-lg font-semibold italic tracking-[1px] text-morio-orange">
              “small agency, big ideas”
            </p>
          </div>
          <div className="lg:pl-[5px]">
            <h2 className="pb-[10px] font-body text-xl font-bold capitalize after:block after:h-[2px] after:w-10 after:translate-y-[12px] after:bg-morio-orange">The Morios</h2>
            <div className="mt-[25px] grid gap-5 text-[13px] leading-none text-white/80">
              {nav.slice(0, 3).map(([label, href]) => (
                <Link key={href} to={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="pb-[10px] font-body text-xl font-bold capitalize after:block after:h-[2px] after:w-10 after:translate-y-[12px] after:bg-morio-orange">Talk to a Morio</h2>
            <div className="mt-[25px] grid gap-[10px] text-sm text-white/80">
              {[
                "feysal@moriostudios.africa",
                "sydney@moriostudios.africa",
                "brian@moriostudios.africa",
                "vincent@moriostudios.africa",
              ].map((email) => (
                <a key={email} href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:pl-[5px]">
            <h2 className="pb-[10px] font-body text-xl font-bold capitalize after:block after:h-[2px] after:w-10 after:translate-y-[12px] after:bg-morio-orange">Contact us</h2>
            <p className="mt-[25px] text-[13px] leading-[18px] text-white/80">
              Kenyatta Avenue
              <br />
              Nairobi, Kenya
              <br />
              <a href="mailto:moriostudios@gmail.com">moriostudios@gmail.com</a>
              <br />
              <a href="tel:+254718704926">+254 718 704 926</a>
            </p>
          </div>
        </div>
      </footer>
      <div className="bg-[#070707] px-5 pb-[41px] pt-[34px] text-sm leading-[18px] tracking-[-.35px] text-[#c4c5c7] md:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-5 md:flex-row">
          <span>© Copyrights 2026 Morio Studios. All rights reserved.</span>
          <div className="flex gap-[46px] md:justify-end">
            <a href="https://www.instagram.com/moriostudios/">Instagram</a>
            <a href="#top">Twitter</a>
          </div>
        </div>
      </div>
    </>
  );
}
function SectionHeading({
  label,
  action,
}: {
  label: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex items-end justify-between border-b border-current/35 pb-5 md:mb-[73px] md:pb-[37px]">
      <h2 className="font-display text-3xl uppercase md:text-[30px]">{label}</h2>
      {action}
    </div>
  );
}
function Hero({ title, images }: { title: ReactNode; images: string[] }) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = window.setInterval(
      () => setActiveImage((index) => (index + 1) % images.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [images]);

  return (
    <section className="relative grid min-h-[440px] place-items-center overflow-hidden bg-[#111] md:min-h-[650px]">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeImage ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <h1 className="font-display text-5xl uppercase leading-none tracking-[-.04em] md:text-[72px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
function ImageRotator({ images, alt, className = "" }: { images: string[]; alt: string; className?: string }) {
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveImage((index) => (index + 1) % images.length),
      4000,
    );
    return () => window.clearInterval(timer);
  }, [images]);
  return (
    <div className={`relative min-h-80 overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-700 hover:grayscale-0 ${index === activeImage ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
function Home() {
  const [activeGreeting, setActiveGreeting] = useState(0);
  const greetings = [
    ["Iz how?", "A standard Morio greeting."],
    ["Weh, checki!", "A Morio making a point."],
    ["Ume, choma!", "A Morio telling you that you messed up."],
    ["Noma, sana!", "A Morio telling you something is good."],
    ["Hiyo, haiwez make!", "A Morio telling you something doesn’t work."],
  ];
  return (
    <main>
      <section className="relative min-h-[min(900px,100svh)] overflow-hidden bg-morio-green pt-24">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/slider/banner1.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source
            src="/images/slider/Black-And-White-Video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-morio-ink/70" />
        <div className="relative z-10 mx-auto flex min-h-[min(900px,100svh)] max-w-5xl -translate-y-4 flex-col items-center justify-center px-5 text-center md:-translate-y-12">
          <h1 className="font-display text-[clamp(2rem,9vw,4.5rem)] font-normal uppercase leading-none tracking-[-.04em] md:text-[120px] md:leading-[120px]">
            <span>Small agency,</span>
            <br />
            <span className="md:pl-[103px]">big ideas.</span>
          </h1>
          <p className="mx-auto mt-12 max-w-[650px] text-sm leading-6 text-white/90 md:text-lg md:leading-[30px]">
            Built on passion and love for creativity and storytelling. Morio
            Studio’s is the brain child of 4 Kenyan friends who had a common
            goal, to craft an agency that would be nimble, versatile and smart.
            {" "}With each morio possessing a unique skill set that complimented
            the whole. We believe in smart, innovative solutions to problem
            solving and meeting the clients goals. We put human thinking and
            technological efficiency together to create workflows that solve
            any brief from concept to execution.
          </p>
        </div>
      </section>
      <section className="bg-morio-ink px-5 py-20 md:py-[125px]">
        <div className="mx-auto max-w-[1140px]">
          <SectionHeading
            label="Our craft"
            action={
              <Link
                to="/services"
                className="text-xs font-bold uppercase tracking-wide"
              >
                More craft ↗
              </Link>
            }
          />
          <div className="grid gap-12 lg:grid-cols-[1fr_520px] lg:gap-14">
            <h2 className="max-w-4xl font-display text-5xl uppercase leading-[1.1] tracking-tight md:text-[88px] md:leading-[144px]">
              If the big idea is good, execution is academic.
            </h2>
            <div>
            {craft.map(([name, icon, anchor]) => (
              <Link
                key={name}
                to={`/services#${anchor}`}
                className="group relative flex min-h-[86px] items-center border-b border-white/25 py-5 pl-24 text-lg font-bold uppercase md:text-xl"
              >
                <img
                  src={`/images/icon/${icon}.png`}
                  alt=""
                  className="absolute left-0 top-1/2 h-16 w-16 -translate-y-1/2 object-contain opacity-35 brightness-0 invert transition-opacity group-hover:opacity-100 md:h-20 md:w-20"
                />
                <span>{name}</span>
                <span className="ml-auto text-2xl opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-morio-ink pt-[154px]">
        <div className="mx-auto max-w-[1140px]">
          <div className="px-5 md:px-0"><SectionHeading label="Latest projects" /></div>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pl-5 md:pl-[max(20px,calc((100vw-1140px)/2))]">
            {projects.map(([title, , image]) => (
              <article
                key={title}
                className="group h-[300px] min-w-[78vw] snap-start overflow-hidden bg-black sm:min-w-[45vw] lg:h-[420px] lg:min-w-[360px]"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover grayscale transition duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
              </article>
            ))}
        </div>
      </section>
      <section className="bg-morio-green px-5 py-20 md:py-[125px]">
        <div className="mx-auto max-w-[1140px]">
          <SectionHeading
            label="Meet the Morios"
            action={
              <Link
                to="/about"
                className="text-xs font-bold uppercase tracking-wide"
              >
                Know the Morios ↗
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {people.map(([name, role, image]) => (
              <article key={name}>
                <div className="h-[310px] overflow-hidden bg-[#4c4c4e]">
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-[calc(100%+8px)] -translate-x-2 object-cover grayscale transition duration-500 hover:scale-105 hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-9 font-display text-2xl uppercase">{name}</h3>
                <p className="mt-1 text-sm text-white/60">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-morio-ink px-5 py-[141px] text-center md:py-[145px]">
        <div className="mx-auto max-w-5xl">
          <p className="text-5xl leading-none text-morio-orange">“</p>
          <h2 className="mt-7 font-display text-5xl font-normal uppercase leading-none md:text-[60px] md:leading-[72px]">
            {greetings[activeGreeting][0]}
          </h2>
          <p className="mt-12 font-display text-lg uppercase">{greetings[activeGreeting][1]}</p>
          <div className="mt-10 flex justify-center gap-3">
            <button aria-label="Previous phrase" onClick={() => setActiveGreeting((activeGreeting + greetings.length - 1) % greetings.length)} className="text-4xl text-white/30 hover:text-white">‹</button>
            <button aria-label="Next phrase" onClick={() => setActiveGreeting((activeGreeting + 1) % greetings.length)} className="text-4xl text-white/30 hover:text-white">›</button>
          </div>
        </div>
      </section>
    </main>
  );
}
function ContentPage({
  title,
  images,
  children,
}: {
  title: string;
  images: string[];
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${title} | Morio Studios`;
  }, [title]);
  return (
    <main>
      <Hero title={title} images={images} />
      {children}
    </main>
  );
}
function Services() {
  const serviceProjects = [
    ["Creative brochure", "/images/projects/ps-1.jpg"],
    ["Photography camera", "/images/projects/ps-2.jpg"],
    ["Brand identity", "/images/projects/ps-3.jpg"],
    ["Apps development", "/images/projects/ps-4.jpg"],
    ["Creative brochure", "/images/projects/ps-5.jpg"],
    ["Brand identity", "/images/projects/ps-6.jpg"],
    ["Creative brochure", "/images/projects/ps-7.jpg"],
  ] as const;
  const disciplines = [
    [
      "Creative & art direction",
      "Every great project starts with a point of view. Our creative and art direction service is where strategy meets instinct — we shape the visual and conceptual language that holds a campaign, brand, or story together. From the first moodboard to the final frame, we make sure everything looks, feels, and speaks with intention. We do not just manage aesthetics; we protect the idea.",
    ],
    [
      "Graphic design & branding",
      "A brand is more than a logo — it’s the feeling someone gets before they read a single word. We build visual identities that are bold enough to stand out and coherent enough to last. From brand systems and typography to packaging and print, our design work is rooted in human behaviour and built for real-world application. We make sure your brand means something, wherever it shows up.",
    ],
    [
      "Films & documentaries",
      "We believe the most powerful tool for change is a story told well. Whether it’s a brand film, a short documentary, or a campaign video, we approach every production with the same rigour — research, craft, and a deep respect for the people on screen. Kenyan stories told authentically with a global eye. We handle everything from concept and scripting through to shoot and post, so the only thing you need to bring is the brief.",
    ],
    [
      "Photography & illustration",
      "Still images carry worlds. Our photography captures people, products, and places with honesty and intention — no over-styled artifice, just the real thing made beautiful. Paired with our illustration work, which ranges from editorial and character design to custom brand assets, we give clients a visual vocabulary that’s entirely their own. Every image we make is designed to get the job done and leave a lasting impression.",
    ],
    [
      "Animation & AI-mation",
      "Motion is where ideas truly come alive. We craft animations that range from sleek motion graphics and 2D character work to cutting-edge AI-assisted visuals that push the boundaries of what’s possible on any budget. This is where Morio’s love for technology meets our love for storytelling — using every tool available, new and old, to create work that is Relevant, Original and Impactful. Fast, inventive, and built for the scroll-speed world we all live in.",
    ],
    [
      "Livestreaming & broadcast",
      "We deliver seamless livestreaming experiences that bring events, launches, and stories to audiences in real time. From setup to direction, we handle everything needed to produce smooth, high-quality broadcasts that feel professional and engaging. This is where Morio’s technical precision meets our love for storytelling — using modern tools to make live content feel cinematic, reliable, and impactful for today’s fast-moving digital world.",
    ],
  ] as const;
  return (
    <ContentPage
      title="Services"
      images={[
        "/images/projects/ab4.jpeg",
        "/images/projects/morio2.jpg",
        "/images/projects/ab5.jpeg",
        "/images/projects/morio3.jpg",
        "/images/projects/ab6.jpeg",
      ]}
    >
      <section className="px-5 py-20 md:px-10 md:pb-[100px] md:pt-[190px]">
        <div className="mx-auto grid max-w-[1140px] items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-2xl font-bold uppercase leading-9 text-morio-orange">
              Our craft
            </p>
            <h2 className="mt-[49px] font-display text-5xl font-normal uppercase leading-none md:text-[60px] md:leading-[72px]">
              Small agency.
              <br />
              Big ideas.
            </h2>
            <p className="mt-[54px] max-w-xl text-lg leading-10 text-[#d0d0d0]">
              Great work rarely happens in isolation. Morio Studio exists at the
              intersection of strategy, creativity, and craft — embedding
              ourselves in your world as a thinking partner, a creative
              collaborator, and a full execution team. We work with agencies,
              brands, and independent clients to bring ideas from concept to
              completion, with precision, care, and no unnecessary complexity.
              We believe the best outcomes come from co-creation, and we bring
              the strategic rigour and creative agility to make it count.
              Because small doesn&apos;t mean limited. It means focused.
            </p>
            <p className="mt-6 max-w-xl text-lg italic leading-10 text-[#d0d0d0]">
              Five disciplines. One shared obsession — turning a brief into
              something that moves people, changes behaviour and shifts
              mindsets.
            </p>
          </div>
          <ImageRotator
            alt="Morio creative work"
            className="aspect-[3/2] min-h-0 lg:ml-8"
            images={[
              "/images/service/m1.jpeg",
              "/images/service/m2.jpeg",
              "/images/service/m3.jpeg",
            ]}
          />
        </div>
      </section>
      <section className="px-5 pb-[146px] pt-[50px] md:px-10">
        <div className="mx-auto grid max-w-[1140px] gap-x-0 gap-y-[50px] md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map(([title, copy], index) => (
            <article
              id={serviceIds[index]}
              key={title}
              className="pr-0 md:pr-10"
            >
              <h2 className="font-display text-[30px] font-bold uppercase leading-[48px] tracking-[-.3px]">
                {index + 1}. {title}
              </h2>
              <p className="mt-[25px] text-lg leading-10 tracking-[-.18px] text-[#d0d0d0]">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#070707] px-5 py-20 md:px-10 md:pb-[161px] md:pt-[127px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <h2 className="font-display text-5xl font-normal uppercase leading-[.95] md:text-[60px] md:leading-[72px]">
            Our team have 20+ years delivering projects on a global stage. Because of that experience, the world&apos;s most exciting and progressive.
          </h2>
          <div className="space-y-[56px] pt-[19px]">
            {[
              ["Idea", "60%"],
              ["Design", "80%"],
              ["Development", "60%"],
            ].map(([name, percent]) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-sm uppercase">
                  <span>{name}</span>
                  <span>{percent}</span>
                </div>
                <div className="h-px bg-white/30">
                  <div
                    className="h-px bg-morio-orange"
                    style={{ width: percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 md:px-10 md:pb-[120px] md:pt-[152px]">
        <div className="mx-auto max-w-[1140px]">
          <SectionHeading label="Latest projects" />
        </div>
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-[max(40px,calc((100vw-1140px)/2))]">
            {serviceProjects.map(([title, image], index) => (
              <article
                key={`${title}-${index}`}
                className="group h-[320px] min-w-[78%] snap-start overflow-hidden bg-black sm:min-w-[45%] lg:h-[420px] lg:min-w-[360px]"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover grayscale transition duration-300 group-hover:scale-[1.06] group-hover:grayscale-0"
                />
              </article>
            ))}
        </div>
      </section>
    </ContentPage>
  );
}
function About() {
  return (
    <ContentPage
      title="The Morios"
      images={[
        "/images/projects/ab1.jpeg",
        "/images/projects/ab2.jpeg",
        "/images/projects/ab3.jpeg",
      ]}
    >
      <section className="bg-[#111] px-5 py-20 md:px-10 md:pb-[221px] md:pt-[150px]">
        <div className="mx-auto max-w-[860px] text-center text-[15px] leading-[1.95] text-white/80">
          <p>
            <strong>Morio</strong> is Kiswahili slang for a friend — someone you
            can count on.
          </p>
          <p className="mt-8">
            <strong>Morio Studios</strong> is a collective of four brilliant
            creative minds bringing unique flavour to the creative soup. Founded
            in 2024, a light-bulb moment sparked a studio blending talents
            across ideation, concept development, creative direction, graphic
            design, animation, photography, and film.
          </p>
          <p className="mt-8">
            We deliver end-to-end creative output, from concept to final
            production — bringing brand and human stories to life through a
            fusion of talent, skill, and experience. With new-age thinking, our
            workflows integrate AI creative tools to accelerate
            conceptualization and visualization, giving us the edge to deliver
            high-quality creativity in record time.
          </p>
          <p className="mt-8 text-[16px] font-semibold leading-8 tracking-[.4px] text-white">
            Where vision meets innovation, Morio creates.
          </p>
          <div className="mx-auto mt-[30px] h-[2px] w-[110px] bg-white/[.12]" />
        </div>
      </section>
      <People detailed />
    </ContentPage>
  );
}
function People({ detailed = false }: { detailed?: boolean }) {
  const bios = [
    "This morio is a multi disciplinary creative with over 24 yrs of experience in Art Direction and Creative Direction. Having been mentored by some of the most creative minds in Africa Feysal has worked on award winning campaigns for brands like Safaricom, Diageo, ICEA Lion, Bidco, Grain Industries, Bayer, USAID, I&M bank, GOK, Toyota, Jetlak Foods, Seychelles Tourism Board, Magical Kenya, Air Kenya, SBM Bank, Cooperative Bank, Frytol Ghana, Wilderness Lodges and Pernod Ricard.",
    "A morio with a talent for film editing and a passion for weaving captivating stories through the power of post-production. Possesses a keen eye for detail and a dedication to crafting visual narratives, transforming raw footage into polished works that inspire audiences. Having collaborated with notable organizations like GIZ, CABI, OKHI Kenya, Ultra Events, Uwezo Fund, Youth Fund, and Africa’s Campus Battle.",
    "The dynamic and innovative morio is a graphic designer with 5+ years of experience in webpage design and branding across a wide range of campaigns. Over the past 2 years, managed to produce various art direction for different campaigns. Experienced in both print and digital design. Skilled in Adobe Creative Suite.",
    "This morio is an artist adept at a number of skills, including design, animation, photography, videography and editing. He is currently in the third year of holding a tenure as an animator and editor. He is passionate about filmmaking and film scripting.",
  ];
  const portfolios = [
    "https://www.behance.net/feysless",
    "https://www.behance.net/videopicha",
    "https://www.behance.net/brayanmacharia",
    "https://www.behance.net/vincentkarani1",
  ];
  if (!detailed)
    return (
      <div className="mx-auto mt-24 grid max-w-[1280px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {people.map(([name, role, image]) => (
          <article key={name}>
            <img
              src={image}
              alt={name}
              className="aspect-[3/4] w-full object-cover grayscale"
            />
            <h2 className="mt-5 font-display text-3xl uppercase">{name}</h2>
            <p className="mt-1 text-sm text-white/65">{role}</p>
          </article>
        ))}
      </div>
    );
  const team = [
    [
      "Feysal Anthony Nair",
      "Creative Director",
      "/images/team/FEY2.jpeg",
    ],
    [
      "Sydney Ang’ila",
      "Film and Production Director",
      "/images/team/SYD2.jpeg",
    ],
    [
      "Brian Macharia",
      "Art Director and Graphic Designer",
      "/images/team/BRI-2.jpeg",
    ],
    [
      "Vincent Karani",
      "Animation and Post Production Director",
      "/images/team/VIN2.jpeg",
    ],
  ] as const;
  return (
    <section className="bg-[#070707] px-5 py-20 md:px-10 md:pb-[120px] md:pt-[150px]">
    <div className="mx-auto max-w-[1140px]">
      <SectionHeading label="Our experienced team" />
      {team.map(([name, role, image], index) => (
        <article
          key={name}
          className={`grid gap-10 border-t border-white/[.08] py-[70px] md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-[60px] ${index === 0 ? "border-t-0 pt-10" : ""}`}
        >
          <div>
            <h2 className="font-display text-5xl uppercase leading-none md:text-[44px]">
              {name}
            </h2>
            <p className="mt-0 text-sm uppercase tracking-[2px] text-white/75">
              {role}
            </p>
            <div className="mt-[18px] h-[2px] w-[120px] bg-white/[.18]" />
            <p className="mt-[22px] max-w-[560px] text-[15px] leading-[1.9] text-white/[.72]">
              {bios[index]}
            </p>
            <a
              href={portfolios[index]}
              target="_blank"
              rel="noreferrer"
              className="mt-[26px] inline-flex items-center rounded-full bg-[#2df300] px-4 py-[10px] text-sm font-semibold text-[#071007]"
            >
              Portfolio &gt;&gt;
            </a>
          </div>
          <img
            src={image}
            alt={name}
            className="w-full max-w-[520px] rounded-xl object-contain grayscale"
          />
        </article>
      ))}
    </div>
    </section>
  );
}
function Team() {
  const team = [
    [
      "Sydney Ang’ila",
      "Product manager",
      "/images/team/Images-02.webp",
      "https://www.behance.net/videopicha",
    ],
    [
      "Feysal Nair",
      "Sr. Developer",
      "/images/team/feysal3.jpeg",
      "https://www.behance.net/feysless",
    ],
    [
      "Brian Macharia",
      "Founder & CEO",
      "/images/team/Images-01.webp",
      "https://www.behance.net/brayanmacharia",
    ],
    [
      "Vincent Karani",
      "Graphic Designer",
      "/images/team/Vincent.webp",
      "https://www.behance.net/vincentkarani1",
    ],
  ] as const;
  return (
    <ContentPage
      title="Team"
      images={[
        "/images/projects/morio4.jpg",
        "/images/projects/morio2.jpg",
        "/images/projects/morio3.jpg",
      ]}
    >
      <section className="bg-[#070707] px-5 py-20 md:px-10 md:py-[142px]">
        <div className="mx-auto grid max-w-[1140px] gap-x-[30px] gap-y-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {team.map(([name, role, image, portfolio]) => (
            <article key={name} className="group">
              <div className="relative h-[310px] overflow-hidden bg-[#4c4c4e]">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-[calc(100%+8px)] -translate-x-2 object-cover grayscale transition duration-500 group-hover:translate-x-0 group-hover:grayscale-0"
                />
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} portfolio`}
                  className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center bg-morio-orange text-lg"
                >
                  ↗
                </a>
              </div>
              <h2 className="mt-[35px] font-display text-2xl uppercase leading-none">{name}</h2>
              <p className="mt-1 text-sm leading-6 text-[#9a9a9a]">{role}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-[148px] max-w-[1140px]">
          <h2 className="mb-[72px] font-display text-5xl uppercase leading-none">
            We worked with global largest brands
          </h2>
          <div className="flex gap-8 overflow-x-auto pb-2">
            {[7, 1, 2, 3, 4, 5, 6, 8, 5].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="grid h-20 min-w-32 place-items-center p-2"
              >
                <img
                  src={`/images/clientLogo/${logo}.png`}
                  alt="Client logo"
                  className="max-h-full max-w-full object-contain grayscale brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
function Contact() {
  return (
    <ContentPage
      title="Contact Us"
      images={[
        "/images/projects/ab7.jpeg",
        "/images/projects/ab8.jpeg",
        "/images/projects/ab1.jpeg",
      ]}
    >
      <section className="px-5 py-20 md:px-10 md:pb-[138px] md:pt-[126px]">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-3">
          <article>
            <h2 className="font-display text-4xl uppercase">For inquiries</h2>
            <div className="mt-6 grid gap-2 leading-7 text-white/70">
              <a href="tel:254718704926">+254 718 704 926</a>
              {[
                "feysal@moriostudios.africa",
                "sydney@moriostudios.africa",
                "brian@moriostudios.africa",
                "vincent@moriostudios.africa",
              ].map((email) => (
                <a key={email} href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </div>
          </article>
          <article>
            <h2 className="font-display text-4xl uppercase">Office hours</h2>
            <p className="mt-6 leading-7 text-white/70">
              Monday - Friday
              <br />6 am to 8 pm EAT
            </p>
          </article>
          <article>
            <h2 className="font-display text-4xl uppercase">Post address</h2>
            <p className="mt-6 leading-7 text-white/70">
              Morio Studios
              <br />
              22707-00505
              <br />
              Ngong Road
              <br />
              Nairobi, Kenya
            </p>
          </article>
        </div>
        <div className="-mx-5 mt-[138px] overflow-hidden md:-mx-10">
          <iframe
            title="Morio Studios location"
            className="h-[420px] w-full grayscale md:h-[558px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7908569907054!2d36.777850373500655!3d-1.3003299356385623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b264fa4327b%3A0x4a4fd87e6260dbe!2sAdams%20Arcade!5e0!3m2!1sen!2ske!4v1776766655424!5m2!1sen!2ske"
            loading="lazy"
          />
        </div>
      </section>
    </ContentPage>
  );
}
function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="font-display text-[10rem] leading-none text-morio-orange">
          404
        </p>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-white/70">
          The page you are looking for doesn’t exist. It may have been moved or
          removed altogether.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-white px-6 py-3 text-sm font-bold uppercase hover:bg-white hover:text-morio-ink"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollTop />
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Frame><Home /></Frame>} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/services" element={<Frame><Services /></Frame>} />
      <Route
        path="/service.html"
        element={<Navigate to="/services" replace />}
      />
      <Route path="/about" element={<Frame><About /></Frame>} />
      <Route path="/about.html" element={<Navigate to="/about" replace />} />
      <Route path="/team" element={<Frame><Team /></Frame>} />
      <Route path="/team.html" element={<Navigate to="/team" replace />} />
      <Route path="/contact" element={<Frame><Contact /></Frame>} />
      <Route
        path="/contact.html"
        element={<Navigate to="/contact" replace />}
      />
      <Route path="/404" element={<NotFound />} />
      <Route path="/404.html" element={<Navigate to="/404" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
