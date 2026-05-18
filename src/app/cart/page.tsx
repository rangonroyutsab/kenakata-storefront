"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { useCart } from "@/components/CartProvider";
import { ButtonLink } from "@/components/ui/Button";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { calculateSubtotal, formatMoney, getProductImage } from "@/lib/commerce";

export default function CartPage() {
  const {
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    items,
    removeFromCart,
  } = useCart();

  const subtotal = calculateSubtotal(items);

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-headline text-4xl font-bold lg:text-5xl">
              Your Cart
            </h1>
            <p className="mt-3 text-[var(--on-surface-variant)]">
              Review your rooted comforts before checkout.
            </p>
          </div>
          {items.length > 0 ? (
            <button
              className="text-sm font-bold text-[var(--error)] hover:underline"
              onClick={clearCart}
              type="button"
            >
              Clear cart
            </button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-6 py-12 text-center">
            <h2 className="font-headline text-2xl font-bold">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[var(--on-surface-variant)]">
              Add products from the storefront to see them here.
            </p>
            <ButtonLink href="/shop" className="mt-6" variant="tertiary">
              Browse products
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              {items.map((item) => {
                const imageUrl = getProductImage(item);

                return (
                  <article
                    className="flex gap-5 rounded-xl bg-[var(--surface-container-lowest)] p-4 shadow-soft"
                    key={item.id}
                  >
                    <Link
                      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-container)]"
                      href={`/products/${item.slug || item.id}`}
                    >
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      ) : null}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${item.slug || item.id}`}
                            className="font-headline text-xl font-bold hover:text-[var(--primary)]"
                          >
                            {item.title}
                          </Link>
                          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
                            {item.category.name}
                          </p>
                        </div>
                        <button
                          aria-label={`Remove ${item.title}`}
                          className="text-[var(--on-surface-variant)] transition hover:text-[var(--error)]"
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <QuantityControl
                          decreaseDisabled={item.quantity <= 1}
                          onDecrease={() => decreaseQuantity(item.id)}
                          onIncrease={() => increaseQuantity(item.id)}
                          quantity={item.quantity}
                        />
                        <p className="font-headline text-xl font-bold text-[var(--tertiary)]">
                          {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit rounded-xl bg-[var(--surface-container-lowest)] p-6 shadow-soft">
              <h2 className="font-headline text-2xl font-bold">
                Order Summary
              </h2>
              <div className="mt-6 space-y-3 text-[var(--on-surface-variant)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[var(--on-surface)]">
                    {formatMoney(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t border-[var(--outline-variant)]/30 pt-4">
                  <span className="font-headline text-xl font-bold text-[var(--on-surface)]">
                    Total
                  </span>
                  <span className="font-headline text-2xl font-bold text-[var(--tertiary)]">
                    {formatMoney(subtotal)}
                  </span>
                </div>
              </div>
              <ButtonLink href="/checkout" className="mt-6 w-full py-4">
                Proceed to Checkout
              </ButtonLink>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
