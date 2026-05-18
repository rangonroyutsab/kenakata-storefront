import type { Category } from "@/types/product";
import Link from "next/link";

type CategoryListProps = {
    categories: Category[];
    activeCategoryId?: number;
};

export function CategoryList({
    categories,
    activeCategoryId,
}: CategoryListProps) {
    return (
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${activeCategoryId === category.id
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950"
                        }`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}