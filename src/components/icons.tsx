type IconProps = { className?: string };

const base = "h-4 w-4";

export function ArrowUpRight({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.5 11.5 11.5 4.5" />
      <path d="M5.75 4.5h5.75v5.75" />
    </svg>
  );
}

export function ArrowDown({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 3v10" />
      <path d="M3.75 8.75 8 13l4.25-4.25" />
    </svg>
  );
}

export function Mail({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="2" />
      <path d="m2.5 5 5.5 3.75L13.5 5" />
    </svg>
  );
}

export function GitHub({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 .2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.34c-2.01.37-2.53-.49-2.7-.94-.09-.24-.48-.94-.83-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.19c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z" />
    </svg>
  );
}

export function LinkedIn({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.4 1.6a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM1.8 6.3h3.2v8H1.8v-8Zm5.2 0h3.06v1.1h.04c.43-.78 1.47-1.6 3.02-1.6 3.23 0 3.83 2.03 3.83 4.68v3.82h-3.2v-3.39c0-.81-.02-1.85-1.16-1.85-1.16 0-1.34.88-1.34 1.79v3.45H7V6.3Z" />
    </svg>
  );
}

export function XLogo({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.44 6.9 14.9 1h-1.3L8.86 6.12 5.08 1H.7l5.72 7.75L.7 15h1.3l5-5.4L11 15h4.38L9.44 6.9Zm-1.77 1.9-.58-.78L2.46 1.9h1.99l3.72 5.01.58.78 4.85 6.53h-1.99L7.67 8.8Z" />
    </svg>
  );
}

export function Devfolio({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M1.9 8h12.2" />
      <path d="M8 1.75c1.6 1.8 2.5 3.9 2.5 6.25S9.6 12.45 8 14.25C6.4 12.45 5.5 10.35 5.5 8S6.4 3.55 8 1.75Z" />
    </svg>
  );
}

export function Menu({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 5h11M2.5 11h11" />
    </svg>
  );
}

export function Close({ className = base }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
