import type { Category, Product } from "@/types/product";

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

function hasReadableCategoryName(category: Category) {
  return /^[a-z][a-z\s&-]{2,}$/i.test(category.name);
}

function hasUsableCategoryImage(category: Category) {
  return (
    category.image.startsWith("https://") &&
    !category.image.includes("placehold.co") &&
    !category.image.includes("placeimg.com") &&
    !category.image.includes("pravatar.cc")
  );
}

type DisplayCategoryOptions = {
  limit?: number;
  products?: Product[];
};

export function getDisplayCategories(
  categories: Category[],
  options: DisplayCategoryOptions = {}
) {
  const productCategoryIds = options.products
    ? new Set(options.products.map((product) => product.category.id))
    : null;
  const displayCategories = categories.filter((category) => {
    const hasMatchingProducts =
      !productCategoryIds || productCategoryIds.has(category.id);

    return (
      hasMatchingProducts &&
      hasReadableCategoryName(category) &&
      hasUsableCategoryImage(category)
    );
  });

  return typeof options.limit === "number"
    ? displayCategories.slice(0, options.limit)
    : displayCategories;
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
