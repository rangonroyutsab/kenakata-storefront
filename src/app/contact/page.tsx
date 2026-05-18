import type { Metadata } from "next";

import { StaticInfoPage } from "@/components/StaticInfoPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact information for the KenaKata demo storefront.",
};

export default function ContactPage() {
  return (
    <StaticInfoPage
      eyebrow="Contact"
      title="Contact Us"
      body="For this demo storefront, contact and support content is static. A production version would connect this page to a support inbox or CRM workflow."
    />
  );
}
