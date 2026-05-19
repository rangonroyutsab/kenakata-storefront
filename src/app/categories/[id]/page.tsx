import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CategoryList } from "@/components/CategoryList";
import { SearchableProductSection } from "@/components/SearchableProductSection";
import { getDisplayCategories } from "@/lib/commerce";
import {
    getCategories,
    getCategoryById,
    getProductsByCategoryId,
} from "@/services/products";
import type { Category, Product } from "@/types/product";

type CategoryPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export const revalidate = 1800;

function includeActiveCategory(categories: Category[], activeCategory: Category) {
    const hasActiveCategory = categories.some(
        (category) => category.id === activeCategory.id
    );

    return hasActiveCategory ? categories : [activeCategory, ...categories];
}

export async function generateStaticParams() {
    const categories = await getCategories();

    return categories.map((category) => ({
        id: String(category.id),
    }));
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const category = await getCategoryById(id);

        return {
            title: category.name,
            description: `Browse ${category.name} products from KenaKata.`,
        };
    } catch {
        return {
            title: "Category",
        };
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { id } = await params;

    let products: Product[];
    let category: Category;
    let categories: Category[];

    try {
        [products, category, categories] = await Promise.all([
            getProductsByCategoryId(id),
            getCategoryById(id),
            getCategories(),
        ]);
    } catch {
        notFound();
    }

    const visibleCategories = includeActiveCategory(
        getDisplayCategories(categories),
        category
    );

    return (
        <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--on-surface)] lg:px-12">
            <section className="mx-auto max-w-7xl">
                <Link
                    href="/shop"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--primary)] transition hover:text-[var(--primary-strong)]"
                >
                    <ArrowLeft size={17} />
                    Back to shop
                </Link>

                <div className="mb-8 max-w-3xl">
                    <p className="mb-3 text-sm font-bold uppercase text-[var(--primary)]">
                        Category
                    </p>

                    <h1 className="font-headline text-4xl font-bold lg:text-5xl">
                        {category.name}
                    </h1>

                    <p className="mt-4 text-lg text-[var(--on-surface-variant)]">
                        Browse products in this category, then search or sort the
                        results to narrow your selection.
                    </p>
                </div>

                <CategoryList
                    categories={visibleCategories}
                    activeCategoryId={category.id}
                />

                <SearchableProductSection
                    products={products}
                    placeholder={`Search ${category.name} products...`}
                />
            </section>
        </main>
    );
}
