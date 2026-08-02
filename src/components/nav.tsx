"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { Close, Menu } from "@/components/icons";

/**
 * A masthead, not a floating pill bar: solid stock, one hairline under it, and
 * the running head set in mono caps. The rust rule at the bottom edge doubles
 * as the read-progress indicator.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);

      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(y / max, 1)})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Highlight the section crossing the middle of the viewport.
     Membership is tracked as a set rather than "whichever fired last", so that
     scrolling back up past the first section clears the marker instead of
     leaving Work lit while the reader is looking at the hero. */
  useEffect(() => {
    const ids = nav.map((item) => item.href.split("#")[1]);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActive(ids.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      // Dismissing with the keyboard should hand focus back to the control
      // that opened the menu, not drop it at the top of the document.
      toggleRef.current?.focus();
    };

    // The menu is md:hidden, so an open state that survives a resize to
    // desktop leaves the header stuck in its expanded styling.
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => media.matches && setOpen(false);
    onChange();

    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header
      data-print="hide"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-rule bg-paper"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="label label-ink whitespace-nowrap"
          aria-label={`${site.name} — home`}
        >
          Yogeshwar CM
          <span aria-hidden="true" className="text-accent">
            {" "}
            ·
          </span>{" "}
          <span className="hidden text-faint sm:inline">AI Engineer</span>
        </Link>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-7 md:flex"
        >
          {nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                // `location`, not `true` or `page`: the reader is somewhere
                // inside the page this points at, not on a different one.
                aria-current={isActive ? "location" : undefined}
                className={`label relative transition-colors hover:text-ink ${
                  isActive ? "text-ink" : ""
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="label link-quiet hidden sm:inline"
          >
            Email
            {/* Decorative — and a mailto opens a mail client, not a tab, so
                there is nothing useful to announce in its place. */}
            <span aria-hidden="true"> ↗</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid h-9 w-9 place-items-center text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent"
      />

      <div
        id="mobile-nav"
        hidden={!open}
        className="shell border-t border-rule bg-paper pb-5 md:hidden"
      >
        <nav aria-label="Sections" className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-rule py-3.5 text-muted transition-colors hover:text-ink"
            >
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-body">{item.label}</span>
            </Link>
          ))}
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="btn btn-ink mt-5 w-full"
          >
            {site.email}
          </a>
        </nav>
      </div>
    </header>
  );
}
