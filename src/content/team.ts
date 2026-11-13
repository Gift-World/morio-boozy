// The four Morios. Bios, names and titles are the studio's own words from the
// original site (only broken line-break hyphens such as "cap- tivating" were
// joined). Array order is the About page's; the home page lists Sydney first,
// as the original did (see homeOrder).

export interface Morio {
  /** Name as on the About page */
  name: string;
  /** Name as on the home page cards */
  shortName: string;
  /** Title shown on the home page */
  title: string;
  /** Role shown with the bio on the About page */
  role: string;
  bio: string;
  /** Spotlight portrait, toned to the logo green */
  spotlight: string;
  /** Natural portrait */
  portrait: string;
  portfolio: string;
  email: string;
}

export const team: Morio[] = [
  {
    name: "Feysal Anthony Nair",
    shortName: "Feysal Anthony",
    title: "Director Creative and Strategy",
    role: "Creative Director",
    bio: "This morio is a multi disciplinary creative with over 24 yrs of experience in Art Direction and Creative Direction. Having been mentored by some of the most creative minds in Africa Feysal has worked on award winning campaigns for brands like Safaricom, Diageo, ICEA Lion, Bidco, Grain Industries, Bayer, USAID, I&M bank, GOK, Toyota, Jetlak Foods, Seychelles Tourism Board, Magical Kenya, Air Kenya, SBM Bank, Cooperative Bank, Frytol Ghana, Wilderness Lodges and Pernod Ricard.",
    spotlight: "/assets/images/team/FEY2-tone.jpg",
    portrait: "/assets/images/team/feysal3.jpeg",
    portfolio: "https://www.behance.net/feysless",
    email: "feysal@moriostudios.africa",
  },
  {
    name: "Sydney Ang'ila",
    shortName: "Sydney Ang'ila",
    title: "Director of Film and Photography",
    role: "Film and Production Director",
    bio: "A morio with a talent for film editing and a passion for weaving captivating stories through the power of post-production. Posseses a keen eye for detail and a dedication to crafting visual narratives, transforming raw footage into polished works that inspire audiences. Having collaborated with notable organizations like Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), the Centre for Agriculture and Biosciences International (CABI), OKHI Kenya, Ultra Events Uwezo Fund, Youth Fund, and Africa’s Campus Battle.",
    spotlight: "/assets/images/team/SYD2-tone.jpg",
    portrait: "/assets/images/team/Images-02.webp",
    portfolio: "https://www.behance.net/videopicha",
    email: "sydney@moriostudios.africa",
  },
  {
    name: "Brian Macharia",
    shortName: "Brian Macharia",
    title: "Director Art and UX",
    role: "Art Director and Graphic Designer",
    bio: "The Dynamic and innovative morio is a graphic designer with 5+ years of experience in webpage design and branding across a wide range of campaigns. Over the past 2 years, managed to produce various art direction for different campaigns. Experienced in both print and digital design. Skilled in Adobe Creative Suite.",
    spotlight: "/assets/images/team/BRI-2-tone.jpg",
    portrait: "/assets/images/team/Images-01.webp",
    portfolio: "https://www.behance.net/brayanmacharia",
    email: "brian@moriostudios.africa",
  },
  {
    name: "Vincent Karani",
    shortName: "Vincent Karani",
    title: "Director of Content and Animation",
    role: "Animation and Post Production Director",
    bio: "This morio is an artist adept at a number of skills. including Design, Animation, Photography, Videography and Editing. He is currently in the third year of holding a tenure as an animator and editor. He is passionate about filmmaking and film scripting.",
    spotlight: "/assets/images/team/VIN2-tone.jpg",
    portrait: "/assets/images/team/Vincent.webp",
    portfolio: "https://www.behance.net/vincentkarani1",
    email: "vincent@moriostudios.africa",
  },
];

/** "Meet the Morios" card order on the original home page. */
export const homeTeam = ["Sydney Ang'ila", "Feysal Anthony Nair", "Brian Macharia", "Vincent Karani"].map((n) => team.find((m) => m.name === n)!);
