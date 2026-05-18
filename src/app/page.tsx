import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/services/products";
import { HomeHero } from "@/components/HomeHero";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <HomeHero />
        <ProductGrid products={products.slice(0, 8)} />
      </section>
    </main>
  )
}