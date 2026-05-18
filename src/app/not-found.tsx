import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-slate-950">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-slate-800"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}