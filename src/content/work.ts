// Selected work shown on the home and /work pages.
//
// TODO(owner): these are the studio's own images, labelled only by discipline.
// To turn any of them into a full case study, add `client`, `year` and
// `summary` (the brief, what you did, the result) and a `slug`; the work page
// already renders those fields when present.

export type Discipline = "Branding" | "Packaging" | "Photography" | "Art direction";

export interface WorkItem {
  image: string;
  alt: string;
  discipline: Discipline;
  title: string;
  client?: string;
  year?: string;
  summary?: string;
  /** "wide" spans two columns in the grid */
  span?: "wide" | "tall";
}

export const work: WorkItem[] = [
  { image: "/assets/images/projects/cafe-identity-branding.jpg", alt: "Branded coffee cup for The Orange and Green Café", discipline: "Branding", title: "Café identity", span: "wide" },
  { image: "/assets/images/projects/045A6871.jpg", alt: "Woman holding a motorbike helmet, smiling", discipline: "Photography", title: "Riders series", span: "tall" },
  { image: "/assets/images/projects/maizeflour.jpg", alt: "Maize flour packaging design", discipline: "Packaging", title: "Maize flour packaging" },
  { image: "/assets/images/projects/branding.jpg", alt: "Morio Studios drinks can with splash", discipline: "Art direction", title: "Can concept" },
  { image: "/assets/images/projects/045A7211.jpg", alt: "Rider in a number 7 jersey on a motorbike", discipline: "Photography", title: "Riders series" },
  { image: "/assets/images/projects/morio4.jpg", alt: "Collage artwork with a hand holding a glass", discipline: "Art direction", title: "Collage campaign", span: "tall" },
  { image: "/assets/images/projects/morio3.jpg", alt: "Woman in a hat on a motorbike under palm trees", discipline: "Photography", title: "Riders series", span: "wide" },
  { image: "/assets/images/projects/lt2.jpeg", alt: "Rider sitting on an orange motorbike", discipline: "Photography", title: "Riders series" },
  { image: "/assets/images/projects/045A4377.jpg", alt: "Motorbike helmet resting on a bike", discipline: "Photography", title: "Riders series" },
  { image: "/assets/images/projects/ab7.jpeg", alt: "Gorge cliffs at Hell's Gate, Kenya", discipline: "Photography", title: "Landscapes" },
  { image: "/assets/images/projects/ab3.jpeg", alt: "Nairobi skyline at dusk", discipline: "Photography", title: "Landscapes", span: "wide" },
  { image: "/assets/images/projects/ab1.jpeg", alt: "Sunset over a lake with hills", discipline: "Photography", title: "Landscapes" },
];
