import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import s from "./modalWrapper.module.css";

function ModalWrapper({ children, onClose }) {
  const [isReady, setIsReady] = useState(false);
  const modalRootRef = useRef(null);

  useEffect(() => {
    const newModalRoot = document.createElement("div");
    newModalRoot.id = "modal";
    document.body.appendChild(newModalRoot);
    modalRootRef.current = newModalRoot;
    document.body.classList.add(s.overvlow);
    setIsReady(true);
    return () => {
      document.body.classList.remove(s.overvlow);
      if (modalRootRef.current) {
        document.body.removeChild(modalRootRef.current);
      }
    };
  }, []);

  if (!isReady || !modalRootRef.current) {
    return null;
  }

  return createPortal(
    <div className={s.modalBackDrop}>{children}</div>,
    modalRootRef.current
  );
}

export default ModalWrapper;
////TODO повісити дів на реф без створення document.createElement("div");
