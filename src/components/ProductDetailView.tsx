"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, PackageCheck, ShoppingBag, Sprout, Star } from "lucide-react";

import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/ProductGrid";
import { formatMoney, getProductImages } from "@/lib/commerce";
import type { Product } from "@/types/product";

type ProductDetailViewProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const images = useMemo(() => getProductImages(product), [product]);
  const [activeImage, setActiveImage] = useState(images[0] ?? null);

  function handleAddToCart() {
    Array.from({ length: quantity }).forEach(() => addToCart(product));
  }

  return (
    <main className="bg-[var(--background)] pb-24 text-[var(--on-surface)]">
      <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-[var(--on-surface-variant)] lg:px-12">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-[var(--primary)]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--primary)]">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.category.id}`}
            className="hover:text-[var(--primary)]"
          >
            {product.category.name}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[var(--on-surface)]">
            {product.title}
          </span>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--surface-container-high)] shadow-soft">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[var(--on-surface-variant)]">
                No image available
              </div>
            )}
          </div>

          {images.length > 1 ? (
            <div className="hide-scrollbar mt-5 flex gap-4 overflow-x-auto pb-2">
              {images.map((image) => (
                <button
                  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === image
                      ? "border-[var(--primary)]"
                      : "border-transparent opacity-70 hover:border-[var(--outline-variant)] hover:opacity-100"
                  }`}
                  key={image}
                  onClick={() => setActiveImage(image)}
                  type="button"
                >
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-5 lg:pt-10">
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--primary)]">
            <Leaf size={18} />
            {product.category.name}
          </p>
          <h1 className="font-headline text-4xl font-bold leading-tight lg:text-5xl">
            {product.title}
          </h1>

          <div className="mt-5 flex items-center gap-2 text-[var(--tertiary)]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={17} fill="currentColor" />
            ))}
            <span className="ml-2 text-sm font-medium text-[var(--on-surface-variant)]">
              4.8 based on 12 reviews
            </span>
          </div>

          <p className="font-headline mt-6 text-3xl font-bold text-[var(--tertiary)]">
            {formatMoney(product.price)}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[var(--on-surface-variant)]">
            {product.description}
          </p>

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-bold uppercase">Quantity</h2>
            <div className="inline-flex rounded-full bg-[var(--surface-container)]">
              <button
                className="h-11 w-12 rounded-full text-lg font-bold disabled:opacity-40"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                type="button"
              >
                -
              </button>
              <span className="flex h-11 min-w-10 items-center justify-center font-bold">
                {quantity}
              </span>
              <button
                className="h-11 w-12 rounded-full text-lg font-bold"
                onClick={() => setQuantity((current) => current + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <Button
            className="mt-8 w-full py-5 text-lg"
            onClick={handleAddToCart}
            variant="tertiary"
          >
            <ShoppingBag size={20} />
            Add to Cart
          </Button>

          <div className="mt-8 space-y-5 border-t border-[var(--outline-variant)]/30 pt-8">
            <div className="flex gap-4 text-[var(--on-surface-variant)]">
              <PackageCheck className="mt-1 text-[var(--primary)]" size={22} />
              <div>
                <p className="font-bold text-[var(--on-surface)]">
                  Free carbon-neutral shipping
                </p>
                <p className="text-sm">
                  On all orders over $100. Ships within 2-3 business days.
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-[var(--on-surface-variant)]">
              <Sprout className="mt-1 text-[var(--primary)]" size={22} />
              <div>
                <p className="font-bold text-[var(--on-surface)]">
                  Rooted in Nature
                </p>
                <p className="text-sm">
                  Every purchase supports sustainable farming practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-12">
          <h2 className="font-headline mb-8 text-3xl font-bold">
            Related Products
          </h2>
          <ProductGrid products={relatedProducts.slice(0, 4)} />
        </section>
      ) : null}
    </main>
  );
}
