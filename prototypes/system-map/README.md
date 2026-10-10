# Yogeshwar CM — portfolio

A static portfolio with an interactive SVG system map. All four service descriptions are in the initial HTML. JavaScript only selects a workflow and controls motion; without it, every explanation and contact link remains available.

## Local preview

Run `python3 -m http.server 3000`, then open http://localhost:3000.

Run `node verify.mjs` for interaction, accessibility-reference, SEO-content, contrast, and responsive-rule checks. These are source and behaviour checks, not browser layout or Lighthouse measurements.

## Production build

Once the final domain is known, run:

```sh
node verify.mjs
node build.mjs https://your-domain.com
```

Deploy only `dist/` to a static host. The build adds the actual canonical URL, social image URLs, profile URL, robots.txt, and sitemap.xml. It requires an HTTPS origin; no domain is assumed in the development page.

The favicon and 1200 × 630 social preview are local assets. There are no external fonts, runtime dependencies, analytics trackers, or animation render loops.

After deployment, check the real page on desktop and mobile, validate structured data, and submit the sitemap in Search Console. Hosting compression, caching, security headers, and real Core Web Vitals remain deployment checks.
