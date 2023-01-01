import * as React from "react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/auth-context";
import { trpc } from "@/utils/trpc";

const AddFriendView: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const userCtx = useContext(UserContext);

  const [friendRequestInputActive, setFriendRequestInputActive] =
    useState(false);
  const friendRequestMutation = trpc.user.sendFriendRequest.useMutation();

  const sendFriendRequestHandler = async () => {
    const cleanUsername = username.trim();
    if (!userCtx?.profile?.user?.id || !cleanUsername) return;
    console.log("sending fr");

    await friendRequestMutation.mutateAsync({
      senderId: userCtx?.profile?.user.id,
      username: cleanUsername,
    });
    setUsername("");
    userCtx.refetch();
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
