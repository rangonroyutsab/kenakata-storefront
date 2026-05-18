export default function Loading() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-4 h-12 w-full max-w-xl rounded bg-slate-200" />
          <div className="mt-4 h-6 w-full max-w-2xl rounded bg-slate-200" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="aspect-square bg-slate-200" />

              <div className="p-4">
                <div className="h-5 w-full rounded bg-slate-200" />
                <div className="mt-3 h-4 w-20 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}