import { faUserFriends, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/auth-context";
import AddFriendsToConversationDD from "./AddFriendsToConversationDD";
import StatusBubble from "@/components/UI/StatusBubble";
import { TStatus } from "@/types/status";

interface IUser {
  id: string;
  username: string | null;
  image: string | null;
  status: TStatus;
}

interface IChatToolbarProps {
  participants: Array<{ user: IUser }>;
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
}

const ChatToolbar: React.FunctionComponent<IChatToolbarProps> = ({
  participants,
  setView,
  setConvo,
}) => {
  const userCtx = useContext(UserContext);
  const [addingUserDropdown, setAddingUserDropdown] = useState(false);

  return (
    <nav className="flex items-center justify-between border-b border-b-slate-700 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-slate-400">
          {participants.length > 2 ? (
            <div className="grid h-10 w-10 place-content-center rounded-full bg-indigo-600 text-base text-white">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
          ) : (
            <span>@</span>
          )}
        </div>
        <div className="flex gap-2 text-xl font-semibold text-slate-100">
          {participants.map((p) => {
            if (p?.user?.id !== userCtx.profile.user.id) {
              return (
                <li key={p.user.id} className="flex items-center gap-2">
                  {p?.user?.username}
                  {(participants.length ?? 0) === 2 && (
                    <StatusBubble size="md" status={p.user.status} />
                  )}
                </li>
              );
            }
          })}
        </div>
      </div>
      <div className="relative text-slate-400">
        <button onClick={() => setAddingUserDropdown(!addingUserDropdown)}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
        {addingUserDropdown && (
          <AddFriendsToConversationDD
            close={() => setAddingUserDropdown(false)}
            currentParticipantUserIds={participants.map((p) => p.user.id)}
            setConvo={setConvo}
            setView={setView}
          />
        )}
      </div>
    </nav>
  );
};

export default ChatToolbar;
