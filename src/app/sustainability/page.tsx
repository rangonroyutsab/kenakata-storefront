import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Learn about KenaKata's rooted warmth and sustainable design values.",
};

export default function SustainabilityPage() {
  return (
    <StaticInfoPage
      eyebrow="Rooted Warmth"
      title="Sustainability"
      body="KenaKata is presented as a demo storefront for natural, long-lived home goods. The MVP highlights sustainable shopping patterns with reusable UI, local cart state, and a calm product-first browsing experience."
    />
  );
}
