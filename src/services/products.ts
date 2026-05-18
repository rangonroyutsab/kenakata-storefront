import { API_BASE_URL } from "@/constants/api";
import type { Product } from "@/types/product"


export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}