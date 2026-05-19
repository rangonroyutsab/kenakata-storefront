import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryTiles } from "@/components/CategoryTiles";
import { HomeHero } from "@/components/HomeHero";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories, getProducts } from "@/services/products";
import { HOME_CATEGORY_PRODUCT_LIMIT, HOME_PRODUCT_LIMIT } from "@/constants/api";
import { getDisplayCategories, getProductImage } from "@/lib/commerce";

export const revalidate = 1800;

export default async function Home() {
  const [products, categories, categoryProducts] = await Promise.all([
    getProducts({ offset: 0, limit: HOME_PRODUCT_LIMIT }),
    getCategories(),
    getProducts({ offset: 0, limit: HOME_CATEGORY_PRODUCT_LIMIT }),
  ]);

  const visibleCategories = getDisplayCategories(categories, {
    limit: 4,
    products: categoryProducts,
  });

  return (
    <main className="bg-[var(--background)] text-[var(--on-surface)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <HomeHero imageUrl={getProductImage(products[0])} />
      </div>

      <section className="bg-[var(--surface)] px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Curated Spaces" />
          <CategoryTiles categories={visibleCategories} />
        </div>
      </section>

      <section className="bg-[var(--surface-container-low)] px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="New Arrivals"
            action={
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-sm font-bold text-[var(--primary)] hover:underline"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            }
          />
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
