"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, CreditCard, MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { formatMoney, getProductImage } from "@/lib/commerce";
import type { CheckoutOrder } from "@/types/product";

type OrderConfirmationProps = {
  orderId?: string;
};

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  const [order] = useState<CheckoutOrder | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const savedOrder =
      window.sessionStorage.getItem("kenakata-latest-order") ??
      window.localStorage.getItem("kenakata-latest-order");

    if (!savedOrder) {
      return null;
    }

    try {
      const parsedOrder = JSON.parse(savedOrder) as CheckoutOrder;

      if (!orderId || parsedOrder.id === orderId) {
        return parsedOrder;
      }
    } catch {
      return null;
    }

    return null;
  });

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-center">
        <section className="max-w-md rounded-xl bg-[var(--surface-container-lowest)] p-8 shadow-soft">
          <h1 className="font-headline text-3xl font-bold">
            Order not found
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            The latest mock order is no longer available in this browser.
          </p>
          <ButtonLink href="/shop" className="mt-6">
            Continue Shopping
          </ButtonLink>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto max-w-2xl rounded-2xl border border-[var(--outline-variant)]/20 bg-[var(--surface-bright)] p-8 text-center shadow-soft md:p-12">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary-container)] text-[var(--primary)] ring-8 ring-[var(--primary-container)]/30">
          <CheckCircle size={54} />
        </div>
        <h1 className="font-headline mt-8 text-4xl font-bold md:text-5xl">
          Thank you for your order!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-[var(--on-surface-variant)]">
          Your order has been confirmed. A confirmation email has been sent to{" "}
          <span className="font-semibold text-[var(--on-surface)]">
            {order.customer.email}
          </span>
          .
        </p>

        <div className="mt-10 rounded-xl bg-[var(--surface-container-low)] p-6 text-left">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--outline-variant)]/30 pb-6 sm:flex-row">
            <div>
              <p className="text-sm text-[var(--on-surface-variant)]">
                Order Number
              </p>
              <p className="font-headline text-xl font-bold text-[var(--primary)]">
                #{order.id}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-[var(--on-surface-variant)]">Date</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h2 className="font-headline mt-6 text-lg font-bold">
            Order Summary
          </h2>
          <div className="mt-4 space-y-4">
            {order.items.map((item) => {
              const imageUrl = getProductImage(item);

              return (
                <div className="flex items-center justify-between gap-4" key={item.id}>
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-container-high)]">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{item.title}</p>
                      <p className="text-sm text-[var(--on-surface-variant)]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {formatMoney(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-2 border-t border-[var(--outline-variant)]/30 pt-4 text-sm">
            <Row label="Subtotal" value={formatMoney(order.subtotal)} />
            <Row label="Shipping" value={formatMoney(order.shipping)} />
            <Row label="Tax" value={formatMoney(order.tax)} />
            <div className="flex justify-between border-t border-[var(--outline-variant)]/30 pt-4 text-lg font-bold">
              <span className="font-headline">Total</span>
              <span>{formatMoney(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 rounded-xl bg-white p-6 text-left md:grid-cols-2">
          <div>
            <h3 className="font-headline mb-2 flex items-center gap-2 text-lg font-bold">
              <MapPin className="text-[var(--tertiary)]" size={20} />
              Shipping Address
            </h3>
            <address className="not-italic text-sm leading-relaxed text-[var(--on-surface-variant)]">
              {order.customer.firstName} {order.customer.lastName}
              <br />
              {order.customer.address}
              <br />
              {order.customer.apartment ? (
                <>
                  {order.customer.apartment}
                  <br />
                </>
              ) : null}
              {order.customer.city}, {order.customer.state} {order.customer.zip}
              <br />
              {order.customer.country}
            </address>
          </div>
          <div>
            <h3 className="font-headline mb-2 flex items-center gap-2 text-lg font-bold">
              <CreditCard className="text-[var(--tertiary)]" size={20} />
              Payment Method
            </h3>
            <p className="text-sm leading-relaxed text-[var(--on-surface-variant)]">
              Mock card ending in •••• 4242
              <br />
              {order.customer.email}
            </p>
          </div>
        </div>

        <ButtonLink href="/shop" className="mt-10" variant="tertiary">
          Continue Shopping
        </ButtonLink>
      </section>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[var(--on-surface-variant)]">
      <span>{label}</span>
      <span className="text-[var(--on-surface)]">{value}</span>
    </div>
  );
}
