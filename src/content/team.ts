// The four Morios. Bios are the studio's own (lightly copy-edited).

export interface Morio {
  name: string;
  role: string;
  bio: string;
  /** Green-spotlight portrait */
  spotlight: string;
  /** Natural portrait */
  portrait: string;
  portfolio: string;
}

export const team: Morio[] = [
  {
    name: "Feysal Anthony Nair",
    role: "Creative Director",
    bio: "A multidisciplinary creative with over 24 years of experience in art direction and creative direction. Mentored by some of the most creative minds in Africa, Feysal has worked on award-winning campaigns for brands like Safaricom, Diageo, ICEA Lion, Bidco, Grain Industries, Bayer, USAID, I&M Bank, GOK, Toyota, Jetlak Foods, Seychelles Tourism Board, Magical Kenya, Air Kenya, SBM Bank, Cooperative Bank, Frytol Ghana, Wilderness Lodges and Pernod Ricard.",
    spotlight: "/assets/images/team/FEY2.jpeg",
    portrait: "/assets/images/team/feysal3.jpeg",
    portfolio: "https://www.behance.net/feysless",
  },
  {
    name: "Sydney Ang'ila",
    role: "Film & Production Director",
    bio: "A Morio with a talent for film editing and a passion for weaving captivating stories through post-production. A keen eye for detail and a dedication to crafting visual narratives, transforming raw footage into polished work that inspires audiences. Has collaborated with organisations like GIZ, the Centre for Agriculture and Biosciences International (CABI), OKHI Kenya, Ultra Events, Uwezo Fund, Youth Fund and Africa’s Campus Battle.",
    spotlight: "/assets/images/team/SYD2.jpeg",
    portrait: "/assets/images/team/Images-02.webp",
    portfolio: "https://www.behance.net/videopicha",
  },
  {
    name: "Brian Macharia",
    role: "Art Director & Graphic Designer",
    bio: "A dynamic, innovative graphic designer with 5+ years of experience in web design and branding across a wide range of campaigns, and art direction on campaigns over the past two years. Experienced in both print and digital design, and skilled across Adobe Creative Suite.",
    spotlight: "/assets/images/team/BRI-2.jpeg",
    portrait: "/assets/images/team/Images-01.webp",
    portfolio: "https://www.behance.net/brayanmacharia",
  },
  {
    name: "Vincent Karani",
    role: "Animation & Post-Production Director",
    bio: "An artist adept at design, animation, photography, videography and editing, now in his third year as an animator and editor. Passionate about filmmaking and film scripting.",
    spotlight: "/assets/images/team/VIN2.jpeg",
    portrait: "/assets/images/team/Vincent.webp",
    portfolio: "https://www.behance.net/vincentkarani1",
  },
];
