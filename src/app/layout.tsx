import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { siteConfig } from "../../config/site";
import Providers from "../Providers/Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",   // <– IMPORTANT: becomes main sans
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={cn("scroll-pt-[3.5rem]", poppins.variable)}  >
      <body suppressHydrationWarning={true}
        className={"bg-background antialiased dark:bg-bgDark bg-gray-100"}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
