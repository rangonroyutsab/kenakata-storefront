"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";

export function SiteHeader() {
    const { items } = useCart();

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
                    KenaKata
                </Link>

                <nav aria-label="Main navigation" className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                    >
                        Products
                    </Link>

                    <Link
                        href="/cart"
                        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold !text-white transition hover:bg-slate-800"
                    >
                        Cart ({cartCount})
                    </Link>
                </nav>
            </div>
        </header>
    );
}