import { API_BASE_URL } from "@/constants/api";
import type {
    AuthProfile,
    AuthTokens,
    Category,
    CreateUserInput,
    EmailAvailability,
    LoginInput,
    Product,
    ProductQuery,
    StoreLocation,
    User,
} from "@/types/product";

type RequestOptions = RequestInit & {
    token?: string;
};

function buildUrl(path: string, query?: Record<string, string | number | undefined>) {
    const url = new URL(`${API_BASE_URL}${path}`);

    Object.entries(query ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            url.searchParams.set(key, String(value));
        }
    });

    return url.toString();
}

async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { token, headers, ...init } = options;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

function productQueryToParams(query?: ProductQuery) {
    return {
        offset: query?.offset,
        limit: query?.limit,
        title: query?.title,
        price_min: query?.priceMin,
        price_max: query?.priceMax,
        categoryId: query?.categoryId,
    };
}

export async function getProducts(query?: ProductQuery): Promise<Product[]> {
    const url = buildUrl("/products", productQueryToParams(query));
    const response = await fetch(url);

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

export async function getProductBySlug(slug: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product by slug");
    }

    return response.json();
}

export async function getProductBySlugOrId(slugOrId: string): Promise<Product> {
    if (/^\d+$/.test(slugOrId)) {
        return getProductById(slugOrId);
    }

    try {
        return await getProductBySlug(slugOrId);
    } catch {
        return getProductById(slugOrId);
    }
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}

export async function getProductsByCategoryId(
    categoryId: string | number,
    query?: Omit<ProductQuery, "categoryId">
): Promise<Product[]> {
    const url = buildUrl(
        `/categories/${categoryId}/products`,
        productQueryToParams(query)
    );
    const response = await fetch(url);

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

export async function login(input: LoginInput): Promise<AuthTokens> {
    return requestJson<AuthTokens>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function getProfile(accessToken: string): Promise<AuthProfile> {
    return requestJson<AuthProfile>("/auth/profile", {
        token: accessToken,
    });
}

export async function getUsers(): Promise<User[]> {
    return requestJson<User[]>("/users");
}

export async function getUserById(id: string | number): Promise<User> {
    return requestJson<User>(`/users/${id}`);
}

export async function createUser(input: CreateUserInput): Promise<User> {
    return requestJson<User>("/users", {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function checkEmailAvailability(
    email: string
): Promise<EmailAvailability> {
    return requestJson<EmailAvailability>("/users/is-available", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export async function getLocations(
    origin?: string
): Promise<StoreLocation[]> {
    const url = buildUrl("/locations", { origin });
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch locations");
    }

    return response.json();
}
