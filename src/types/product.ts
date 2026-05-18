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

export type ProductQuery = {
  offset?: number;
  limit?: number;
  title?: string;
  priceMin?: number;
  priceMax?: number;
  categoryId?: number | string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
  avatar: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type AuthProfile = Omit<User, "password">;

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type EmailAvailability = {
  isAvailable: boolean;
};

export type StoreLocation = {
  id: number;
  name?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  country?: string;
  [key: string]: unknown;
};

export type CheckoutOrderItem = CartItem;

export type CheckoutFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  paymentMethod: "card" | "paypal";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
  marketingOptIn: boolean;
};

export type CheckoutOrder = {
  id: string;
  createdAt: string;
  items: CheckoutOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customer: CheckoutFormValues;
};
