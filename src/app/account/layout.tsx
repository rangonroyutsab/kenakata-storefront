import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "View your KenaKata fake API profile and demo order context.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
