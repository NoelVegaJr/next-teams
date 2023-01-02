import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { trpc } from "@/utils/trpc";
import type { Friend } from "@/types/types";
import Avatar from "@/components/UI/Avatar";

const PendingFriendRequestsView = ({
  friends,
  myProfileId,
}: {
  friends: Friend[];
  myProfileId: string;
}) => {
  const utils = trpc.useContext();

  const cancelFriendRequestMutation = trpc.user.deleteFriendRequest.useMutation(
    {
      onSuccess: () => {
        utils.user.getFriends.invalidate();
      },
    }
  );

  const acceptFriendRequestMutation = trpc.user.acceptFriendRequest.useMutation(
    {
      onSuccess: () => {
        utils.user.getFriends.invalidate();
      },
    }
  );

  const cancelFriendRequestHandler = (
    friendProfileId: string,
    profileId: string
  ) => {
    cancelFriendRequestMutation.mutate({ friendProfileId, profileId });
  };

  const acceptFriendRequestHandler = (
    friendProfileId: string,
    profileId: string
  ) => {
    acceptFriendRequestMutation.mutate({ friendProfileId, profileId });
  };

  return (
    <ul className="mx-20 my-8">
      {friends
        .filter((friend) => friend.status === "pending")
        .map((friend) => {
          const {
            username,
            avatar,
            id: friendProfileId,
            status,
          } = friend.friendProfile;
          return (
            <li
              key={friendProfileId}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-500"
            >
              <div className="flex items-center gap-4">
                <Avatar
                  username={username}
                  image={avatar}
                  size="sm"
                  status={status}
                />
                <div>
                  <p className="text-lg font-bold text-slate-100">{username}</p>
                  <p className="font-semibold text-slate-400">
                    Incoming Friend Request
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-xl text-slate-400">
                <button
                  onClick={() =>
                    acceptFriendRequestHandler(friendProfileId, myProfileId)
                  }
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="group-hover:text-green-600"
                  />
                </button>
                <button
                  onClick={() =>
                    cancelFriendRequestHandler(friendProfileId, myProfileId)
                  }
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700"
                >
                  <FontAwesomeIcon
                    icon={faX}
                    className="group-hover:text-red-600"
                  />
                </button>
              </div>
            </li>
          );
        })}
      {friends
        .filter((friend) => friend.status === "recieved")
        .map((friend) => {
          const {
            username,
            avatar,
            id: friendProfileId,
            status,
          } = friend.friendProfile;
          return (
            <li
              key={friendProfileId}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-500"
            >
              <div className="flex gap-4">
                <Avatar
                  username={username}
                  image={avatar}
                  size="sm"
                  status={status}
                />
                <div>
                  <p className="text-lg font-bold text-slate-100">{username}</p>
                  <p className="font-semibold text-slate-400">
                    Sent Friend Request
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  cancelFriendRequestHandler(friendProfileId, myProfileId)
                }
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-slate-400"
              >
                <FontAwesomeIcon
                  icon={faX}
                  className="group-hover:text-red-600"
                />
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default PendingFriendRequestsView;
