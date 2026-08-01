/** Fixed grain over the whole page; grid and glow anchored to the hero. */
export function Background() {
  return (
    <div aria-hidden="true">
      <div className="atmos">
        <div className="aurora" />
        <div className="field" />
      </div>
      <div className="grain" />
    </div>
  );
}
