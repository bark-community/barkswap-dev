import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./navbar.module.css";

// Dynamically import the wallet button to avoid hydration issues
const WalletDynamic = dynamic(() => import("../swap/Wallet/Wallet"), {
  ssr: false,
});

const Navbar = () => {
  return (
    <nav className={`${styles.navbar} shadow-md p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a className="flex items-center text-2xl font-bold text-custom-orange">
            <Image src="/barkswap.svg" alt="BarkSwap Logo" width={120} height={80} className="mr-2" />
          </a>
        </Link>
        <div className="flex-1 flex justify-center">
          <ul className="flex items-center space-x-4 text-lg">
            <li>
              <Link href="/swap" passHref>
                <a className={styles.navLink}>Swap</a>
              </Link>
            </li>
            <li>
              <Link href="/limit-order" passHref>
                <a className={styles.navLink}>Limit Order</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <WalletDynamic />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
