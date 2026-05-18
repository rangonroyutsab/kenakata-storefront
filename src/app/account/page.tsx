"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, LogOut, MapPin, Package, Settings, UserRound } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function AccountPage() {
  const { logout, user } = useAuth();

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-12 text-center">
        <section className="max-w-md rounded-xl bg-[var(--surface-container-lowest)] p-8 shadow-soft">
          <UserRound className="mx-auto text-[var(--primary)]" size={36} />
          <h1 className="font-headline mt-4 text-3xl font-bold">
            Log in to view your account
          </h1>
          <p className="mt-3 text-[var(--on-surface-variant)]">
            Use the fake API demo account to view profile details and recent
            order context.
          </p>
          <ButtonLink href="/login" className="mt-6">
            Log in
          </ButtonLink>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <div className="rounded-xl bg-[var(--surface-container)] p-8 text-center shadow-soft">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-[var(--surface)] bg-[var(--surface-container-high)]">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <h1 className="font-headline mt-6 text-3xl font-bold">
              {user.name}
            </h1>
            <p className="mt-2 text-[var(--on-surface-variant)]">{user.email}</p>
            <Button className="mt-6 w-full" variant="secondary">
              Edit Profile
            </Button>
          </div>

          <nav className="rounded-xl bg-[var(--surface-container)] p-4 shadow-soft">
            <Link
              className="flex items-center gap-4 rounded-lg bg-[var(--primary-container)] px-4 py-3 font-bold text-[var(--on-primary-container)]"
              href="/account"
            >
              <UserRound size={20} />
              Profile
            </Link>
            <Link
              className="mt-2 flex items-center gap-4 rounded-lg px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
              href="#orders"
            >
              <Package size={20} />
              Orders
            </Link>
            <Link
              className="mt-2 flex items-center gap-4 rounded-lg px-4 py-3 text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
              href="#settings"
            >
              <Settings size={20} />
              Settings
            </Link>
            <button
              className="mt-4 flex w-full items-center gap-4 border-t border-[var(--outline-variant)]/30 px-4 py-4 text-left font-semibold text-[var(--error)] hover:bg-[var(--error-container)]/40"
              onClick={logout}
              type="button"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>

        <div className="space-y-12 lg:col-span-8">
          <section>
            <h2 className="font-headline mb-6 text-2xl font-bold">
              Saved Details
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-[var(--surface-container)] p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-3 text-[var(--tertiary)]">
                  <MapPin size={22} />
                  <h3 className="text-lg font-bold">Default Shipping</h3>
                </div>
                <address className="not-italic leading-relaxed text-[var(--on-surface-variant)]">
                  <span className="block font-bold text-[var(--on-surface)]">
                    {user.name}
                  </span>
                  123 Willow Lane, Apt 4B
                  <br />
                  Portland, OR 97204
                  <br />
                  United States
                </address>
              </div>

              <div className="rounded-xl bg-[var(--surface-container)] p-6 shadow-soft">
                <div className="mb-4 flex items-center gap-3 text-[var(--tertiary)]">
                  <CreditCard size={22} />
                  <h3 className="text-lg font-bold">Default Payment</h3>
                </div>
                <div className="rounded-lg bg-[var(--surface-container-high)] p-4">
                  <p className="font-bold tracking-[0.2em]">•••• 4242</p>
                  <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
                    Demo card, expires 12/25
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="orders">
            <h2 className="font-headline mb-6 text-2xl font-bold">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {[
                ["#KNK-8924", "Delivered", "Handcrafted Ceramic Vase + 1 more item", "$145.00"],
                ["#KNK-8711", "Processing", "Organic Linen Throw Blanket", "$89.00"],
              ].map(([id, status, title, total]) => (
                <article
                  className="flex flex-col gap-4 rounded-xl bg-[var(--surface-container)] p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between"
                  key={id}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-headline text-xl font-bold">{id}</h3>
                      <span className="rounded-full bg-[var(--primary-container)] px-3 py-1 text-xs font-bold text-[var(--on-primary-container)]">
                        {status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
                      {title}
                    </p>
                  </div>
                  <p className="font-headline text-xl font-bold">{total}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
