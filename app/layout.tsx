import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BarkSwap",
  description: "Decentralized Exhange dApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <script src="https://terminal.jup.ag/main-v2.js" data-preload></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
