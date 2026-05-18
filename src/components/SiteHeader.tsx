import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950"> 
          Kenakata
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}