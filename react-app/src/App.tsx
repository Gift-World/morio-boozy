import { useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

const nav = [
  ["Home", "/"],
  ["Our craft", "/services"],
  ["The Morios", "/about"],
  ["Hola", "/contact"],
] as const;
const craft = [
  ["Creative direction & art direction", "pyramid", "creative-direction"],
  ["Graphic design & branding", "cube", "graphic-design"],
  ["Films & documentaries", "3dAnimation", "films-docs"],
  ["Photography & illustration", "3dAnimation2", "photography"],
  ["Animation & AI-mation", "3dAnimation3", "animation"],
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
    "/images/team/SYD2.jpeg",
  ],
  [
    "Feysal Anthony Nair",
    "Director Creative and Strategy",
    "/images/team/FEY2.jpeg",
  ],
  ["Brian Macharia", "Director Art and UX", "/images/team/BRI-2.jpeg"],
  [
    "Vincent Karani",
    "Director of Content and Animation",
    "/images/team/VIN2.jpeg",
  ],
] as const;
const projects = [
  ["Morio Studios", "Creative direction", "/images/projects/morio2.jpg"],
  [
    "Cafe Identity",
    "Brand identity",
    "/images/projects/Cafe Identity Branding.jpg",
  ],
  ["Maize Flour", "Packaging design", "/images/projects/maizeflour.jpg"],
  ["Photography", "Visual storytelling", "/images/projects/045A4377.jpg"],
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
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/15">
      <div className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:h-[168px]">
        <Link to="/" aria-label="Morio home">
          <img
            src="/images/mr-logo2.png"
            alt="Morio"
            className="h-11 w-11 rounded-full object-contain md:h-16 md:w-16"
          />
        </Link>
        <nav className="hidden items-center gap-10 text-xs font-bold uppercase tracking-wide lg:flex">
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
            className="text-lg"
          >
            ◎
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
function Footer() {
  return (
    <>
      <footer className="border-t border-white/20 bg-morio-ink px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/images/logo2.png"
              alt="Morio Studios"
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-52 text-sm leading-6 text-white/70">
              “small agency, big ideas”
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase">The Morios</h2>
            <div className="mt-5 grid gap-2 text-sm text-white/70">
              {nav.slice(0, 3).map(([label, href]) => (
                <Link key={href} to={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase">Talk to a Morio</h2>
            <div className="mt-5 grid gap-2 text-sm text-white/70">
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
          <div>
            <h2 className="font-display text-2xl uppercase">Contact us</h2>
            <p className="mt-5 text-sm leading-7 text-white/70">
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
      <div className="flex flex-col justify-between gap-3 border-t border-white/15 bg-morio-ink px-5 py-5 text-xs text-white/60 md:flex-row md:px-10">
        <span>© Copyrights 2026 Morio Studios. All rights reserved.</span>
        <a href="https://www.instagram.com/moriostudios/">Instagram</a>
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
    <div className="mb-10 flex items-end justify-between border-b border-current/35 pb-5 md:mb-16">
      <h2 className="font-display text-3xl uppercase md:text-5xl">{label}</h2>
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
    <section className="relative grid min-h-[min(900px,100svh)] place-items-center overflow-hidden bg-morio-green pt-24">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeImage ? "opacity-45" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-morio-ink/70" />
      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <h1 className="font-display text-[clamp(2rem,9vw,4.5rem)] uppercase leading-none tracking-[-.04em] md:text-[clamp(4rem,9.5vw,7.5rem)]">
          {title}
        </h1>
      </div>
    </section>
  );
}
function Home() {
  const greetings = [
    ["Ume, choma!", "A Morio telling you that you messed up."],
    ["Noma, sana!", "A Morio telling you something is good."],
    ["Hiyo, haiwez make!", "A Morio telling you something doesn’t work."],
    ["Iz how?", "A standard Morio greeting."],
    ["Weh, checki!", "A Morio making a point."],
  ];
  return (
    <main>
      <section className="relative grid min-h-[min(900px,100svh)] place-items-center overflow-hidden bg-morio-green pt-24">
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
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
          <h1 className="font-display text-[clamp(2rem,9vw,4.5rem)] uppercase leading-none tracking-[-.04em] md:text-[clamp(4rem,9.5vw,7.5rem)]">
            <span>Small agency,</span>
            <br />
            <span>big ideas.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[650px] text-sm leading-6 text-white/90 md:text-lg md:leading-8">
            Built on passion and love for creativity and storytelling. Morio
            Studio’s is the brain child of 4 Kenyan friends who had a common
            goal, to craft an agency that would be nimble, versatile and smart.
            <span className="hidden md:inline">
              {" "}
              With each morio possessing a unique skill set that complimented
              the whole. We believe in smart, innovative solutions to problem
              solving and meeting the clients goals. We put human thinking and
              technological efficiency together to create workflows that solve
              any brief from concept to execution.
            </span>
          </p>
        </div>
      </section>
      <section className="bg-morio-ink px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
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
          <h2 className="max-w-4xl font-display text-5xl uppercase leading-[.88] tracking-tight md:text-8xl">
            If the big idea is good, execution is academic.
          </h2>
          <div className="mt-16 grid gap-x-10 border-t border-white/25 md:grid-cols-2">
            {craft.map(([name, icon, anchor], index) => (
              <Link
                key={name}
                to={`/services#${anchor}`}
                className="group flex items-center gap-5 border-b border-white/25 py-6 text-lg font-medium uppercase md:text-2xl"
              >
                <span className="w-8 text-sm text-morio-orange">
                  0{index + 1}
                </span>
                <img
                  src={`/images/icon/${icon}.png`}
                  alt=""
                  className="h-10 w-10 object-contain"
                />
                <span>{name}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f0eee8] px-5 py-20 text-morio-ink md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeading label="Latest projects" />
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10">
            {projects.map(([title, category, image]) => (
              <article
                key={title}
                className="group relative aspect-[4/5] min-w-[78%] snap-start overflow-hidden bg-black sm:min-w-[45%] lg:min-w-[30%]"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="text-xs uppercase tracking-[.2em] text-white/70">
                    {category}
                  </p>
                  <h3 className="mt-1 font-display text-3xl uppercase">
                    {title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-morio-green px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1280px]">
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
                <div className="aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover grayscale transition hover:grayscale-0"
                  />
                </div>
                <h3 className="mt-5 font-display text-3xl uppercase">{name}</h3>
                <p className="mt-1 text-sm text-white/70">{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-[#f3f0e8] py-20 text-morio-ink md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10">
          <SectionHeading label="Morio speak" />
          <div className="grid gap-4 md:grid-cols-5">
            {greetings.map(([phrase, meaning]) => (
              <article
                key={phrase}
                className="min-h-64 border border-morio-ink/20 p-5"
              >
                <span className="text-morio-orange">✦</span>
                <h3 className="mt-12 font-display text-4xl uppercase leading-none">
                  {phrase}
                </h3>
                <p className="mt-5 text-sm leading-6 text-morio-ink/70">
                  {meaning}
                </p>
              </article>
            ))}
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
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-morio-orange">
              Our craft
            </p>
            <h2 className="mt-5 font-display text-6xl uppercase leading-[.85] md:text-8xl">
              Small agency.
              <br />
              Big ideas.
            </h2>
            <p className="mt-10 max-w-xl leading-8 text-white/75">
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
            <p className="mt-6 max-w-xl italic leading-8 text-white/75">
              Five disciplines. One shared obsession — turning a brief into
              something that moves people, changes behaviour and shifts
              mindsets.
            </p>
          </div>
          <img
            src="/images/service/m1.jpeg"
            alt="Morio creative work"
            className="h-full min-h-80 w-full object-cover"
          />
        </div>
        <div className="mx-auto mt-24 grid max-w-[1280px] gap-x-12 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map(([title, copy], index) => (
            <article
              id={serviceIds[index]}
              key={title}
              className="border-t border-white/25 py-8"
            >
              <span className="text-sm text-morio-orange">0{index + 1}</span>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none">
                {title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/70">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-20 grid max-w-[1280px] gap-12 border-t border-white/25 pt-16 lg:grid-cols-2">
          <h2 className="font-display text-5xl uppercase leading-[.9]">
            Our team have 20+ years delivering projects on a global stage.
          </h2>
          <div className="space-y-7">
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
        <div className="mx-auto mt-28 max-w-[1280px]">
          <SectionHeading label="Latest projects" />
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:-mx-10 md:px-10">
            {projects.map(([title, category, image]) => (
              <article
                key={title}
                className="relative aspect-[4/5] min-w-[78%] snap-start overflow-hidden bg-black sm:min-w-[45%] lg:min-w-[30%]"
              >
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6">
                  <p className="text-xs uppercase tracking-[.18em] text-white/70">
                    {category}
                  </p>
                  <h3 className="mt-2 font-display text-3xl uppercase">
                    {title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
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
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl text-center text-lg leading-8 text-white/80 md:text-xl">
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
          <p className="mt-10 font-display text-4xl uppercase text-white">
            Where vision meets innovation, Morio creates.
          </p>
        </div>
        <People detailed />
      </section>
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
  const team = [people[1], people[0], people[2], people[3]];
  return (
    <div className="mx-auto mt-28 max-w-[1280px]">
      <SectionHeading label="Our experienced team" />
      {team.map(([name, role, image], index) => (
        <article
          key={name}
          className="grid gap-10 border-b border-white/25 py-12 md:grid-cols-2 md:items-center"
        >
          <div className={index % 2 ? "md:order-2" : ""}>
            <h2 className="font-display text-5xl uppercase leading-none">
              {name}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[.16em] text-morio-orange">
              {role}
            </p>
            <p className="mt-8 max-w-xl leading-7 text-white/70">
              {bios[index]}
            </p>
            <a
              href={portfolios[index]}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block border-b border-morio-orange pb-1 text-sm font-bold uppercase tracking-wide text-morio-orange"
            >
              Portfolio &gt;&gt;
            </a>
          </div>
          <img
            src={image}
            alt={name}
            className="aspect-[4/3] w-full object-cover grayscale"
          />
        </article>
      ))}
    </div>
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
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(([name, role, image, portfolio]) => (
            <article key={name} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
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
              <h2 className="mt-5 font-display text-4xl uppercase">{name}</h2>
              <p className="mt-1 text-sm text-white/65">{role}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-28 max-w-[1280px] border-t border-white/25 pt-16">
          <h2 className="font-display text-5xl uppercase leading-none">
            We worked with global largest brands
          </h2>
          <div className="mt-12 grid grid-cols-3 gap-8 md:grid-cols-5 lg:grid-cols-9">
            {[7, 1, 2, 3, 4, 5, 6, 8, 5].map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="grid aspect-[3/2] place-items-center border border-white/15 p-5"
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
      <section className="px-5 py-20 md:px-10 md:py-32">
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
        <div className="mx-auto mt-20 max-w-[1280px] overflow-hidden border border-white/15">
          <iframe
            title="Morio Studios location"
            className="h-[460px] w-full grayscale"
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
    </>
  );
}
function LiveSite({ path }: { path: string }) {
  return (
    <iframe
      title="Morio Studios"
      src={`https://moriostudios.africa${path}`}
      className="block h-[100dvh] w-full border-0 bg-morio-ink"
    />
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LiveSite path="/" />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/services" element={<LiveSite path="/service" />} />
      <Route
        path="/service.html"
        element={<Navigate to="/services" replace />}
      />
      <Route path="/about" element={<LiveSite path="/about" />} />
      <Route path="/about.html" element={<Navigate to="/about" replace />} />
      <Route path="/team" element={<LiveSite path="/team" />} />
      <Route path="/team.html" element={<Navigate to="/team" replace />} />
      <Route path="/contact" element={<LiveSite path="/contact" />} />
      <Route
        path="/contact.html"
        element={<Navigate to="/contact" replace />}
      />
      <Route path="/404" element={<LiveSite path="/404" />} />
      <Route path="/404.html" element={<Navigate to="/404" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
