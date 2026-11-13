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
} as const;

export const nav = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

/** Morio slang from the old testimonial slider: the studio's voice. */
export const morioisms = [
  { phrase: "Iz How?", meaning: "A standard Morio greeting." },
  { phrase: "Weh, Checki!", meaning: "A Morio making a point." },
  { phrase: "Ume Choma!", meaning: "A Morio telling you that you messed up." },
  { phrase: "Noma Sana!", meaning: "A Morio telling you something is good." },
  { phrase: "Hiyo Haiwez Make!", meaning: "A Morio telling you something doesn’t work." },
] as const;
