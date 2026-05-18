import { HomeHero } from "@/components/HomeHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/services/products";
import { HOME_PRODUCT_LIMIT } from "@/constants/api";
import { CategoryList } from "@/components/CategoryList";
import { VISIBLE_CATEGORY_NAMES } from "@/constants/api";
import { SearchInput } from "@/components/SearchInput";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const visibleCategories = categories.filter((category) =>
    VISIBLE_CATEGORY_NAMES.includes(category.name)
  );

  return (
    <main className="bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <HomeHero />
        <CategoryList categories={visibleCategories} />
        <SearchInput />
        <ProductGrid products={products.slice(0, HOME_PRODUCT_LIMIT)} />
      </section>
    </main>
  );
}