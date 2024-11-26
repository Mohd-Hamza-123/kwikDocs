import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Head from "next/head";
import QueryProvider from "./QueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Documentarium",
  description: "An Easy Documentation Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <StoreProvider>
          <QueryProvider>
            <body
              suppressHydrationWarning={true}
              className={inter.className}>
              {children}
            </body>
          </QueryProvider>
        </StoreProvider>
      </html>
    </>
  );
}
