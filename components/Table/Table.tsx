import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { updateLength } from "../../redux/slice/users";

import { TableHeader, TableRows } from "../index";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

import { IUser } from "../Interface";

import { AiOutlineSearch } from "react-icons/ai";

import { AddUser } from "../AddUser/AddUser";
import { Modal } from "../Modal/Modal";
import { LoadingTable } from "../LoadingTable/LoadingTable";
import styles from "./Table.module.scss";

export const Table = ({
  currentPage,
  pagesToShow,
  status,
  setFilterUsers,
  setCurrentPage,
  items,
  startPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [sortOrder, setSortOrder] = useState({ column: null, direction: null });
  const [showItems, setShowItems] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [filter, setFilter] = useState({
    text: "",
    order: "id",
    isFiltered: -1,
  });

  useEffect(() => {
    console.log("render uses");
    setFilter({ text: "", order: "id", isFiltered: -1 });
    setShowItems(items);
    setSortOrder({ column: "", direction: "" });
  }, [items]);

  const onSort = (column: string, dir: string) => {
    const sortItems = showItems
      .map((item) => ({ ...item }))
      .sort((a, b) =>
        column ? (a[column] > b[column] ? 1 : -1) * (dir === "asc" ? 1 : -1) : 0
      );
    setShowItems(sortItems);
  };
  const onFilter = () => {
    const normalizedFilterText = filter.text.toLowerCase();
    const filteredItems = items.filter((item: IUser) => {
      return String(item[filter.order])
        .toLowerCase()
        .includes(normalizedFilterText);
    });
    dispatch(updateLength(filteredItems.length));
    setShowItems(filteredItems);
  };

  const headers = [
    { key: "id", label: "ID" },
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <div>
      <form
        className={styles.filter_form}
        onSubmit={(event) => {
          event.preventDefault();
          setSortOrder({ column: "", direction: "" });
          setCurrentPage(1);
          onFilter();
        }}
      >
        <Select headers={headers} setFilter={setFilter} />
        <Input value={filter} setFilter={setFilter} />
        <button type="submit" name="filter" className={styles.btn}>
           
          <AiOutlineSearch className={styles.icon} color="white" size={20} />
        </button>
      </form>

      <button onClick={() => setIsShowModal(true)} className={styles.modal_btn}>
        Add user
      </button>

      <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <AddUser onClose={() => setIsShowModal(false)} />
      </Modal>
      {status === "loading" ? (
        <LoadingTable />
      ) : (
        <table className={styles.table}>
          <thead>
            <TableHeader
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              headers={headers}
              onSort={onSort}
            />
          </thead>
          <tbody>
            {showItems.length === 0 ? (
              <tr className={styles.not_data}>
                <td colSpan={5}> NOT DATA</td>
              </tr>
            ) : (
              showItems
                .slice(startPage, startPage + pagesToShow)
                .map((user) => <TableRows user={user} key={user.id} />)
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};
