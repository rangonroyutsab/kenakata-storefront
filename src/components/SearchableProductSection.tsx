"use client";

import { useMemo, useState } from "react";

import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import type { Product } from "@/types/product";

type SearchableProductSectionProps = {
    products: Product[];
    placeholder?: string;
};

export function SearchableProductSection({
    products,
    placeholder,
}: SearchableProductSectionProps) {
    const [query, setQuery] = useState("");

    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return products;
        }

        return products.filter((product) =>
            product.title.toLowerCase().includes(normalizedQuery)
        );
    }, [products, query]);

    return (
        <>
            <SearchInput
                placeholder={placeholder}
                value={query}
                onChange={setQuery}
            />

            <ProductGrid
                products={filteredProducts}
                emptyMessage="No products matched your search."
            />
        </>
    );
}