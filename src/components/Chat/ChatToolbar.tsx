import { faUserFriends, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AddFriendsToConversationDD from "./AddFriendsToConversationDD";
import StatusBubble from "@/components/UI/StatusBubble";
import type { ConversationParticipant, Friend } from "@/types/types";
import useHomeProfileStore from "store/home/profile-store";

interface IChatToolbarProps {
  participants: ConversationParticipant[];
  friends: Friend[];
}

const ChatToolbar: React.FunctionComponent<IChatToolbarProps> = ({
  participants,
  friends,
}) => {
  const myProfile = useHomeProfileStore().profile;
  const [addingUserDropdown, setAddingUserDropdown] = useState(false);
  const filteredParticipants = participants.filter(
    (p) => p.profile.id !== myProfile.id
  );
  const isDM = filteredParticipants.length === 1;

  return (
    <nav className="flex items-center justify-between border-b border-b-slate-700 px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-slate-400">
          {!isDM ? (
            <div className="grid h-10 w-10 place-content-center rounded-full bg-indigo-600 text-base text-white">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
          ) : (
            <span className="text-lg">@</span>
          )}
        </div>
        <div className="flex gap-2 text-xl font-semibold text-slate-100">
          {filteredParticipants.map((p) => {
            const { id, username, status } = p.profile;
            return (
              <li key={id} className="flex items-center gap-2 text-slate-800">
                {username}
                {isDM && (
                  <StatusBubble size="xs" status={status} position="static" />
                )}
              </li>
            );
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
          />
        )}
      </div>
    </nav>
  );
};

export default ChatToolbar;
