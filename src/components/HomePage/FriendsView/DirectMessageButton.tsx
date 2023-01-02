import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { trpc } from "@/utils/trpc";

interface IDirectMessageProps {
  profileIds: string[];
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
}

const DirectMessageButton: React.FunctionComponent<IDirectMessageProps> = ({
  profileIds,
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
        console.log(profileIds);
        const conversation = await mutation.mutateAsync({
          profileIds: profileIds,
        });

        if (!conversation) return;
        console.log("CONVERSATION EXISTS: ", conversation.id);
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
