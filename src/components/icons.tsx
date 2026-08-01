type IconProps = { className?: string };

const base = "h-4 w-4";

/**
 * Two icons, both controls. Everything that used to be an icon — the social
 * marks, the arrow toppers, the mail glyph — is typeset now: a link says
 * "GitHub ↗", which is shorter to read than a logo is to recognise.
 */

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
