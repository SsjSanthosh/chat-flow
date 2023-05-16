import CustomNode from "components/CustomNode";
import MessageNode from "components/MessageNode";
import SettingsPanel from "components/SettingsPanel";
import { nanoid } from "nanoid";
import { useCallback, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import styles from "./FlowController.module.scss";

// initial nodes
const initialNodes: Node[] = [
  {
    id: nanoid(),
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
  },
  {
    id: nanoid(),
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

// Types of nodes, only message for now
const nodeTypes = {
  message: MessageNode,
};

const FlowController = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isNodeSelected, setIsNodeSelected] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [flowInstance, setFlowInstance] = useState<null | ReactFlowInstance>(
    null
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // create a new node, and add it to the list of existing nodes.
  const addNode = useCallback(() => {
    const node: Node = {
      id: nanoid(),
      position: { x: 0, y: nodes.length * 20 },
      data: { label: `Node #${nodes.length + 1}` },
      type: "message",
    };
    setNodes((old) => old.concat(node));
  }, [nodes, setNodes]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (flowInstance && reactFlowWrapper.current) {
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = flowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode = {
          id:nanoid(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [flowInstance, setNodes]
  );

  return (
    <div className={styles["container"]}>
      <div className={styles["flow-wrapper"]}>
        <ReactFlowProvider>
          <div ref={reactFlowWrapper} className={styles["flow-container"]}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setFlowInstance}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <Controls />
              <MiniMap />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      <div className={styles["panel-container"]}>
        <h1>Panel</h1>
        <SettingsPanel isNodeSelected={false} />
      </div>
    </div>
  );
};

export default FlowController;
