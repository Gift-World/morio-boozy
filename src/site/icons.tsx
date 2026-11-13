import { faBehance, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faArrowUpRightFromSquare, faBars, faXmark, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

const ICONS = {
  arrow: faArrowRight,
  external: faArrowUpRightFromSquare,
  menu: faBars,
  close: faXmark,
  phone: faPhone,
  mail: faEnvelope,
  whatsapp: faWhatsapp,
  instagram: faInstagram,
  behance: faBehance,
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof ICONS;

/** Inline SVG icon (Font Awesome 6 paths), sized by font-size. */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const [w, h, , , d] = ICONS[name].icon;
  return (
    <svg
      className={`inline-block h-[1em] w-auto shrink-0 fill-current ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={typeof d === "string" ? d : d.join(" ")} />
    </svg>
  );
}
