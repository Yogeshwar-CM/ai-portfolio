# ai-portfolio

Personal site for **Yogeshwar CM** — AI Engineer at Pickyourtrail, working on production agentic systems.

Dark, glass, one accent. Next.js App Router + TypeScript + Tailwind v4, no CMS, no motion library.

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
`/work/<slug>`, adds it to the sitemap, and links it from the work card.

## Design system

Tokens are CSS custom properties in `src/app/globals.css` and exposed to Tailwind
through `@theme inline`, so `text-muted`, `border-line` and `text-accent` work as
normal utilities.

- **Ink** — `--ink-950` page, `--ink-900/850/800` surfaces
- **Mercury** — `.mercury` gradient text for headings
- **Accent** — a single electric cyan (`--accent`), used for signal only: focus
  rings, live dots, hover underlines, the card spotlight
- **Surfaces** — `.glass` (hairline border + top inner highlight), `.spot`
  (pointer-tracked highlight), `.hairline`, `.tag`
- Component CSS lives in `@layer components` so Tailwind utilities keep winning
  when you override a `.btn` or `.glass` in JSX.

Motion is CSS plus one `IntersectionObserver` (`src/components/reveal.tsx`).
Everything collapses under `prefers-reduced-motion: reduce`.

## Deploying

Static-friendly, Vercel-ready — no server runtime needed beyond Next defaults.

Set `NEXT_PUBLIC_SITE_URL` to the real origin before deploying. It feeds
`metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt` and the JSON-LD
`Person` schema; without it, those fall back to a placeholder domain.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

The OG image at `src/app/opengraph-image.tsx` is rendered to PNG at build time —
edit that file rather than dropping in a static image.

## Screenshots

Not committed. To refresh one for the README, run `npm run dev`, take a shot of
the hero at 1440×900 (dark), and save it to `public/screenshot.png`, then
reference it here as `![Portfolio](public/screenshot.png)`.
