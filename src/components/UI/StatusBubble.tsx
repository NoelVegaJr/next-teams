import type { Status } from "@prisma/client";
import type { Size } from "@/types/types";

interface IStatusBubbleProps {
  status: Status;
  size: Size;
  position?: "absolute" | "static";
}

const StatusBubble: React.FunctionComponent<IStatusBubbleProps> = ({
  status,
  size,
  position = "absolute",
}) => {
  let fillingStyle;

  switch (status) {
    case "online":
      fillingStyle = "bg-green-700";
      break;
    case "offline":
      fillingStyle = "bg-red-700";
      break;
    case "away":
      fillingStyle = "bg-yellow-700";
      break;
    case "sleeping":
      fillingStyle = "bg-blue-700";
      break;
    default:
      fillingStyle = "bg-white";
      break;
  }

  let bubbleSize;

  switch (size) {
    case "xs":
      bubbleSize = "h-3 w-3 ";
      break;
    case "sm":
      bubbleSize = "h-3.5 w-3.5 ";
      break;
    case "md":
      bubbleSize = "h-4 w-4 ";
      break;
    case "lg":
      bubbleSize = "h-5 w-5";
      break;
    case "xl":
      bubbleSize = "h-6 w-6";
      break;
    default:
      bubbleSize = "h-3.5 w-3.5";
  }

  return (
    <div
      className={`${bubbleSize} ${position} bottom-1 right-0 rounded-full border border-slate-400  ${fillingStyle}`}
    />
  );
};

export default StatusBubble;
