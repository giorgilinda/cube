import React from "react";
import styles from "./not-found.module.css";

/**
 * Custom 404 page shown when a route does not match. Provides a link back to home.
 */
export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>Page not found</p>
      <a href="/" className={styles.link}>
        Go back home
      </a>
    </div>
  );
}
