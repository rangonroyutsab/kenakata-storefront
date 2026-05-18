import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a KenaKata demo account through the Platzi Fake Store API.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
