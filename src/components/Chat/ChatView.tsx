import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import styles from "@/styles/chatfeed.module.css";
import { usePusherEvent } from "hooks/pusher/pushMessage-hook";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import useProfileStore from "@/store/home/profile-store";

interface IMessage {
  id: string;
  date: Date;
  participant: { profileId: string; id: string };
  text: string;
}

interface IConversation {
  id: string;
  participants: { profileId: string; id: string }[];
  messages: IMessage[];
}

interface IChatViewProps {
  conversation: IConversation;
}

const ChatView: React.FunctionComponent<IChatViewProps> = ({
  conversation,
}) => {
  // const convoStore = useConversationStore();
  const profileStore = useProfileStore();
  const [messages, setMessages] = useState<IMessage[]>(conversation.messages);
  const sendMessage = trpc.chat.push.useMutation();

  const incomingMessageLinkedList = usePusherEvent<IMessage>({
    clientId: "99e512a0e34c2dc7612d",
    cluster: "us2",
    transport: "ajax",
    endpoint: "http://localhost:3000/api/pusher/auth",
    profileId: "",
    subscription: conversation.id,
    event: "message",
  });

  useEffect(() => {
    const nextMessage = incomingMessageLinkedList.pop();
    if (nextMessage) {
      setMessages((prev) => [...prev, nextMessage]);
    }
  }, [incomingMessageLinkedList, messages]);

  const sendMessageHandler = (text: string) => {
    if (!text || !conversation.id) return;

    const participantId = conversation.participants.find(
      (participant) => participant.profileId === profileStore.profile.id
    )?.id;

    if (!participantId) return;

    sendMessage.mutate({
      conversationId: conversation.id,
      participantId,
      text,
    });
  };

  return (
    <div className="flex w-full flex-1 flex-col  bg-slate-50">
      <div
        className={`chatfeed grow items-end overflow-y-auto ${styles.chatfeed}`}
      >
        <div className="w-full cursor-pointer">
          {messages.map((message, index: number) => {
            const {
              id,
              participant: { id: participantId },
            } = message;
            const prevParticipantId = messages[index - 1]?.participant.id;

            return (
              <div key={id} className={`flex gap-4 `}>
                <ChatMessage
                  message={message}
                  newParticpant={prevParticipantId === participantId}
                />
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
