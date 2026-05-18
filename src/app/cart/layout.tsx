import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your KenaKata cart before checkout.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
