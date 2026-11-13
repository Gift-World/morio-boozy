// The six crafts. Each gets a landing page at /services/<slug>, written for
// "<craft> in Nairobi" searches. Copy comes from the studio's own service page.

export interface Service {
  slug: string;
  title: string;
  /** Short label for nav/cards */
  short: string;
  /** <title> and H1 for the landing page */
  seoTitle: string;
  h1: string;
  metaDescription: string;
  summary: string;
  body: string;
  /** What's covered, drawn from the description above */
  includes: string[];
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    slug: "creative-direction",
    title: "Creative & art direction",
    short: "Creative direction",
    seoTitle: "Creative & Art Direction Agency in Nairobi | Morio Studios",
    h1: "Creative & art direction in Nairobi",
    metaDescription:
      "Creative and art direction from Morio Studios in Nairobi: the visual and conceptual language that holds a campaign, brand or story together, from first moodboard to final frame.",
    summary: "Where strategy meets instinct. We shape the visual and conceptual language that holds a campaign together.",
    body: "Every great project starts with a point of view. Our creative and art direction service is where strategy meets instinct — we shape the visual and conceptual language that holds a campaign, brand, or story together. From the first moodboard to the final frame, we make sure everything looks, feels, and speaks with intention. We don't just manage aesthetics; we protect the idea.",
    includes: ["Campaign concepts", "Moodboards and visual language", "Art direction on shoots", "Brand storytelling", "Creative oversight to the final frame"],
    image: "/assets/images/projects/morio4.jpg",
    imageAlt: "Collage artwork by Morio Studios",
  },
  {
    slug: "branding",
    title: "Graphic design & branding",
    short: "Branding & design",
    seoTitle: "Branding & Graphic Design Agency in Nairobi | Morio Studios",
    h1: "Branding & graphic design in Nairobi",
    metaDescription:
      "Brand identity, typography, packaging and print design from Morio Studios, a Nairobi branding agency building visual identities bold enough to stand out and coherent enough to last.",
    summary: "Visual identities bold enough to stand out and coherent enough to last.",
    body: "A brand is more than a logo — it's the feeling someone gets before they read a single word. We build visual identities that are bold enough to stand out and coherent enough to last. From brand systems and typography to packaging and print, our design work is rooted in human behaviour and built for real-world application. We make sure your brand means something, wherever it shows up.",
    includes: ["Brand identity and logo design", "Brand systems and guidelines", "Typography", "Packaging design", "Print and marketing collateral"],
    image: "/assets/images/projects/cafe-identity-branding.jpg",
    imageAlt: "Café cup branding designed by Morio Studios",
  },
  {
    slug: "film",
    title: "Films & documentaries",
    short: "Film & documentary",
    seoTitle: "Film & Documentary Production in Nairobi, Kenya | Morio Studios",
    h1: "Film & documentary production in Nairobi",
    metaDescription:
      "Brand films, short documentaries and campaign videos from Morio Studios in Nairobi. Kenyan stories told authentically with a global eye, from concept and script to shoot and post.",
    summary: "Kenyan stories told authentically with a global eye, from script to shoot to post.",
    body: "We believe the most powerful tool for change is a story told well. Whether it's a brand film, a short documentary, or a campaign video, we approach every production with the same rigour — research, craft, and a deep respect for the people on screen. Kenyan stories told authentically with a global eye. We handle everything from concept and scripting through to shoot and post, so the only thing you need to bring is the brief.",
    includes: ["Brand films", "Short documentaries", "Campaign videos", "Concept and scripting", "Shoot, edit and post-production"],
    image: "/assets/images/projects/045A7211.jpg",
    imageAlt: "Rider on a motorbike from a Morio Studios shoot",
  },
  {
    slug: "photography",
    title: "Photography & illustration",
    short: "Photography",
    seoTitle: "Photography & Illustration Studio in Nairobi | Morio Studios",
    h1: "Photography & illustration in Nairobi",
    metaDescription:
      "Commercial photography of people, products and places, plus editorial, character and brand illustration, from Morio Studios in Nairobi, Kenya.",
    summary: "People, products and places captured with honesty and intention.",
    body: "Still images carry worlds. Our photography captures people, products, and places with honesty and intention — no over-styled artifice, just the real thing made beautiful. Paired with our illustration work, which ranges from editorial and character design to custom brand assets, we give clients a visual vocabulary that's entirely their own. Every image we make is designed to get the job done and leave a lasting impression.",
    includes: ["People and portrait photography", "Product photography", "Location and landscape photography", "Editorial and character illustration", "Custom brand assets"],
    image: "/assets/images/projects/morio2.jpg",
    imageAlt: "Portrait from a Morio Studios photo shoot",
  },
  {
    slug: "animation",
    title: "Animation & AI-mation",
    short: "Animation",
    seoTitle: "Animation & Motion Graphics Studio in Nairobi | Morio Studios",
    h1: "Animation & motion graphics in Nairobi",
    metaDescription:
      "Motion graphics, 2D character animation and AI-assisted visuals from Morio Studios in Nairobi. Fast, inventive animation built for the scroll-speed world.",
    summary: "Motion graphics, 2D character work and AI-assisted visuals, on any budget.",
    body: "Motion is where ideas truly come alive. We craft animations that range from sleek motion graphics and 2D character work to cutting-edge AI-assisted visuals that push the boundaries of what's possible on any budget. This is where Morio's love for technology meets our love for storytelling — using every tool available, new and old, to create work that is Relevant, Original and Impactful. Fast, inventive, and built for the scroll-speed world we all live in.",
    includes: ["Motion graphics", "2D character animation", "AI-assisted visuals", "Explainers and social content", "Titles and post-production"],
    image: "/assets/images/projects/branding.jpg",
    imageAlt: "Morio Studios drinks can visual",
  },
  {
    slug: "livestreaming",
    title: "Livestreaming & Broadcast",
    short: "Livestreaming",
    seoTitle: "Livestreaming & Event Broadcast in Nairobi | Morio Studios",
    h1: "Livestreaming & broadcast in Nairobi",
    metaDescription:
      "Livestreaming for events, launches and stories in Nairobi. Morio Studios handles setup to direction for smooth, cinematic, reliable broadcasts.",
    summary: "Events, launches and stories, live, cinematic and reliable.",
    body: "We deliver seamless livestreaming experiences that bring events, launches, and stories to audiences in real time. From setup to direction, we handle everything needed to produce smooth, high-quality broadcasts that feel professional and engaging. This is where Morio’s technical precision meets our love for storytelling — using modern tools to make live content feel cinematic, reliable, and impactful for today’s fast-moving digital world",
    includes: ["Event livestreams", "Product and brand launches", "Multi-camera direction", "Technical setup", "Live content for social platforms"],
    image: "/assets/images/service/m3.jpeg",
    imageAlt: "The Morio Studios team at work",
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

/** "Our Craft" page copy, from the original services page. */
export const craftCopy = {
  eyebrow: "Our Craft",
  title: ["Small Agency.", "Big Ideas."],
  intro:
    "Great work rarely happens in isolation. Morio Studio exists at the intersection of strategy, creativity, and craft — embedding ourselves in your world as a thinking partner, a creative collaborator, and a full execution team. We work with agencies, brands, and independent clients to bring ideas from concept to completion, with precision, care, and no unnecessary complexity. We believe the best outcomes come from co-creation, and we bring the strategic rigour and creative agility to make it count. Because small doesn't mean limited. It means focused.",
  obsession:
    "Five disciplines. One shared obsession — turning a brief into something that moves people, changes behaviour and shifts mind sets.",
  experience: "Our team have 20+ years delivering projects on a global stage. Because of that experience, the world's most exciting and progressive.",
  /** The original page's three stages (shown as words, as on the old skill bars) */
  process: ["Idea", "Design", "Development"],
} as const;
