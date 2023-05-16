import FlowController from "components/FlowController";
import { ReactFlowProvider } from "reactflow";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["container"]}>
      <ReactFlowProvider>
        <FlowController />
      </ReactFlowProvider>
    </div>
  );
};

export default HomePage;
