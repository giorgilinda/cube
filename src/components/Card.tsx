import React from "react";
import styles from "./Card.module.css";

/**
 * Props for the Card component.
 */
interface CardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Optional title displayed at the top of the card */
  title?: string;
  /** Additional CSS class names to apply */
  className?: string;
}

/**
 * Card container component for grouping related content.
 *
 * @example
 * ```tsx
 * <Card title="User Profile">
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({ children, title, className }) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </div>
  );
};
