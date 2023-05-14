import { useMemo } from "react";

import styles from "./Select.module.scss";

export const Select = ({ headers, setFilter }) => {
  const onChange = (value: string) => {
    setFilter((prev) => {
      const updatedFilter = { ...prev, order: value };
      return updatedFilter;
    });
  };

  const memoizedHeaders = useMemo(() => headers, [headers]);

  return (
    <select
      className={styles.select_headers}
      onChange={(event) => onChange(event.target.value)}
    >
      {memoizedHeaders.map(({ key, label }) => (
        <option value={key} key={key}>
          {label}
        </option>
      ))}
    </select>
  );
};
