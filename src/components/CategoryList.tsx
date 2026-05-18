import type { Category } from "@/types/product";
import Link from "next/link";

type CategoryListProps = {
    categories: Category[];
};

export function CategoryList({ categories }: CategoryListProps) {
    return (
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}