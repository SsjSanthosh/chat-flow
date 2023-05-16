import { Button, useToast } from "@chakra-ui/react";
import MessageNode from "components/MessageNode";
import SettingsPanel from "components/SettingsPanel";
import { nanoid } from "nanoid";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  getConnectedEdges,
  MiniMap,
  Node,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import styles from "./FlowController.module.scss";

// Types of nodes, only message for now
const nodeTypes = {
  message: MessageNode,
};

const errorId = "invalid-flow";
const successId = "valid-flow";

const FlowController = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // used to pass the selected node to the editor component
  // reset on clicking close on the editor
  const [selectedNode, setSelectedNode] = useState<null | Node>(null);

  // ref to get the position of the existing nodes and position the new ones
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [flowInstance, setFlowInstance] = useState<null | ReactFlowInstance>(
    null
  );

  const toast = useToast();

  // adding an edge between 2 nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // handle animations for the drag and drop
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // event.dataTransfer.dropEffect = "move";
  }, []);

  // get the type of the node from DnD and add the node in a good position
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
          id: nanoid(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [flowInstance, setNodes]
  );

  const validateFlow = () => {
    const targets = new Set();
    // get all the unique source nodes
    edges.forEach((ed) => {
      targets.add(ed.source);
    });
    if (targets.size < nodes.length - 1) {
      if (!toast.isActive(errorId)) {
        toast({
          description:
            "Invalid flow, please connect all the nodes and try again",
          id: errorId,
          status: "error",
          position: "top",
        });
      }
    } else {
      if (!toast.isActive(successId)) {
        toast({
          description: "Valid flow!",
          id: successId,
          status: "success",
          position: "top",
        });
      }
    }
  };

  return (
    <div className={styles["container"]}>
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
          onNodeClick={(_, node) => {
            if (node.id !== selectedNode?.id) {
              setSelectedNode(node);
            }
          }}
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className={styles["panel-container"]}>
        <div className={styles["save-btn-container"]}>
          {" "}
          <Button
            colorScheme="facebook"
            className={styles["save-btn"]}
            onClick={validateFlow}
          >
            Save & Validate flow
          </Button>
        </div>
        <SettingsPanel
          selectedNode={selectedNode}
          resetNode={() => setSelectedNode(null)}
        />
      </div>
    </div>
  );
};

export default FlowController;
