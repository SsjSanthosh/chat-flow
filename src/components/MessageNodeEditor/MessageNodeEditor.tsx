import { useState } from "react";
import { Button } from "react-bootstrap";
import { Node, useReactFlow } from "reactflow";

import styles from "./MessageNodeEditor.module.scss";

const MessageNodeEditor = ({
  node,
  callback
}: {
  node: Node;
  callback: () => void;
}) => {
  const [input, setInput] = useState(node.data.label);
  const { setNodes } = useReactFlow();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNodes((nodes) => {
      return nodes.map((n) => {
        if (n.id === node.id) {
          return { ...n, data: { ...n.data, label: input } };
        }
        return n;
      });
    });
    callback();
  };
  return (
    <form className={styles["container"]} onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="message">Enter your message</label>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <Button type="submit">Done</Button>
    </form>
  );
};

export default MessageNodeEditor;
