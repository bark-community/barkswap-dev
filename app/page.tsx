"use client";
import Image from "next/image";
import Swap from "./components/swap/Swap";
import NavBar from "./components/Navbar/Navbar";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import React from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  const network = WalletAdapterNetwork.Devnet;

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];
  const endpoint = clusterApiUrl(network);

  return (
    <main className="bg-white dark:bg-dark-bg-secondary">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen py-8">
              <Image
                src="/powered-by-jupiter.svg"
                alt="Jupiter Aggregator Logo"
                width={40}
                height={40}
                className="mb-8"
              />
              <Swap />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </main>
  );
}
