import { Message, Profile, ConversationParticipant } from "@prisma/client";
import type { FunctionComponent } from "react";
import { useState } from "react";
import FollowMessage from "./FollowMessage";
import MessageOptions from "./MessageOptions";
import ResponseMessage from "./ResponseMessage";

interface IConversationParticipant extends ConversationParticipant {
  profile: Profile;
}

interface IMessage extends Message {
  participant: IConversationParticipant;
}

interface IMessageProps {
  newParticpant: boolean;
  message: IMessage;
}

const ChatMessage: FunctionComponent<IMessageProps> = ({
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
      className={`$ relative flex w-full gap-4 py-0.5 hover:bg-neutral-200/50`}
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

export default ChatMessage;
