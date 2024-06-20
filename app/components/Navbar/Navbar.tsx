import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-3 bg-white shadow-md dark:bg-dark-bg">
      <Link href="/" passHref>
        <a className="flex items-center text-lg font-bold text-dark-grey dark:text-light-grey">
          <img src="/barkswap.svg" alt="BarkSwap Logo" className="h-12 mr-2" />
        </a>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" passHref>
            <a className="text-sm font-semibold text-dark-grey dark:text-light-grey">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/swap" passHref>
            <a className="text-sm font-semibold text-dark-grey dark:text-light-grey">Swap</a>
          </Link>
        </li>
      </ul>
      <WalletMultiButton className="font-bold bg-dark-grey text-white dark:bg-light-grey dark:text-dark-bg" />
    </nav>
  );
}

export default NavBar;
