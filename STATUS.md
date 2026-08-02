# STATUS

Ship state for **ai-portfolio** — Yogeshwar CM.

`npm run check` green — lint, build, and four craft checks against the built
output. 4 case studies + 6 OG cards prerendered · 176.9 KB of fonts on the
critical path, under a 200 KB budget that now fails the build.

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

**Print** — the site is composed as a document and now survives being one.
`Ctrl-P` repaints the tokens as ink on white (so a dark-mode reader does not
get a black sheet), drops the masthead, grain, scroll progress and sticky rail,
opens every work-index fold, prints external hrefs after the link text, and
sets orphans/widows. A `.btn` pointing at a repo keeps its URL; one that only
scrolls the page is dropped. Rationale in `DESIGN_NOTES.md`.

**Craft pass fixes** — `body { overflow-x: hidden }` had made the body a scroll
container, which silently breaks the sticky case-study rail; it is `clip` now.
The nav section marker never cleared when scrolling back above the first
section. The `↗` on external links sat inside the link name and was announced
as "north east arrow" — it is decorative now, with the new-tab fact given as
text. `project.outcome` was written for the work index and had no home on the
case study; it is a rubric under the standfirst. The share cards subsetted
Fraunces against the title alone while Satori sets the whole card in it, so
every other character came back from a fallback face — most visible as the A of
"AI ENGINEER". IBM Plex Sans 600 and its four italic files are gone: the design
sets every emphasis in Fraunces or mono.

### Second craft pass

**Fraunces italic is off the critical path.** It was declared as a `style` on
the roman, so it preloaded on every route to set two elements — 146 KB, the
largest asset on a site with no images, larger than the roman beside it. It is
now its own `next/font` instance with `preload: false`, registering under the
same family so `.pull` still resolves to it. The hero blockquote, the one use
above the fold, is set in the roman with a hanging quotation mark instead.
Measured on the build: **font preload went 323 KB → 176 KB on every route**,
and the italic downloads only on a study page, where it is well below the fold
and `display: swap` has room to work.

**The contents list was one section short.** `Calls I made` renders as a
numbered section like any other but was not in `study.sections`, so every study
advertised "On this page (4)" above five numbered headings — and the decision
list, the part an engineering reader skips to, was the one section with no way
to jump to it. `outline()` in `src/lib/study.ts` now builds the contents, the
section numbering and `articleSection` from one source.

**`/work` earns the second click.** Every project is `featured`, so the home
index and `/work` rendered an identical list from the same component and "All
case studies →" delivered the same four rows one scroll away. `/work` is now
the thing the home page cannot be: a contents page, grouped by start year with
a sticky year rail, each entry exposing its study's full section list as deep
links plus a reading time. The home link says what it now leads to.

**Per-study share-card alt text.** All four cards shared one generic
`alt` — the description a screen reader reads out when a card is shared, and
what image search has to go on. `generateImageMetadata` is the API that can see
the slug, but adding it introduces a `[__metadata_id__]` segment that drops all
four cards out of the prerender manifest into on-demand rendering, where the
Google Fonts fetch happens inside a social crawler's request behind a
`try/catch` that silently falls back to a system sans. The alt is set in
`generateMetadata` instead, with a `contentHash()` on the URL to keep the
cache-busting the file convention was providing. Still 6 cards prerendered.

**`prefers-contrast: more`.** The muted and faint inks close most of the way to
full ink, rules double in weight so the structure survives, and the accent
darkens to stay separable. Nested inside `prefers-color-scheme` so a
high-contrast reader still gets the stock they asked for.

**Smaller.** `html { scroll-padding-top }` as a floor under every anchor, so a
new one added without a `scroll-mt` still lands below the fixed masthead. The
`.entry` rows carried a `background-color` transition with no hover rule to
animate — replaced with the index figure taking the accent, so the row lights
up at both ends. The 404 restated `robots` (without it the root layout's
`index, follow` is inherited and contradicts Next's own `noindex`), took a real
title, and gained a link to `/work` — trimming a study URL is the likeliest way
to land there. Case-study cards emit `article:author`, `article:section` and
`article:tag`.

### Third craft pass

**The fold no longer waits for hydration.** `Reveal` is a client component, so
its observer cannot fire until React has hydrated — and the hero used it for
everything under the name. On a slow connection the page painted "Yogeshwar CM"
and then held the lede, the standing-details table and both calls to action at
`opacity: 0` until the bundle landed. That is the same argument the word-by-word
headline animation was already making about JS on the critical path, and it was
being ignored two elements away. `Rise` is the same 10px on the same curve as a
plain CSS animation: no observer, no client boundary, and no `scripting: none`
escape hatch needed. The hero is a pure server component now; `/work` and the
study headers use it above the fold too. `Reveal` stays for everything below,
where an entrance that has already finished before you scroll to it is not one.

**The bottom of the type ramp was 15px.** `--step-base` sets the body and the
case studies are four to six minutes of continuous reading, most of it on a
phone — which is exactly where the narrow end of every clamp lands. It is 16px
now (also the threshold under which iOS Safari zooms on input focus), and
`--step-sm`, which carries the hero's third paragraph and every `Outcome` line,
went 12.8 → 14. `.label` and `.meta` were the only sizes not on the fluid ramp
at all, pinned at 11px and 12.2px; they are clamps now. They are not ornament —
they carry the study dateline, the year rail, the nav, and every project's
stack — and uppercase at 0.14em tracking has to be given back the size the
tracking takes away.

**A `<dl>` that was not a `<dl>`.** The skills taxonomy wrapped each row in
`Reveal`, which renders a `div`, inside another `div` holding the `dt`/`dd`.
`dl` permits one wrapper element per pair and not two, so the terms and their
values stopped being descendants the list could associate and the whole section
was exposed as loose text. The grid goes on the `Reveal` itself now.

**Skip link that did not skip.** `#main` was not focusable, so the browser moved
the scroll and left keyboard focus in the masthead — the next Tab landed back in
the navigation the link exists to bypass. `tabIndex={-1}` on `<main>`.

**Separators that deleted the space around them.** The rust middots between
skills and between OSS repos are `aria-hidden` decoration, which also removes
the only gap between two terms: a row was read out as "LLM orchestrationTool
useEvals". Each now carries an `sr-only` comma. In-page markers moved from
`aria-current="true"` to `"location"` — the reader is inside the part of the
page the link points at, not on a different page. The case-study `<article>` is
labelled by its `<h1>`; an unnamed region is worse than no landmark.

**The share-card palette is one source now, and drift fails the build.**
`og-font.ts` restated six hex literals, `manifest.ts` restated the paper twice
more, and `layout.tsx` restated both stocks for `theme-color`. They read from
`src/data/tokens.ts`, where the rules are derived from the ink rather than
re-typed. There is still no build step generating CSS from it — that would be a
dependency to save five lines — so `check:craft` parses `:root` and the dark
block and fails when the two have diverged.

**The craft bar is in CI.** `npm run check` is lint, build, then
`scripts/check-craft.mjs`, which reads `.next` rather than the source, so what
it measures is what ships: token parity, a 200 KB font preload budget, a no-JS
escape hatch for the reveal state, and every study plus its card present in the
prerender output. Each of those is a regression that has actually happened here
and passed a green build. Same three steps in `.github/workflows/ci.yml`.

**Smaller.** The hackathon study had two distinct arguments filed under one
heading that named neither ("What it taught me"); they are two sections now, so
the contents list and the headings say what is in the page — structure, not
added depth, and the study is still the shortest of the four. `Person` gained a
`description` (without one Google writes its own from whatever it scrapes) and
its image is an `ImageObject` with dimensions, as is every study's; `/work` was
the only page in the set with no `BreadcrumbList`, which is the one URL all four
studies point at. Dead tokens removed: `--paper-raised`, `--paper-sunk`,
`--step-xs` and `.t-xs` were declared, exported into the Tailwind theme, and
referenced by nothing.

---

## Pending — ROI improvements

Ordered by return, not by effort. Two items from the last pass are gone: the CI
workflow and the token-drift check are shipped above.

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

### 2. Nobody has opened any of this in a browser

This is the item that has quietly moved to second place. The site is reasoned
about, not looked at: the print stylesheet is ~130 lines that only exist under
`Ctrl-P`, the `prefers-contrast: more` block moves six tokens whose ratios were
calculated rather than measured, the six share cards are rendered at build time
and never viewed, and **this pass moved the type ramp on every page** — a 16px
body floor, and `.label`/`.meta` off fixed sizes onto clamps. All of that is
correct by construction. None of it is confirmed.

**Do:** open `/`, `/work` and one study in both colour schemes; print-preview
the home page and a study; toggle "Increase contrast" (macOS) or the Windows
contrast themes; open the four `/work/<slug>/opengraph-image` URLs directly;
check the fold on a real phone, not a devtools viewport.
**Effort:** half an hour. **Why it ranks here:** every check in `check:craft`
verifies a fact about the build. None of them can see the page.

### 3. Add a downloadable CV and put it in the hero

Still no resume file (`public/` is empty, no `.pdf` reference in `src/`).
The print layer narrows this — the page now prints as a clean dossier, so
"save as PDF" produces something respectable — but it is not the same artefact.
A recruiter asks for a CV to attach to an internal thread, and a printed
portfolio is a longer read than the one-page they wanted.

**Do:** `public/yogeshwar-cm-cv.pdf`, a "Download CV" `.btn-line` next to
*Selected work* in the hero and a row in the contact block.
**Effort:** an hour once the PDF exists. **Return:** removes a step from the
one funnel this site exists to serve. **Note:** the print layer is the interim
answer, and nothing links to it — if you want it discovered, that is a line of
copy in the contact block, not a button.

### 4. Show the work, don't only describe it

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

### 5. The hackathon study is still the shortest of the four

Its one section was split into two this pass, which fixed the headings — they
name the two arguments instead of filing both under "What it taught me" — but
that is structure, not depth. It is three contents entries against five for
JobHouse and Mastervance, and it is linked from the home index at equal weight
with the same "Case study →" affordance. A reader who follows it first gets the
thinnest page on the site as their sample of how you write about your work, and
it is the entry whose headline result (₹51,000 grand prize) is most likely to
make them click.

**Do:** two more sections in the register of the others — what the build
actually was, and what you would do differently. This needs your input, not a
rewrite: everything on the page is a first-person claim about a thing you did,
and inventing the specifics is exactly what the rest of this site refuses to do.
**Effort:** an hour of writing. **Return:** removes the weakest page from a
four-page set a hiring manager reads as a sample of your judgement.

### 6. Instrument the funnel

No analytics of any kind. There is currently no way to answer whether anyone
reaches `#contact`, which case study holds attention, or whether the mobile
layout loses people at the hero — so every future change to this site is a
guess defended by taste alone.

**Do:** Vercel Analytics or Plausible (privacy-light, no banner needed), plus
events on outbound email / GitHub / LinkedIn clicks and case-study opens.
**Effort:** an hour. **Return:** turns the next redesign into a decision instead
of a preference.

### 7. CI counts bytes; it does not measure the page

`.github/workflows/ci.yml` runs lint, build and `check:craft`, and `check:craft`
asserts four facts about the built output. Not one of them renders anything. An
accessibility regression, a layout shift, or an LCP that doubles because a font
stopped being subset would all pass today.

**Do:** Lighthouse CI against the built site with budgets that fail the run —
accessibility 100, LCP < 2.0s, CLS < 0.05 — and `axe-core` on `/`, `/work` and
one study. The byte budget stays; it catches the one thing Lighthouse would
average away.
**Effort:** 2–3 hours. **Return:** the checks currently protect the build. This
protects the page.

### 8. The contrast ratios in `DESIGN_NOTES.md` are asserted, not measured

The palette table states ink 16.4 / 15.7, muted 8.5 / 7.9, faint 5.3 / 5.4,
accent 6.1 / 5.6, and the `prefers-contrast: more` block claims to close the gap
further. Those numbers were computed once, by hand, and have been copied forward
through two redesigns. `--ink-faint` at 5.3:1 is the floor of the whole system
and sits about 0.8 above AA — if it were ever wrong, everything set in it fails
and nothing anywhere says so.

**Do:** a fifth check in `scripts/check-craft.mjs` — parse the token pairs,
compute WCAG contrast, fail under 4.5:1 for anything used at body size. Roughly
twenty lines, and it makes the table in `DESIGN_NOTES.md` a claim the build
stands behind rather than a note.
**Effort:** an hour. **Return:** small but permanent, and it is the one number
on this site that a redesign cannot be allowed to quietly break.
---

### Deliberately not doing

- **CMS.** Four case studies in typed TS. A CMS would add a dependency and a
  build step to save an edit that takes thirty seconds.
- **Contact form.** `mailto:` plus visible socials. A form means a backend, spam
  handling, and a deliverability problem, to replace something that works.
- **A blog.** Only worth it with something to say; an empty `/writing` route
  reads worse than none.
- **Trimming the home index to three entries.** That was the other way to fix
  the home/`/work` duplication. There are four projects and all four are worth
  the scroll; the fix was to make the second page different, not the first page
  shorter.
