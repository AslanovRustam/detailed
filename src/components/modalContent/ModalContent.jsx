import { badgeNamesForModal, nameClass } from "../../helpers/constants";
import PolygonDraw from "../polygonDraw/PolygonDraw";
import Close from "../../assets/close.svg";
import s from "./modalContent.module.css";

function ModalContent({ modalContent, closeModal, range }) {
  return (
    <div className={s.container}>
      <p className={s.name}>
        {modalContent?.altName}{" "}
        <Close className={s.icon} onClick={closeModal} />
      </p>
      <p className={s.details}>Details:</p>
      <ul className={s.list}>
        {modalContent?.className?.map((item) => {
          const itemClass = nameClass[item];
          return (
            <li
              key={item}
              className={`${s.item} ${itemClass ? s[itemClass] : ""}`}
            >
              {nameClass[item]}
            </li>
          );
        })}
      </ul>
      <div className={s.image}>
        <PolygonDraw
          fileData={modalContent}
          classNames={modalContent.className}
          polygonWidth={447}
          polygonHeight={447}
          badges={badgeNamesForModal}
          range={range}
        />
      </div>
    </div>
  );
}

export default ModalContent;
