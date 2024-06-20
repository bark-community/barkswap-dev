import React from "react";
import Link from "next/link";
import styles from "./menu.module.css";

const Menu = () => {
  return (
    <ul className="flex items-center space-x-4 text-lg">
      <li>
        <Link href="/swap" passHref className={styles.menuLink}>
          Swap
        </Link>
      </li>
      <li>
        <Link href="/limit-order" passHref className={styles.menuLink}>
          Limit Order
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
