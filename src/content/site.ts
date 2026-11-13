// Studio details used across the site, footer, contact page and structured data.
// Edit here, not in components.

export const site = {
  name: "Morio Studios",
  tagline: "Small agency, big ideas.",
  url: "https://moriostudios.africa",
  founded: "2024",
  phone: { display: "+254 718 704 926", tel: "+254718704926" },
  // TODO(owner): confirm this number is on WhatsApp (used for the chat button).
  whatsapp: "254718704926",
  email: "moriostudios@gmail.com",
  hours: { label: "Monday – Friday, 6 am to 8 pm EAT", schema: "Mo-Fr 06:00-20:00" },
  // TODO(owner): the old site listed three locations (Kenyatta Avenue, Ngong Road
  // postal address, and a map pin at Adams Arcade). Confirm the studio address.
  address: { street: "Kenyatta Avenue", city: "Nairobi", country: "KE", countryName: "Kenya" },
  postal: "Morio Studios, 22707-00505, Ngong Road, Nairobi, Kenya",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7908569907054!2d36.777850373500655!3d-1.3003299356385623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b264fa4327b%3A0x4a4fd87e6260dbe!2sAdams%20Arcade!5e0!3m2!1sen!2ske!4v1776766655424!5m2!1sen!2ske",
  socials: [{ label: "Instagram", href: "https://www.instagram.com/moriostudios/" }],
  /** Studio emails, one per Morio (shown under "Talk to a Morio"). */
  teamEmails: ["feysal@moriostudios.africa", "sydney@moriostudios.africa", "brian@moriostudios.africa", "vincent@moriostudios.africa"],
} as const;

/** Main navigation: the studio's own names from the original site. */
export const nav = [
  { label: "Home", to: "/" },
  { label: "Our Craft", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "The Morios", to: "/about" },
  { label: "Hola", to: "/contact" },
] as const;

export const mantra = "small agency, big ideas";

/** Morio slang from the original testimonial slider: the studio's voice. */
export const morioisms = [
  { phrase: "Iz How?", meaning: "A standard morio greeting." },
  { phrase: "Weh, Checki!", meaning: "A morio making a point." },
  { phrase: "Ume, Choma!", meaning: "A morio telling you that you messed up." },
  { phrase: "Noma, Sana!", meaning: "A morio telling you something is good." },
  { phrase: "Hiyo, Haiwez make!", meaning: "A morio telling you something doesn’t work." },
] as const;

/** Home page copy (from the original hero and craft section). */
export const homeCopy = {
  intro:
    "Built on passion and love for creativity and storytelling. Morio Studio’s is the brain child of 4 Kenyan friends who had a common goal, to craft an agency that would be nimble, versatile and smart.",
  introMore:
    "With each morio possessing a unique skill set that complimented the whole. We believe in smart, innovative solutions to problem solving and meeting the clients goals. We put human thinking and technological efficiency together to create workflows that solve any brief from concept to execution.",
  tagline: ["If the big idea is good,", "Execution is academic."],
  /** The craft list exactly as the original home page showed it */
  crafts: [
    { label: "Creative direction and Art direction", slug: "creative-direction", icon: "/assets/images/icon/icon_creative.png" },
    { label: "Graphic Design and Branding", slug: "branding", icon: "/assets/images/icon/icon_graphic.png" },
    { label: "Films and Documentaries", slug: "film", icon: "/assets/images/icon/icon_film.png" },
    { label: "Photography and Illustration", slug: "photography", icon: "/assets/images/icon/icon_photo.png" },
    { label: "Animation and AI-mation", slug: "animation", icon: "/assets/images/icon/icon_anim.png" },
  ],
} as const;

/** Labels from the original site, reused as section headings and links. */
export const labels = {
  ourCraft: "Our Craft",
  moreCraft: "More Craft",
  latestProjects: "Latest projects",
  meetTheMorios: "Meet the Morios",
  knowTheMorios: "Know the Morios",
  experiencedTeam: "Our Experienced Team",
  talkToAMorio: "Talk to a Morio",
  contactUs: "Contact us",
  aboutUs: "About us",
  forInquiries: "For Inquiries",
  officeHours: "Office Hours",
  postAddress: "Post address",
  portfolio: "Portfolio >>",
} as const;

/** About page copy (from the original "The Morios" page). */
export const aboutCopy = {
  definition: "is Kiswahili slang for a friend — someone you can count on.",
  collective:
    "is a collective of four brilliant creative minds bringing unique flavour to the creative soup. Founded in 2024, a light-bulb moment sparked a studio blending talents across ideation, concept development, creative direction, graphic design, animation, photography, and film.",
  delivery:
    "We deliver end-to-end creative output, from concept to final production — bringing brand and human stories to life through a fusion of talent, skill, and experience. With new-age thinking, our workflows integrate AI creative tools to accelerate conceptualization and visualization, giving us the edge to deliver high-quality creativity in record time.",
  closer: "Where vision meets innovation, Morio creates.",
} as const;
