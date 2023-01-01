import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import type { TStatus } from "@/types/status";
import DirectMessageButton from "./DirectMessageButton";
import { useContext, useState } from "react";
import FriendOptions from "./FriendOptions";
import { UserContext } from "@/context/auth-context";
import Avatar from "@/components/UI/Avatar";

interface IFriendProps {
  setView: (view: string) => void;
  setConvo: (conversationId: string) => void;
  image: string;
  status: TStatus;
  username: string;
  friendUserId: string;
}

const Friend: React.FunctionComponent<IFriendProps> = ({
  setView,
  setConvo,
  image,
  status,
  username,
  friendUserId,
}) => {
  const userCtx = useContext(UserContext);
  const [openUserOptions, setOpenUserOptions] = useState({
    status: false,
    userId: "",
  });
  return (
    <li className="flex cursor-pointer items-center justify-between rounded  px-2 hover:bg-slate-500/30">
      <div className="flex w-full items-center justify-between border-t border-t-slate-500/30 py-3">
        <div className="relative flex gap-3">
          <Avatar image={image} status={status} size="sm" username={username} />
          <div>
            <p className="-mb-1 text-lg font-semibold text-slate-200">
              {username}
            </p>
            <p className=" text-slate-400">{status}</p>
          </div>
        </div>
        <div className="flex gap-4 text-slate-300">
          <DirectMessageButton
            setView={setView}
            setConvo={setConvo}
            userIds={[friendUserId, userCtx.profile.user.id]}
          />
          <div className="relative ">
            <button
              onClick={() =>
                setOpenUserOptions({
                  status: true,
                  userId: friendUserId,
                })
              }
              className="relative grid h-10 w-10 place-content-center overflow-hidden rounded-full bg-slate-700"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {openUserOptions.status &&
              openUserOptions.userId === friendUserId && (
                <FriendOptions
                  userId={userCtx.profile.user.id}
                  friendUserId={friendUserId}
                  close={() =>
                    setOpenUserOptions({ status: false, userId: "" })
                  }
                />
              )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Friend;
