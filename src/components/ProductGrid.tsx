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
      <div className="rounded-xl border border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-6 py-12 text-center">
        <h2 className="font-headline text-xl font-bold text-[var(--on-surface)]">
          No products found
        </h2>

        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
