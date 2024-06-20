import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container mx-auto text-center p-4">
        <p className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} BARK Protocol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
