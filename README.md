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

- **Core**: React 19, TypeScript, Vite 6, React Router, three.js (hero), Anthropic SDK (Brief Builder)
- **Styling**: Tailwind CSS v4 with Morio design tokens (`src/styles/app.css`): the logo green and white, sage and mist accents, Antonio + Jost (self-hosted)
- **Motion**: CSS transitions + IntersectionObserver reveals (respects reduced motion); no animation libraries
- **Rendering**: every route is prerendered to static HTML at build time (per-page title, meta, structured data, analytics), then hydrated
- **Images**: `npm run images` builds responsive WebP variants; `<Photo>` serves them with srcset and lazy loading
- **Hosting**: Netlify (`netlify.toml`: redirects for old URLs, cache headers, Netlify Forms for the brief form)

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
  content/       EDIT COPY HERE: site.ts (contact details), services.ts, team.ts, work.ts
  site/          Layout, SiteHeader, SiteFooter, shared sections, Reveal, icons
  site/pages/    Home, Services (+ /services/:slug), Work, About, Contact, NotFound
  seo/           heads.ts (titles, descriptions, OG), schema.ts (JSON-LD), applyHead.ts
  components/    Photo (responsive images)
  styles/        app.css (Tailwind + tokens), fonts.css
public/assets/   images, video, og-image.jpg (same URLs as before; generated variants in images/opt)
scripts/         prerender.mjs (build), optimize-images.mjs, serve.mjs (local Netlify-like server)
```

### Brief Builder (AI)

`netlify/functions/brief.mts` serves `POST /api/brief`. It turns a visitor's rough idea (any language, Sheng welcome) into a structured brief with Claude (`claude-opus-5-5`, low effort, schema-validated output, server-side refusal fallback enabled). To switch it on:

1. Create an API key at console.anthropic.com and set a monthly spend limit there.
2. Netlify → Site configuration → Environment variables → add `ANTHROPIC_API_KEY`.
3. Redeploy. Until then (and in local dev) the page runs in a clearly labelled preview mode.

Each brief costs roughly one to two US cents. Inputs are capped at 1,500 characters, there's a honeypot, and each visitor is limited to 6 briefs an hour per function instance.

### Home hero video and 3D logo

The home hero is the original studio video, re-encoded to `public/assets/images/slider/hero-720.mp4` / `hero-1280.mp4` with poster frames. It attaches after the page loads and is skipped for Data Saver, 2G and reduced-motion visitors.

`src/site/three/HeroScene.tsx` extrudes the traced logo (`public/assets/brand/morio-logo.svg`) with plain three.js for the lit "Small agency, big ideas" section further down the home page. It loads only when that section comes near the screen on capable devices; everyone else sees the still renders `public/assets/images/lit-3d*.webp` (re-render them if the scene changes).

### Project pages

Each project in `src/content/work.ts` gets a story page at `/work/<slug>` with a pinned, scroll-driven gallery and a shared-image page transition from the grid. Project names are placeholders, so these pages are `noindex` until confirmed (`src/seo/heads.ts`).

### Owner to-dos (search the code for `TODO(owner)`)

- Confirm the studio address (the old site listed Kenyatta Avenue, a Ngong Road postal address and a map pin at Adams Arcade).
- Confirm +254 718 704 926 is on WhatsApp (used by the chat buttons).
- Turn work items into case studies: add client, year and a short summary in `src/content/work.ts`.
- Add real client logos and testimonials when you have permission to show them.
- After deploying, enable form notifications in Netlify → Forms → `project-brief`.

## Development Log

### November 13, 2026 - Benchmark-led changes: work first, one-line hero, sentence filter, Start a brief

- **Changes**: Home now shows Latest projects straight after the hero; the hero carries the headline and the intro's first sentence, with the rest of the original introduction (unchanged) right after the work. Our Work filters with a sentence ("We do [all kinds of work]"), with a second "for [everyone]" blank that appears once projects have an `industry`. Project cards read "Title for Client" once `client` is set. A "Start a brief" button in the header opens the Brief Builder from any page.
- **Rationale**: Benchmark of Buck, Pentagram, ManvsMachine, Locomotive, Lusion, Malvah, Lebu Studio, Airbnb and Uber: the best studios lead with work and a single line, name their clients, and (like Uber and Airbnb) give one clear main action.
- **Impact**: Morio's home page was already the fastest studio site measured (main content in about 2.4s on a 4G phone vs 4.5–12.5s for the others); every page except home stays under 1 MB. Home is now 1.09 MB on a phone because the project photos load earlier: about 0.49 MB of the site itself, plus the 0.43 MB hero video (which starts after the page has loaded) and 0.18 MB of Google Analytics.

### November 13, 2026 - Original content and hero video restored, project stories, scroll moments

- **Changes**: Home hero video restored, with the 3D logo moved to its own lit section. All page copy returned to the original wording (only broken hyphenation fixed); added copy removed. New footer built around "Talk to a Morio" with the four studio emails. Contact page uses the original "Contact Us" banner images and inquiry details. Added project story pages with page transitions and pinned galleries, a pinned craft story on Our Craft, founders who light up as you scroll on The Morios, and related work in Brief Builder results.
- **Rationale**: Keep the studio's own words and video; change only the design and experience.
- **Impact**: Every page is under 1 MB on first load on a phone (largest: Our Work 0.98 MB, home 0.89 MB including the video). Checked at 360, 390, 768, 1024, 1440 and 1920px with no console or hydration errors and no horizontal overflow.

### November 13, 2026 - World-class pass: logo palette, original content, 3D hero, AI Brief Builder

- **Changes**: Palette moved to the logo's deep green and white (no neon), with outlined display type from the original site. Original navigation names (Home, Our Craft, The Morios, Hola) and all original page copy restored. Every page got its own hero: a 3D extruded Morio logo lit by a pointer-following spotlight (home), an interactive craft index with cursor-following previews (Our Craft), outlined numbers with image wipes (service pages), a moving film strip (Our Work), a "lights on" beam that reveals the founders behind their spotlight silhouettes (The Morios), and rotating greetings with a live Nairobi clock and studio-open status (Hola). Added the AI Brief Builder, the "Speak Morio" phrasebook, a showreel section, a traced SVG logo, toned founder portraits and a new share image.
- **Rationale**: Benchmarked against studio sites (Buck, Pentagram, ManvsMachine, Lusion) and product UX leaders (Uber, Airbnb): calm brand colour, big type, one strong interactive moment per page, effortless navigation, fast on any device.
- **Impact**: On a mid-range phone over 4G every page first paints in about 2.1–2.9s with zero layout shift; the 3D scene (138 KB gzipped) loads only after first paint on capable devices. Checked at 390px and 1440px on every page with no console or hydration errors, no broken images and no horizontal overflow.

### November 13, 2026 - Phases 2–4: Local SEO, content and full redesign

- **Changes**:
  - *Local and service SEO*: `ProfessionalService` structured data (address, phone, hours, founders, service catalogue), `WebSite`, `Service` and breadcrumb schemas; six landing pages at `/services/<slug>` targeting "<craft> in Nairobi"; 1200×630 share image and favicons; sitemap now covers 11 pages.
  - *Content and trust*: template placeholders removed (stock "client" logos, Chanel/Canon project tiles, skill bars, the placeholder team page). New Work page built only from the studio's own images; founders' bios cleaned up; a Netlify Forms brief form, WhatsApp buttons, and all copy moved into `src/content/`.
  - *Design*: new Tailwind design system (forest green with the spotlight green from the founders' portraits, Antonio/Jost), new header with full-screen mobile menu, video hero, crafts list, bento work grid, Morio-slang marquee, team grid, CTA band and footer. Removed the legacy theme CSS, jQuery-era widgets, custom cursor, random preloader, AOS and GSAP. Old URLs (`/service`, `/team`, `*.html`) 301-redirect.
- **Rationale**: Turn a lightly edited purchased template into a site that reads as Morio's own and ranks for the services the studio sells in Nairobi.
- **Impact** (mid-range phone, 4G): pages weigh 0.6–1 MB (home was 17.9 MB at parity); first paint about 1.2–2.4s (home was 14.4s); no layout shift. CSS 608 KB → 39 KB, JS 445 KB → 278 KB, runtime dependencies down to React and React Router. Every page checked at 1440px and 390px with no console or hydration errors, no broken images and no horizontal overflow.

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