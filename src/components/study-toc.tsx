"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; heading: string };

/**
 * Table of contents that tracks the section you are reading.
 *
 * The observer band is narrow and sits near the top of the viewport, so the
 * "current" section is the one you have scrolled *to*, not whichever happens
 * to be tallest. Entries are held in a set and resolved back to document
 * order — a plain "last one that fired" would flip between neighbours when
 * two short sections are on screen at once.
 */
export function StudyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const seen = visible.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }
        const first = items.find((item) => seen.has(item.id));
        // No match means every section is off the band — mid-scroll between
        // two of them. Keeping the previous value is less jarring than
        // clearing the marker and re-drawing it a moment later.
        if (first) setActive(first.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      seen.clear();
    };
  }, [items]);

  return (
    <ol className="border-l border-rule pl-4">
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className="toc-link t-sm"
          >
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <span className="pretty">{item.heading}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
