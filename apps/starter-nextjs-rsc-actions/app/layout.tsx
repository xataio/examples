import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Server Actions with Xata and Vercel Starter",
  description:
    "A simple Next.js app that uses Xata as a database from Next.js Server Actions",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
