"use client";

import React, { FC } from "react";
import styles from "./Box.module.css";
import classNames from "classnames";

interface BoxProps {
  showBorder: boolean;
  row: number;
  col: number;
  isGreen: boolean;
  onClick: (row: number, col: number) => void;
}

const Box: FC<BoxProps> = ({ showBorder, row, col, isGreen, onClick }) => {
  const handleClick = () => {
    if (!showBorder) return;
    onClick(row, col);
  };

  return (
    <div
      className={classNames(
        styles.box,
        showBorder ? styles.border : "",
        isGreen ? styles.green : ""
      )}
      style={{ gridRow: row + 1, gridColumn: col + 1 }}
      onClick={handleClick}
    ></div>
  );
};

export default Box;
