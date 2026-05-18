import { notFound } from "next/navigation";

import { ProductDetailView } from "@/components/ProductDetailView";
import {
  getProductBySlugOrId,
  getProductsByCategoryId,
} from "@/services/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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
