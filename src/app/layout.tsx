import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CalmQuest - Platform Kesehatan Mental",
  description: "Jaga kesehatan mental Anda dengan mudah bersama CalmQuest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Navbar />
        <ChatBot />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}