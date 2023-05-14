import React from "react";

import styles from "./TableHeader.module.scss";

interface ITableHeaderProps {
  headers: { key: string; label: string }[];
  sortOrder: { column: string; direction: "desc" | "asc" };
  setSortOrder: any;
  onSort: any;
}

export const TableHeader: React.FC<ITableHeaderProps> = ({
  headers,
  sortOrder,
  setSortOrder,
  onSort,
}) => {
  const handleSort = (column: string) => {
    if (sortOrder.column === column) {
      setSortOrder({
        ...sortOrder,
        direction: sortOrder.direction === "asc" ? "desc" : "asc",
      });
      console.log(column, sortOrder.direction === "asc" ? "desc" : "asc");
      onSort(column, sortOrder.direction === "asc" ? "desc" : "asc");
    } else {
      console.log(column, "asc");
      setSortOrder({ column, direction: "asc" });
      onSort(column, "asc");
    }
  };

  const classNameIcon = (key: string) =>
    sortOrder.column === key
      ? sortOrder.direction === "asc"
        ? styles.span_icon_active + " " + styles.span_icon_revenrs
        : styles.span_icon_active
      : styles.span_icon;

  return (
    <tr className={styles.headers}>
      {headers.map(({ key, label }) => (
        <td className={styles.headers__td} key={key}>
          <div className={styles.item}>
            {label}

            <span
              className={classNameIcon(key)}
              onClick={() => handleSort(key)}
            >
              ⯆
            </span>
          </div>
        </td>
      ))}
    </tr>
  );
};
