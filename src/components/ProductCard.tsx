import type { Product } from "@/types/product"

type ProductCardProps = {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold">{product.title}</h2>

            <p className="mt-2 text-sm text-slate-600">${product.price}</p>
        </article>
    );
}