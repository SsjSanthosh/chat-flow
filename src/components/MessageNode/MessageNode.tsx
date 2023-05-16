import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import {
  Connection,
  getConnectedEdges,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";

import WhatsAppLogo from "../.../../../../public/images/whatsapp_logo.png";
import styles from "./MessageNode.module.scss";

const MessageNode = ({ data }) => {
  const { getNode, getEdges } = useReactFlow();
  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (connection.source) {
        const edges = getConnectedEdges(
          [getNode(connection.source)],
          getEdges()
        );
        return !edges.length;
      } return false;
    },
    [getNode, getEdges]
  );
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <span>
          <AiOutlineMessage size="20" /> Send message
        </span>
        <div className={styles["header-logo"]}>
          <Image src={WhatsAppLogo} alt="whatsapp_logo" fill />
        </div>
      </div>
      <Handle type="target" position={Position.Left} />
      <div className={styles["content"]}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        isValidConnection={isValidConnection}
      />
    </div>
  );
};

export default MessageNode;
