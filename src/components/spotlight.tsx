"use client";

import { useCallback, useRef, type ReactNode } from "react";

/**
 * Pointer-tracked highlight. Writes CSS variables directly instead of setting
 * React state — this runs on every mousemove and should never re-render.
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} className={`spot ${className}`}>
      {children}
    </div>
  );
}
