"use client";

import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
    product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return (
        <button
            type="button"
            onClick={() => addToCart(product)}
            className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold !text-white transition hover:bg-slate-800"
        >
            Add to cart
        </button>
    );
}