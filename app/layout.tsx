import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Dailyz – Dein tägliches Rätsel-Erlebnis",
  description: "Täglich neue Rätsel: Wörtle, Verbindungen, Zahlenrätsel, Kreuzwort, Wort-Ketten, Flagge und mehr.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full" suppressHydrationWarning>
      <body className={`${geist.variable} min-h-full flex flex-col`}>
        <SessionProviderWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
