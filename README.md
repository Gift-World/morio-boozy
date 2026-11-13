# Morio Studio

Morio Studio is a boutique creative agency operating at the intersection of strategy, creativity, and craft. We function as a thinking partner and execution team for agencies, brands, and independent clients, bringing ideas from concept to completion with precision and agility.

## Our Craft

We specialize in five core disciplines designed to move people and shift mindsets:

1.  **Creative & Art Direction**: Shaping the visual and conceptual language that protects and projects the core idea.
2.  **Graphic Design & Branding**: Building bold visual identities and brand systems rooted in human behavior.
3.  **Films & Documentaries**: Telling authentic Kenyan stories with a global eye, covering everything from scripting to post-production.
4.  **Photography & Illustration**: Capturing honesty and intention through visual vocabulary that leaves a lasting impression.
5.  **Animation & AI-mation**: Utilizing cutting-edge AI-assisted visuals and motion graphics for inventive storytelling.

## Technical Stack

- **Core**: React 19, TypeScript, Vite 6, React Router
- **Styling**: Tailwind CSS v4, plus the original theme stylesheets (Bootstrap + Boozy theme) imported unchanged
- **Interactivity & Animation**: GSAP + ScrollTrigger, AOS (Animate On Scroll)
- **Rendering**: every route is prerendered to static HTML at build time (per-page title/meta/analytics), then hydrated
- **Assets**: Custom Boozy iconography, optimized imagery

### Getting started

```bash
npm install
npm run dev      # http://localhost:5175
npm run build    # typecheck, build, prerender all routes into dist/
npm run serve    # serve dist/ like Netlify (pretty URLs, real 404)
```

### Project layout

```
src/
  pages/               one file per page; *.sections.tsx hold each section's markup
  components/layout/   Header (per-page variants), footers, preloader, back-to-top, custom cursor, PageShell
  components/widgets/  OwlCarousel, HeroSlider, banner/service slideshows, skill bars
  styles/              tailwind.css + legacy/ (original theme CSS, load order preserved in styles/index.ts)
  seo/                 per-route <head> tags copied from the old pages
public/assets/         images, video, sitemap (same URLs as before)
scripts/               prerender.mjs (build step), serve.mjs (local Netlify-like server)
```

## Development Log

### November 13, 2026 - Phase 1: Speed, technical SEO and accessibility (no visual change)

- **Changes**: Image pipeline (`npm run images`) that writes responsive WebP variants and a manifest; a `Photo` component with `srcset`/`sizes`, intrinsic width/height and lazy loading. Self-hosted Antonio/Jost variable fonts with preload instead of Google Fonts. Font Awesome replaced by inline SVG icons. Unused plugin stylesheets removed and unused selectors purged at build time (CSS 608 KB → 193 KB). Home hero reserves its height before JavaScript runs and shows a poster frame. Unique titles/descriptions, canonical URLs, Open Graph/Twitter cards, an H1 on every page, real alt text, `robots.txt` and `sitemap.xml` generated at build, `noindex` on 404 and the placeholder team page. Long-lived cache headers in `netlify.toml`. The 1:1 copy is tagged `parity-baseline`.
- **Rationale**: The site downloaded up to 18 MB per page (4 MB team photos shown at 288px) and blocked rendering on 600 KB of mostly unused CSS.
- **Impact** (mid-range phone, 4G): home page 17.9 MB → 1.3 MB, first paint 14.4s → 4.9s, largest paint 19.8s → 4.9s, layout shift 1.0 → 0. Services 5 MB → 1.2 MB, first paint 17.1s → 3.9s. Screenshots against `parity-baseline` at 4 widths on every page stay within 0.6% (image re-encoding only), with identical page heights.

### November 13, 2026 - Migration to React + Vite + Tailwind + TypeScript (1:1 parity)

- **Changes**: Rebuilt the static HTML/jQuery site as a React + TypeScript app on Vite with Tailwind CSS v4, on the `claude-revamp` branch. Page markup was converted mechanically from the original HTML so class names and structure are identical; the theme CSS is imported unchanged. jQuery and its plugins were replaced with React ports that render the same DOM: Owl Carousel (same widths, clones, dots, drag, autoplay timing), Slider Revolution hero (same responsive grid maths), preloader, sticky header, mobile menu, back-to-top, custom cursor, skill bars and banner slideshows. Routes match the live Netlify URLs, old `.html` URLs redirect, and each page is prerendered with its original `<head>`.
- **Rationale**: Move to a modern, component-based stack before the visual revamp, without changing what visitors see.
- **Impact**: Verified against moriostudios.africa with automated screenshots at 1440/1024/768/390px on every page (pixel-identical) and scripted interaction checks (carousels, menu, scrolling, cursor, anchors). Quirks of the original were kept on purpose for parity (e.g. the preloader's 0–5.9s duration, template meta tags on team/404); they are good first candidates for the revamp.

### April 8, 2026 - Content Refinement and Navigation Alignment

- **Changes**: Redefined the agency's core disciplines in `service.html` with updated copy and IDs. Centered the hero section text in `index.html` and updated service navigation links to use fragment anchors for direct section access. Updated team member imagery and commented out the testimonial section.
- **Rationale**: The update transitions the site from generic "Web Design" messaging to a more specialized "Small Agency. Big, Bold Ideas" positioning. Fragment navigation was added to improve the UX when navigating from the home page to specific service details.
- **Impact**: Provides a clearer, more professional articulation of the studio's value proposition. The visual hierarchy on the landing page is more balanced due to centered text alignment, and the navigation is more functional for users seeking specific services.

### April 8, 2026 - Responsive UI Enhancements and Mobile Optimization

- **Changes:** Refined CSS media queries to scale down oversized typography and section spacing, updated hero slider positioning for mobile viewports, and implemented conditional text visibility for long descriptions. Additionally, disabled AOS animations on mobile devices via the theme's JavaScript initialization.
- **Rationale:** These updates were introduced to correct layout overflows and improve readability on smaller screens where desktop-scale headings and complex animations were hindering the user experience.
- **Impact:** Significantly improves mobile usability and performance, ensuring a consistent visual hierarchy and a more accessible interface across all device types.

### April 8, 2026 - Stylistic Emphasis on Service Page Content

- **Changes:** Wrapped the primary mission statement paragraph in `service.html` with `<i>` tags.
- **Rationale:** To provide visual emphasis to the brand's core "Five disciplines" philosophy, making the statement stand out from surrounding body text.
- **Impact:** Enhances the typographic hierarchy and aesthetic appeal of the services page, ensuring key brand values are more prominent to the reader.

### April 8, 2026 - Copy refinement on the Service page

- **Changes:** Updated the primary heading in `service.html` by removing the adjective "Bold" from the phrase "Big, Bold Ideas."
- **Rationale:** The modification simplifies the brand messaging, likely to achieve a more concise and direct communication of the agency's creative scope.
- **Impact:** Refines the visual hierarchy and tone of the service page's hero section, focusing the user's attention on the core concept of "Big Ideas."