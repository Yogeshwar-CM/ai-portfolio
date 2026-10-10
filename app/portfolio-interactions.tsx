"use client";

import { useEffect } from "react";

export default function PortfolioInteractions() {
  useEffect(() => {
    const controls = [...document.querySelectorAll<HTMLElement>("[data-mode]")];
    const branches = [...document.querySelectorAll<HTMLElement>("[data-branch]")];
    const sources = [...document.querySelectorAll<HTMLElement>("[data-source]")];
    const panels = [...document.querySelectorAll<HTMLElement>("[data-panel]")];
    const sourceNames = ["tools", "leads", "calls", "documents"];
    const motionButton = document.querySelector<HTMLButtonElement>("#motion");
    const mapSection = document.querySelector<HTMLElement>(".map-section");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function selectSystem(index: number) {
      controls.forEach((control, currentIndex) => control.setAttribute("aria-pressed", String(currentIndex === index)));
      branches.forEach((branch) => branch.classList.toggle("is-active", Number(branch.dataset.branch) === index));
      sources.forEach((source) => source.classList.toggle("is-active", source.dataset.source === sourceNames[index]));
      panels.forEach((panel, currentIndex) => { panel.hidden = currentIndex !== index; });
    }
    function setPaused(paused: boolean) {
      mapSection?.classList.toggle("is-paused", paused);
      motionButton?.setAttribute("aria-pressed", String(paused));
      const label = motionButton?.querySelector("span");
      if (label) label.textContent = paused ? "Resume signals" : "Pause signals";
    }
    const controlHandlers = controls.map((control) => {
      const onClick = (event: Event) => { event.preventDefault(); selectSystem(Number(control.dataset.mode)); };
      const onKeyDown = (event: KeyboardEvent) => { if (event.key === " ") { event.preventDefault(); control.click(); } };
      control.setAttribute("role", "button");
      control.addEventListener("click", onClick);
      control.addEventListener("keydown", onKeyDown);
      return { control, onClick, onKeyDown };
    });
    const onMotionClick = () => setPaused(motionButton?.getAttribute("aria-pressed") !== "true");
    const onPreferenceChange = (event: MediaQueryListEvent) => setPaused(event.matches);
    motionButton?.addEventListener("click", onMotionClick);
    preference.addEventListener("change", onPreferenceChange);
    selectSystem(0);
    setPaused(preference.matches);
    document.documentElement.classList.add("enhanced");
    return () => {
      controlHandlers.forEach(({ control, onClick, onKeyDown }) => { control.removeEventListener("click", onClick); control.removeEventListener("keydown", onKeyDown); });
      motionButton?.removeEventListener("click", onMotionClick);
      preference.removeEventListener("change", onPreferenceChange);
      document.documentElement.classList.remove("enhanced");
    };
  }, []);
  return null;
}
