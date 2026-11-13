// Global styles, imported once from the entry points.
//
// Order matters and mirrors the original <link> order. The theme stylesheets
// are unlayered, so they win over Tailwind's layered output (preflight +
// utilities) - the same cascade the old Tailwind CDN script had.
//
// Phase 1 trims: Font Awesome (replaced by components/Icon) and the CSS of
// plugins the site never used (lightslider, lightcase, nice-select, slick) are
// no longer loaded; unused selectors in the rest are stripped at build time
// (see vite.config.ts).
import "./fonts.css";
import "./tailwind.css";
import "./legacy/bootstrap.css";
import "./legacy/animate.css";
import "./legacy/boozy-icons.css";
import "./legacy/owl.theme.default.min.css";
import "./legacy/owl.carousel.min.css";
import "./legacy/settings.css";
import "./legacy/aos.css";
import "./legacy/ignore_for_wp.css";
import "./legacy/preset.css";
import "./legacy/theme.css";
import "./legacy/responsive.css";
import "./enhancements.css";
