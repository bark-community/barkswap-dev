import React from "react";
import Link from "next/link";
import styles from "./menu.module.css";

const Menu = () => {
  return (
    <ul className="flex items-center space-x-4 text-lg">
      <li>
        <Link href="/swap" passHref>
          <a className={styles.menuLink}>Swap</a>
        </Link>
      </li>
      <li>
        <Link href="/limit-order" passHref>
          <a className={styles.menuLink}>Limit Order</a>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
