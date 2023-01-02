import * as React from "react";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { profile } from "console";

interface IAddFriendViewProps {
  profileId: string;
}

const AddFriendView: React.FunctionComponent<IAddFriendViewProps> = ({
  profileId,
}) => {
  const utils = trpc.useContext();
  const [username, setUsername] = useState("");

  const [friendRequestInputActive, setFriendRequestInputActive] =
    useState(false);
  const friendRequestMutation = trpc.user.sendFriendRequest.useMutation({
    onSuccess: () => {
      utils.user.getFriends.invalidate();
    },
  });

  const sendFriendRequestHandler = async () => {
    const cleanUsername = username.trim();
    if (!cleanUsername) return;

    await friendRequestMutation.mutateAsync({
      senderProfileId: profileId,
      username: cleanUsername,
    });
    setUsername("");
  };
  return (
    <div className="p-6">
      <p className="mb-4 text-xl font-bold uppercase text-slate-200">
        Add Friend
      </p>
      <div
        className={` flex items-center rounded-lg ${
          friendRequestInputActive && "border border-cyan-500"
        } bg-slate-700 px-2 `}
      >
        <input
          type="text"
          placeholder="Enter a Username"
          className={
            "flex-1 bg-slate-700 p-4 text-xl text-slate-300 outline-none"
          }
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setFriendRequestInputActive(true)}
          onBlur={() => setFriendRequestInputActive(false)}
        />
        <button
          onClick={sendFriendRequestHandler}
          className="h-fit rounded bg-indigo-500 p-2 text-white"
        >
          Send Friend Request
        </button>
      </div>
    </div>
  );
};

export default AddFriendView;
