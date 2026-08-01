# STATUS

Ship state for **ai-portfolio** — Yogeshwar CM.

`npm run build` green · `npm run lint` clean · 4 case studies + 4 OG cards prerendered.

---

## Shipped

**Design system** — editorial dossier: paper/ink tokens, one rust accent
(`--accent: #9c3b16`), Fraunces + IBM Plex Sans/Mono, rules instead of cards.
Dark is the same design on darker stock via `prefers-color-scheme`. Faint
metadata sits at 5.3:1 light / 5.4:1 dark (AA). Rationale in `DESIGN_NOTES.md`.

**Site** — hero with a standing-details table, selected work as a numbered index
with folding detail, experience, skills as a definition list, about, contact,
colophon footer. Long-form case study at `/work/[slug]` for each of JobHouse,
Pickyourtrail, the hackathon grand prize, and Mastervance.

**Case studies** — numbered anchored sections, sticky "On this page" nav,
particulars rail, `Calls I made` decision list, cyclic next-study link,
`Article` + `BreadcrumbList` JSON-LD.

**SEO / share** — `Person` schema on home, per-study OG cards rendered at build
time on the paper stock with Fraunces fetched as TTF, per-study canonical +
twitter metadata, sitemap, robots.

**Motion / a11y** — IntersectionObserver reveals (opacity and translate only),
scroll progress + active section in the nav, skip link, visible focus rings,
`prefers-reduced-motion` honoured (the work-index folds stay open rather than
snapping), and a `scripting: none` + `noscript` fallback so the page is not
blank without JS.

---

## Pending — 5 concrete ROI improvements

Ordered by return, not by effort.

### 1. Point `NEXT_PUBLIC_SITE_URL` at the real domain before launch

`src/data/site.ts` falls back to `https://yogeshwar-cm.vercel.app`, and that one
string is the base for every canonical, every `og:image` URL, every sitemap
entry, and the `url` in both JSON-LD graphs. Deploy on a custom domain without
setting it and the OG images resolve against the wrong host — LinkedIn and X
render a blank card for a link a recruiter just shared.

**Do:** set the env var in Vercel for production and preview, then re-check
`/sitemap.xml` and one `og:image` URL against the live host.
**Effort:** minutes. **Why it ranks first:** it silently breaks the highest-
leverage surface the site has — the preview card on someone else's timeline.

### 2. Add a downloadable CV and put it in the hero

There is no resume anywhere on the site (`public/` is empty, no `.pdf`
reference in `src/`). Recruiters ask for one within the first message, and
right now the only answer is "email me and I'll send it" — a round trip that
loses people who were skimming ten tabs.

**Do:** `public/yogeshwar-cm-cv.pdf`, a "Download CV" `.btn-line` next to
*Selected work* in the hero and a row in the contact block, and `hasOccupation`
on the `Person` schema.
**Effort:** an hour once the PDF exists. **Return:** removes a step from the
one funnel this site exists to serve.

### 3. Show the work, don't only describe it

All four case studies are text-only — no `next/image` usage anywhere in `src/`.
The writing is good, but a hiring manager skimming for thirty seconds reads a
screenshot faster than four paragraphs, and JobHouse in particular is a visual
product (recruiter view, live interview, review screen) currently described
entirely in prose.

**Do:** 2–3 real screenshots per study through `next/image` with explicit
dimensions to hold layout, plus a live demo URL for JobHouse if it can be
deployed safely. No mockup frames, no invented dashboards.
**Effort:** half a day. **Return:** proof-first is the stated bar; right now the
proof is assertion.

### 4. Instrument the funnel

No analytics of any kind. There is currently no way to answer whether anyone
reaches `#contact`, which case study holds attention, or whether the mobile
layout loses people at the hero — so every future change to this site is a
guess defended by taste alone.

**Do:** Vercel Analytics or Plausible (privacy-light, no banner needed), plus
events on outbound email / GitHub / LinkedIn clicks and case-study opens.
**Effort:** an hour. **Return:** turns the next redesign into a decision instead
of a preference.

### 5. Put the craft bar in CI

No workflows in `.github/`. The bar in `CLAUDE.md` is enforced entirely by
whoever is reviewing at the time — which is how this session's blank-page-
without-JS bug survived a green build in the first place.

**Do:** a PR workflow running `npm run lint` and `npm run build`, then Lighthouse
CI against the built site with budgets that fail the run: accessibility 100,
LCP < 2.0s, CLS < 0.05.
**Effort:** 2–3 hours. **Return:** the polish already paid for stops eroding one
"small" commit at a time.

---

### Deliberately not doing

- **CMS.** Four case studies in typed TS. A CMS would add a dependency and a
  build step to save an edit that takes thirty seconds.
- **Contact form.** `mailto:` plus visible socials. A form means a backend, spam
  handling, and a deliverability problem, to replace something that works.
- **A blog.** Only worth it with something to say; an empty `/writing` route
  reads worse than none.
