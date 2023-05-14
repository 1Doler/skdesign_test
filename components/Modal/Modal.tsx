import { useState } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={
          isOpen
            ? styles.modal_overlay + " " + styles.modal_overlay_show
            : styles.modal_overlay
        }
        onClick={handleOverlayClick}
      >
        <div className={styles.modal_content}>
          <button className={styles.modal_close} onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
