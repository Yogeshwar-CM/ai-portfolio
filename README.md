# ai-portfolio

Personal site for **Yogeshwar CM** — AI Engineer at Pickyourtrail, working on production agentic systems.

An editorial dossier — paper, ink, one rust. Next.js App Router + TypeScript +
Tailwind v4, no CMS, no motion library. Design rationale lives in
[DESIGN_NOTES.md](DESIGN_NOTES.md).

## Run it

```bash
npm i
npm run dev     # http://localhost:3000
npm run build   # production build — must pass before shipping
npm run lint
```

## Editing content

All copy lives in typed files under `src/data/` — nothing is hardcoded in a component:

| File                    | What's in it                                              |
| ----------------------- | --------------------------------------------------------- |
| `src/data/site.ts`      | Name, headline, email, social links, nav                   |
| `src/data/projects.ts`  | Selected work cards, case-study long form, open-source list |
| `src/data/experience.ts`| Roles timeline and education                                |
| `src/data/skills.ts`    | Skill groups, ordered agentic-first                        |

Adding a `study` block to a project automatically creates its case-study page at
`/work/<slug>`, adds it to the sitemap, and links it from the work index.

## Design system

Tokens are CSS custom properties in `src/app/globals.css`, exposed to Tailwind
through `@theme inline`, so `text-ink`, `text-muted`, `border-rule` and
`text-accent` work as normal utilities. Dark is the same design on darker stock,
driven by `prefers-color-scheme` — every component uses tokens, never a raw
white or black alpha, so both schemes stay in sync by construction.

- **Stock** — `--paper`, `--paper-raised`, `--paper-sunk`
- **Ink** — `--ink`, `--ink-muted`, `--ink-faint` (AA at the sizes each is used)
- **Accent** — one rust (`--accent`), used only to mark: section indices,
  outcomes, focus rings, the rule that draws under the hovered row
- **Type** — Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (labels);
  set with `.t-display` … `.t-xs`, `.display`, `.label`, `.num`
- **Structures** — `.dossier` (the label/value table), `.entry` (work index
  row), `.pull`, `.dropcap`, `.hairline`
- Component CSS lives in `@layer components` so Tailwind utilities keep winning
  when you override a `.btn` or `.label` in JSX.

Motion is CSS plus one `IntersectionObserver` (`src/components/reveal.tsx`) —
opacity and translate only. Everything collapses under
`prefers-reduced-motion: reduce`.

## Deploying

Static-friendly, Vercel-ready — no server runtime needed beyond Next defaults.

Set `NEXT_PUBLIC_SITE_URL` to the real origin before deploying. It feeds
`metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt` and the JSON-LD
`Person` schema; without it, those fall back to a placeholder domain.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

The OG image at `src/app/opengraph-image.tsx` is rendered to PNG at build time —
edit that file rather than dropping in a static image. It pulls Fraunces as TTF
from Google Fonts during the build (`src/app/og-font.ts`); if that fetch fails
the card still renders, just in the fallback sans.

## Screenshots

Not committed. To refresh one for the README, run `npm run dev`, take a shot of
the hero at 1440×900, and save it to `public/screenshot.png`, then reference it
here as `![Portfolio](public/screenshot.png)`.
