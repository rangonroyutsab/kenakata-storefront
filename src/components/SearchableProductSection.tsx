"use client";

import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import type { Product } from "@/types/product";

type SortOption = "default" | "price-low" | "price-high" | "name-asc" | "name-desc";

type SearchableProductSectionProps = {
  products: Product[];
  placeholder?: string;
  initialLimit?: number;
};

export function SearchableProductSection({
  products,
  placeholder,
  initialLimit,
}: SearchableProductSectionProps) {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const searchedProducts = normalizedQuery
      ? products.filter((product) =>
          product.title.toLowerCase().includes(normalizedQuery)
        )
      : products;

    const sortedProducts = [...searchedProducts].sort((a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "name-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sortOption === "name-desc") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });

    if (!normalizedQuery && sortOption === "default" && initialLimit) {
      return sortedProducts.slice(0, initialLimit);
    }

    return sortedProducts;
  }, [products, query, sortOption, initialLimit]);

  return (
    <>
      <div className="mb-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <SearchInput
          placeholder={placeholder}
          value={query}
          onChange={setQuery}
        />

        <label className="flex flex-col gap-2 text-sm font-semibold text-[var(--on-surface-variant)]">
          <span>Sort by</span>

          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value as SortOption)}
            className="rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-4 py-3 text-sm text-[var(--on-surface)] outline-none transition focus:border-[var(--primary)]"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </label>
      </div>

      <ProductGrid
        products={visibleProducts}
        emptyMessage="No products matched your search."
      />
    </>
  );
}
