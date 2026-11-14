// Projects shown on the home page, /work and each /work/<slug> story page,
// plus the studio's films. Images are the studio's own.
//
// The first seven projects are real client work (names and clients are taken
// from the artwork itself). TODO(owner): confirm each one's wording, add
// `year` and the story fields (brief / idea / outcome); story pages render
// those sections automatically when they're filled in. The last six are
// studio pieces whose names are still descriptive placeholders.

export type Discipline = "Branding" | "Publication design" | "Campaign design" | "Photography" | "Packaging" | "Art direction";

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
  /** grid shape on /work */
  span?: "wide" | "tall";
}

export const projects: Project[] = [
  {
    slug: "jubilee-annual-report",
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
    slug: "ukulima-true",
    title: "Ukulima True",
    client: "CABI",
    industry: "Agriculture",
    discipline: "Campaign design",
    crafts: ["branding", "creative-direction", "photography"],
    cover: "/assets/images/work/ukulima-1.jpg",
    coverAlt: "Ukulima True poster: a farmer in protective gear spraying crops, Kagua Vifaa Vyako",
    images: [
      { src: "/assets/images/work/ukulima-1.jpg", alt: "Ukulima True poster: a farmer in protective gear spraying crops, Kagua Vifaa Vyako" },
      { src: "/assets/images/work/ukulima-2.jpg", alt: "Ukulima True poster: a farmer checking her crops, Kaa Chonjo" },
      { src: "/assets/images/work/ukulima-3.jpg", alt: "Ukulima True poster: Chagua Muda Bora" },
      { src: "/assets/images/work/ukulima-4.jpg", alt: "Report cover: social and behavioural study on pesticides risk reduction" },
      { src: "/assets/images/work/ukulima-5.jpg", alt: "Final project report cover for the pesticides risk reduction campaign" },
      { src: "/assets/images/work/ukulima-6.jpg", alt: "Progress report cover with a smiling farmer" },
    ],
  },
  {
    slug: "year-of-millets",
    title: "International Year of Millets",
    client: "CIMMYT",
    industry: "Agriculture",
    discipline: "Campaign design",
    crafts: ["branding", "photography"],
    cover: "/assets/images/work/millets-4.jpg",
    coverAlt: "Millets poster: a smiling farmer pouring grain through her hands",
    images: [
      { src: "/assets/images/work/millets-4.jpg", alt: "Millets poster: a smiling farmer pouring grain through her hands" },
      { src: "/assets/images/work/millets-1.jpg", alt: "Millets poster: farmers in a sorghum field" },
      { src: "/assets/images/work/millets-2.jpg", alt: "Millets poster: farmers threshing their harvest" },
      { src: "/assets/images/work/millets-3.jpg", alt: "Millets poster: a farmer in her field" },
    ],
    span: "tall",
  },
  {
    slug: "twanga-kolera",
    title: "Twanga Kolera",
    client: "Ministry of Health",
    industry: "Public health",
    discipline: "Campaign design",
    crafts: ["branding", "creative-direction", "film"],
    cover: "/assets/images/work/kolera-1.jpg",
    coverAlt: "Twanga Kolera poster: Mama, a woman washing vegetables",
    images: [
      { src: "/assets/images/work/kolera-1.jpg", alt: "Twanga Kolera poster: Mama, a woman washing vegetables" },
      { src: "/assets/images/work/kolera-2.jpg", alt: "Twanga Kolera poster: Mwalimu, a teacher with pupils at a water point" },
      { src: "/assets/images/work/kolera-3.jpg", alt: "Twanga Kolera poster: a woman washing her hands" },
    ],
  },
  {
    slug: "afya-nyumbani",
    title: "Afya Nyumbani",
    industry: "Public health",
    discipline: "Campaign design",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/work/afya-2.jpg",
    coverAlt: "Afya Nyumbani poster: a community health worker holding a child",
    images: [
      { src: "/assets/images/work/afya-2.jpg", alt: "Afya Nyumbani poster: a community health worker holding a child" },
      { src: "/assets/images/work/afya-1.jpg", alt: "Afya Nyumbani poster: a health worker visiting a family" },
      { src: "/assets/images/work/afya-3.jpg", alt: "Afya Nyumbani poster: a health worker with a kit" },
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
  "kounkuey-at-20",
  "ukulima-true",
  "year-of-millets",
  "twanga-kolera",
  "riders",
  "afya-nyumbani",
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
  { slug: "aisa-tanzania", title: "AISA Tanzania: CIMMYT Project", poster: "/assets/images/work/film-aisa.jpg", embed: drive("1Qg93YUdgGdToUILfSY8Jykd-FxvstDMq") },
  { slug: "twanga-kolera-tvc", title: "Twanga Kolera TVC", poster: "/assets/images/work/film-kolera.jpg", embed: drive("1eNzD_joGPlusMjErngc4Ewm6exKR3L-D") },
  { slug: "water", title: "Water", poster: "/assets/images/work/film-water.jpg", embed: drive("1gAgMBsgC1zLZP-zgP1nZjhRR_yaoBLFS") },
  { slug: "ukulima-true-film", title: "Ukulima True", poster: "/assets/images/work/film-ukulima.jpg", embed: drive("1_ktKu_djHEG32EQDIkVXNOQXivciq3sZ") },
  { slug: "fgm-champions", title: "Ending Female Genital Mutilation: FGM Champions", poster: "/assets/images/work/film-fgm.jpg", embed: drive("1jAaeN0M37LwdPq2i89AkcqmFQgbLifkd") },
  { slug: "yellow-wings", title: "Yellow Wings Charter", poster: "/assets/images/work/film-wings.jpg", embed: drive("1ElpU_XuXyZxmignQB9kkPHRpdPL7svcf") },
];
