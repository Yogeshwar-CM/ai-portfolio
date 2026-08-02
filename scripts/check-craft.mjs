#!/usr/bin/env node
/**
 * The parts of the quality bar a type-checker cannot see.
 *
 * `npm run build` stayed green through a blank page without JavaScript, a
 * contents list that was one section short of the page it described, and a
 * 146 KB font preloading on every route to set two elements. Those are the
 * class of regression this catches: things that are still valid TypeScript and
 * still render, and are still wrong.
 *
 * Run after a build — it reads `.next`, not the source, so what it measures is
 * what ships. Exits non-zero on any failure.
 */
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

const fail = (check, detail) => failures.push(`${check}: ${detail}`);
const pass = (check, detail) => notes.push(`${check}: ${detail}`);

/* ---------------------------------------------------------------------------
   1. Share-card palette has not drifted from the CSS tokens.

   Satori cannot read CSS variables, so `src/data/tokens.ts` restates five of
   them for the OG cards. Nothing fails when only one side is edited — the
   cards just render on last month's stock, which is visible on someone else's
   timeline and nowhere else.
   ------------------------------------------------------------------------ */
async function checkTokens() {
  const css = await readFile(join(root, "src/app/globals.css"), "utf8");
  const ts = await readFile(join(root, "src/data/tokens.ts"), "utf8");

  // The first `:root` is the light stock. The dark one is inside the first
  // `prefers-color-scheme: dark` block — sliced to the next `@media` so the
  // `prefers-contrast` overrides below it are not mistaken for it.
  const darkAt = css.indexOf("@media (prefers-color-scheme: dark)");
  const blocks = {
    tokens: css.slice(css.indexOf(":root"), css.indexOf("@media")),
    tokensDark: css.slice(darkAt, css.indexOf("@media", darkAt + 1)),
  };

  let checked = 0;
  let drifted = 0;

  for (const [name, block] of Object.entries(blocks)) {
    // Each export is `export const <name> = { ... } as const;`
    const at = ts.indexOf(`export const ${name} =`);
    const body = ts.slice(at, ts.indexOf("} as const;", at));
    const declared = [...body.matchAll(/"(--[a-z-]+)":\s*"(#[0-9a-f]{6})"/g)];

    if (at < 0 || !declared.length) {
      fail("tokens", `no values parsed for \`${name}\` in tokens.ts`);
      drifted++;
      continue;
    }

    for (const [, prop, value] of declared) {
      checked++;
      const inCss = block.match(
        new RegExp(`${prop}:\\s*(#[0-9a-f]{6})`, "i"),
      )?.[1];

      if (!inCss) {
        fail("tokens", `${name}.${prop} has no counterpart in the CSS`);
        drifted++;
      } else if (inCss.toLowerCase() !== value.toLowerCase()) {
        fail(
          "tokens",
          `${name}.${prop} is ${inCss} in CSS, ${value} in tokens.ts`,
        );
        drifted++;
      }
    }
  }

  if (!drifted) pass("tokens", `${checked} in step with the CSS`);
}

/* ---------------------------------------------------------------------------
   2. Font preload budget.

   This site has no images. Fonts are the entire critical-path payload, and the
   only thing standing between a fast first paint and a slow one. A regression
   here is one line in `layout.tsx` — a `style` added to a `next/font` call
   pulled 146 KB onto every route once already, and every check that existed
   was green.
   ------------------------------------------------------------------------ */
const FONT_BUDGET = 200 * 1024;

async function checkFontBudget() {
  const html = await readFile(join(root, ".next/server/app/index.html"), "utf8");

  const preloaded = [
    ...html.matchAll(/href="(\/_next\/static\/media\/[^"]+\.woff2)"/g),
  ].map((m) => m[1]);

  if (!preloaded.length) {
    fail("fonts", "no preloaded woff2 found — did the build output move?");
    return;
  }

  let total = 0;
  for (const href of new Set(preloaded)) {
    const { size } = await stat(join(root, ".next", href.replace("/_next", "")));
    total += size;
  }

  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  const summary = `${new Set(preloaded).size} files, ${kb(total)} on /`;

  if (total > FONT_BUDGET) {
    fail("fonts", `${summary} — over the ${kb(FONT_BUDGET)} budget`);
  } else {
    pass("fonts", `${summary} (budget ${kb(FONT_BUDGET)})`);
  }
}

/* ---------------------------------------------------------------------------
   3. The page is not blank without JavaScript.

   Every reveal starts at `opacity: 0` and only ever gets cleared by CSS that
   depends on `scripting: none` or by the observer. If the prerendered HTML
   ships the hero's copy but no escape hatch, a crawler — or anyone whose
   bundle failed — gets a page with a headline and nothing under it.
   ------------------------------------------------------------------------ */
async function checkNoScript() {
  const html = await readFile(join(root, ".next/server/app/index.html"), "utf8");

  const hasEscape =
    html.includes("scripting: none") ||
    /<noscript>[\s\S]*data-reveal[\s\S]*<\/noscript>/.test(html);

  // The CSS lives in a stylesheet, not inline, so check that too.
  const cssHref = html.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/)?.[1];
  const css = cssHref
    ? await readFile(join(root, ".next", cssHref.replace("/_next", "")), "utf8")
    : "";

  if (hasEscape || css.includes("scripting:none")) {
    pass("noscript", "reveal state has a no-JS escape hatch");
  } else {
    fail("noscript", "nothing clears [data-reveal] without JavaScript");
  }
}

/* ---------------------------------------------------------------------------
   4. Every case study is actually prerendered.

   The share cards silently fell out of the prerender manifest once already,
   when adding `generateImageMetadata` introduced a dynamic segment. On-demand
   rendering means the Google Fonts fetch happens inside a social crawler's
   request, behind a try/catch that falls back to a system sans.
   ------------------------------------------------------------------------ */
async function checkPrerender() {
  // Read as text rather than imported: this is a plain node script and
  // `projects.ts` is TypeScript. The slugs are the only thing needed.
  const source = await readFile(join(root, "src/data/projects.ts"), "utf8");
  const slugs = [...source.matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);

  const missing = [];
  for (const slug of slugs) {
    for (const path of [
      `.next/server/app/work/${slug}.html`,
      `.next/server/app/work/${slug}/opengraph-image.body`,
    ]) {
      await stat(join(root, path)).catch(() => missing.push(path));
    }
  }

  if (missing.length) fail("prerender", `not built: ${missing.join(", ")}`);
  else pass("prerender", `${slugs.length} studies + cards prerendered`);
}

const checks = [checkTokens, checkFontBudget, checkNoScript, checkPrerender];

for (const check of checks) {
  await check().catch((error) => fail(check.name, error.message));
}

for (const note of notes) console.log(`  ok   ${note}`);
for (const failure of failures) console.error(`  FAIL ${failure}`);

if (failures.length) {
  console.error(`\n${failures.length} craft check(s) failed.`);
  process.exit(1);
}
console.log(`\n${notes.length} craft checks passed.`);
