import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/types/product";

type CategoryTilesProps = {
  categories: Category[];
};

export function CategoryTiles({ categories }: CategoryTilesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {categories.slice(0, 4).map((category) => (
        <Link
          className="group relative aspect-square overflow-hidden rounded-xl bg-[var(--surface-container-high)] shadow-soft"
          href={`/categories/${category.id}`}
          key={category.id}
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : null}
          <span className="absolute inset-0 bg-gradient-to-t from-[var(--on-surface)]/80 via-[var(--on-surface)]/20 to-transparent" />
          <span className="font-headline absolute bottom-5 left-5 text-2xl font-bold text-[var(--surface-bright)]">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
