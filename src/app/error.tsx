"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-slate-950">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
          Something went wrong
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Could not load products
        </h1>

        <p className="mt-4 text-slate-600">
          {error.message || "Please try again in a moment."}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Try again
        </button>
      </section>
    </main>
  );
}