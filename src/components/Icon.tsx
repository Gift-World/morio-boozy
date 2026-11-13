import { faBehance, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

const ICONS = {
  bars: faBars,
  behance: faBehance,
  instagram: faInstagram,
  twitter: faTwitter,
} satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof ICONS;

/**
 * Inline SVG icon (Font Awesome 6 paths). Replaces the icon font, which cost
 * ~400 KB of CSS and fonts for four glyphs. Keeps the original `<i>` wrapper
 * classes so the theme's sizing/colour/hover rules still apply.
 */
export function Icon({ name, className }: { name: IconName; className: string }) {
  const [w, h, , , d] = ICONS[name].icon;
  return (
    <i className={className} aria-hidden="true">
      <svg className="svg-icon" viewBox={`0 0 ${w} ${h}`} focusable="false">
        <path d={typeof d === "string" ? d : d.join(" ")} />
      </svg>
    </i>
  );
}
