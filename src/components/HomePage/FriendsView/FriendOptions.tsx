import * as React from "react";
import { trpc } from "@/utils/trpc";

interface IFriendOptionsProps {
  myProfileId: string;
  friendProfileId: string;
  close: () => void;
}

const FriendOptions: React.FunctionComponent<IFriendOptionsProps> = ({
  myProfileId,
  friendProfileId,
  close,
}) => {
  const utils = trpc.useContext();
  const removeFriendMutation = trpc.user.unfriend.useMutation({
    onSuccess: () => {
      utils.user.getFriends.invalidate();
    },
  });

  const unfriendHandler = () => {
    removeFriendMutation.mutate({
      friendProfileId: friendProfileId,
      profileId: myProfileId,
    });
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-40 h-screen w-full cursor-default"
        onClick={close}
      />
      <ul className=" absolute  right-5 -bottom-10 z-50 w-44 overflow-hidden rounded bg-slate-700 p-2 text-sm">
        <li
          onClick={unfriendHandler}
          className=" w-full rounded p-2 text-red-500 hover:bg-red-500 hover:text-white"
        >
          Remove Friend
        </li>
      </ul>
    </>
  );
};

export default FriendOptions;
