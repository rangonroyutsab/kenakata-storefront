"use client";

import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import type { Product } from "@/types/product";

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

    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return initialLimit ? products.slice(0, initialLimit) : products;
        }

        return products.filter((product) =>
            product.title.toLowerCase().includes(normalizedQuery)
        );
    }, [products, query, initialLimit]);

    return (
        <>
            <SearchInput
                placeholder={placeholder}
                value={query}
                onChange={setQuery}
            />

            <ProductGrid
                products={visibleProducts}
                emptyMessage="No products matched your search."
            />
        </>
    );
}