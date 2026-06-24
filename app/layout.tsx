import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/modules/layout/theme-provider";
import { I18nProvider } from "@/i18n/provider";
import { AuthProvider } from "@/contexts/auth-context";
import { CartProvider } from "@/contexts/cart-context";
import { Navbar } from "@/modules/layout/navbar";
import { Footer } from "@/modules/layout/footer";
import { METADATA } from "@/common/constants/metadata";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${METADATA.title} - ${METADATA.tagline}`,
  description: METADATA.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <I18nProvider>
            <AuthProvider>
              <CartProvider>
                <Navbar />
                <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
                <Footer />
                <Toaster richColors position="bottom-right" />
              </CartProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
