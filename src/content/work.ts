// Projects shown on the home page, /work and each /work/<slug> story page.
// Images are the studio's own.
//
// TODO(owner): project names below are descriptive placeholders taken from
// what's in each image. Replace them with the real project names and add
// `client`, `year` and the story fields (brief / idea / outcome). Story pages
// render those sections automatically when they're filled in.

export type Discipline = "Branding" | "Packaging" | "Art direction" | "Photography";

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
  year?: string;
  brief?: string;
  idea?: string;
  outcome?: string;
  /** grid shape on /work */
  span?: "wide" | "tall";
}

export const projects: Project[] = [
  {
    slug: "orange-and-green-cafe",
    title: "The Orange & Green Café",
    discipline: "Branding",
    crafts: ["branding", "creative-direction"],
    cover: "/assets/images/projects/cafe-identity-branding.jpg",
    coverAlt: "Branded coffee cup for The Orange and Green Café",
    images: [{ src: "/assets/images/projects/cafe-identity-branding.jpg", alt: "Branded coffee cup for The Orange and Green Café" }],
    span: "wide",
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
    span: "tall",
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
    span: "tall",
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
    span: "wide",
  },
];

export const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

/** The four projects the original home page showed under "Latest projects". */
export const homeProjects = ["maize-flour", "riders", "morio-can", "roommates"].map((s) => projectBySlug[s]);

/** Projects related to a craft (service slug). */
export const projectsForCraft = (slug: string) => projects.filter((p) => p.crafts.includes(slug));
