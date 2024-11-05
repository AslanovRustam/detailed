import { useEffect, useState } from "react";
import AsideComponent from "./components/aside/AsideComponent";
import Content from "./components/content/Content";
import { listAllFiles } from "./helpers/getDataFromFolder";
import { tabs } from "./helpers/constants";
import ModalWrapper from "./components/modal/ModalWrapper";
import Loader from "./components/loader/Loader";
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

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const promises = [
        listAllFiles("valid", 20, tokens.tokenValid),
        listAllFiles("train", 20, tokens.tokenTrain),
        listAllFiles("test", 20, tokens.tokenTest),
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
      if (data.nextContinuationToken) {
        setTokens((prevTokens) => [...prevTokens, data.nextContinuationToken]);
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

  console.log("allGroups", allGroups);
  console.log("nextToken", nextToken);
  console.log("activeTab", activeTab);
  return (
    <section className="section">
      <AsideComponent />
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
        />
      )}
    </section>
  );
}

export default App;
