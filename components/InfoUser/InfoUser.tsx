import { IUser } from "../Interface";
import styles from "./InfoUser.module.scss";

export const InfoUser = ({ user }) => {
  const { firstName, lastName, description, address } = user;
  return (
    <div className={styles.info_module}>
      <div className={styles.user_name}>
        Выбран пользователь{" "}
        <b>
          {firstName} {lastName}
        </b>
      </div>
      <div className={styles.description}>
        Описание:
        <textarea value={description} readOnly />
      </div>
      {address && (
        <div className={styles.address}>
          <div className={styles.addres__streetAddress}>
            Адрес проживания: <b>{address.streetAddress}</b>
          </div>
          <div className={styles.addres__city}>
            Город: <b>{address.city}</b>
          </div>
          <div className={styles.address__state}>
            Провинция/штат: <b>{address.state}</b>
          </div>
          <div className={styles.address__zip}>
            Индекс: <b>{address.zip}</b>
          </div>
        </div>
      )}
    </div>
  );
};
