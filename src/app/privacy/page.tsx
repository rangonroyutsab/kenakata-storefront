import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy notes for the KenaKata demo storefront.",
};

export default function PrivacyPage() {
  return (
    <StaticInfoPage
      eyebrow="Policy"
      title="Privacy Policy"
      body="KenaKata stores demo cart, auth tokens, and mock order data in browser storage for this local MVP. No real payment, address, or order data is sent to a production backend."
    />
  );
}
