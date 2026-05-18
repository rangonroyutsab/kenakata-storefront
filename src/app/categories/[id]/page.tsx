import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getCategories,
    getCategoryById,
    getProductsByCategoryId,
} from "@/services/products";
import { CategoryList } from "@/components/CategoryList";
import { VISIBLE_CATEGORY_NAMES } from "@/constants/api";
import { SearchableProductSection } from "@/components/SearchableProductSection";

type CategoryPageProps = {
    params: Promise<{
        id: string;
    }>;
};

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

    let products;
    let category;
    let categories;

    try {
        [products, category, categories] = await Promise.all([
            getProductsByCategoryId(id),
            getCategoryById(id),
            getCategories(),
        ]);
    } catch {
        notFound();
    }

    const visibleCategories = categories.filter((category) =>
        VISIBLE_CATEGORY_NAMES.includes(category.name)
    );

    return (
        <main className="bg-white px-6 py-12 text-slate-950">
            <section className="mx-auto max-w-6xl">
                <Link
                    href="/"
                    className="mb-8 inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                >
                    ← Back to products
                </Link>

                <div className="mb-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                        Category
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        {category.name}
                    </h1>
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
