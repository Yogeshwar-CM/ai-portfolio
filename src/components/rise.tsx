import type { ElementType, ReactNode } from "react";

/**
 * `Reveal`'s twin for content that is already on screen when the page loads.
 *
 * `Reveal` is a client component: its IntersectionObserver cannot run until
 * React has hydrated, so anything above the fold wrapped in it paints as
 * `opacity: 0` and stays there until the bundle lands. On the hero that was
 * the lede, the standing-details table and both calls to action — the entire
 * first screen below the name — waiting on JavaScript to become visible.
 *
 * This renders the same entrance as a plain CSS animation. No observer, no
 * client boundary, no hydration in the path, and it degrades to "the content
 * is simply there" with scripting off. Below the fold `Reveal` is still the
 * right tool: an animation that has already finished by the time you scroll
 * to it is not an entrance.
 */
export function Rise({
  children,
  /** Stagger in ms. Keep it under ~400 or the fold assembles visibly late. */
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={className ? `rise ${className}` : "rise"}
      style={delay ? { ["--rise-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
