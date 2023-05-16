import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import {
  Connection,
  getConnectedEdges,
  Handle,
  Node,
  Position,
  useReactFlow,
} from "reactflow";

import WhatsAppLogo from "../.../../../../public/images/whatsapp_logo.png";
import styles from "./MessageNode.module.scss";

const MessageNode = ({ data }: { data: { label: string } }) => {
  const { getNode, getEdges } = useReactFlow();

  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (connection.source) {
        const node = getNode(connection.source) as Node;
        const edges = getConnectedEdges(
          [node],
          getEdges()
        );
        return !edges.length;
      }
      return false;
    },
    [getNode, getEdges]
  );
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <span className={styles['header-title']}>
          <AiOutlineMessage size="20" /> <span>Send message</span>
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
