# Implementation — B.Tech CSE Facilities Landing Page (GIST)

A single-page, motion-driven landing page dedicated **only** to the facilities of the
**B.Tech Computer Science & Engineering** department of **Geethanjali Institute of Science and
Technology (GIST), Kovur, Nellore**. No other branch and no other programme (no M.Tech, no
diploma) is represented anywhere on the page.

**Source of truth:** https://gist.edu.in/gist/gist-home/ and its sub-pages
(`/computer-science-and-engineering/`, `/infrastructure-ict/`, `/library/`).
**No fake or placeholder data.** Every number, lab name, system count, configuration, lab
incharge name and paragraph of prose on the page is transcribed from those pages. Every image is
an original asset downloaded from the institute's own media library.

---

## 1. Content sourcing (how the real data was obtained)

1. The public pages were fetched as rendered markdown, then re-fetched as **raw HTML with browser
   headers**, because the laboratory inventory on the CSE page is a `<table>` that the markdown
   conversion dropped.
2. From the raw HTML the following was extracted verbatim:
   - the department laboratory register (lab name, number of computers, configuration, lab incharge)
   - department establishment year, intake growth (60 → 420 by 2024), vision, research areas,
     training tie-ups (ICT, CISCO, ORACLE Academy)
   - ICT infrastructure figures (49 of 49 class rooms ICT + Wi-Fi enabled)
   - Central Library carpet area (613.12 sq.m)
   - institute name, accreditation line, AICTE/JNTUA affiliation line and admission codes
3. **13 original image files** (institute logo, laboratory photographs, campus/library/event
   photographs) were downloaded from the institute's WordPress uploads directory into
   `src/assets/` and are imported through ES6 image imports, so they are hashed and bundled.

### Facilities represented (10 entries, all B.Tech CSE)

| # | Facility | Systems | Notes |
|---|---|---|---|
| 01 | Computer Laboratory – I | 70 | core programming lab |
| 02 | Computer Laboratory – II | 70 | core programming lab |
| 03 | Computer Laboratory – III | 70 | core programming lab |
| 04 | Computer Laboratory – IV | 70 | core programming lab |
| 05 | Project Laboratory | 70 | final-year project work |
| 06 | Additional Laboratory | 70 | overflow / elective labs |
| 07 | Research Laboratory | 70 | faculty & student research |
| 08 | NVIDIA Laboratory | 30 | AI / deep-learning gear |
| 09 | ICT Enabled Class Rooms | 49 / 49 | 100% ICT + Wi-Fi |
| 10 | Learning Resource Centre / Library | 613.12 sq.m | central library |

Each entry carries: `kind`, `headline`, `body`, a `specs` list (computers, configuration, lab
incharge, area …), a `highlights` list and its original photograph.

---

## 2. Architecture

```
src/lib/cse-facilities.ts        typed data layer — institute, department, stats, facilities[]
src/styles.css                   design system (GIST palette, fonts, motion utilities)
src/routes/__root.tsx            html shell, Google Fonts <link>, base meta
src/routes/index.tsx             page assembly + route-level SEO head()
src/components/SiteHeader.tsx    sticky header, scroll-compaction, scroll progress bar
src/components/HeroSection.tsx   hero with staggered text reveal + parallax image
src/components/StatsStrip.tsx    animated count-up statistics band
src/components/FacilityShowcase.tsx  the split scroll-sync showcase (core of the request)
src/components/ResearchSection.tsx   research focus + department history panel
src/components/SiteFooter.tsx    marquee of facility names, programme info, source links
src/assets/*                     13 original images from the institute site
```

Stack: **TanStack Start (React 19) + Vite 7 + Tailwind v4 + Motion for React**. Data flows
one-way from `cse-facilities.ts` into presentational components — nothing is hard-coded in JSX,
so the page is fully data-driven (adding an 11th facility to the array renders everywhere:
showcase, thumbnail rail, dot navigation, footer marquee).

---

## 3. Design system (`src/styles.css`)

Rebuilt to match the original site's theme rather than a generic template:

- **Palette** (all `oklch` tokens): `--brand-orange` (the site's signature saffron/orange bar),
  `--brand-orange-deep`, `--brand-navy` (headings + dark panels), `--brand-red` (the institute
  wordmark colour), plus a warm off-white `--background` matching the original page body.
- Semantic shadcn tokens (`--primary`, `--accent`, `--muted`, `--border` …) are re-mapped onto
  those brand values, so **no component contains a hardcoded colour class**.
- **Typography:** `Playfair Display` for display headings (mirrors the serif institute wordmark)
  and `Barlow`/sans for body, loaded via a `<link>` in `__root.tsx` (never a CSS `@import`, which
  Tailwind v4's Lightning CSS cannot resolve).
- **Custom utilities** (`@utility`): `brand-bar` (the orange gradient band used in the nav strip,
  stats band and footer), `ink-panel` (navy research panel), `frame-shadow`, `eyebrow` (spaced
  uppercase label), `marquee-track` (infinite horizontal scroll keyframes).

---

## 4. Motion design (nothing static)

| Element | Motion |
|---|---|
| Header | shrinks/condenses on scroll; a `useScroll` progress bar fills across the top |
| Hero headline | word-by-word staggered rise-and-fade reveal |
| Hero image | `useTransform` parallax on scroll + slow scale drift |
| Hero feature cards | staggered entrance, lift on hover |
| Stats band | `useInView` + `animate()` count-up from 0 to the real figure, staggered per stat |
| Facility image | `AnimatePresence` crossfade with a `clipPath` wipe (`inset(0 0 100% 0)` → `inset(0)`) plus a continuous scroll-driven zoom |
| Facility caption | swaps in/out with the image, offset vertical slide |
| Detail panels | each panel rises into view; spec rows slide in from the left with per-row stagger |
| Timeline rail | a spring-smoothed vertical progress line (`useSpring(scrollYProgress)`) tracks reading position; the dot of the active facility scales up and turns brand orange |
| Dot / thumbnail nav | width + opacity animate on the active item; click smooth-scrolls to that panel |
| Research chips | scale/rise entrance, hover lift |
| Footer | infinite marquee of the ten facility names |

Motion values respect the design system easing (`cubic-bezier(0.22, 1, 0.36, 1)`), and all
`whileInView` triggers use `once: true` so panels don't re-animate on scroll-back.

---

## 5. The split scroll-sync showcase (the specific request)

`FacilityShowcase.tsx` implements the requested layout:

- **Left column** — `lg:sticky` image stage that pins while the right column scrolls. It shows the
  photograph of the currently active facility, an overlaid `NN / 10 · KIND` counter and the
  facility name, a vertical dot-navigation, and a 10-frame thumbnail rail underneath.
- **Right column** — the ten detail panels stacked vertically, each with the index numeral,
  category eyebrow, name, headline, description, the specs grid (systems / configuration / lab
  incharge / area) and the highlight chips.
- **Synchronisation** — an `IntersectionObserver` with `rootMargin: "-45% 0px -45% 0px"` treats the
  middle band of the viewport as the read line; the panel with the largest intersection ratio sets
  `active`, which drives the left image, caption, dots and thumbnails. It's observer-based rather
  than scroll-math based, so it stays correct at any viewport height and with variable panel
  heights.
- **Bidirectional** — clicking a dot or thumbnail `scrollIntoView`s the matching panel, so the nav
  both reports and controls position.
- **Responsive** — below `lg` the sticky behaviour is dropped and the layout becomes a single
  readable column (image above its details), so the experience degrades cleanly on phones.

---

## 6. SEO & accessibility

- Route-level `head()` on `/` with a CSE-facilities-specific title (< 60 chars), description
  (< 160 chars), `og:title` and `og:description`; `og:type` and `twitter:card` live on the root.
- Exactly one `<h1>` (the hero heading), then `<h2>` per section and `<h3>` per facility.
- Semantic `<header> / <main> / <section> / <article> / <footer>`, `<dl>` for spec pairs.
- Descriptive `alt` text on every content image; decorative overlays are `aria-hidden`.
- `loading="lazy"` on all non-hero imagery; nav buttons carry `aria-label`.
- Footer links out to the four original institute pages the content came from.

---

## 7. Verification

The page was driven headless with Playwright at 1280×1800: it renders with **zero console errors
and zero page errors**, exactly one `<h1>`, and screenshots at four scroll depths confirm the
count-up band, the sticky image/detail synchronisation (image and caption change with the active
panel), the research panel and the footer marquee all behave as intended.
