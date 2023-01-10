import type { MessageAndParticipant } from "@/types/types";
import type { FunctionComponent } from "react";
import { useState } from "react";
import FollowMessage from "./FollowMessage";
import MessageOptions from "./MessageOptions";
import ResponseMessage from "./ResponseMessage";
interface IMessageProps {
  newParticpant: boolean;
  message: MessageAndParticipant;
}

const Message: FunctionComponent<IMessageProps> = ({
  newParticpant,
  message,
}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={`$ relative flex w-full gap-4 py-1.5 hover:bg-neutral-200/50`}
    >
      {newParticpant ? (
        <FollowMessage
          isHovered={isHovered}
          message={message}
          timeStyles="text-xs "
        />
      ) : (
        <ResponseMessage message={message} timeStyles="text-xs " />
      )}
      {isHovered && <MessageOptions />}
    </div>
  );
};

export default Message;
