# Design notes — editorial engineer dossier

The previous build was a dark SaaS landing page: centred marketing stack, glass
cards with a cyan glow, icon toppers, pointer spotlight. It was competent and it
looked like every AI-engineer template on the timeline. This is the replacement.

## Surface

**Decide / Learn.** One reader: a hiring manager or freelance buyer deciding, in
about ten seconds, whether to keep reading. The page is composed as a document
they are being handed — a dossier — not as a product being sold to them.

`/work` is the secondary Explore surface: a contents page for the four case
studies.

## The thesis

Paper, ink, and one rust. Hierarchy comes from **scale, weight and tracking**;
colour is never asked to carry rank. The accent only ever marks something —
a section index, an outcome, the rule that draws under the row you are on.

Nothing is centred. Every section is an asymmetric two-column rubric: index and
label hold a narrow left column, the title and prose hold the wide one. Rules
run full-bleed across the viewport while the text stays inset, which is what
makes it read as a printed page rather than a stack of cards.

## Type

Loaded through `next/font/google`, so there is no layout shift and no external
request at runtime.

| Role | Face | Notes |
| --- | --- | --- |
| Display | **Fraunces** | Name, every heading, pull quotes, the drop cap. Variable, with `SOFT` 0 and `WONK` 1 pinned — sharp terminals, swashed italic descenders. |
| Body | **IBM Plex Sans** | A grotesque drawn for technical documentation, which is what this is. |
| Labels & figures | **IBM Plex Mono** | Every label, index, period and stack line, so metadata never competes with reading text. |

`opsz` is pinned per type class rather than left on `font-optical-sizing: auto`:
the sizes are fluid clamps, so `auto` would be chasing a moving target. Each
class sets an optical size matching the px size it actually renders at —
`t-display` at 144 down to `.display` at 28.

## Palette

Warm neutrals sit on hue 73–89. The rust is the only thing anywhere near hue 40,
which is why one accent is enough.

| Token | Light | oklch | Dark | oklch |
| --- | --- | --- | --- | --- |
| `--paper` | `#f4f1ea` | `0.959 0.010 87.5` | `#14120f` | `0.183 0.007 78.1` |
| `--ink` | `#17130e` | `0.190 0.012 73.2` | `#f0ebe1` | `0.941 0.014 84.6` |
| `--ink-muted` | `#4a443b` | `0.390 0.017 78.1` | `#b0a89b` | `0.735 0.021 80.1` |
| `--ink-faint` | `#6b6357` | `0.504 0.021 78.1` | `#928979` | `0.633 0.026 82.1` |
| `--accent` | `#9c3b16` | `0.483 0.138 39.3` | `#e06a34` | `0.658 0.162 43.1` |
| `--accent-deep` | `#7a2c10` | `0.403 0.116 38.6` | `#f08a58` | `0.733 0.140 45.9` |

Contrast against the stock, light / dark: ink 16.4 / 15.7, muted 8.5 / 7.9,
faint 5.3 / 5.4, accent 6.1 / 5.6. The faint tone is the floor, and it is only
used at label sizes — where it still clears AA for normal text, not just large.

Dark is the same design on darker stock — same rust, same geometry, same rules —
not a second theme. It follows `prefers-color-scheme` and has no toggle, because
a toggle is a control that exists to be noticed.

## Composition

- **Hero** — running head (availability, typeset, where a glass chip used to
  be), then the name at full display size, then a **Standing details** table:
  Now / Focus / Based / Open to, as a real typeset dossier with a mono term
  column, hairline rows, and no box around it.
- **Work** — a numbered index. Number, title in the display face, kind and year
  on the right margin. The detail folds open on hover or keyboard focus above
  `lg`, and is simply always open below it, because phones have no hover.
- **Experience** — period in mono on the left margin, role and prose on the
  right. Two rows and an education row, separated by rules.
- **Skills** — a definition list. Group title left, the terms of art set as a
  dense run on the right with rust separators. Not tiles, not chips.
- **About** — prose column with a Fraunces drop cap, and an *On file* table.
- **Contact** — the address set large in mono, because an address is a value to
  be copied and mono reads as one.
- **Case study** — prose measure at 68ch, a display-face standfirst, a pull
  quote hung between two rules, numbered sections, *Calls I made* as a typeset
  choice / over / why list, and a sticky rail with the TOC and particulars.
- **Footer** — a colophon, which is the cheapest possible way to tell a designer
  the type was chosen rather than defaulted into.

## Motion

Opacity and translate. That is the entire vocabulary.

The reveal is one `IntersectionObserver` per node, unobserved after it fires,
with the visual state in CSS so `prefers-reduced-motion` is handled in one
place. Under that preference the work-index folds stay open rather than
snapping, since a zero-duration expansion is the jitter the preference is
asking about. A `scripting: none` rule and a `<noscript>` block keep the page
from rendering blank without JS.

## Print

The page is composed as a document, so it should survive being one. `Ctrl-P`
used to produce the screen: the fixed masthead sitting over the first heading,
work entries printed as titles with nothing under them, and — on a machine set
to dark — a solid black sheet.

The print layer is the last block in `globals.css` and does four things. It
repaints the tokens as ink on white, so the theme a reader happens to be using
never reaches the paper. It drops the furniture: masthead, grain, scroll
progress, the sticky rail, the in-page anchors, and any button that only scrolls
the page — a `.btn` pointing at a repo instead loses its box and prints as a
line, because the URL is the part worth keeping. It opens every fold and clears
every reveal, since none of that means anything once it is ink. And it sets
`orphans`/`widows` to 3 and keeps headings with the text under them.

Below `lg` the layout is already a single column with the work entries open, and
print lays out at roughly 816px, so the screen rules do most of the work. What
is left is colour, chrome and page breaks. External links print their href after
the text; `mailto:` links already print their address as the link text.

## What was killed

- The cyan accent (`#6ee7f9`) and everything tuned to it
- `.glass` — blurred panels with an inner top highlight
- `.spot` — the pointer-tracked spotlight, and the `Spotlight` client component
- `.mercury` — gradient-clipped heading text
- The hero aurora, the masked grid field, and the contact halo
- Equal-weight card grids for work, skills and open source
- `.tag` chips, icon toppers, and seven of nine icons — the social marks, the
  arrows and the mail glyph are all typeset now (`GitHub ↗` is faster to read
  than a logo is to recognise)
- The pulsing "live" dot and the `Available for…` pill
- The pill-radius buttons; `--radius` is 2px
- The blur-settle on scroll reveals
- Geist and Instrument Serif

Deleted outright: `spotlight.tsx`, `work-card.tsx`, `oss-grid.tsx`.
