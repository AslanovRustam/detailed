import { useEffect, useState } from "react";
// import S3Viewer from "./components/S3Viewer/S3Viewer";
import { listAllFiles } from "./helpers/getDataFromFolder";
import AsideComponent from "./components/aside/AsideComponent";
import "./index.css";

function App() {
  useEffect(() => {
    listAllFiles();
  }, []);

  return (
    <section className="section">
      <AsideComponent />
    </section>
  );
}

export default App;
