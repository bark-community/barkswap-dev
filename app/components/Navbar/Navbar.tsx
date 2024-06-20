import React from "react";
import Wallet from "../swap/Wallet/Wallet";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white dark:bg-dark-bg shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a className="flex items-center text-2xl font-bold text-custom-orange">
            <img src="/barkswap.svg" alt="BarkSwap Logo" className="h-12 mr-2" />
          </a>
        </Link>
        <ul className="flex items-center space-x-4 text-lg">
          <li>
            <Link href="/swap" passHref>
              <a className="font-semibold text-gray-800 dark:text-white hover:text-custom-orange transition">Swap</a>
            </Link>
          </li>
          <li>
            <Link href="/limit-order" passHref>
              <a className="font-semibold text-gray-800 dark:text-white hover:text-custom-orange transition">Limit Order</a>
            </Link>
          </li>
        </ul>
        <Wallet />
      </div>
    </nav>
  );
};

export default Navbar;
