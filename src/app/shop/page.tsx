import { ShopBrowser } from "@/components/ShopBrowser";
import { getCategories, getProducts, getProductsByCategoryId } from "@/services/products";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const [categories, products] = await Promise.all([
    getCategories(),
    params.category
      ? getProductsByCategoryId(params.category, {
          offset,
          limit: PRODUCTS_PER_PAGE,
        })
      : getProducts({ offset, limit: PRODUCTS_PER_PAGE }),
  ]);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--on-surface)]">
      <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-12">
        <h1 className="font-headline text-4xl font-bold lg:text-5xl">
          All Products
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--on-surface-variant)]">
          Browse the full KenaKata collection with API-backed categories,
          pagination, search, and filtering.
        </p>
      </div>
      <ShopBrowser
        activeCategoryId={params.category}
        categories={categories}
        limit={PRODUCTS_PER_PAGE}
        page={page}
        products={products}
      />
    </main>
  );
}
