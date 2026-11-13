// The four Morios. Bios are the studio's own (lightly copy-edited).

export interface Morio {
  name: string;
  /** Short name used on cards ("Meet the Morios") */
  shortName: string;
  /** Title shown on the home page */
  title: string;
  /** Role shown with the full bio */
  role: string;
  bio: string;
  /** Green-spotlight portrait */
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
    bio: "This Morio is a multidisciplinary creative with over 24 years of experience in art direction and creative direction. Having been mentored by some of the most creative minds in Africa, Feysal has worked on award-winning campaigns for brands like Safaricom, Diageo, ICEA Lion, Bidco, Grain Industries, Bayer, USAID, I&M Bank, GOK, Toyota, Jetlak Foods, Seychelles Tourism Board, Magical Kenya, Air Kenya, SBM Bank, Cooperative Bank, Frytol Ghana, Wilderness Lodges and Pernod Ricard.",
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
    bio: "A Morio with a talent for film editing and a passion for weaving captivating stories through the power of post-production. Possesses a keen eye for detail and a dedication to crafting visual narratives, transforming raw footage into polished works that inspire audiences. Has collaborated with notable organisations like Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), the Centre for Agriculture and Biosciences International (CABI), OKHI Kenya, Ultra Events, Uwezo Fund, Youth Fund and Africa’s Campus Battle.",
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
    bio: "The dynamic and innovative Morio is a graphic designer with 5+ years of experience in webpage design and branding across a wide range of campaigns. Over the past two years, he has produced art direction for a range of campaigns. Experienced in both print and digital design, and skilled in Adobe Creative Suite.",
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
    bio: "This Morio is an artist adept at a number of skills, including design, animation, photography, videography and editing. He is currently in the third year of holding a tenure as an animator and editor, and is passionate about filmmaking and film scripting.",
    spotlight: "/assets/images/team/VIN2-tone.jpg",
    portrait: "/assets/images/team/Vincent.webp",
    portfolio: "https://www.behance.net/vincentkarani1",
    email: "vincent@moriostudios.africa",
  },
];
