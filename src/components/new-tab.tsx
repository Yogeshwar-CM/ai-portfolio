/**
 * The ↗ that marks a link leaving the site.
 *
 * Typeset rather than an icon, so it inherits the type ramp — but it was being
 * read out as part of the link name, which turns "GitHub ↗" into "GitHub north
 * east arrow" on VoiceOver and NVDA. The glyph is decoration; the fact that the
 * link opens elsewhere is the actual information, so they are swapped for a
 * screen reader.
 */
export function NewTab() {
  return (
    <>
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}
