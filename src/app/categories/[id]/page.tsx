import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { getProductsByCategoryId } from "@/services/products";

type CategoryPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  let products;

  try {
    products = await getProductsByCategoryId(id);
  } catch {
    notFound();
  }

  return (
    <main className="bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          ← Back to products
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Category
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Category products
          </h1>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}
