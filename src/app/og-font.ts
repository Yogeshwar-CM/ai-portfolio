/**
 * Fraunces, fetched as TTF for the share cards.
 *
 * Satori cannot parse woff2, and Google Fonts only serves TTF to clients that
 * look old enough to need it — hence the User-Agent. The `text` parameter asks
 * for a subset covering just the glyphs on the card, which keeps the download
 * to a few kilobytes per image.
 *
 * Wrapped in a try/catch on purpose: a card rendered in the fallback sans is a
 * worse card, but a build that fails because a font CDN blipped is a worse
 * outcome than that.
 */
export async function frauncesTTF(text: string) {
  const family = "Fraunces:opsz,wght@144,500";
  const api = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;

  try {
    const css = await fetch(api, {
      headers: {
        // A UA old enough that Google falls back from woff2 to truetype.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.20.25",
      },
    }).then((res) => res.text());

    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return [];

    const data = await fetch(url).then((res) => res.arrayBuffer());
    return [
      { name: "Fraunces", data, style: "normal" as const, weight: 500 as const },
    ];
  } catch {
    return [];
  }
}

/** Card palette — the site's tokens, restated because Satori has no CSS vars. */
export const og = {
  paper: "#f4f1ea",
  ink: "#17130e",
  muted: "#4a443b",
  faint: "#6b6357",
  rule: "rgba(23,19,14,0.16)",
  ruleStrong: "rgba(23,19,14,0.32)",
  accent: "#9c3b16",
} as const;
