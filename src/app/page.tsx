import React from "react";
import styles from "./page.module.css";
import Main from "@/components/Main";

/**
 * Home page.
 */
export default function Home() {
  return (
    <div className={styles.container}>
      <Main />
    </div>
  );
}
