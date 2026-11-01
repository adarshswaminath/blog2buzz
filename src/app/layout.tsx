import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import { CommandMenu } from "@/components/command-menu";
import { Toaster } from "@/components/toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://blog2buzz.vercel.app"),
  title: {
    default: "Blog2Buzz: The developer web, edited down",
    template: "%s · Blog2Buzz",
  },
  description:
    "Developer stories from DEV and Medium, with the key points in seconds and a post for X or a Medium draft when something is worth sharing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh">
        {children}
        <CommandMenu />
        <Toaster />
      </body>
    </html>
  );
}
