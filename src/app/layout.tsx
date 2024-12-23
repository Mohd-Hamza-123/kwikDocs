import "./globals.css";
import Head from "next/head";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
import { Navbar } from '../index'
import { Toaster } from "@/components/ui/toaster";
import TypicalContextProviderWrapper from "@/context/TypicalContextProvider";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
import InitializationWrapper from "./InitializationWrapper";
import CSS_Context_Provider_Wrapper from "@/context/CSS_Context_Provider";

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
        <QueryProvider>
          <StoreProvider>
            <InitializationWrapper>
              <TypicalContextProviderWrapper>
                <CSS_Context_Provider_Wrapper>
                  <body
                    suppressHydrationWarning={true}
                    className={`${inter.className}`}>
                    <Navbar />
                    {children}
                    <Toaster />
                    <OverlayLoader />
                  </body>
                </CSS_Context_Provider_Wrapper>
              </TypicalContextProviderWrapper>
            </InitializationWrapper>
          </StoreProvider>
        </QueryProvider>
      </html>
    </>
  );
}
