import { CategoryList } from "@/components/CategoryList";
import { HomeHero } from "@/components/HomeHero";
import { SearchableProductSection } from "@/components/SearchableProductSection";
import { VISIBLE_CATEGORY_NAMES } from "@/constants/api";
import { getCategories, getProducts } from "@/services/products";

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
        <SearchableProductSection products={products} />
      </section>
    </main>
  );
}