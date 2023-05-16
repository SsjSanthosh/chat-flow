import { useState } from "react";
import { NODE_TYPES } from "utils/constants";

import styles from "./SettingsPanel.module.scss";

const SettingsPanel = ({ isNodeSelected }: { isNodeSelected: boolean }) => {
  const onDragStart = (event:React.DragEvent<HTMLDivElement>, nodeType:string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["nodes-container"]}>
        {NODE_TYPES.map((node) => {
          return (
            <div
              className={styles["node"]}
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
            >
              {node.Icon}
              {node.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsPanel;
