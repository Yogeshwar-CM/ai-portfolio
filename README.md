# Yogeshwar CM — portfolio

A static portfolio with an interactive SVG system map. All four service descriptions are in the initial HTML. JavaScript only selects a workflow and controls motion; without it, every explanation and contact link remains available.

## Local preview

Run `npm install`, then `npm run dev` and open http://localhost:3000.

Run `npm run check` for lint, production build, interaction, accessibility-reference, SEO-content, contrast, and responsive-rule checks. These are source and behaviour checks, not browser layout or Lighthouse measurements.

## Production build

Once the final domain is known, run:

```sh
npm run check
```

Deploy on Vercel with the default Next.js settings. The project includes Vercel Analytics and Speed Insights, with no environment variables required.

The favicon and 1200 × 630 social preview are local assets. There are no external fonts, runtime dependencies, analytics trackers, or animation render loops.

After deployment, check the real page on desktop and mobile, validate structured data, and submit the sitemap in Search Console. Hosting compression, caching, security headers, and real Core Web Vitals remain deployment checks.

The previous Next.js portfolio is preserved on the `previous-nextjs-portfolio` branch.
