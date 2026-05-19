"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Lock, ShoppingBag, Trash2, X } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import { ButtonLink } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { calculateSubtotal, formatMoney, getProductImage } from "@/lib/commerce";
import type { CartItem, Product } from "@/types/product";

type CartContextValue = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    setQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "kenakata-cart";

function isValidCartItem(item: unknown): item is CartItem {
    if (!item || typeof item !== "object") {
        return false;
    }

    const candidate = item as CartItem;

    return (
        typeof candidate.id === "number" &&
        typeof candidate.title === "string" &&
        typeof candidate.price === "number" &&
        typeof candidate.quantity === "number" &&
        candidate.quantity > 0 &&
        Array.isArray(candidate.images) &&
        Boolean(candidate.category)
    );
}

function parseSavedCart(savedCart: string | null) {
    if (!savedCart) {
        return [];
    }

    try {
        const parsed = JSON.parse(savedCart);
        return Array.isArray(parsed) ? parsed.filter(isValidCartItem) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>([]);
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const savedItems = parseSavedCart(window.localStorage.getItem(CART_STORAGE_KEY));

        queueMicrotask(() => {
            setItems(savedItems);
            setHasHydrated(true);
        });
    }, []);

    useEffect(() => {
        if (!hasHydrated) {
            return;
        }

        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [hasHydrated, items]);

    function addToCart(product: Product) {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    }

    function removeFromCart(productId: number) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    }

    function increaseQuantity(productId: number) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: number) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function setQuantity(productId: number, quantity: number) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: Math.max(0, quantity) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setItems([]);
    }

    function openCart() {
        setIsCartOpen(true);
    }

    function closeCart() {
        setIsCartOpen(false);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                setQuantity,
                clearCart,
                isCartOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
            <CartDrawer
                closeCart={closeCart}
                checkoutHref={user ? "/checkout" : "/login?next=/checkout"}
                checkoutLabel={user ? "Proceed to Checkout" : "Log in to Checkout"}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                isCartOpen={isCartOpen}
                items={items}
                removeFromCart={removeFromCart}
            />
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}

type CartDrawerProps = {
    checkoutHref: string;
    checkoutLabel: string;
    closeCart: () => void;
    decreaseQuantity: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    isCartOpen: boolean;
    items: CartItem[];
    removeFromCart: (productId: number) => void;
};

function CartDrawer({
    checkoutHref,
    checkoutLabel,
    closeCart,
    decreaseQuantity,
    increaseQuantity,
    isCartOpen,
    items,
    removeFromCart,
}: CartDrawerProps) {
    const subtotal = calculateSubtotal(items);

    if (!isCartOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[80]">
            <button
                aria-label="Close cart"
                className="absolute inset-0 bg-[var(--on-surface)]/40 backdrop-blur-sm"
                onClick={closeCart}
                type="button"
            />
            <aside className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-xl bg-[var(--surface)] shadow-soft sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-[440px] sm:rounded-l-xl sm:rounded-tr-none">
                <div className="border-b border-[var(--outline-variant)]/30 px-6 py-5">
                    <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--surface-variant)] sm:hidden" />
                    <div className="flex items-center justify-between">
                        <h2 className="font-headline text-2xl font-bold">
                            Your Cart{" "}
                            <span className="font-body text-base font-normal text-[var(--on-surface-variant)]">
                                ({items.length} items)
                            </span>
                        </h2>
                        <IconButton label="Close cart" onClick={closeCart}>
                            <X size={22} />
                        </IconButton>
                    </div>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[var(--outline-variant)] p-8 text-center">
                            <ShoppingBag className="mx-auto text-[var(--primary)]" />
                            <h3 className="font-headline mt-4 text-xl font-bold">
                                Your cart is empty
                            </h3>
                            <p className="mt-2 text-sm text-[var(--on-surface-variant)]">
                                Add products to your cart to review them here.
                            </p>
                        </div>
                    ) : (
                        items.map((item) => {
                            const imageUrl = getProductImage(item);

                            return (
                                <article className="flex gap-4" key={item.id}>
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--surface-container)]">
                                        {imageUrl ? (
                                            <Image
                                                src={imageUrl}
                                                alt={item.title}
                                                fill
                                                sizes="96px"
                                                className="object-cover"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
                                                    {item.category.name}
                                                </p>
                                            </div>
                                            <button
                                                aria-label={`Remove ${item.title}`}
                                                className="text-[var(--on-surface-variant)] transition hover:text-[var(--error)]"
                                                onClick={() => removeFromCart(item.id)}
                                                type="button"
                                            >
                                                <Trash2 size={19} />
                                            </button>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <QuantityControl
                                                decreaseDisabled={item.quantity <= 1}
                                                onDecrease={() => decreaseQuantity(item.id)}
                                                onIncrease={() => increaseQuantity(item.id)}
                                                quantity={item.quantity}
                                            />
                                            <p className="font-headline font-bold text-[var(--tertiary)]">
                                                {formatMoney(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>

                <div className="border-t border-[var(--outline-variant)]/30 bg-[var(--surface-container-lowest)] p-6">
                    <div className="mb-6 space-y-3">
                        <div className="flex justify-between text-[var(--on-surface-variant)]">
                            <span>Subtotal</span>
                            <span className="font-bold text-[var(--on-surface)]">
                                {formatMoney(subtotal)}
                            </span>
                        </div>
                        <div className="flex justify-between text-[var(--on-surface-variant)]">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between border-t border-[var(--outline-variant)]/20 pt-4">
                            <span className="font-headline text-xl font-bold">Total</span>
                            <span className="font-headline text-2xl font-bold text-[var(--tertiary)]">
                                {formatMoney(subtotal)}
                            </span>
                        </div>
                    </div>

                    {items.length > 0 ? (
                        <ButtonLink
                            href={checkoutHref}
                            className="w-full py-4 text-base"
                            onClick={closeCart}
                        >
                            {checkoutLabel}
                        </ButtonLink>
                    ) : (
                        <ButtonLink
                            href="/shop"
                            className="w-full py-4 text-base"
                            onClick={closeCart}
                            variant="tertiary"
                        >
                            Browse Products
                        </ButtonLink>
                    )}
                    <p className="mt-4 flex items-center justify-center gap-1 text-xs text-[var(--on-surface-variant)]">
                        <Lock size={14} />
                        Secure Checkout
                    </p>
                </div>
            </aside>
        </div>
    );
}
