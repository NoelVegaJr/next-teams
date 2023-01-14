import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import styles from "@/styles/chatfeed.module.css";
import { usePusherEvent } from "hooks/pusher/pushMessage-hook";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import type {
  ConversationParticipant,
  Profile,
  Message,
  Conversation,
} from "@prisma/client";
import useProfileStore from "@/store/home/profile-store";

interface IConversationParticipant extends ConversationParticipant {
  profile: Profile;
}

interface IMessage extends Message {
  participant: IConversationParticipant;
}

interface IConversation extends Conversation {
  messages: IMessage[];
  participants: IConversationParticipant[];
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
  // const conversationQuery = trpc.chat.getConversationById.useQuery(
  //   {
  //     id: profileStore.profile.id,
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //   }
  // );

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
    console.log("Send message handler: ", text);
    if (!text || !conversation.id) return;
    console.log("Text exists");

    const participantId = conversation.participants.find(
      (participant) => participant.profile.id === profileStore.profile.id
    )?.id;
    console.log("profile Id: ", profileStore.profile.id);

    console.log("participant Id: ", participantId);

    if (!participantId) return;

    console.log("sending msg");
    sendMessage.mutate({
      conversationId: conversation.id,
      participantId,
      text,
    });
  };
  // if (!conversationQuery.data) {
  //   return <div />;
  // }
  return (
    <div className="flex w-full flex-1 flex-col  bg-slate-50">
      {/* <ChatToolbar
        participants={conversationQuery.data.participants}
        friends={friends}
      /> */}
      <div
        className={`chatfeed grow items-end overflow-y-auto ${styles.chatfeed}`}
      >
        <div className="w-full cursor-pointer">
          {messages.map((message, index: number) => {
            const { id, participant: currParticpant } = message;
            const prevParticipantId = messages[index - 1]?.participant.id;

            return (
              <div key={id} className={`flex gap-4 `}>
                <ChatMessage
                  message={message}
                  newParticpant={prevParticipantId === currParticpant.id}
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
