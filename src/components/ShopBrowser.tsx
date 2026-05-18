"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";

import { ProductGrid } from "@/components/ProductGrid";
import type { Category, Product } from "@/types/product";

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

type ShopBrowserProps = {
  categories: Category[];
  products: Product[];
  activeCategoryId?: string;
  page: number;
  limit: number;
};

function pageHref(page: number, categoryId?: string) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  if (categoryId) {
    params.set("category", categoryId);
  }

  return `/shop?${params.toString()}`;
}

export function ShopBrowser({
  activeCategoryId,
  categories,
  limit,
  page,
  products,
}: ShopBrowserProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [maxPrice, setMaxPrice] = useState(250);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const searched = normalizedQuery
      ? products.filter((product) =>
          product.title.toLowerCase().includes(normalizedQuery)
        )
      : products;

    const filtered = searched.filter((product) => product.price <= maxPrice);

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name-asc") return a.title.localeCompare(b.title);
      if (sort === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [maxPrice, products, query, sort]);

  const filters = (
    <div className="space-y-8">
      <div>
        <h3 className="font-headline mb-4 text-lg font-bold">Categories</h3>
        <div className="space-y-2">
          <Link
            className={`flex rounded-xl px-4 py-3 font-semibold transition ${
              !activeCategoryId
                ? "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
                : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
            }`}
            href="/shop"
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              className={`flex rounded-xl px-4 py-3 transition ${
                activeCategoryId === String(category.id)
                  ? "bg-[var(--primary-container)] font-semibold text-[var(--on-primary-container)]"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]"
              }`}
              href={`/shop?category=${category.id}`}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--outline-variant)]/30 pt-6">
        <h3 className="font-headline mb-4 text-lg font-bold">Filters</h3>
        <label className="block">
          <span className="font-semibold">Price Range</span>
          <input
            className="mt-4 w-full accent-[var(--tertiary)]"
            max="250"
            min="10"
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            type="range"
            value={maxPrice}
          />
          <span className="mt-2 flex justify-between text-sm text-[var(--on-surface-variant)]">
            <span>$10</span>
            <span>${maxPrice}+</span>
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-6 py-10 lg:px-12">
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-28">{filters}</div>
      </aside>

      <section className="min-w-0 flex-1">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--surface-container)] px-4 py-3 font-semibold text-[var(--primary)] md:hidden"
            onClick={() => setIsFilterOpen(true)}
            type="button"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          <label className="relative block w-full max-w-xl">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]"
              size={22}
            />
            <input
              className="w-full rounded-full border border-transparent bg-[var(--surface-container)] py-4 pl-12 pr-12 text-[var(--on-surface)] transition focus:border-[var(--primary)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              value={query}
            />
            {query ? (
              <button
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)]"
                onClick={() => setQuery("")}
                type="button"
              >
                <X size={18} />
              </button>
            ) : null}
          </label>

          <label className="flex items-center gap-3 text-sm font-semibold">
            Sort by:
            <select
              className="rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] px-4 py-3"
              onChange={(event) => setSort(event.target.value as SortOption)}
              value={sort}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </label>
        </div>

        <ProductGrid
          products={visibleProducts}
          emptyMessage="Try changing your search, category, or price filter."
        />

        <div className="mt-12 flex items-center justify-center gap-4 border-t border-[var(--outline-variant)]/30 pt-8">
          <Link
            aria-disabled={page <= 1}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
              page <= 1
                ? "pointer-events-none opacity-40"
                : "hover:bg-[var(--surface-container)]"
            }`}
            href={pageHref(Math.max(1, page - 1), activeCategoryId)}
          >
            <ChevronLeft size={20} />
          </Link>
          <span className="inline-flex h-12 min-w-12 items-center justify-center rounded-full bg-[var(--primary)] px-4 font-bold text-white">
            {page}
          </span>
          <Link
            aria-disabled={products.length < limit}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
              products.length < limit
                ? "pointer-events-none opacity-40"
                : "hover:bg-[var(--surface-container)]"
            }`}
            href={pageHref(page + 1, activeCategoryId)}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            aria-label="Close filters"
            className="absolute inset-0 bg-[var(--on-surface)]/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
            type="button"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-[var(--surface)] p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-headline text-2xl font-bold">Filters</h2>
              <button
                aria-label="Close filters"
                className="rounded-full p-2 text-[var(--on-surface-variant)]"
                onClick={() => setIsFilterOpen(false)}
                type="button"
              >
                <X size={22} />
              </button>
            </div>
            {filters}
          </div>
        </div>
      ) : null}
    </div>
  );
}
