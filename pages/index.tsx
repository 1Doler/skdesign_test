import React, { useCallback, useState } from "react";

import { Table, Pagination } from "../components/index";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slice/users";
import { AppDispatch, RootState } from "../redux/store";
import { InfoUser } from "../components/InfoUser/InfoUser";

import styles from "../styles/index.module.scss";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesToShow, setPagesToShow] = useState(5);
  const [typeData, setTypeData] = useState(null);
  const { lengthItems, status, items, item } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch<AppDispatch>();
  const onClick = useCallback(
    (type: string) => {
      setTypeData(type);
      setCurrentPage(1);
      setPagesToShow(5);

      dispatch(fetchUsers({ type }));
    },
    [dispatch]
  );
  return (
    <div>
      <div className={styles.btn}>
        <button
          className={typeData === "small" ? styles.btn_activ : null}
          disabled={status === "loading"}
          onClick={() => onClick("small")}
        >
          Small data
        </button>
        <button
          className={typeData === "big" ? styles.btn_activ : null}
          disabled={status === "loading"}
          onClick={() => onClick("big")}
        >
          Big data
        </button>
      </div>
      <Table
        items={items}
        status={status}
        startPage={Number(currentPage) * pagesToShow - pagesToShow}
        pagesToShow={pagesToShow}
        setCurrentPage={setCurrentPage}
      />
      {status !== "loading" && (
        <Pagination
          currentPage={currentPage}
          pagesToShow={pagesToShow}
          lengthItems={lengthItems}
          setPagesToShow={setPagesToShow}
          onPageChange={(value: number) => setCurrentPage(value)}
        />
      )}
      {Object.keys(item).length ? <InfoUser user={item} /> : null}
    </div>
  );
};

export default Home;
