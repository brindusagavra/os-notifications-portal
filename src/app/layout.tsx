import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotificationCenter from "@/components/NotificationCenter";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Notifications",
  description: "Demo of notification system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  My Portal
                </Link>
              </div>
              <div className="flex items-center">
                <NotificationCenter />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
