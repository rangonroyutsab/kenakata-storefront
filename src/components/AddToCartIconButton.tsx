"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/CartProvider";
import type { Product } from "@/types/product";

type AddToCartIconButtonProps = {
  product: Product;
};

export function AddToCartIconButton({ product }: AddToCartIconButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      aria-label={`Add ${product.title} to cart`}
      className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)]/90 text-[var(--primary)] opacity-0 shadow-soft backdrop-blur transition hover:bg-[var(--primary)] hover:text-white group-hover:opacity-100"
      onClick={(event) => {
        event.preventDefault();
        addToCart(product);
      }}
      type="button"
    >
      <ShoppingBag size={20} />
    </button>
  );
}
