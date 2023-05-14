import React, { useEffect } from "react";

import styles from "./Pagination.module.scss";

export const Pagination = ({
  currentPage,
  lengthItems,
  pagesToShow,
  onPageChange,
  setPagesToShow,
}) => {
  const totalPages = Math.ceil(lengthItems / pagesToShow);
  const startPage = Math.max(currentPage - Math.floor(5 / 2), 1);
  const endPage = Math.min(startPage + 5, totalPages);
  const total = Array.from(
    { length: Math.min(Math.floor(lengthItems / 5), 10) },
    (_, i) => (i + 1) * 5
  );
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleChangeSelect = (event) => {
    onPageChange(1);
    setPagesToShow(Number(event.target.value));
  };

  if (pages.length <= 1) {
    return null;
  }
  return (
    <div className={styles.pagination_container}>
      <ul className={styles.pagination}>
        <li
          className={
            currentPage === 1
              ? styles.page_item + " " + styles.disabled
              : styles.page_item
          }
        >
          <button
            className={styles.page_link}
            onClick={() => onPageChange(currentPage - 1)}
          >
            «
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={
              currentPage === page
                ? styles.page_item + " " + styles.active
                : styles.page_item
            }
          >
            <button
              className={styles.page_link}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage === totalPages
              ? styles.page_item + " " + styles.disabled
              : styles.page_item
          }
        >
          <button
            className={styles.page_link}
            onClick={() => onPageChange(currentPage + 1)}
          >
            »
          </button>
        </li>
        {total.length == 1 || (
          <select
            className={styles.page_total}
            onChange={(event) => handleChangeSelect(event)}
          >
            {total.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        )}
      </ul>
    </div>
  );
};
