import { useEffect, useState } from "react";
import AsideComponent from "./components/aside/AsideComponent";
import Content from "./components/content/Content";
import ModalWrapper from "./components/modal/ModalWrapper";
import Loader from "./components/loader/Loader";
import { badgeNames, LIMIT_PER_PAGE, tabs } from "./helpers/constants";
import { listAllFiles } from "./helpers/getDataFromFolder";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("All groups");
  const [allGroups, setAllGroups] = useState({
    valid: [],
    train: [],
    test: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextToken, setNextToken] = useState({
    tokenValid: null,
    tokenTrain: null,
    tokenTest: null,
  });
  const [page, setPage] = useState(1);
  const [tokens, setTokens] = useState({
    tokenValid: null,
    tokenTrain: null,
    tokenTest: null,
  });
  const [range, setRange] = useState([0, 4]);
  const [badges, setBadges] = useState(badgeNames);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const promises = [
        listAllFiles("valid", LIMIT_PER_PAGE, tokens.tokenValid),
        listAllFiles("train", LIMIT_PER_PAGE, tokens.tokenTrain),
        listAllFiles("test", LIMIT_PER_PAGE, tokens.tokenTest),
      ];
      const [validFiles, trainFiles, testFiles] = await Promise.all(promises);
      setAllGroups({
        valid: validFiles,
        train: trainFiles,
        test: testFiles,
      });
      setNextToken({
        tokenValid: validFiles.nextContinuationToken || null,
        tokenTrain: trainFiles.nextContinuationToken || null,
        tokenTest: testFiles.nextContinuationToken || null,
      });
      if (validFiles?.nextContinuationToken) {
        setTokens((prevTokens) => ({
          ...prevTokens,
          validFiles: validFiles.nextContinuationToken,
        }));
      }
    } catch (error) {
      console.log("Something went wrong", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const selectActiveTab = (name) => {
    setActiveTab(name);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <section className="section">
      <AsideComponent
        range={range}
        setRange={setRange}
        badges={badges}
        setBadges={setBadges}
      />
      {loading ? (
        <ModalWrapper>
          <Loader />
        </ModalWrapper>
      ) : (
        <Content
          tabs={tabs}
          activeTab={activeTab}
          selectActiveTab={selectActiveTab}
          data={allGroups}
          badges={badges}
          range={range}
          page={page}
          setPage={setPage}
        />
      )}
    </section>
  );
}

export default App;
