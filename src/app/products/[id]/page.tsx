import { getProductById } from "@/services/products";
import Link from "next/link";
import Image from "next/image";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  const imageUrl = product.images.find(
    (image) => image.startsWith("https://") && !image.includes("placehold.co")
  );

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-950">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-slate-600 transition hover:text-slate-950"
        >
          Back to products
        </Link>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-500">
                No image available
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {product.category.name}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              {product.title}
            </h1>

            <p className="mt-4 text-2xl font-semibold">${product.price}</p>

            <p className="mt-6 leading-7 text-slate-600">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}