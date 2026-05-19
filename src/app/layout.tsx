import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { Metadata } from "next";
import { Literata, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/components/CartProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const literata = Literata({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KenaKata | Rooted Warmth for Your Home",
    template: "%s | KenaKata",
  },
  description:
    "Shop Terra-styled home goods with a modern Next.js storefront powered by the Platzi Fake Store API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-screen flex-col bg-background text-on-surface antialiased"
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
