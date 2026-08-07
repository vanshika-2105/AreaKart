import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Areakart | Find Delivery Apps in Your Area",
  description:
    "Discover which instant delivery services like Blinkit, Zepto, Instamart, BigBasket, JioMart, and Dunzo are available in your area using your PIN code.",
  keywords: [
    "Areakart",
    "Blinkit",
    "Zepto",
    "Instamart",
    "BigBasket",
    "Delivery Apps",
    "PIN Code",
    "Instant Delivery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
  {children}

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 2500,
      style: {
        borderRadius: "12px",
        background: "#1e293b",
        color: "#fff",
      },
    }}
  />
</body>
    </html>
  );
}