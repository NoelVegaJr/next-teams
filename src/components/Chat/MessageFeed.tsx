import { trpc } from "@/utils/trpc";
import { useEffect, useRef, useState } from "react";
import client from "pusher-js";
import styles from "@/styles/chatfeed.module.css";
import ResponseMessage from "./ResponseMessage";
import FollowMessage from "./FollowMessage";
import type {
  Conversation,
  ConversationParticipant,
  Message,
  Profile,
} from "@prisma/client";

interface IConversationParticipant extends ConversationParticipant {
  profile: Profile;
}

interface IMessage extends Message {
  participant: IConversationParticipant;
}

interface IConversation extends Conversation {
  participants: IConversationParticipant[];
  messages: IMessage[];
}

interface IMessageFeedProps {
  conversation: IConversation;
  profileId: string;
}

const MessageFeed: React.FunctionComponent<IMessageFeedProps> = ({
  profileId,
  conversation,
}) => {
  const [messages, setMessages] = useState<IMessage[]>(
    conversation?.messages ?? []
  );
  const newMessageRef = useRef<HTMLInputElement>(null);
  const sendMessage = trpc.chat.push.useMutation();
  const messagesQuery = trpc.chat.getMessagesConversationById.useQuery({
    id: conversation?.id,
  });
  const [hoveredMsg, setHoveredMsg] = useState<{
    id: string;
    index: number;
  } | null>(null);

  const participantId = conversation?.participants.find(
    (participant) => participant.profileId === profileId
  )?.id as string;

  const messageHoverHandler = (ctx: { id: string; index: number } | null) => {
    setHoveredMsg(ctx);
  };

  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  useEffect(() => {
    const pusherClient = new client("99e512a0e34c2dc7612d", {
      cluster: "us2",
      channelAuthorization: {
        transport: "ajax",
        endpoint: "http://localhost:3000/api/pusher/auth",
        params: {
          user_id: profileId,
        },
      },
    });
    const channel = pusherClient.subscribe(conversation?.id);

    channel.bind("message", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe(conversation.id);
    };
  }, [messages, profileId]);

  const sendMessageHandler = () => {
    if (!newMessageRef.current?.value) return;
    console.log(newMessageRef.current.value);
    sendMessage.mutate({
      conversationId: conversation.id,
      participantId,
      text: newMessageRef.current.value,
    });
    newMessageRef.current.value = "";
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 ">
      <div
        className={`chatfeed grow items-end overflow-y-scroll ${styles.chatfeed}`}
      >
        <div className="  w-full cursor-pointer ">
          {messages.map((message, index: number) => {
            return (
              <div key={message.id} className={`flex gap-4 `}>
                <div className="w-full">
                  {messages[index - 1]?.participant.id !==
                  message.participant.id ? (
                    <ResponseMessage
                      // index={index}
                      // isHovered={hoveredMsg?.id === message.id}
                      message={message}
                      // setHovered={messageHoverHandler}
                      // usernameStyles="text-black"
                      itemStyles="hover:bg-slate-200/50"
                      timeStyles="text-slate-600 text-sm"
                    />
                  ) : (
                    <FollowMessage
                      // index={index}
                      isHovered={hoveredMsg?.id === message.id}
                      message={message}
                      setHovered={messageHoverHandler}
                      className="text-black "
                      itemStyles="hover:bg-slate-200/50"
                      timeStyles="text-slate-600 text-xs pl-4"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-8 my-6  rounded-lg border-2 border-slate-400 bg-slate-100 p-2 shadow">
        <input
          ref={newMessageRef}
          type="text"
          className=" w-full bg-slate-100 p-2 text-slate-600  outline-none"
          placeholder="Message"
          onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
        />
      </div>
    </div>
  );
};

export default MessageFeed;
