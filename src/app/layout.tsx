import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "../../config/site";
import Providers from "../Providers/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Footer, Navbar, Overlay, SearchDocs, Sidebar } from '../index'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: "Kwikdocs : Your Beginner-Friendly Guide to Mastering Concepts",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <body
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-background font-sans antialiased dark:bg-bgDark", inter.variable)}>
        <Providers>
          <div className="min-h-dvh bg-background overflow-hidden">
            <Navbar />
            <Sidebar />
            <Toaster />
            <Overlay />
            <SearchDocs />
            <main className="mt-[9dvh]">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
