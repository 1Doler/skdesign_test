import { useMemo } from "react";

import styles from "./Select.module.scss";

interface ISelectFilter {
  text: string;
  order: string;
  isFiltered: number;
}

interface ISelectProps {
  headers: { key: string; label: string }[];
  setFilter: any;
}

export const Select: React.FC<ISelectProps> = ({ headers, setFilter }) => {
  const onChange = (value: string) => {
    setFilter((prev: ISelectFilter) => {
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
