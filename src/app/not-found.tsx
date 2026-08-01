import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[70svh] items-center">
      <div className="shell">
        <p className="kicker">404</p>
        <h1 className="mercury mt-5 text-[clamp(2.2rem,6vw,3.4rem)] font-medium tracking-[-0.04em]">
          Nothing here.
        </h1>
        <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
          The page you asked for doesn&apos;t exist — or it did once and
          doesn&apos;t now.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Back home
        </Link>
      </div>
    </div>
  );
}
