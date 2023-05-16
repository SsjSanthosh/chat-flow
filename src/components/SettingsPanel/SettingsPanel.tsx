import MessageNodeEditor from "components/MessageNodeEditor";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Node, useReactFlow } from "reactflow";
import { NODE_TYPES } from "utils/constants";

import styles from "./SettingsPanel.module.scss";

const SettingsPanel = ({
  selectedNode,
  resetNode,
}: {
  selectedNode: null | Node;
  resetNode: () => void;
}) => {
  const { setNodes } = useReactFlow();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // if there's no selected node, show the default nodes for drag and drop
  if (!selectedNode) {
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
  }

  const type = selectedNode?.type;

  const NodeEditor = () => {
    if (type === "message")
      return <MessageNodeEditor node={selectedNode} callback={resetNode} />;
    return null;
  };

  return (
    <div className={styles["node-editor-container"]}>
      <div className={styles["node-editor-header"]}>
        <h5>Edit node</h5>
        <span>
          <AiOutlineClose
            size="20"
            className={styles["node-editor-close-icon"]}
            onClick={resetNode}
          />
        </span>
      </div>
      <div className={styles["node-editor-component"]}>
        <NodeEditor />
      </div>
    </div>
  );
};

export default SettingsPanel;
