import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[70svh] items-center">
      <div className="shell">
        <p className="label label-accent num">404</p>
        <h1 className="t-title mt-4">Nothing here.</h1>
        <p className="pretty measure-lead t-body mt-4 text-muted">
          The page you asked for doesn&apos;t exist — or it did once and
          doesn&apos;t now.
        </p>
        <Link href="/" className="btn btn-ink mt-8">
          Back home
        </Link>
      </div>
    </div>
  );
}
