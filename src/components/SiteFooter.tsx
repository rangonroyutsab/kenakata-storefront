import Link from "next/link";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/shipping-returns", label: "Shipping & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact Us" },
  { href: "/store-locator", label: "Store Locator" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--outline-variant)]/20 bg-[var(--surface-container-highest)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 text-sm text-[var(--on-surface-variant)] md:flex-row md:items-start md:justify-between lg:px-12">
        <div className="max-w-sm">
          <Link
            href="/"
            className="font-headline text-xl font-bold text-[var(--on-surface)]"
          >
            KenaKata
          </Link>
          <p className="mt-4 leading-relaxed">
            Shop a curated selection of products with fast browsing, simple
            checkout, and a reliable cart experience.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
          {links.map((link) => (
            <Link
              className="transition hover:text-[var(--primary)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p>© 2026 KenaKata. All rights reserved.</p>
      </div>
    </footer>
  );
}
