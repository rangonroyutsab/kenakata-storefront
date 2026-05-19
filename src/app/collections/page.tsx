import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCategories } from "@/services/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse KenaKata product collections by category.",
};

export const revalidate = 1800;

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="font-headline text-4xl font-bold lg:text-5xl">
            Collections
          </h1>
          <p className="mt-4 text-lg text-[var(--on-surface-variant)]">
            Browse products by category and jump straight into the collection
            that matches what you are shopping for.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              className="group overflow-hidden rounded-2xl bg-[var(--surface-container-lowest)] shadow-soft transition hover:-translate-y-1"
              href={`/categories/${category.id}`}
              key={category.id}
            >
              <div className="relative aspect-[4/3] bg-[var(--surface-container)]">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <h2 className="font-headline text-2xl font-bold">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
                    View products in this category.
                  </p>
                </div>
                <ArrowRight
                  className="shrink-0 text-[var(--primary)] transition group-hover:translate-x-1"
                  size={22}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
