import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "@/context/auth-context";
import { trpc } from "@/utils/trpc";

interface IDirectMessageProps {
  userIds: string[];
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
}

const DirectMessageButton: React.FunctionComponent<IDirectMessageProps> = ({
  userIds,
  setView,
  setConvo,
}) => {
  const utils = trpc.useContext();
  const mutation = trpc.chat.findConversation.useMutation({
    onSuccess: () => {
      utils.chat.listConversations.invalidate();
    },
  });
  return (
    <button
      onClick={async () => {
        const conversation = await mutation.mutateAsync({
          userIds: [...userIds],
        });
        if (!conversation.id) return;
        setConvo(conversation.id);
        setView("chat");
      }}
      className="grid h-10 w-10 place-content-center overflow-hidden rounded-full bg-slate-700"
    >
      <FontAwesomeIcon icon={faMessage} />
    </button>
  );
};

export default DirectMessageButton;
