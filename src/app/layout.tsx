import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext"; // 1. Import Provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lâm Đồng Retail Store",
  description: "Cửa hàng tạp hóa trực tuyến uy tín",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* 2. Bọc CartProvider ở ngoài cùng */}
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}