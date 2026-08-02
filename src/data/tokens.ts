/**
 * The light-stock palette, as data.
 *
 * Satori has no CSS variables, so the share cards cannot read `globals.css` —
 * they used to restate six hex literals of their own, which meant editing
 * `--accent` left six prerendered cards on the old rust and nothing failed.
 * This is the one place those values live for anything that is not CSS.
 *
 * `globals.css` still declares them itself; there is no build step generating
 * one from the other, and adding one to save five lines would be a bad trade.
 * What closes the gap instead is `npm run check:craft`, which parses the `:root`
 * block and fails if it has drifted from this file. Change one, change both,
 * and the check will tell you when you didn't.
 */
export const tokens = {
  "--paper": "#f4f1ea",
  "--ink": "#17130e",
  "--ink-muted": "#4a443b",
  "--ink-faint": "#6b6357",
  "--accent": "#9c3b16",
} as const;

/**
 * The dark stock. Only the paper is here, because it is the only dark value
 * anything outside CSS needs — the `theme-color` meta that tints the browser
 * chrome, which is the one place a mismatch is visible as a seam above the
 * page. The share cards are always drawn on the light stock, deliberately: a
 * paper card reads as a printed cover in a timeline that is mostly dark ones.
 */
export const tokensDark = {
  "--paper": "#14120f",
} as const;

/** `#17130e` → `23,19,14`, so the rules stay derived from the ink they tint. */
function channels(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(",");
}

/**
 * Card palette. Rules are the ink at low alpha — the same relationship the CSS
 * has, expressed rather than re-typed, so a change to the ink carries.
 */
export const og = {
  paper: tokens["--paper"],
  ink: tokens["--ink"],
  muted: tokens["--ink-muted"],
  faint: tokens["--ink-faint"],
  rule: `rgba(${channels(tokens["--ink"])},0.16)`,
  ruleStrong: `rgba(${channels(tokens["--ink"])},0.32)`,
  accent: tokens["--accent"],
} as const;
