import React, { useEffect } from "react";

import styles from "./Pagination.module.scss";

interface Props {
  currentPage: number;
  lengthItems: number;
  pagesToShow: number;
  onPageChange: (page: number) => void;
  setPagesToShow: (itemsPerPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  lengthItems,
  pagesToShow,
  onPageChange,
  setPagesToShow,
}) => {
  const ITEMS_PER_PAGE = 5;

  const totalPages = Math.ceil(lengthItems / pagesToShow);

  const getStartPage = (currentPage: number) => {
    return Math.max(currentPage - Math.floor(ITEMS_PER_PAGE / 2), 1);
  };
  const getEndPage = (currentPage: number) => {
    return Math.min(getStartPage(currentPage) + ITEMS_PER_PAGE, totalPages);
  };
  const total = Array.from(
    { length: Math.min(Math.floor(lengthItems / ITEMS_PER_PAGE), 10) },
    (_, i) => (i + 1) * ITEMS_PER_PAGE
  );
  const pages = Array.from(
    { length: getEndPage(currentPage) - getStartPage(currentPage) + 1 },
    (_, i) => getStartPage(currentPage) + i
  );

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            disabled={currentPage === 1}
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
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </li>
        {total.length === 1 || (
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
