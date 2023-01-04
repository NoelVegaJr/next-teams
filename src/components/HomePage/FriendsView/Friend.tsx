import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import DirectMessageButton from "./DirectMessageButton";
import { useState } from "react";
import FriendOptions from "./FriendOptions";
import Avatar from "@/components/UI/Avatar";
import { Friend } from "@/types/types";
import Stack from "@/components/UI/Stack";
import Text from "@/components/UI/Text";

interface IFriendProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  friend: Friend;
  myProfileId: string;
}

const Friend: React.FunctionComponent<IFriendProps> = ({
  setView,
  setConvo,
  friend,
  myProfileId,
}) => {
  const [openUserOptions, setOpenUserOptions] = useState({
    status: false,
    userId: "",
  });
  const {
    id: friendProfileId,
    username,
    avatar,
    status,
  } = friend.friendProfile;
  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded border-t border-t-slate-500/30 py-3 px-4 hover:bg-slate-500/30">
      <Stack type="row" gap={3} position="relative">
        <Avatar image={avatar} status={status} size="sm" username={username} />
        <div>
          <Text size="lg" weight="semibold" className="-mb-1 text-slate-200">
            {username}
          </Text>
          <Text className="text-slate-400">{status}</Text>
        </div>
      </Stack>
      <div className="flex gap-4 text-slate-300">
        <DirectMessageButton
          setView={setView}
          setConvo={setConvo}
          profileIds={[friendProfileId, myProfileId]}
        />
        <div className="relative ">
          <button
            onClick={() =>
              setOpenUserOptions({
                status: true,
                userId: friendProfileId,
              })
            }
            className="relative grid h-10 w-10 place-content-center overflow-hidden rounded-full bg-slate-700"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          {openUserOptions.status &&
            openUserOptions.userId === friendProfileId && (
              <FriendOptions
                myProfileId={myProfileId}
                friendProfileId={friendProfileId}
                close={() => setOpenUserOptions({ status: false, userId: "" })}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default Friend;
