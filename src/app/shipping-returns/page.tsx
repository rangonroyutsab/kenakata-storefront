import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Review KenaKata demo shipping and returns information.",
};

export default function ShippingReturnsPage() {
  return (
    <StaticInfoPage
      eyebrow="Support"
      title="Shipping & Returns"
      body="This MVP uses mock checkout and local order confirmation. Shipping, tax, and returns are demo calculations intended to model a production storefront flow without processing real payments."
    />
  );
}
