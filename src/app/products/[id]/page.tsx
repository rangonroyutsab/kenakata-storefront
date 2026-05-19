import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/ProductDetailView";
import {
  getProductBySlugOrId,
  getProducts,
  getProductsByCategoryId,
} from "@/services/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 1800;

export async function generateStaticParams() {
  const products = await getProducts({ offset: 0, limit: 24 });

  return products.map((product) => ({
    id: product.slug || String(product.id),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProductBySlugOrId(id);

    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return {
      title: "Product",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;
  let relatedProducts = [];

  try {
    product = await getProductBySlugOrId(id);
    relatedProducts = await getProductsByCategoryId(product.category.id, {
      limit: 8,
    });
  } catch {
    notFound();
  }

  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct.id !== product.id
  );

  return (
    <ProductDetailView
      product={product}
      relatedProducts={filteredRelatedProducts}
    />
  );
}
