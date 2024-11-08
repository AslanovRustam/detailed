import { useState } from "react";
import Tabs from "../tabs/Tabs";
import ModalWrapper from "../modal/ModalWrapper";
import ModalContent from "../modalContent/ModalContent";
import PaginationComponent from "../pagination/Pagination";
import PolygonDraw from "../polygonDraw/PolygonDraw";
import s from "./content.module.css";

function Content({
  tabs,
  activeTab,
  selectActiveTab,
  data,
  badges,
  range,
  page,
  setPage,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const itemsPerPage = 30;

  const displayedData =
    activeTab === "All groups"
      ? [data.valid.files, data.train.files, data.test.files].flat()
      : data[activeTab.toLowerCase()].files || [];

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = displayedData.slice(startIndex, endIndex);

  const paginationCount = Math.ceil(displayedData.length / itemsPerPage);

  const isLastPage = page === paginationCount;

  const currentPageCount = isLastPage
    ? displayedData.length
    : startIndex + currentPageData.length;

  const toggleModal = (item, extractedText) => {
    setShowModal(!showModal);
    setModalContent({ ...item, altName: extractedText });
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Bone-fracture-detection </h1>
        <div className={s.countContainer}>
          <span className={s.boldText}>{currentPageCount}</span>
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
        {currentPageData?.map((item) => {
          if (!item) {
            return null;
          }
          const match = item?.thumbnailsUrl?.match(/\/([^/]+)\.rf/);
          let extractedText = match ? match[1] : "Unknown";
          extractedText = extractedText.replace(/_(png|jpg)$/, "");

          return (
            <li
              key={item?.imgUrl}
              className={s.item}
              onClick={() => toggleModal(item, extractedText)}
              alt={extractedText}
            >
              <PolygonDraw
                fileData={item}
                classNames={item.className}
                polygonWidth={100}
                polygonHeight={100}
                id={item?.thumbnailsUrl}
                badges={badges}
                range={range}
              />
              <p className={s.altText}>{extractedText}</p>
            </li>
          );
        })}
      </ul>
      {displayedData.length > currentPageData.length && (
        <div className={s.pagination}>
          <PaginationComponent
            paginationCount={paginationCount}
            setPage={setPage}
          />
        </div>
      )}

      {showModal && (
        <ModalWrapper onClose={toggleModal}>
          <ModalContent
            modalContent={modalContent}
            closeModal={() => setShowModal(false)}
            range={range}
          />
        </ModalWrapper>
      )}
    </section>
  );
}

export default Content;
