import { useEffect, useRef, useState } from "react";
import client from "pusher-js";

import { trpc } from "@/utils/trpc";

import styles from "@/styles/chatfeed.module.css";
import ResponseMessage from "./ResponseMessage";
import FollowMessage from "./FollowMessage";
import ChatToolbar from "./ChatToolbar";
import type { Friend, IMessage } from "@/types/types";

interface IChatViewProps {
  convo: string;
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  profileId: string;
  friends: Friend[];
}

const ChatView: React.FunctionComponent<IChatViewProps> = ({
  convo,
  setView,
  setConvo,
  profileId,
  friends,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const newMessageRef = useRef<HTMLInputElement>(null);
  const sendMessage = trpc.chat.push.useMutation();
  const conversationQuery = trpc.chat.getConversationById.useQuery(
    {
      id: convo,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  useEffect(() => {
    const messages = conversationQuery.data?.messages;
    if (messages) setMessages(messages);
  }, [conversationQuery.data]);

  const [hoveredMsg, setHoveredMsg] = useState<{
    id: string;
    index: number;
  } | null>(null);

  const messageHoverHandler = (ctx: { id: string; index: number } | null) => {
    setHoveredMsg(ctx);
  };

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
    const channel = pusherClient.subscribe("friend");

    channel.bind("message", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      pusherClient.unsubscribe("friend");
    };
  }, [messages, profileId]);

  const sendMessageHandler = () => {
    if (!newMessageRef.current?.value || !convo) return;
    const participantId = conversationQuery.data?.participants.find(
      (participant) => participant.profile.id === profileId
    )?.id;

    if (!participantId) return;

    sendMessage.mutate({
      conversationId: convo,
      participantId,
      text: newMessageRef.current.value,
    });
  };
  if (!conversationQuery.data) {
    return <div />;
  }
  return (
    <div className="flex h-screen flex-col bg-slate-600 ">
      <ChatToolbar
        myProfileId={profileId}
        participants={conversationQuery.data.participants}
        setConvo={setConvo}
        setView={setView}
        friends={friends}
      />
      <div
        className={`chatfeed grow items-end overflow-y-scroll ${styles.chatfeed}`}
      >
        <div className="  w-full cursor-pointer ">
          {messages?.map((message, index: number) => {
            return (
              <div key={message.id} className={`flex gap-4 `}>
                <div className="w-full">
                  {messages[index - 1]?.participant.id !==
                  message.participant.id ? (
                    <ResponseMessage
                      index={index}
                      isHovered={hoveredMsg?.id === message.id}
                      message={message}
                      setHovered={messageHoverHandler}
                    />
                  ) : (
                    <FollowMessage
                      index={index}
                      isHovered={hoveredMsg?.id === message.id}
                      message={message}
                      setHovered={messageHoverHandler}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-8 my-6  rounded-lg bg-slate-700 p-2">
        <input
          ref={newMessageRef}
          type="text"
          className=" w-full bg-slate-700 p-2 text-slate-200 outline-none"
          placeholder="Message"
          onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
        />
      </div>
    </div>
  );
};

export default ChatView;
