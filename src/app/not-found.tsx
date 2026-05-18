import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-[var(--on-surface)]">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          404
        </p>

        <h1 className="font-headline mt-4 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-[var(--on-surface-variant)]">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[var(--primary-strong)]"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
