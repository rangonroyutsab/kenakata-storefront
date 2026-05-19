"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, ShoppingBag } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import {
  calculateShipping,
  calculateSubtotal,
  calculateTax,
  formatMoney,
  getProductImage,
} from "@/lib/commerce";
import type { CheckoutFormValues, CheckoutOrder } from "@/types/product";

const INITIAL_FORM: CheckoutFormValues = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: "California",
  zip: "",
  country: "United States",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  cardName: "",
  marketingOptIn: true,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const { clearCart, items } = useCart();
  const [form, setForm] = useState<CheckoutFormValues>({
    ...INITIAL_FORM,
    email: user?.email ?? "",
    firstName: user?.name?.split(" ")[0] ?? "",
    lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!user) {
      return;
    }

    const [firstName = "", ...lastNameParts] = user.name?.split(" ") ?? [];

    queueMicrotask(() => {
      setForm((current) => ({
        ...current,
        email: current.email || user.email || "",
        firstName: current.firstName || firstName,
        lastName: current.lastName || lastNameParts.join(" "),
      }));
    });
  }, [user]);

  function updateField<K extends keyof CheckoutFormValues>(
    key: K,
    value: CheckoutFormValues[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    const nextErrors: Record<string, string> = {};

    if (!form.email.includes("@")) nextErrors.email = "Enter a valid email.";
    if (!form.firstName) nextErrors.firstName = "First name is required.";
    if (!form.lastName) nextErrors.lastName = "Last name is required.";
    if (!form.address) nextErrors.address = "Address is required.";
    if (!form.city) nextErrors.city = "City is required.";
    if (!/^\d{5}$/.test(form.zip)) {
      nextErrors.zip = "Please enter a valid 5-digit ZIP.";
    }
    if (form.paymentMethod === "card") {
      if (!form.cardNumber) {
        nextErrors.cardNumber = "Demo payment reference is required.";
      }
      if (!form.cardExpiry) nextErrors.cardExpiry = "Reference date is required.";
      if (!form.cardCvc) nextErrors.cardCvc = "Access code is required.";
      if (!form.cardName) nextErrors.cardName = "Billing name is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user || !validate() || items.length === 0) {
      return;
    }

    const submittedAt = new Date(window.performance.timeOrigin + event.timeStamp);
    const order: CheckoutOrder = {
      id: `KK-${Math.round(event.timeStamp)}-${items.length}`,
      createdAt: submittedAt.toISOString(),
      items,
      subtotal,
      shipping,
      tax,
      total,
      customer: {
        ...form,
        email: user.email || form.email,
      },
    };

    window.sessionStorage.setItem("kenakata-latest-order", JSON.stringify(order));
    window.localStorage.setItem("kenakata-latest-order", JSON.stringify(order));
    clearCart();
    router.push(`/checkout/success?orderId=${order.id}`);
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-center">
        <section className="max-w-md rounded-xl bg-[var(--surface-container-lowest)] p-8 shadow-soft">
          <ShoppingBag className="mx-auto text-[var(--primary)]" size={36} />
          <h1 className="font-headline mt-4 text-3xl font-bold">
            Loading checkout
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Checking your sign-in status before checkout.
          </p>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-center">
        <section className="max-w-md rounded-xl bg-[var(--surface-container-lowest)] p-8 shadow-soft">
          <Lock className="mx-auto text-[var(--primary)]" size={36} />
          <h1 className="font-headline mt-4 text-3xl font-bold">
            Log in to checkout
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Please log in before placing an order so we can connect the order to
            your account.
          </p>
          <Link
            href="/login?next=/checkout"
            className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-5 py-3 font-bold text-[var(--on-primary)]"
          >
            Log in to continue
          </Link>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-center">
        <section className="max-w-md rounded-xl bg-[var(--surface-container-lowest)] p-8 shadow-soft">
          <ShoppingBag className="mx-auto text-[var(--primary)]" size={36} />
          <h1 className="font-headline mt-4 text-3xl font-bold">
            Your cart is empty
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Add products before starting checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-5 py-3 font-bold text-white"
          >
            Browse products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <form
        autoComplete="off"
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_420px]"
        onSubmit={handleSubmit}
      >
        <section className="space-y-12">
          <h1 className="font-headline text-5xl font-bold">Checkout</h1>

          <div>
            <StepTitle index={1} title="Contact Information" />
            <div className="rounded-xl bg-[var(--surface-container)] p-6 shadow-soft">
              <FormField
                error={errors.email}
                label="Email address"
                onChange={(event) => updateField("email", event.target.value)}
                type="email"
                value={form.email}
              />
              <label className="mt-5 flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
                <input
                  checked={form.marketingOptIn}
                  className="h-5 w-5 accent-[var(--primary)]"
                  onChange={(event) =>
                    updateField("marketingOptIn", event.target.checked)
                  }
                  type="checkbox"
                />
                Keep me up to date on new products and exclusive offers
              </label>
            </div>
          </div>

          <div>
            <StepTitle index={2} title="Shipping Address" />
            <div className="grid gap-5 rounded-xl bg-[var(--surface-container)] p-6 shadow-soft md:grid-cols-2">
              <FormField
                label="Country/Region"
                onChange={(event) => updateField("country", event.target.value)}
                value={form.country}
              />
              <div />
              <FormField
                error={errors.firstName}
                label="First name"
                onChange={(event) => updateField("firstName", event.target.value)}
                value={form.firstName}
              />
              <FormField
                error={errors.lastName}
                label="Last name"
                onChange={(event) => updateField("lastName", event.target.value)}
                value={form.lastName}
              />
              <div className="md:col-span-2">
                <FormField
                  error={errors.address}
                  label="Address"
                  onChange={(event) => updateField("address", event.target.value)}
                  value={form.address}
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="Apartment, suite, etc. (optional)"
                  onChange={(event) =>
                    updateField("apartment", event.target.value)
                  }
                  value={form.apartment}
                />
              </div>
              <FormField
                error={errors.city}
                label="City"
                onChange={(event) => updateField("city", event.target.value)}
                value={form.city}
              />
              <FormField
                label="State"
                onChange={(event) => updateField("state", event.target.value)}
                value={form.state}
              />
              <FormField
                error={errors.zip}
                label="ZIP code"
                onChange={(event) => updateField("zip", event.target.value)}
                value={form.zip}
              />
            </div>
          </div>

          <div>
            <StepTitle index={3} title="Payment" />
            <div className="rounded-xl bg-[var(--surface-container)] p-6 shadow-soft">
              <p className="mb-5 text-sm text-[var(--on-surface-variant)]">
                This MVP uses demo payment details only. No real card or payment
                data is processed.
              </p>
              <div className="rounded-lg border border-[var(--outline-variant)] bg-[var(--surface)]">
                <label className="flex items-center justify-between border-b border-[var(--outline-variant)] p-4">
                  <span className="flex items-center gap-3 font-semibold">
                    <input
                      checked={form.paymentMethod === "card"}
                      onChange={() => updateField("paymentMethod", "card")}
                      type="radio"
                    />
                    Demo payment
                  </span>
                  <CreditCard size={20} />
                </label>
                <div className="grid gap-4 p-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FormField
                      error={errors.cardNumber}
                      autoComplete="off"
                      inputMode="numeric"
                      label="Demo payment reference"
                      onChange={(event) =>
                        updateField("cardNumber", event.target.value)
                      }
                      value={form.cardNumber}
                    />
                  </div>
                  <FormField
                    error={errors.cardExpiry}
                    autoComplete="off"
                    label="Reference date"
                    onChange={(event) =>
                      updateField("cardExpiry", event.target.value)
                    }
                    value={form.cardExpiry}
                  />
                  <FormField
                    error={errors.cardCvc}
                    autoComplete="off"
                    inputMode="numeric"
                    label="Access code"
                    onChange={(event) =>
                      updateField("cardCvc", event.target.value)
                    }
                    value={form.cardCvc}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      error={errors.cardName}
                      autoComplete="off"
                      label="Billing name"
                      onChange={(event) =>
                        updateField("cardName", event.target.value)
                      }
                      value={form.cardName}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-xl bg-[var(--surface-container-lowest)] p-6 shadow-soft lg:sticky lg:top-28">
          <h2 className="font-headline mb-6 flex items-center gap-2 text-2xl font-bold">
            <ShoppingBag className="text-[var(--primary)]" size={22} />
            Order Summary
          </h2>
          <div className="space-y-5">
            {items.map((item) => {
              const imageUrl = getProductImage(item);

              return (
                <div className="flex items-center gap-4" key={item.id}>
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-[var(--surface-container)]">
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
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{item.title}</p>
                    <p className="text-sm text-[var(--on-surface-variant)]">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatMoney(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 border-t border-[var(--outline-variant)]/30 pt-5 text-sm text-[var(--on-surface-variant)]">
            <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
            <SummaryRow label="Shipping" value={formatMoney(shipping)} />
            <SummaryRow label="Estimated taxes" value={formatMoney(tax)} />
            <div className="flex items-end justify-between border-t border-[var(--outline-variant)]/30 pt-5 text-[var(--on-surface)]">
              <span className="font-headline text-xl font-bold">Total</span>
              <span className="font-headline text-3xl font-bold">
                {formatMoney(total)}
              </span>
            </div>
          </div>
          <Button className="mt-8 w-full py-4 text-base" variant="tertiary">
            Place Order
            <Lock size={16} />
          </Button>
          <p className="mt-4 flex items-center justify-center gap-1 text-xs text-[var(--on-surface-variant)]">
            <Lock size={13} />
            Encrypted & Secure Payment
          </p>
        </aside>
      </form>
    </main>
  );
}

function StepTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
        {index}
      </span>
      <h2 className="font-headline text-2xl font-bold">{title}</h2>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold text-[var(--on-surface)]">{value}</span>
    </div>
  );
}
