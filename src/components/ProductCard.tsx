import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { formatMoney, getProductHref, getProductImage } from "@/lib/commerce";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getProductImage(product);

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--outline-variant)]/20 bg-[var(--surface-container-lowest)] shadow-soft transition hover:-translate-y-1">
      <Link href={getProductHref(product)} className="block">
        <div className="relative aspect-[3/4] bg-[var(--surface-container-high)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-[var(--on-surface-variant)]">
              No image available
            </div>
          )}
          <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface)]/90 text-[var(--primary)] opacity-0 shadow-soft backdrop-blur transition group-hover:opacity-100">
            <ShoppingBag size={20} />
          </span>
        </div>

        <div className="p-4">
          <p className="mb-2 text-sm text-[var(--on-surface-variant)]">
            {product.category.name}
          </p>

          <h2 className="font-headline line-clamp-2 text-lg font-bold text-[var(--on-surface)]">
            {product.title}
          </h2>

          <p className="mt-3 text-base font-bold text-[var(--primary)]">
            {formatMoney(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
