export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)]">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <div className="h-4 w-32 rounded bg-[var(--surface-container)]" />
          <div className="mt-4 h-12 w-full max-w-xl rounded bg-[var(--surface-container)]" />
          <div className="mt-4 h-6 w-full max-w-2xl rounded bg-[var(--surface-container)]" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-[var(--outline-variant)]/20 bg-[var(--surface-container-lowest)] shadow-soft"
            >
              <div className="aspect-[3/4] bg-[var(--surface-container)]" />

              <div className="p-4">
                <div className="h-5 w-full rounded bg-[var(--surface-container)]" />
                <div className="mt-3 h-4 w-20 rounded bg-[var(--surface-container)]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
