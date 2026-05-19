import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the KenaKata demo e-commerce storefront.",
};

export default function AboutPage() {
  return (
    <StaticInfoPage
      eyebrow="About KenaKata"
      title="A modern demo storefront"
      body="KenaKata is an e-commerce storefront prototype built to demonstrate product browsing, category collections, cart management, demo authentication, and mock checkout using the Platzi Fake Store API."
    />
  );
}
