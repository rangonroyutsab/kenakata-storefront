export type ProductCategory = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
};

export type Category = ProductCategory;

export type CartItem = Product & {
  quantity: number;
};