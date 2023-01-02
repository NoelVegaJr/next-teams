import { faUserFriends, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddFriendsToConversationDD from "./AddFriendsToConversationDD";
import StatusBubble from "@/components/UI/StatusBubble";
import type { Friend, IConversationParticipant } from "@/types/types";

interface IChatToolbarProps {
  participants: IConversationParticipant[];
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  myProfileId: string;
  friends: Friend[];
}

const ChatToolbar: React.FunctionComponent<IChatToolbarProps> = ({
  participants,
  setView,
  setConvo,
  myProfileId,
  friends,
}) => {
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
            if (p.profile.id !== myProfileId) {
              return (
                <li key={p.profile.id} className="flex items-center gap-2">
                  {p.profile.username}
                  {participants.length === 2 && (
                    <StatusBubble
                      size="xs"
                      status={p.profile.status}
                      position="static"
                    />
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
            friends={friends}
            close={() => setAddingUserDropdown(false)}
            currentParticipantUserIds={participants.map((p) => p.profile.id)}
            setConvo={setConvo}
            setView={setView}
          />
        )}
      </div>
    </nav>
  );
};

export default ChatToolbar;
