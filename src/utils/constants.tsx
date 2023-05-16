import MessageNode from "components/MessageNode";
import { AiOutlineMessage } from "react-icons/ai";
export const NODE_TYPES = [
  {
    type: "message",
    Component: MessageNode,
    label: "MessageNode",
    Icon: <AiOutlineMessage size="30" />,
  },
];
