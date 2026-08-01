import { Fragment } from "react";

/**
 * Splits a headline into words so each can be staggered by CSS. Server
 * component on purpose — the split happens in the HTML, so the animation
 * starts on first paint instead of after hydration.
 */
export function Words({
  text,
  className = "",
  stagger = 1,
}: {
  text: string;
  /** Applied to every word. */
  className?: string;
  /** Multiplier on the per-word delay. */
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={`word ${className}`}
            style={{ ["--i" as string]: i * stagger }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
