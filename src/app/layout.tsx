import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Navbar, Sidebar } from '../index'
import { Toaster } from "@/components/ui/toaster";
import OverlayLoader from "@/components/OverlayLoader/OverlayLoader";
import { siteConfig } from "../../config/site";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: "Learn Simply: Your Beginner-Friendly Guide to Mastering Concepts",
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
        className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}
      >
        <Providers>
          <div className="min-h-dvh bg-background">
            <Navbar />
            <Sidebar />
            <Toaster />
            <OverlayLoader />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
