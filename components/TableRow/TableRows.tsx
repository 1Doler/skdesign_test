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
  return (
    <tr className={styles.rows} onClick={() => dispatch(getUser(user.id))}>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  );
};
