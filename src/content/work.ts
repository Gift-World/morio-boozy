// Projects shown on the home page, /work and each /work/<slug> story page,
// plus the studio's films. Images are the studio's own.
//
// The first six projects are real client work (names and clients are taken
// from the artwork itself). TODO(owner): confirm each one's wording, add
// `year` and the story fields (brief / idea / outcome); story pages render
// those sections automatically when they're filled in. The last six are
// studio pieces whose names are still descriptive placeholders.

export type Discipline = "Branding" | "Publication design" | "Photography" | "Packaging" | "Art direction";

export interface Project {
  slug: string;
  title: string;
  discipline: Discipline;
  /** Crafts this project relates to (service slugs), for Brief Builder and service pages */
  crafts: string[];
  cover: string;
  coverAlt: string;
  images: { src: string; alt: string }[];
  client?: string;
  /** Client sector (e.g. "Food & drink"); fills the second blank of the /work sentence filter */
  industry?: string;
  year?: string;
  brief?: string;
  idea?: string;
  outcome?: string;
  /** Page images for the 3D flip-through (front cover first, back cover last, even count) */
  book?: string[];
  /** grid shape on /work */
  span?: "wide" | "tall";
}

/** Twelve exported pages per publication, in public/assets/books/<name>/01.webp … 12.webp */
const bookPages = (name: string) => Array.from({ length: 12 }, (_, i) => `/assets/books/${name}/${String(i + 1).padStart(2, "0")}.webp`);

export const projects: Project[] = [
  {
    slug: "jubilee-annual-report",
    book: bookPages("jubilee"),
    title: "2025 Integrated Annual Report",
    client: "Jubilee Holdings",
    industry: "Insurance & finance",
    discipline: "Publication design",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/jub-1.jpg",
    coverAlt: "Front and back covers of the Jubilee Holdings 2025 Integrated Annual Report",
    images: [
      { src: "/assets/images/work/jub-1.jpg", alt: "Front and back covers of the Jubilee Holdings 2025 Integrated Annual Report" },
      { src: "/assets/images/work/jub-2.jpg", alt: "Contents and welcome pages beside the report cover" },
      { src: "/assets/images/work/jub-3.jpg", alt: "Introduction spread with a hand-drawn landscape illustration" },
      { src: "/assets/images/work/jub-4.jpg", alt: "Board of directors spread with illustrated portraits" },
      { src: "/assets/images/work/jub-5.jpg", alt: "Environmental, social and governance spread with infographics" },
      { src: "/assets/images/work/jub-6.jpg", alt: "Sustainability spread with charts and photography" },
      { src: "/assets/images/work/jub-7.jpg", alt: "Regional footprint spread with maps and charts" },
    ],
    span: "wide",
  },
  {
    slug: "tc3-africa",
    title: "Brand identity",
    client: "TC3 Africa",
    industry: "Consulting",
    discipline: "Branding",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/tc3-1.jpg",
    coverAlt: "TC3 Africa business cards in brown, orange and white with a geometric pattern",
    images: [
      { src: "/assets/images/work/tc3-1.jpg", alt: "TC3 Africa business cards in brown, orange and white with a geometric pattern" },
      { src: "/assets/images/work/tc3-2.jpg", alt: "TC3 Africa logo: where wellbeing meets performance" },
      { src: "/assets/images/work/tc3-3.jpg", alt: "TC3 Africa company profile cover with a golden globe" },
      { src: "/assets/images/work/tc3-4.jpg", alt: "Company profile spread about leadership" },
      { src: "/assets/images/work/tc3-5.jpg", alt: "Company profile spread with a chess image and a diagram" },
      { src: "/assets/images/work/tc3-6.jpg", alt: "TC3 Africa brochures on a wooden table" },
      { src: "/assets/images/work/tc3-7.jpg", alt: "TC3 Africa business cards, white version" },
      { src: "/assets/images/work/tc3-8.jpg", alt: "Black hoodie with the TC3 Africa logo" },
      { src: "/assets/images/work/tc3-9.jpg", alt: "TC3 Africa branded lanyards" },
      { src: "/assets/images/work/tc3-10.jpg", alt: "White market umbrella with the TC3 Africa logo, seen from above" },
      { src: "/assets/images/work/tc3-11.jpg", alt: "White cap with the TC3 Africa logo" },
    ],
    span: "tall",
  },
  {
    slug: "transforming-lives-magazine",
    title: "Transforming Lives Magazine 2024/2025",
    client: "Safaricom Foundation & M-PESA Foundation",
    industry: "Non-profit",
    discipline: "Publication design",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/saf-1.jpg",
    coverAlt: "Front and back covers of the Transforming Lives Magazine 2024/2025, a lake at sunset",
    images: [
      { src: "/assets/images/work/saf-1.jpg", alt: "Front and back covers of the Transforming Lives Magazine 2024/2025, a lake at sunset" },
      { src: "/assets/images/work/saf-2.jpg", alt: "Cover beside the foreword and table of contents" },
      { src: "/assets/images/work/saf-3.jpg", alt: "Open magazine at an angle: Kakamega Forest, Beyond the Fence" },
      { src: "/assets/images/work/saf-4.jpg", alt: "Spread: Kakamega Forest, how a community came together to protect nature" },
      { src: "/assets/images/work/saf-5.jpg", alt: "Spread: Hands That Build, a technical college and its students" },
      { src: "/assets/images/work/saf-6.jpg", alt: "Spread: From Shadow to Light, the story of Teresia and a son’s love in Nakuru" },
      { src: "/assets/images/work/saf-7.jpg", alt: "Spread: To Second Chances, with a portrait of a smiling young woman" },
      { src: "/assets/images/work/saf-8.jpg", alt: "Spread: Nothing Goes to Waste, youth and recycling in Kayole" },
      { src: "/assets/images/work/saf-9.jpg", alt: "Spread with forest photography and a pull quote" },
    ],
  },
  {
    slug: "kca-alumni-connect",
    title: "KCA Alumni Connect Magazine 2025",
    client: "KCA University",
    industry: "Education",
    discipline: "Publication design",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/kca-1.jpg",
    coverAlt: "Two copies of the KCA Alumni Connect magazine 2025: Rooted in Legacy, Rising with Purpose",
    images: [
      { src: "/assets/images/work/kca-1.jpg", alt: "Two copies of the KCA Alumni Connect magazine 2025: Rooted in Legacy, Rising with Purpose" },
      { src: "/assets/images/work/kca-2.jpg", alt: "Cover beside the Welcome Home editor’s message and contents" },
      { src: "/assets/images/work/kca-3.jpg", alt: "Spread: messages from the Vice-Chancellor and the Director of Alumni Relations" },
      { src: "/assets/images/work/kca-4.jpg", alt: "Spread: message from the Chairperson and Meet the Board" },
      { src: "/assets/images/work/kca-5.jpg", alt: "Spread: Behind the Scenes, the Alumni Secretariat, with a world map infographic" },
      { src: "/assets/images/work/kca-6.jpg", alt: "Spread: Mentorship Matchmaking and Alumni in Action" },
      { src: "/assets/images/work/kca-7.jpg", alt: "Spread: pictorials and alumni benefits" },
      { src: "/assets/images/work/kca-8.jpg", alt: "Open magazine at an angle beside its cover" },
      { src: "/assets/images/work/kca-9.jpg", alt: "Front and back covers of the KCA Alumni Connect magazine" },
    ],
  },
  {
    slug: "acb-season-6-magazine",
    book: bookPages("acb"),
    title: "ACB Season 6 Magazine",
    client: "Africa's Campus Battle",
    industry: "Entertainment",
    discipline: "Publication design",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/acb-1.jpg",
    coverAlt: "Front and back covers of the ACB Season 6 magazine",
    images: [
      { src: "/assets/images/work/acb-1.jpg", alt: "Front and back covers of the ACB Season 6 magazine" },
      { src: "/assets/images/work/acb-2.jpg", alt: "Open magazine at an angle showing the contents page" },
      { src: "/assets/images/work/acb-3.jpg", alt: "Spread: mission, vision and core values, and Meet the Team" },
      { src: "/assets/images/work/acb-4.jpg", alt: "Spread: A Platform for Change and The Jury and Host" },
      { src: "/assets/images/work/acb-5.jpg", alt: "Spread: Spotlight on the Winner, Jackline Malavanu" },
      { src: "/assets/images/work/acb-6.jpg", alt: "Spread: ACB Champion, the journey and the future" },
      { src: "/assets/images/work/acb-7.jpg", alt: "Spread: highlight on the title sponsor and Health Matters" },
      { src: "/assets/images/work/acb-8.jpg", alt: "Spread: partner features and the AASU-ACB partnership" },
      { src: "/assets/images/work/acb-9.jpg", alt: "Two copies of the ACB Season 6 magazine on a dark background" },
    ],
  },
  {
    slug: "kounkuey-at-20",
    title: "Kounkuey @20",
    client: "Kounkuey Design Initiative",
    industry: "Non-profit",
    discipline: "Photography",
    crafts: ["photography", "film"],
    cover: "/assets/images/work/k20-37.jpg",
    coverAlt: "Dancer in red with a shaker at the Kounkuey Design Initiative 20-year celebration",
    images: [
      { src: "/assets/images/work/k20-37.jpg", alt: "Dancer in red with a shaker at the Kounkuey Design Initiative 20-year celebration" },
      { src: "/assets/images/work/k20-127.jpg", alt: "Traditional dancers performing on a sports court" },
      { src: "/assets/images/work/k20-55.jpg", alt: "Footballer striking a yellow ball on a community court" },
      { src: "/assets/images/work/k20-82.jpg", alt: "Guest laughing in the sunshine" },
      { src: "/assets/images/work/k20-145.jpg", alt: "Speaker in a green jacket and red hat with two young people" },
      { src: "/assets/images/work/k20-226.jpg", alt: "Three guests showing their medals" },
      { src: "/assets/images/work/k20-262.jpg", alt: "Host in a red suit in front of the Celebrating 20 Years backdrop" },
      { src: "/assets/images/work/k20-307.jpg", alt: "Four guests in patterned outfits at the gala" },
      { src: "/assets/images/work/k20-433.jpg", alt: "Guest clapping at a dinner table with yellow flowers" },
      { src: "/assets/images/work/k20-442.jpg", alt: "Guests cheering at the gala dinner" },
      { src: "/assets/images/work/k20-496.jpg", alt: "Two guests smiling at dinner" },
      { src: "/assets/images/work/k20-514.jpg", alt: "Guest waving from the dinner table" },
    ],
    span: "wide",
  },
  {
    // TODO(owner): placeholder name and no location given; confirm both.
    slug: "low-tide",
    title: "Low Tide",
    discipline: "Photography",
    crafts: ["photography", "film"],
    cover: "/assets/images/work/coast-1.jpg",
    coverAlt: "Two boys running through shallow water towards the camera",
    images: [
      { src: "/assets/images/work/coast-1.jpg", alt: "Two boys running through shallow water towards the camera" },
      { src: "/assets/images/work/coast-2.jpg", alt: "A boy swinging from the rigging of a dhow at low tide" },
      { src: "/assets/images/work/coast-3.jpg", alt: "A boy standing on a beached outrigger canoe, looking out to sea" },
      { src: "/assets/images/work/coast-4.jpg", alt: "A dhow with a branded white sail on turquoise water" },
      { src: "/assets/images/work/coast-5.jpg", alt: "A dhow at anchor with two people wading beside it" },
      { src: "/assets/images/work/coast-6.jpg", alt: "A wooden boat reflected in still, shallow water" },
      { src: "/assets/images/work/coast-7.jpg", alt: "A painted fishing boat resting on the tidal flats" },
      { src: "/assets/images/work/coast-8.jpg", alt: "A fisherman walking across the reef holding an octopus" },
      { src: "/assets/images/work/coast-9.jpg", alt: "A fisherman in a green sweatshirt holding up his catch" },
      { src: "/assets/images/work/coast-10.jpg", alt: "Close-up of hands holding an octopus" },
      { src: "/assets/images/work/coast-11.jpg", alt: "A laughing boy sitting on the bow of a small boat on the beach" },
      { src: "/assets/images/work/coast-12.jpg", alt: "Two boys wading in from the sea with a dhow behind them" },
    ],
  },
  {
    slug: "orange-and-green-cafe",
    title: "The Orange & Green Café",
    discipline: "Branding",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/projects/cafe-identity-branding.jpg",
    coverAlt: "Branded coffee cup for The Orange and Green Café",
    images: [{ src: "/assets/images/projects/cafe-identity-branding.jpg", alt: "Branded coffee cup for The Orange and Green Café" }],
  },
  {
    slug: "riders",
    title: "Riders",
    discipline: "Photography",
    crafts: ["photography", "film"],
    cover: "/assets/images/projects/045A6871.jpg",
    coverAlt: "Woman holding a motorbike helmet, smiling",
    images: [
      { src: "/assets/images/projects/045A6871.jpg", alt: "Woman holding a motorbike helmet, smiling" },
      { src: "/assets/images/projects/045A7211.jpg", alt: "Rider in a number 7 jersey on a motorbike" },
      { src: "/assets/images/projects/morio3.jpg", alt: "Woman in a hat on a motorbike under palm trees" },
      { src: "/assets/images/projects/lt2.jpeg", alt: "Rider sitting on an orange motorbike" },
      { src: "/assets/images/projects/045A4377.jpg", alt: "Motorbike helmet resting on a bike" },
      { src: "/assets/images/projects/morio2.jpg", alt: "Woman laughing with a helmet under her arm" },
    ],
  },
  {
    slug: "maize-flour",
    title: "Maize Flour",
    discipline: "Packaging",
    crafts: ["branding"],
    cover: "/assets/images/projects/maizeflour.jpg",
    coverAlt: "Maize flour packaging design",
    images: [{ src: "/assets/images/projects/maizeflour.jpg", alt: "Maize flour packaging design" }],
  },
  {
    slug: "morio-can",
    title: "Morio Can",
    discipline: "Art direction",
    crafts: ["creative-direction", "animation"],
    cover: "/assets/images/projects/branding.jpg",
    coverAlt: "Morio Studios drinks can with splash",
    images: [{ src: "/assets/images/projects/branding.jpg", alt: "Morio Studios drinks can with splash" }],
  },
  {
    slug: "roommates",
    title: "Roommates & Sandwiches",
    discipline: "Art direction",
    crafts: ["creative-direction", "branding"],
    cover: "/assets/images/projects/morio4.jpg",
    coverAlt: "Collage artwork with a hand holding a glass",
    images: [{ src: "/assets/images/projects/morio4.jpg", alt: "Collage artwork with a hand holding a glass" }],
  },
  {
    slug: "landscapes",
    title: "Landscapes",
    discipline: "Photography",
    crafts: ["photography", "film"],
    cover: "/assets/images/projects/ab3.jpeg",
    coverAlt: "Nairobi skyline at dusk",
    images: [
      { src: "/assets/images/projects/ab3.jpeg", alt: "Nairobi skyline at dusk" },
      { src: "/assets/images/projects/ab7.jpeg", alt: "Gorge cliffs at Hell's Gate, Kenya" },
      { src: "/assets/images/projects/ab1.jpeg", alt: "Sunset over a lake with hills" },
      { src: "/assets/images/projects/ab8.jpeg", alt: "River gorge with rock walls" },
      { src: "/assets/images/projects/ab2.jpeg", alt: "Sunset over sand dunes" },
      { src: "/assets/images/projects/ab6.jpeg", alt: "Storm clouds over a lake at sunset" },
    ],
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

/** Projects on the home page wall: client work first, then studio pieces. */
export const homeProjects = [
  "jubilee-annual-report",
  "tc3-africa",
  "transforming-lives-magazine",
  "kounkuey-at-20",
  "low-tide",
  "kca-alumni-connect",
  "acb-season-6-magazine",
  "riders",
  "maize-flour",
  "morio-can",
].map((s) => projectBySlug[s]);

/** Projects related to a craft (service slug). */
/** "Riders for Client" once a client is known, otherwise just the title. */
export const projectLabel = (p: Project) => (p.client ? `${p.title} for ${p.client}` : p.title);

export const projectsForCraft = (slug: string) => projects.filter((p) => p.crafts.includes(slug));

/** A film: plays in a lightbox from Vimeo or the studio's shared Drive folder. */
export interface Film {
  slug: string;
  title: string;
  poster: string;
  /** player URL used in the lightbox iframe */
  embed: string;
}

const drive = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

// TODO(owner): titles come from the file names; add client/role credits if wanted.
export const films: Film[] = [
  { slug: "xceed", title: "Xceed Set Up: Behind the Scenes", poster: "/assets/images/work/film-xceed.jpg", embed: "https://player.vimeo.com/video/1131237701?autoplay=1&title=0&byline=0" },
  { slug: "water", title: "Water", poster: "/assets/images/work/film-water.jpg", embed: drive("1gAgMBsgC1zLZP-zgP1nZjhRR_yaoBLFS") },
  { slug: "yellow-wings", title: "Yellow Wings Charter", poster: "/assets/images/work/film-wings.jpg", embed: drive("1ElpU_XuXyZxmignQB9kkPHRpdPL7svcf") },
];
