"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-[var(--on-surface)]">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--error)]">
          Something went wrong
        </p>

        <h1 className="font-headline mt-4 text-3xl font-bold tracking-tight">
          Could not load products
        </h1>

        <p className="mt-4 text-[var(--on-surface-variant)]">
          {error.message || "Please try again in a moment."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-[var(--on-primary)] transition hover:bg-[var(--primary-strong)]"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
