import "./globals.css";
import Head from "next/head";
import { Footer, Navbar, Sidebar } from '../index'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import InitializationWrapper from "./InitializationWrapper";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
import CSS_Context_Provider_Wrapper from "@/context/CSS_Context_Provider";
import TypicalContextProviderWrapper from "@/context/TypicalContextProvider";


const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "DocsNode",
  description: "An Easy Documentation Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <QueryProvider>
        <StoreProvider>
          <TypicalContextProviderWrapper>
            <CSS_Context_Provider_Wrapper>
              <InitializationWrapper>
                <body
                  suppressHydrationWarning={true}
                  className={`${inter.className} min-h-dvh overflow-x-hidden`}>
                  <Sidebar />
                  <Navbar />
                  <Toaster />
                  <OverlayLoader />
                  <main>{children}</main>
                  <Footer />
                </body>
              </InitializationWrapper>
            </CSS_Context_Provider_Wrapper>
          </TypicalContextProviderWrapper>
        </StoreProvider>
      </QueryProvider>
    </html>
  );
}
