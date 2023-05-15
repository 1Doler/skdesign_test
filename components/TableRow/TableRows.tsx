import React from "react";

import styles from "./TableRows.module.scss";
import { IUser } from "../Interface";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getUser } from "../../redux/slice/users";

interface TableRowProps {
  user: IUser;
}

export const TableRows: React.FC<TableRowProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (user) {
    const { id, firstName, lastName, email, phone } = user;
    const handleClick = () => {
      try {
        dispatch(getUser(id));
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };

    return (
      <tr className={styles.rows} onClick={() => handleClick()}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    );
  } else {
    return <tr>NOT DATA</tr>;
  }
};
