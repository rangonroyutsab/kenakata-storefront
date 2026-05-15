export default function Home() {
  return(
    <main className="min-h-screen bg-white text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          KenaKata.com
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          A modern e-commerce storefront
        </h1>

        <p className="m6-6 max-w-2xl text-lg leading-8 text-slate-600">
          A production-style storefront built with Next.js App Router, TypeScript, Tailwind CSS, and the Platzi Fake API.
        </p> 
      </section>
    </main>
  );
}