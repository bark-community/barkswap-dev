import React from "react";
import Wallet from "../swap/Wallet/Wallet";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white dark:bg-dark-bg-secondary shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a className="flex items-center text-2xl font-bold text-custom-orange">
            <img src="/barkswap.svg" alt="BarkSwap Logo" className="h-10 mr-2" />
          </a>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/swap" passHref>
              <a className="text-lg font-semibold text-gray-800 dark:text-white">Swap</a>
            </Link>
          </li>
          <li>
            <Link href="/limit-order" passHref>
              <a className="text-lg font-semibold text-gray-800 dark:text-white">Limit Order</a>
            </Link>
          </li>
        </ul>
        <Wallet />
      </div>
    </nav>
  );
};

export default Navbar;
