import { API_BASE_URL } from "@/constants/api";
import type { Product, Category } from "@/types/product"


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

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}

export async function getProductsByCategoryId(
    categoryId: string
): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch category products");
    }

    return response.json();
}

export async function getCategoryById(id: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch category");
    }

    return response.json();
}