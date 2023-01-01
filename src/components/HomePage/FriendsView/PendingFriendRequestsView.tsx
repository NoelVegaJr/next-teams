import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/context/auth-context";
import { trpc } from "@/utils/trpc";

const PendingFriendRequestsView = () => {
  const userCtx = useContext(UserContext);
  const utils = trpc.useContext();

  const cancelFriendRequestMutation = trpc.user.deleteFriendRequest.useMutation(
    {
      onSuccess: () => {
        utils.user.profile.invalidate();
      },
    }
  );
  const acceptFriendRequestMutation = trpc.user.acceptFriendRequest.useMutation(
    {
      onSuccess: () => {
        utils.user.profile.invalidate();
      },
    }
  );

  const cancelFriendRequestHandler = (id: string) => {
    cancelFriendRequestMutation.mutate({ id });
  };

  const acceptFriendRequestHandler = (id: string) => {
    acceptFriendRequestMutation.mutate({ id });
  };

  return (
    <ul className="mx-20 my-8">
      {userCtx?.profile?.RecievingFriendRequests.map((fr: any) => {
        if (fr.status === "pending") {
          const { username, image } = fr.sender.user;
          return (
            <li
              key={fr.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-500"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={image ?? "/defaultserver.png"}
                    alt="user avatar"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-100">{username}</p>
                  <p className="font-semibold text-slate-400">
                    Incoming Friend Request
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-xl text-slate-400">
                <button
                  onClick={() => acceptFriendRequestHandler(fr.id)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700"
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="group-hover:text-green-600"
                  />
                </button>
                <button className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700">
                  <FontAwesomeIcon
                    icon={faX}
                    className="group-hover:text-red-600"
                  />
                </button>
              </div>
            </li>
          );
        }
      })}
      {userCtx?.profile?.SentFriendRequests.map((fr: any) => {
        if (fr.status === "pending") {
          const { id, username, image } = fr.recipient.user;
          return (
            <li
              key={fr.id}
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-500"
            >
              <div className="flex gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={image ?? "/defaultserver.png"}
                    alt="user avatar"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-100">{username}</p>
                  <p className="font-semibold text-slate-400">
                    Sent Friend Request
                  </p>
                </div>
              </div>
              <button
                onClick={() => cancelFriendRequestHandler(fr.id)}
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-slate-400"
              >
                <FontAwesomeIcon
                  icon={faX}
                  className="group-hover:text-red-600"
                />
              </button>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default PendingFriendRequestsView;
