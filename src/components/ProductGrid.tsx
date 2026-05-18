import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "Please check back later for new products.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center">
        <h2 className="text-lg font-semibold text-slate-950">
          No products found
        </h2>

        <p className="mt-2 text-sm text-slate-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        // pass the current product item into ProductCard using a prop named product.
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}