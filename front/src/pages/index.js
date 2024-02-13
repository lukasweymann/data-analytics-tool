import styles from "@/styles/Home.module.css";
import DataAnalyticsReport from "../../components/DataAnalyticsReport";
import { DropdownList } from "react-widgets";
import { readdir } from "fs/promises";
import { useState } from "react";

import "react-widgets/styles.css";
import Navbar from "../../components/Navbar";

export default function Home({ fileNames, stats }) {
  let colors = [
    { id: 0, name: "orange" },
    { id: 1, name: "purple" },
    { id: 2, name: "red" },
    { id: 3, name: "blue" },
  ];

  const [selectedDataset, setSelectedDataset] = useState("");
  return (
    <div className={styles.viewerContainer}>
      <Navbar />
      <div className={styles.dropdownContainer}>
        <p>Select a file</p>
        <DropdownList
          data={fileNames}
          textField="name"
          placeholder="HPLT.en-es"
        />
      </div>
      {/* <div className={styles.viewerContainer}>
        {doc && <DataAnalyticsReport reportData={doc} />}
      </div> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const yaml = require("js-yaml");
  const fs = require("fs");
  const path = require("path");

  let doc = "";

  console.log(context, "HELOCHIS");

  // const doc = yaml.load(
  //   fs.readFileSync(path.join(process.cwd(), "../yaml_dir/EN-ES.yaml"))
  // );

  const directoryPath = path.join(process.cwd(), "../yaml_dir");
  const fileNames = [];
  let stats = "";
  try {
    const files = await readdir(directoryPath);
    files.forEach(function (file) {
      fileNames.push(file.substring(0, file.indexOf(".")));
    });
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
  return {
    props: { fileNames: fileNames, stats: stats },
  };
}
