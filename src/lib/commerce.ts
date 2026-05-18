import type { Product } from "@/types/product";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatMoney(value: number) {
  return currencyFormatter.format(value);
}

export function getProductImages(product: Product) {
  return product.images.filter(
    (image) =>
      image.startsWith("https://") &&
      !image.includes("placehold.co") &&
      !image.includes("[") &&
      !image.includes("]")
  );
}

export function getProductImage(product: Product) {
  return getProductImages(product)[0] ?? null;
}

export function getProductHref(product: Product) {
  return `/products/${product.slug || product.id}`;
}

export function calculateSubtotal(items: Array<{ price: number; quantity: number }>) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function calculateTax(subtotal: number) {
  return Math.round(subtotal * 0.07 * 100) / 100;
}

export function calculateShipping(subtotal: number) {
  if (subtotal === 0 || subtotal >= 100) {
    return 0;
  }

  return 12;
}
