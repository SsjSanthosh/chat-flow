import FlowController from "components/FlowController";

import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles["container"]}>
      <FlowController />
    </div>
  );
};

export default HomePage;
