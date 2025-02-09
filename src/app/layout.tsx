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
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Docs Node",
  description: "An Easy Documentation Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <QueryProvider>
        <StoreProvider>
          <TypicalContextProviderWrapper>
            <CSS_Context_Provider_Wrapper>
              <InitializationWrapper>
                <body
                  suppressHydrationWarning={true}
                  className={cn("min-h-screen font-sans overflow-x-hidden antialiased", inter.variable)}>
                  <div className="min-h-dvh bg-background">
                    <Sidebar />
                    <Navbar />
                    <Toaster />
                    <OverlayLoader />
                    <main>{children}</main>
                    <Footer />
                  </div>
                </body>
              </InitializationWrapper>
            </CSS_Context_Provider_Wrapper>
          </TypicalContextProviderWrapper>
        </StoreProvider>
      </QueryProvider>
    </html>
  );
}
