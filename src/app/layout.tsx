import { Geist, Geist_Mono } from "next/font/google";
import { ClientProvider } from "@/context/ClientContext";
import { Metadata } from "next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "עמוד הסושיאל",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="he">
      <ClientProvider>
        <body
          className={`antialiased`}
          //   style={{
          //     backgroundImage: `url('/overlay.svg')`,
          //     backgroundSize: "cover",
          //     backgroundBlendMode: "overlay",
          //     backgroundPosition: "center",
          //   }}
        >
          {children}
        </body>
      </ClientProvider>
    </html>
  );
}
