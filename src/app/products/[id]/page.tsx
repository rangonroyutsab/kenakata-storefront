import { getProductById } from "@/services/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Product details
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          {product.title}
        </h1>

        <p className="mt-4 text-2xl font-semibold">${product.price}</p>

        <p className="mt-6 max-w-2xl leading-7 text-slate-600">
          {product.description}
        </p>
      </section>
    </main>
  );
}