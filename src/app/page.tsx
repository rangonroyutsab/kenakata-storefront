import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/services/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            KenaKata.com
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Featured products
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Browse products fetched from the Platzi Fake API.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}