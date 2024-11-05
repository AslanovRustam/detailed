import s from "./modalContent.module.css";
import { nameClass } from "../../helpers/constants";
import Close from "../../assets/close.svg";

function ModalContent({ modalContent, closeModal }) {
  return (
    <div className={s.container}>
      <p className={s.name}>
        {modalContent?.altName}{" "}
        <Close className={s.icon} onClick={closeModal} />
      </p>
      <p className={s.details}>Details:</p>
      <ul className={s.list}>
        {modalContent?.className?.map((item) => {
          return (
            <li className={`${s.item} ${s.nameClass[item]}`}>
              {nameClass[item]}
            </li>
          );
        })}
      </ul>
      <img
        src={modalContent?.imgUrl}
        alt={modalContent?.altName}
        className={s.image}
      />
    </div>
  );
}

export default ModalContent;
