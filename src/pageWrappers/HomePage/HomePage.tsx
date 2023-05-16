import FlowController from "components/FlowController";
import Head from "next/head";
import { ReactFlowProvider } from "reactflow";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Chat flow</title>
      </Head>
      <ReactFlowProvider>
        <FlowController />
      </ReactFlowProvider>
    </div>
  );
};

export default HomePage;
