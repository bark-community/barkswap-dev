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
        <Wallet />
      </div>
    </nav>
  );
};

export default Navbar;
