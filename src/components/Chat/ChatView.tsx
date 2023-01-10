import { useEffect, useRef, useState } from "react";
import { trpc } from "@/utils/trpc";
import styles from "@/styles/chatfeed.module.css";
import ChatToolbar from "./ChatToolbar";
import type { Friend, MessageAndParticipant } from "@/types/types";
import useHomeProfileStore from "store/home/profile-store";
import useConversationStore from "store/home/openConversation-store";
import { usePusherEvent } from "hooks/pusher/pushMessage-hook";
import Message from "./Message";
import ChatInput from "./ChatInput";

interface IChatViewProps {
  friends: Friend[];
}

const ChatView: React.FunctionComponent<IChatViewProps> = ({ friends }) => {
  const convoStore = useConversationStore();
  const profileStore = useHomeProfileStore();
  const [messages, setMessages] = useState<MessageAndParticipant[]>([]);
  const sendMessage = trpc.chat.push.useMutation();
  const conversationQuery = trpc.chat.getConversationById.useQuery(
    {
      id: convoStore.conversationId,
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const incomingMessageLinkedList = usePusherEvent<MessageAndParticipant>({
    clientId: "99e512a0e34c2dc7612d",
    cluster: "us2",
    transport: "ajax",
    endpoint: "http://localhost:3000/api/pusher/auth",
    profileId: "",
    subscription: convoStore.conversationId,
    event: "message",
  });

  useEffect(() => {
    const nextMessage = incomingMessageLinkedList.pop();
    if (nextMessage) {
      setMessages((prev) => [...prev, nextMessage.data]);
    }
  }, [incomingMessageLinkedList, messages]);

  const sendMessageHandler = (text: string) => {
    if (!text || !convoStore.conversationId) return;
    const participantId = conversationQuery.data?.participants.find(
      (participant) => participant.profile.id === profileStore.profile.id
    )?.id;

    if (!participantId) return;

    sendMessage.mutate({
      conversationId: convoStore.conversationId,
      participantId,
      text,
    });
  };
  if (!conversationQuery.data) {
    return <div />;
  }
  return (
    <div className="flex h-screen w-full flex-col bg-slate-50">
      <ChatToolbar
        participants={conversationQuery.data.participants}
        friends={friends}
      />
      <div
        className={`chatfeed grow items-end overflow-y-scroll ${styles.chatfeed}`}
      >
        <div className="w-full cursor-pointer">
          {messages.map((message, index: number) => {
            const { id, participant: currParticpant } = message;
            const prevParticipantId = messages[index - 1]?.participant.id;

            return (
              <div key={id} className={`flex gap-4 `}>
                <div className="w-full">
                  <Message
                    message={message}
                    newParticpant={prevParticipantId === currParticpant.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-8">
        <ChatInput
          submit={sendMessageHandler}
          className=" w-full rounded border border-slate-800 bg-slate-50 p-2 text-slate-800 outline-none"
        />
      </div>
    </div>
  );
};

export default ChatView;
