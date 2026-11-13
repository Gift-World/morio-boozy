import { createElement } from "react";
import type { OwlOptions } from "./OwlCarousel";

// Carousel settings, copied from the theme's theme.js.

const arrows: OwlOptions["navText"] = [
  createElement("i", { className: "boozy-left-arrow" }),
  createElement("i", { className: "boozy-righ-arrow" }),
];

export const projectCarouselOptions: OwlOptions = {
  autoplay: false,
  margin: 24,
  loop: false,
  nav: false,
  navText: arrows,
  dots: true,
  responsive: {
    0: { items: 1, dots: false, autoplay: true, loop: true },
    576: { items: 1, dots: false, autoplay: true, loop: true },
    768: { items: 2 },
    992: { items: 2 },
    1200: { items: 3 },
  },
};

export const testimonialOptions: OwlOptions = {
  autoplay: false,
  loop: true,
  nav: true,
  navText: arrows,
  dots: false,
  responsive: { 0: { items: 1 }, 1200: { items: 1 } },
};

export const clientLogoOptions: OwlOptions = {
  autoplay: false,
  loop: true,
  nav: false,
  dots: false,
  margin: 0,
  responsive: { 0: { items: 1 }, 576: { items: 2 }, 768: { items: 3 }, 992: { items: 4 }, 1200: { items: 6 } },
};
