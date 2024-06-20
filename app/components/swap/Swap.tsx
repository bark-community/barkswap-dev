"use client";
import styles from "./swap.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { VersionedTransaction, Connection } from "@solana/web3.js";
import React, { useState, useEffect, useCallback } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

const assets = [
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    decimals: 9,
  },
  {
    name: "BARK",
    mint: "6cQJMLNHE8SvLarrKmi38iKX31hzw7na77wnPCHRxR5z",
    decimals: 9,
  },
  // Add other assets here as needed
];

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
) => {
  let timeout: NodeJS.Timeout | undefined;

  return (...args: T) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function Swap() {
  const network = WalletAdapterNetwork.Devnet;

  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];
  const endpoint = clusterApiUrl(network);

  const [fromAsset, setFromAsset] = useState(assets[0]);
  const [toAsset, setToAsset] = useState(assets[1]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [quoteResponse, setQuoteResponse] = useState(null);

  const wallet = useWallet();

  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=43acd58f-d760-4b28-a418-762dc9aba97e"
  );

  const handleFromAssetChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFromAsset(
      assets.find((asset) => asset.name === event.target.value) || assets[0]
    );
  };

  const handleToAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToAsset(
      assets.find((asset) => asset.name === event.target.value) || assets[0]
    );
  };

  const handleFromValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromAmount(Number(event.target.value));
  };

  const debounceQuoteCall = useCallback(debounce(getQuote, 500), []);

  useEffect(() => {
    debounceQuoteCall(fromAmount);
  }, [fromAmount, debounceQuoteCall]);

  async function getQuote(currentAmount: number) {
    if (isNaN(currentAmount) || currentAmount <= 0) {
      console.error("Invalid fromAmount value:", currentAmount);
      return;
    }

    const quote = await (
      await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          fromAsset.mint
        }&outputMint=${toAsset.mint}&amount=${
          currentAmount * Math.pow(10, fromAsset.decimals)
        }&slippage=0.5`
      )
    ).json();

    if (quote && quote.outAmount) {
      const outAmountNumber =
        Number(quote.outAmount) / Math.pow(10, toAsset.decimals);
      setToAmount(outAmountNumber);
    }

    setQuoteResponse(quote);
  }

  async function signAndSendTransaction() {
    if (!wallet.connected || !wallet.signTransaction) {
      console.error(
        "Wallet is not connected or does not support signing transactions"
      );
      return;
    }

    const { swapTransaction } = await (
      await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true,
          fixedOutputMint: true,
          feeAccount: "BARK1X2VgwF1auwH6NzwLgXcAuMzrGnfsssAxaMczJLV"
        }),
      })
    ).json();

    try {
      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      console.error("Error signing or sending the transaction:", error);
    }
  }

  return (
    <div className={styles.body}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className={styles.innerContainer}>
              <div className={styles.inputContainer}>
                <div className={styles.labels}>You pay</div>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={handleFromValueChange}
                  className={styles.inputField}
                  placeholder="Amount to pay"
                />
                <select
                  value={fromAsset.name}
                  onChange={handleFromAssetChange}
                  className={styles.selectField}
                >
                  {assets.map((asset) => (
                    <option key={asset.mint} value={asset.name}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.labels}>You receive</div>
                <input
                  type="number"
                  value={toAmount}
                  className={styles.inputField}
                  readOnly
                  placeholder="Amount to receive"
                />
                <select
                  value={toAsset.name}
                  onChange={handleToAssetChange}
                  className={styles.selectField}
                >
                  {assets.map((asset) => (
                    <option key={asset.mint} value={asset.name}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={signAndSendTransaction}
                className={styles.button}
                disabled={toAsset.mint === fromAsset.mint}
              >
                Swap
              </button>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
