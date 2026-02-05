"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import Box from "./Box";

interface MainProps {}

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

const Main: FC<MainProps> = () => {
  const [order, setOrder] = useState<number[][]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const saveNewOrder = (row: number, col: number) => {
    setOrder((prev) => [...prev, [row, col]]);
  };

  useEffect(() => {
    const flatOrder = order.flatMap(() => 1);
    const flatData = BOX_DATA.flatMap((box) => box.filter((b) => b === 1));
    if (flatOrder.length < flatData.length) return;

    intervalRef.current = setInterval(() => {
      console.log("🪳", "interval");
      setOrder((prev) => {
        if (prev.length <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            console.log("🪳", "STOPPED");
            intervalRef.current = null;
          }
          return [];
        }
        return prev.slice(0, -1);
      });
    }, 1000);
  }, [order]);

  return (
    <div className={styles.grid}>
      {BOX_DATA.map((row, rowIdx) => {
        return row.map((col, colIdx) => {
          const idx = `${rowIdx}-${colIdx}`;
          const isGreen =
            order.filter((box) => {
              return box[0] === rowIdx && box[1] === colIdx;
            }).length > 0;

          if (col === 1) {
            return (
              <Box
                key={idx}
                showBorder={true}
                row={rowIdx}
                col={colIdx}
                isGreen={isGreen}
                onClick={saveNewOrder}
              />
            );
          } else {
            return (
              <Box
                key={idx}
                showBorder={false}
                row={rowIdx}
                col={colIdx}
                isGreen={false}
                onClick={saveNewOrder}
              />
            );
          }
        });
      })}
    </div>
  );
};

export default Main;
