import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/custom/header";
import { inter } from "@/fonts/inter";
import { jetbrainsMono } from "@/fonts/jetbrain-mono";
import { spaceGrotesk } from "@/fonts/space-grotesk";
import { Footer } from "@/components/custom/footer";
import { ThemeProvider } from "@/providers/use-theme-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "pixelbridge",
  description: "Image Converter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        geist.variable,
        inter.variable,
        jetbrainsMono.variable,
        spaceGrotesk.variable
      )}
    >
      <body className="flex flex-col justify-between min-h-full bg-[#FBF9F5] dark:bg-[#121212]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen justify-between">
            <div>
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}