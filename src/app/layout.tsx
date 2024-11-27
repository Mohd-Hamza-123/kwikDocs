import "./globals.css";
import Head from "next/head";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
import { Navbar } from '../index'

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
              <Navbar />
              {children}
            </body>
          </QueryProvider>
        </StoreProvider>
      </html>
    </>
  );
}
