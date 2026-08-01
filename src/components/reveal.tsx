"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms. Keep it under ~400 or it reads as lag. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll reveal without a motion library: one observer per node, unobserved
 * after it fires. The visual state lives in CSS (`[data-reveal]`), so
 * prefers-reduced-motion is handled there rather than in JS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.dataset.reveal = "in";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
