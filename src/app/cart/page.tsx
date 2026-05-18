"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";

export default function CartPage() {
    const {
        items,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <main className="bg-white px-6 py-12 text-slate-950">
            <section className="mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold tracking-tight">Your cart</h1>

                {items.length === 0 ? (
                    <div className="mt-10 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
                        <h2 className="text-lg font-semibold">Your cart is empty</h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Add products from the storefront to see them here.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-slate-800"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <div className="mt-10 space-y-6">
                        {items.map((item) => (
                            <article
                                key={item.id}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"
                            >
                                <div>
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="mt-1 text-sm text-slate-600">
                                        ${item.price} × {item.quantity}
                                    </p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold transition hover:border-slate-950"
                                        >
                                            -
                                        </button>

                                        <span className="min-w-6 text-center text-sm font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => increaseQuantity(item.id)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold transition hover:border-slate-950"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">${item.price * item.quantity}</p>

                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.id)}
                                        className="mt-2 text-sm font-semibold text-red-500 transition hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}

                        <div className="flex justify-end border-t border-slate-200 pt-6">
                            <p className="text-xl font-bold">Total: ${totalPrice}</p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}