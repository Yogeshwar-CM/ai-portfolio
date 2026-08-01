/** Fixed atmosphere layers. Purely decorative — no layout, no interaction. */
export function Background() {
  return (
    <div aria-hidden="true">
      <div className="aurora" />
      <div className="field" />
      <div className="grain" />
    </div>
  );
}
