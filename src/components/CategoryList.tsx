import type { Category } from "@/types/product";
import Link from "next/link";

type CategoryListProps = {
    categories: Category[];
    activeCategoryId?: number | string;
};

export function CategoryList({
    categories,
    activeCategoryId,
}: CategoryListProps) {
    return (
        <div className="hide-scrollbar mb-10 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
                const isActive = String(activeCategoryId) === String(category.id);

                return (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                            isActive
                                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--on-primary)]"
                                : "border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] text-[var(--on-surface-variant)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                        }`}
                    >
                        {category.name}
                    </Link>
                );
            })}
        </div>
    );
}
