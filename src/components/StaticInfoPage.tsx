type StaticInfoPageProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function StaticInfoPage({ body, eyebrow, title }: StaticInfoPageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-16 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto max-w-3xl rounded-2xl bg-[var(--surface-container-lowest)] p-8 shadow-soft md:p-12">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
          {eyebrow}
        </p>
        <h1 className="font-headline text-4xl font-bold lg:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
          {body}
        </p>
      </section>
    </main>
  );
}
