import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "Journal",
  description: "Editorial notes for the KenaKata demo storefront.",
};

export default function JournalPage() {
  return (
    <StaticInfoPage
      eyebrow="Journal"
      title="Notes on Rooted Living"
      body="The journal section is a lightweight placeholder that preserves the supplied navigation structure while the MVP focuses on product browsing, cart, auth, checkout, and fake API integration."
    />
  );
}
