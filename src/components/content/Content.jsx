import { useState } from "react";
import Tabs from "../tabs/Tabs";
import ModalWrapper from "../modal/ModalWrapper";
import ModalContent from "../modalContent/ModalContent";
import s from "./content.module.css";

function Content({ tabs, activeTab, selectActiveTab, data }) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const displayedData =
    activeTab === "All groups"
      ? [...data.valid, ...data.train, ...data.test]
      : data[activeTab.toLowerCase()] || [];

  const toggleModal = (item, extractedText) => {
    setShowModal(!showModal);
    setModalContent({ ...item, altName: extractedText });
  };
  console.log(modalContent);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Bone-fracture-detection </h1>
        <div className={s.countContainer}>
          <span className={s.boldText}></span>
          <span className={s.thinText}>of</span>
          <span className={s.boldText}>{displayedData.length}</span>
          <span className={s.thinText}>images</span>
        </div>
      </div>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        selectActiveTab={selectActiveTab}
      />
      <ul className={s.list}>
        {displayedData?.map((item) => {
          const match = item.thumbnailsUrl.match(/\/([^/]+)\.rf/);
          let extractedText = match ? match[1] : "Unknown";
          extractedText = extractedText.replace(/_(png|jpg)$/, "");
          return (
            <li
              className={s.item}
              key={item.imgUrl}
              onClick={() => toggleModal(item, extractedText)}
              alt={extractedText}
            >
              <img src={item?.thumbnailsUrl} className={s.thumbnails} />
              <p className={s.altText}>{extractedText}</p>
            </li>
          );
        })}
      </ul>
      {showModal && (
        <ModalWrapper onClose={toggleModal}>
          <ModalContent
            modalContent={modalContent}
            closeModal={() => setShowModal(false)}
          />
        </ModalWrapper>
      )}
    </section>
  );
}

export default Content;
