import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Node, useReactFlow } from "reactflow";

import styles from "./MessageNodeEditor.module.scss";

const MessageNodeEditor = ({
  node,
  callback,
}: {
  node: Node;
  callback: () => void;
}) => {
  const [input, setInput] = useState(node.data.label);
  const { setNodes } = useReactFlow();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // find the node with id, modify it and add back in the new array
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
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles["textarea"]}
        style={{ border: "1px solid rgba(0,0,0,0.4)" }}
      />
      <Button type="submit" colorScheme="facebook">
        Done
      </Button>
    </form>
  );
};

export default MessageNodeEditor;
