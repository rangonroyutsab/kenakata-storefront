import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete a secure mock checkout for your KenaKata cart.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
