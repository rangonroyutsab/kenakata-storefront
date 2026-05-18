import Image from "next/image";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.find(
    (image) => image.startsWith("https://") && !image.includes("placehold.co")
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-square bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-500">
            No image available
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 text-base font-semibold">
          {product.title}
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-700">
          ${product.price}
        </p>
      </div>
    </article>
  );
}