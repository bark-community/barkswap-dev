import React from "react";
import Wallet from "../swap/Wallet/Wallet";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-dark-bg shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a className="flex items-center text-2xl font-bold text-custom-orange">
            <Image src="/barkswap.svg" alt="BarkSwap Logo" width={48} height={48} className="mr-2" />
          </a>
        </Link>
        <ul className="flex items-center space-x-4 text-lg">
          <li>
            <Link href="/swap" passHref>
              <a className="nav-link">Swap</a>
            </Link>
          </li>
          <li>
            <Link href="/limit-order" passHref>
              <a className="nav-link">Limit Order</a>
            </Link>
          </li>
        </ul>
        <div className="flex items-center">
          <Wallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
