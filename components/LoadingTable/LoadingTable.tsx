import React from "react";
import styles from "./LoadingTable.module.scss";
export const LoadingTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.header} />
        <div className={styles.row}></div>
        <div className={styles.row}></div>
        <div className={styles.row}></div>
        <div className={styles.row}></div>
        <div className={styles.row}></div>
      </div>
    </div>
  );
};
