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

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const validFiles = await listAllFiles("valid");
      const trainFiles = await listAllFiles("train");
      const testFiles = await listAllFiles("test");
      ////TODO promiseall
      setAllGroups({
        valid: validFiles,
        train: trainFiles,
        test: testFiles,
      });
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

  console.log(allGroups);
  return (
    <section className="section">
      <AsideComponent />
      <Content
        tabs={tabs}
        activeTab={activeTab}
        selectActiveTab={selectActiveTab}
        data={allGroups}
      />
      {loading && (
        <ModalWrapper>
          <Loader />
        </ModalWrapper>
      )}
    </section>
  );
}

export default App;
