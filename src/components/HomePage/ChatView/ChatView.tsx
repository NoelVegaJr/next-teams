import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import client from "pusher-js";

import { trpc } from "@/utils/trpc";
import { UserContext } from "@/context/auth-context";

import styles from "@/styles/chatfeed.module.css";
import ResponseMessage from "./ResponseMessage";
import FollowMessage from "./FollowMessage";
import ChatToolbar from "./ChatToolbar";

interface IUser {
  id: string;
  username: string | null;
  image: string | null;
  status: string | null;
}

interface IMessage {
  conversationId: string;
  id: string;
  date: Date;
  text: string;
  participant: { id: string; user: IUser };
}

interface IChatViewProps {
  convo?: string;
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
}

const ChatView: React.FunctionComponent<IChatViewProps> = ({
  convo,
  setView,
  setConvo,
}) => {
  const userCtx = useContext(UserContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const newMessageRef = useRef<HTMLInputElement>(null);
  const sendMessage = trpc.chat.push.useMutation();
  const conversationQuery = trpc.chat.getConversationById.useQuery(
    {
      id: convo ?? "",
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  useEffect(() => {
    const messages = conversationQuery.data?.messages;
    setMessages(messages ?? []);
  }, [conversationQuery.data, userCtx.profile.user.id, convo]);

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
          user_id: userCtx.profile.user.id,
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
  }, [messages, userCtx.profile.user.id]);

  const sendMessageHandler = () => {
    if (!newMessageRef.current?.value || !convo) return;
    const participantId = conversationQuery.data?.participants.find(
      (user) => user.userId === userCtx.profile.user.id
    )?.id;

    if (!participantId) return;

    sendMessage.mutate({
      conversationId: convo,
      participantId,
      text: newMessageRef.current.value,
      user: {
        id: userCtx.profile.user.id,
        image: userCtx.profile.user.image,
        username: userCtx.profile.user.username,
      },
    });
  };
  if (!conversationQuery.data) {
    return <div />;
  }
  return (
    <div className="flex h-screen flex-col bg-slate-600 ">
      <ChatToolbar
        participants={conversationQuery.data.participants}
        setConvo={setConvo}
        setView={setView}
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
