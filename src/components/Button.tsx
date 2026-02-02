import React from "react";
import styles from "./Button.module.css";

/**
 * Props for the Button component.
 */
interface ButtonProps {
  /** Content to render inside the button */
  children: React.ReactNode;
  /** Click handler function */
  onClick?: () => void;
  /** Visual style variant of the button */
  variant?: "primary" | "secondary" | "outline";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
}

/**
 * Accessible button component with multiple visual variants.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit}>
 *   Submit
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
