"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, Moon, ShoppingCart, Sun, User, X } from "lucide-react";

import { useCart } from "@/components/CartProvider";
import { useTheme } from "@/components/ThemeProvider";
import { IconButton } from "@/components/ui/IconButton";

const navigation = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?collection=new", label: "Collections" },
    { href: "/sustainability", label: "Sustainability" },
    { href: "/journal", label: "Journal" },
];

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items, openCart } = useCart();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    function isActive(href: string) {
        if (href === "/shop") {
            return pathname === "/" || pathname.startsWith("/shop") || pathname.startsWith("/products") || pathname.startsWith("/categories");
        }

        return pathname.startsWith(href.split("?")[0]);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--outline-variant)]/30 bg-[var(--surface)]/85 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
                <div className="flex items-center gap-3 md:hidden">
                    <IconButton label="Open menu" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={22} />
                    </IconButton>
                </div>

                <Link
                    href="/"
                    className="font-headline flex items-center gap-2 text-2xl font-bold tracking-tight text-[var(--on-surface)]"
                >
                    <Leaf className="text-[var(--primary)]" size={20} />
                    KenaKata
                </Link>

                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-8 text-sm font-semibold md:flex"
                >
                    {navigation.map((item) => (
                        <Link
                            className={`border-b-2 pb-1 transition ${
                                isActive(item.href)
                                    ? "border-[var(--primary)] text-[var(--primary)]"
                                    : "border-transparent text-[var(--on-surface-variant)] hover:text-[var(--primary)]"
                            }`}
                            href={item.href}
                            key={item.href}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-1">
                    <IconButton
                        label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                        onClick={toggleTheme}
                    >
                        {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                    </IconButton>
                    <button
                        aria-label="Open cart"
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--primary)] transition hover:bg-[var(--surface-container-low)] active:scale-95"
                        onClick={openCart}
                        type="button"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 ? (
                            <span
                                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--tertiary)] px-1 text-xs font-bold text-white"
                                suppressHydrationWarning
                            >
                                {cartCount}
                            </span>
                        ) : null}
                    </button>
                    <Link
                        href="/account"
                        aria-label="Account"
                        className="hidden h-10 w-10 items-center justify-center rounded-full text-[var(--primary)] transition hover:bg-[var(--surface-container-low)] active:scale-95 sm:inline-flex"
                    >
                        <User size={20} />
                    </Link>
                </div>
            </div>

            {isMenuOpen ? (
                <div className="fixed inset-0 z-[60] md:hidden">
                    <button
                        aria-label="Close menu"
                        className="absolute inset-0 bg-[var(--on-surface)]/40 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                        type="button"
                    />
                    <aside className="relative flex h-dvh w-80 max-w-[85vw] flex-col bg-[var(--surface)] p-4 shadow-xl">
                        <div className="mb-8 mt-4 flex items-start justify-between px-2">
                            <div>
                                <h2 className="font-headline text-xl font-bold text-[var(--primary)]">
                                    KenaKata
                                </h2>
                                <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
                                    Rooted Warmth for your Home
                                </p>
                            </div>
                            <IconButton label="Close menu" onClick={() => setIsMenuOpen(false)}>
                                <X size={20} />
                            </IconButton>
                        </div>

                        <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
                            {navigation.map((item) => (
                                <Link
                                    className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                                        isActive(item.href)
                                            ? "bg-[var(--primary-container)] font-bold text-[var(--on-primary-container)]"
                                            : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
                                    }`}
                                    href={item.href}
                                    key={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                className="flex items-center gap-4 rounded-xl px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
                                href="/account"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Account
                            </Link>
                        </nav>

                        <Link
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-4 font-bold text-[var(--on-primary)]"
                            href="/shop"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop the Collection
                        </Link>
                    </aside>
                </div>
            ) : null}
        </header>
    );
}
