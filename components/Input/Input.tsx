import styles from "./Input.module.scss";

export const Input = ({ setFilter, value }) => {
  const onChange = (value: string) => {
    setFilter((prev) => {
      const updatedFilter = { ...prev, text: value };
      return updatedFilter;
    });
  };

  return (
    <div className={styles.input}>
      <input
        className={styles.input__text}
        value={value.text}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        id="filter_text"
        name="filter_text"
      />
    </div>
  );
};
